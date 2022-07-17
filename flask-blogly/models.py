"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
import datetime as dt

db = SQLAlchemy()


def connect_db(app):
    """Connect to db"""

    db.app = app
    db.init_app(app)


stock_image = 'https://vectorified.com/images/unknown-avatar-icon-7.jpg'


class User(db.Model):
    """Users"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    image_url = db.Column(db.String, nullable=False, default=stock_image)
    posts = db.relationship('Post', backref='users', cascade='all, delete-orphan')

    @property
    def full_name(self):
        """Get full name of user"""

        return f'{self.first_name} {self.last_name}'


class Post(db.Model):
    """Posts"""

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    @property
    def humanize_date(self):
        """Formatted date"""

        return self.created_at.strftime('%a %b %-d  %Y, %-I:%M %p')


class Tag(db.Model):
    """Tags"""

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    posts = db.relationship('Post', secondary='post_tags', backref='tags')


class PostTag(db.Model):
    """Post Tags"""

    __tablename__ = 'post_tags'

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'), nullable=False, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id', ondelete='CASCADE'), nullable=False, primary_key=True)
