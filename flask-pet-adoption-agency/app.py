"""Blogly application."""

from flask import Flask, redirect, render_template, flash, url_for
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoptions'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = '0123456'
app.debug = True
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


# handle errors
@app.errorhandler(404)
def page_404(e):
    """Error 404 page"""

    return render_template('404.html'), 404


# home
@app.route('/')
def root():
    """Home page"""

    pets = Pet.query.all()

    return render_template('index.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def pet_create():
    """Form page to add a new pet"""

    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data or None
        age = form.age.data
        notes = form.notes.data

        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)

        db.session.add(pet)
        db.session.commit()
        flash(f'Added new {species} {name}')
        return redirect('/')
    else:
        return render_template('pets/create.html', form=form)


@app.route('/pets/<int:pet_id>', methods=['GET', 'POST'])
def pet_edit(pet_id):
    """Show pet details and handle edit form"""

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        flash(f'{pet.name} has been updated!')
        return redirect('/')
    else:
        return render_template('pets/edit_details.html', form=form, pet=pet)
