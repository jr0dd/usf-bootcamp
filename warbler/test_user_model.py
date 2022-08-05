"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"
os.environ['SQLALCHEMY_ECHO'] = 'False'


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        user1 = User.signup("tester", "tester@aol.com", "7654321", None)
        user2 = User.signup("testly", "testly@netscape.com", "1234567", None)
        uid1 = 9000
        uid2 = 9001
        user1.id = uid1
        user2.id = uid2

        db.session.commit()

        user1 = User.query.get(uid1)
        user2 = User.query.get(uid2)

        self.user1 = user1
        self.uid1 = uid1
        self.user2 = user2
        self.uid2 = uid2

        self.client = app.test_client()

    def tearDown(self):
        db.session.rollback()

    def test_user_model(self):
        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_user_signup(self):
        self.assertIsNotNone(User.query.get(self.uid1))
        self.assertIsNotNone(User.query.get(self.uid2))

    def test_user_following(self):
        self.user1.following.append(self.user2)
        db.session.commit()
        self.assertTrue(self.user1.is_following(self.user2))
        self.assertFalse(self.user2.is_following(self.user1))

    def test_user_followed(self):
        self.user1.following.append(self.user2)
        db.session.commit()
        self.assertTrue(self.user2.is_followed_by(self.user1))
        self.assertFalse(self.user1.is_followed_by(self.user2))

    def test_user_login(self):
        self.assertFalse(User.authenticate(self.user1.username, "123"))
        self.assertTrue(User.authenticate(self.user1.username, "7654321"))
        self.assertFalse(User.authenticate(self.user2.username, "123"))
        self.assertTrue(User.authenticate(self.user2.username, "1234567"))
