"""Seed file to make sample data for users db."""

from models import db, connect_db, User, Feedback
from app import app

connect_db(app)

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()
Feedback.query.delete()

# Add users
jim = User.register(username='jim_jones',
                    password='1234567',
                    first_name='Jim',
                    last_name='Jones',
                    email='jimjones@netscape.com')
billy = User.register(username='billybob',
                      password='abcdefg',
                      first_name='Billy',
                      last_name='Bob',
                      email='billybob@compuserv.com')
testy = User.register(username='testy69',
                      password='AKMNDJK732734k',
                      first_name='Testy',
                      last_name='Tester',
                      email='testytester@aol.com')

db.session.add(jim)
db.session.add(billy)
db.session.add(testy)

# Add feedback
jim_feedback = Feedback(title='Horrible service', content='blah blah blah', username='jim_jones')
billy_feedback = Feedback(title='Rude', content='he called me a nerd', username='billybob')
testy_feedback = Feedback(title='Excellent! A++', content='would definitely do business again', username='testy69')

db.session.add(jim_feedback)
db.session.add(billy_feedback)
db.session.add(testy_feedback)

# Write it
db.session.commit()
