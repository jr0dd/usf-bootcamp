"""Message model tests."""

# run these tests like:
#
#    python -m unittest test_Message_model.py


import os
from unittest import TestCase
from datetime import datetime

from models import db, Message, User, Likes

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


class MessageModelTestCase(TestCase):
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

        db.session.commit()

        self.user1 = User.query.get(self.uid1)
        self.user2 = User.query.get(self.uid2)

        self.client = app.test_client()

    def tearDown(self):
        db.session.rollback()

    def test_message_model(self):
        m = Message(
            text="hiiii",
            user_id=self.uid1
        )
        db.session.add(m)
        db.session.commit()

        db.session.add(m)
        db.session.commit()

        # Message should have no messages & no followers
        self.assertEqual(len(self.user1.messages), 1)
        self.assertEqual(self.user1.messages[0].text, "hiiii")

    def test_message_likes(self):
        m = Message(
            text="test",
            user_id=self.uid1
        )
        db.session.add(m)
        db.session.commit()

        self.user2.likes.append(m)
        db.session.commit()

        likes = Likes.query.filter(Likes.user_id == self.uid2).all()
        self.assertTrue(likes)
        self.assertEqual(likes[0].message_id, m.id)