"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to db"""

    db.app = app
    db.init_app(app)


stock_image = 'https://vectorified.com/images/unknown-avatar-icon-7.jpg'


class User(db.Model):
    """Users"""

    __tablename__ = 'users'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    image_url = db.Column(db.String,
                          nullable=False,
                          default=stock_image)

    @property
    def full_name(self):
        """Get full name of user"""

        return f'{self.first_name} {self.last_name}'

    def __repr__(self):
        u = self
        return f'<User id={u.id} first_name={u.first_name} last_name={u.last_name} image_url={u.image_url}>'
