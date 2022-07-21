from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, URLField, SelectField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, Length

species = ['cat', 'dog', 'porcupine']


class AddPetForm(FlaskForm):
    """Form for adding a pet"""

    name = StringField('Pet name', validators=[InputRequired()])
    species = SelectField('Species', choices=[(sp, sp.upper()) for sp in species])
    photo_url = URLField('Image URL', validators=[Optional(), URL()])
    age = IntegerField('Age', validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField('Comments', validators=[Optional(), Length(min=0, max=500)])


class EditPetForm(FlaskForm):
    """Form for editing a pet"""

    photo_url = StringField('Image URL', validators=[Optional(), URL()])
    notes = TextAreaField('Comments', validators=[Optional(), Length(min=0, max=500)])
    available = BooleanField('Available?')
