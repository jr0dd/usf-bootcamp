from unittest import TestCase

from app import app
from models import db, User, Post, Tag

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
        """Add test data"""

        Post.query.delete()
        Tag.query.delete()
        User.query.delete()

        user = User(first_name='Newbie', last_name='Tester', image_url='https://cdn.images.express.co.uk/img/dynamic/151/590x/secondary/alien-962725.jpg')
        db.session.add(user)
        db.session.commit()

        tag = Tag(name='info')
        post = Post(title='my best blog ever', content='blah blah blah', user_id=user.id, tags=[tag])

        db.session.add(tag)
        db.session.add(post)
        db.session.commit()

        self.user_id = user.id
        self.post_id = post.id
        self.tag_id = tag.id

    def tearDown(self):
        """Clean up any leftover junk"""

        db.session.rollback()

    def test_error_404(self):
        with app.test_client() as client:
            res = client.get('/root', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 404)
            self.assertIn('<h2>Not Found</h2>', html)

    def test_homepage(self):
        with app.test_client() as client:
            res = client.get('/', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Blogly Recent Posts</h1>', html)
            self.assertIn('<h2>my best blog ever</h2>', html)
            self.assertIn('<i class="tag">info</i>', html)

    def test_user_list(self):
        with app.test_client() as client:
            res = client.get('/users', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Newbie', html)
            self.assertNotIn('<h2>No users have been created yet.</h2>', html)

    def test_user_details(self):
        with app.test_client() as client:
            res = client.get(f'/users/{self.user_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Newbie Tester</h1>', html)
            self.assertIn('my best blog ever', html)
            self.assertNotIn('<p>No posts have been made yet</p>', html)

    def test_user_create(self):
        with app.test_client() as client:
            data = {'first_name': 'Mike', 'last_name': 'Jones', 'image_url': ''}
            res = client.post('/users/new', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Newbie Tester', html)
            self.assertIn('Mike Jones', html)

    def test_user_edit(self):
        with app.test_client() as client:
            image = 'https://4.bp.blogspot.com/-DdhXxyKz9s0/WGUIMhcVu2I/AAAAAAAArEU/jfcW7T86RqkRag8riUHLibBbOfER-n9gwCLcB/s1600/alien%2B1.jpg'
            data = {'first_name': 'Noob', 'last_name': 'Testy', 'image_url': {image}}
            res = client.post(f'/users/{self.user_id}/edit', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(f'<a href="/users/{self.user_id}">Noob Testy</a>', html)

    def test_user_delete(self):
        with app.test_client() as client:
            res = client.post(f'/users/{self.user_id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h2>No users have been created yet.</h2>', html)

    def test_post_details(self):
        with app.test_client() as client:
            res = client.get(f'/posts/{self.post_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('my best blog ever', html)
            self.assertIn('blah blah blah', html)
            self.assertIn('<i class="tag">info</i>', html)
            self.assertNotIn('<span class="no-tag"><i>None</i></span>', html)

    def test_post_create(self):
        with app.test_client() as client:
            data = {'title': 'my new best blog', 'content': 'blahzay blahzay', 'user_id': self.user_id}
            res = client.post(f'/users/{self.user_id}/posts/new', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('my best blog ever', html)
            self.assertIn('my new best blog', html)

    def test_post_edit(self):
        with app.test_client() as client:
            data = {'title': 'oooops', 'content': 'blahzay blahzay', 'tags': [self.tag_id]}
            res = client.post(f'/posts/{self.post_id}/edit', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('oooops', html)

    def test_post_delete(self):
        with app.test_client() as client:
            res = client.post(f'/posts/{self.post_id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('my best blog ever has been deleted', html)
            self.assertIn('<p>No posts have been made yet</p>', html)

    def test_tag_list(self):
        with app.test_client() as client:
            res = client.get('/tags', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<ul class="tag-list">', html)
            self.assertNotIn('<h2>No tags have been created yet.</h2>', html)

    def test_tag_details(self):
        with app.test_client() as client:
            res = client.get(f'/tags/{self.tag_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertNotIn('<p>No posts have been tagged yet</p>', html)

    def test_tag_create(self):
        with app.test_client() as client:
            data = {'name': 'awesome'}
            res = client.post('/tags/new', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('awesome successfully created', html)

    def test_tag_edit(self):
        with app.test_client() as client:
            data = {'name': 'awesome-sauce'}
            res = client.post(f'/tags/{self.tag_id}/edit', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('awesome-sauce has been updated', html)

    def test_tag_delete(self):
        with app.test_client() as client:
            res = client.post(f'/tags/{self.tag_id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertNotIn('awesome-sauce', html)
            self.assertIn('<h2>No tags have been created yet.</h2>', html)
