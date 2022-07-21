"""Models for Pet adoptions."""

from email.policy import default
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to db"""

    db.app = app
    db.init_app(app)


stock_photo = 'https://animalclinic.org/wp-content/uploads/2019/05/paw-placeholder.png'


class Pet(db.Model):
    """Pets"""

    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, nullable=False, default=stock_photo)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String(500), nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)
