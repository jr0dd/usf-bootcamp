"""Seed file to make sample data for Pets db."""

from models import db, connect_db, Pet
from app import app

connect_db(app)

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
Pet.query.delete()

# Add Pets
buster = Pet(name='Buster',
             species='black labrador',
             photo_url='https://i.ytimg.com/vi/N1XJ3kgVy2Y/maxresdefault.jpg',
             age=1,
             available=True)
luna = Pet(name='Luna',
           species='bengal',
           photo_url='http://media1.popsugar-assets.com/files/2012/08/33/1/192/1922243/4a44a1a02cf957e6_bengal_cats_main.xxxlarge/i/Pictures-Bengal-Cats.jpg',
           available=True,
           age=2,
           notes='eats a lot')
chester = Pet(name='Chester',
              species='somali',
              notes='not sure of age')

db.session.add(buster)
db.session.add(luna)
db.session.add(chester)

# Write it
db.session.commit()
