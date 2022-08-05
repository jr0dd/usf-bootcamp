"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"
os.environ['FLASK_DEBUG'] = 'False'


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
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

        self.client = app.test_client()

        self.client.get("/logout")

    def test_add_message_logged_in(self):
        """Can user add a message"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.post("/messages/new",
                         data={"text": "Hello"},
                         follow_redirects=True)

            # Make sure it redirects
            self.assertEqual(res.status_code, 200)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_delete_message_logged_in(self):
        """Can a logged in user delete a message"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            m = Message(
                id=1234,
                text="a test message",
                user_id=self.uid1)
            db.session.add(m)
            db.session.commit()

            res = c.post("/messages/1234/delete", follow_redirects=True)

            self.assertEqual(res.status_code, 200)
            self.assertEqual(len(Message.query.all()), 0)

    def test_add_message_logged_out(self):
        """Can logged out user add a message"""

        with self.client as c:
            res = c.post("/messages/new",
                         data={"text": "Hello"},
                         follow_redirects=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))

    def test_delete_message_logged_out(self):
        """Can a logged out user delete a message"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            m = Message(
                id=1234,
                text="a test message",
                user_id=self.uid1)
            db.session.add(m)
            db.session.commit()

            c.get("/logout")

            res = c.post("/messages/1234/delete", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))
            self.assertEqual(len(Message.query.all()), 1)

    def test_add_message_as_other_user(self):
        """Can user add a message as another user"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = 5555

            res = c.post("/messages/new",
                         data={"text": "Hello", "user_id": "9001"},
                         follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))

    def test_delete_message_as_other_user(self):
        """Can a User delete another user's message"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = 5555

            m = Message(
                id=1234,
                text="a test message",
                user_id=self.uid1)
            db.session.add(m)
            db.session.commit()
            
            res = c.post("/messages/1234/delete", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))
            self.assertEqual(len(Message.query.all()), 1)
