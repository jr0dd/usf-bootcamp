from unittest import TestCase

from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class FlaskTests(TestCase):
    def setUp(self):
        """Add test users"""

        User.query.delete()

        user = User(first_name='Newbie', last_name='Tester', image_url='https://cdn.images.express.co.uk/img/dynamic/151/590x/secondary/alien-962725.jpg')
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        """Clean up any leftover junk"""

        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            res = client.get('/', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Newbie', html)

    def test_user_details(self):
        with app.test_client() as client:
            res = client.get(f'/users/{self.user_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Newbie Tester</h1>', html)

    def test_add_user(self):
        with app.test_client() as client:
            data = {'first_name': 'Mike', 'last_name': 'Jones', 'image_url': ''}
            res = client.post('/users/new', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Newbie Tester', html)
            self.assertIn('Mike Jones', html)

    def test_edit_user(self):
        with app.test_client() as client:
            image = 'https://4.bp.blogspot.com/-DdhXxyKz9s0/WGUIMhcVu2I/AAAAAAAArEU/jfcW7T86RqkRag8riUHLibBbOfER-n9gwCLcB/s1600/alien%2B1.jpg'
            data = {'first_name': 'Noob', 'last_name': 'Testy', 'image_url': {image}}
            res = client.post(f'/users/{self.user_id}/edit', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(f'<a href="/users/{self.user_id}">Noob Testy</a>', html)

