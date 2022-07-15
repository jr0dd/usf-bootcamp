from unittest import TestCase

from app import app
from models import db, User, Post, stock_image

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class ModelTests(TestCase):
    """Tests for User model"""

    def setUp(self):
        """Clean up any existing tables"""

        User.query.delete()

    def tearDown(self):
        """Clean up any leftover junk"""

        db.session.rollback()

    def test_full_name(self):
        user = User(first_name='Testy', last_name='Tester')
        self.assertEqual(user.full_name, 'Testy Tester')

    def test_humanize_date(self):
        user = User(first_name='Testy', last_name='Tester')
        db.session.add(user)
        db.session.commit()

        post = Post(title='my best blog ever', content='blah blah blah', user_id=user.id)
        db.session.add(post)

        self.assertIsInstance(post.humanize_date, str)

    def test_post_cascade_delete(self):
        user = User(first_name='Testy', last_name='Tester')
        db.session.add(user)
        db.session.commit()

        post = Post(title='my best blog ever', content='blah blah blah', user_id=user.id)
        db.session.add(post)

        self.assertTrue(db.session.query(Post.user_id).first())

        user.query.delete()

        self.assertFalse(db.session.query(Post.user_id).first())
