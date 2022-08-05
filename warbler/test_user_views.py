"""User View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


from email import message
import os
from unittest import TestCase

from models import db, connect_db, Message, User, Likes, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"
os.environ['SQLALCHEMY_ECHO'] = 'False'
os.environ['FLASK_DEBUG'] = 'False'


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

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

        self.client = app.test_client()
        self.client.get("/logout")

    def tearDown(self):
        db.session.rollback()

    def test_users_list(self):
        """Test displaying user list"""
        
        with self.client as c:
            res = c.get("/users")

            self.assertIn("@tester", str(res.data))
            self.assertIn("@testly", str(res.data))

    def test_user_show_logged_in(self):
        """Test displaying a user's profile logged in"""
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.get(f"/users/{self.uid2}")
            self.assertEqual(res.status_code, 200)
            self.assertIn("@testly", str(res.data))

    def test_user_following_logged_in(self):
        """Test checking a user's follows logged in"""
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            u = Follows(user_being_followed_id=self.uid1, user_following_id=self.uid2)
            db.session.add(u)
            db.session.commit()

            res = c.get(f"/users/{self.uid2}/following", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("@tester", str(res.data))

    def test_user_follows_logged_in(self):
        """Test checking a user's follows logged in"""
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            u = Follows(user_being_followed_id=self.uid1, user_following_id=self.uid2)
            db.session.add(u)
            db.session.commit()

            res = c.get(f"/users/{self.uid1}/followers", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("@testly", str(res.data))

    def test_user_delete_logged_in(self):
        """Test user deletion while logged in"""
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.post("/users/delete",
                         data={"id": self.uid1},
                         follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIsNone(User.query.get(self.uid1))

    def test_user_show_logged_out(self):
        """Test showing a user logged out"""
        
        with self.client as c:
            res = c.get(f"/users/{self.uid1}", follow_redirects=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("@tester", str(res.data))

    def test_user_following_logged_out(self):
        """Test checking a user's followers logged out"""
        
        with self.client as c:
            u = Follows(user_being_followed_id=self.uid1, user_following_id=self.uid2)
            db.session.add(u)
            db.session.commit()

            res = c.get(f"/users/{self.uid2}/following", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))

    def test_user_follows_logged_out(self):
        """Test checking a user followers"""
        
        with self.client as c:
            u = Follows(user_being_followed_id=self.uid1, user_following_id=self.uid2)
            db.session.add(u)
            db.session.commit()

            res = c.get(f"/users/{self.uid1}/followers", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))

    def test_user_delete_logged_out(self):
        """Test user deleting while logged out"""
        
        with self.client as c:
            res = c.post("/users/delete",
                         data={"id": self.uid1},
                         follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(User.query.get(self.uid1))

    def test_user_follow_add(self):
        """Test adding a follow"""
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.post(f"/users/follow/{self.uid2}", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("@testly", str(res.data))

    def test_user_follow_remove(self):
        """Test removing a follow"""
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            u = Follows(user_being_followed_id=self.uid2, user_following_id=self.uid1)
            db.session.add(u)
            db.session.commit()
            res = c.post(f"/users/stop-following/{self.uid2}", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn("@testly", str(res.data))

            res = c.get(f"/users/{self.uid1}/followers", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn("@testly", str(res.data))

    def test_add_like_logged_in(self):
        """Test adding like of logged in user"""
    
        m = Message(
                id=1234,
                text="hiiii",
                user_id=self.uid2)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.post("/messages/1234/like", follow_redirects=True)
            self.assertEqual(res.status_code, 200)

            likes = Likes.query.filter(Likes.message_id == 1234).all()
            self.assertEqual(len(likes), 1)
            self.assertEqual(likes[0].user_id, self.uid1)

    def test_add_like_same_user(self):
        """Test adding like from same user"""
        
        m = Message(
                id=1234,
                text="hiiii",
                user_id=self.uid1)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.post("/messages/1234/like", follow_redirects=True)
            self.assertEqual(res.status_code, 403)

            likes = Likes.query.filter(Likes.message_id == 1234).all()
            self.assertEqual(len(likes), 0)

    def test_add_like_logged_out(self):
        """Test adding like of logged out user"""
        
        with self.client as c:
            m = Message(
                    id=1234,
                    text="hiiii",
                    user_id=self.uid2)
            db.session.add(m)
            db.session.commit()

            res = c.post("/messages/1234/like", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))

            likes = Likes.query.filter(Likes.message_id == 1234).all()
            self.assertEqual(len(likes), 0)

    def test_remove_like_logged_in(self):
        """Test toggle remove of like"""

        m = Message(
                id=1234,
                text="hiiii",
                user_id=self.uid2)

        db.session.add(m)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1

            res = c.post("/messages/1234/like", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            res = c.post("/messages/1234/like", follow_redirects=True)
            self.assertEqual(res.status_code, 200)

            likes = Likes.query.filter(Likes.message_id == 1234).all()
            self.assertEqual(len(likes), 0)
