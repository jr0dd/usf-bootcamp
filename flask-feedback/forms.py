from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired


class RegisterForm(FlaskForm):
    """Form for registering a user"""

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    first_name = StringField('First Name', validators=[InputRequired()])
    last_name = StringField('Last Name', validators=[InputRequired()])
    email = StringField('Email', validators=[InputRequired()])

class LoginForm(FlaskForm):
    """Form for logging in a user"""

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

class FeedbackForm(FlaskForm):
    """Form for creating a feedback"""

    title = StringField('Title', validators=[InputRequired()])
    content = StringField('Content', validators=[InputRequired()])
