from unittest import TestCase

from app import app
from models import db, User, Post, Tag

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class ModelTests(TestCase):
    """Tests for User model"""

    def setUp(self):
        """Clean up any existing tables"""

        Post.query.delete()
        User.query.delete()
        Tag.query.delete()

    def tearDown(self):
        """Clean up any leftover junk"""

        db.session.rollback()

    def test_full_name(self):
        """Tets full name generation"""

        user = User(first_name='Testy', last_name='Tester')
        self.assertEqual(user.full_name, 'Testy Tester')

    def test_humanize_date(self):
        """Test date conversion"""

        user = User(first_name='Testy', last_name='Tester')
        db.session.add(user)
        db.session.commit()

        post = Post(title='my best blog ever', content='blah blah blah', user_id=user.id)
        db.session.add(post)
        db.session.commit()

        self.assertIsInstance(post.humanize_date, str)

    def test_posts(self):
        """Test post relations and deletion"""
        user = User(first_name='Testy', last_name='Tester')
        db.session.add(user)
        db.session.commit()

        post = Post(title='my best blog ever', content='blah blah blah', user_id=user.id)
        db.session.add(post)

        self.assertTrue(db.session.query(Post.user_id).first())

        user.query.delete()

        self.assertFalse(db.session.query(Post.user_id).first())

    def test_tags(self):
        """Test tag relations and deletion"""

        user = User(first_name='Testy', last_name='Tester')
        db.session.add(user)
        db.session.commit()

        tag = Tag(name='fun')
        db.session.add(tag)
        db.session.commit()

        post = Post(title='my best blog ever', content='blah blah blah', user_id=user.id, tags=[tag])
        db.session.add(post)

        self.assertTrue(db.session.query(Tag.posts).first())
        self.assertTrue(db.session.query(Post.tags).first())

        post.query.delete()

        self.assertFalse(db.session.query(Tag.posts).first())
        self.assertFalse(db.session.query(Post.tags).first())
