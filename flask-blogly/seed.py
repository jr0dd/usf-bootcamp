"""Seed file to make sample data for users db."""

from models import db, connect_db, User, Post, Tag
from app import app

connect_db(app)

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()
Post.query.delete()
Tag.query.delete()

# Add users
jim = User(first_name='Jim', last_name='Jones', image_url='https://lightforcenetwork.com/sites/default/files/alien-5631238_1280%20(2).jpg')
billy = User(first_name='Billy', last_name='Bob', image_url='https://cdn.images.express.co.uk/img/dynamic/151/590x/secondary/alien-962725.jpg')
testy = User(first_name='Testy', last_name='Tester')

db.session.add(jim)
db.session.add(billy)
db.session.add(testy)

# Add posts
jim_post = Post(title='my blog', content='blah blah blah', user_id=1)
billy_post = Post(title='i\'m bored', content='zzzzzzzz', user_id=2)
testy_post = Post(title='my 1st blog', content='......nope.....', user_id=3)

db.session.add(jim_post)
db.session.add(billy_post)
db.session.add(testy_post)

# Add tags
funny = Tag(name='funny', posts=[jim_post, billy_post])
info = Tag(name='informational', posts=[jim_post, billy_post, testy_post])
tech = Tag(name='tech', posts=[jim_post])

db.session.add(funny)
db.session.add(info)
db.session.add(tech)

# Write it
db.session.commit()
