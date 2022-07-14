"""Seed file to make sample data for users db."""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add users
jim = User(first_name='Jim', last_name='Jones', image_url='https://lightforcenetwork.com/sites/default/files/alien-5631238_1280%20(2).jpg')
billy = User(first_name='Billy', last_name='Bob', image_url='https://cdn.images.express.co.uk/img/dynamic/151/590x/secondary/alien-962725.jpg')
testy = User(first_name='Testy', last_name='Tester')


db.session.add(jim)
db.session.add(billy)
db.session.add(testy)

db.session.commit()
