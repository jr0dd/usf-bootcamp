from unittest import TestCase

from app import app
from models import db, User, stock_image

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class ModelTests(TestCase):
    """Tests for User model"""

    def setUp(self):
        """Clean up any existing users"""

        User.query.delete()
        user = User(first_name='Testy', last_name='Tester')
        self.user = user

    def tearDown(self):
        """Clean up any leftover junk"""

        db.session.rollback()

    def test_full_name(self):
        self.assertEqual(self.user.full_name, 'Testy Tester')
