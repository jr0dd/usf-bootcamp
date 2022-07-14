"""Blogly application."""

from flask import Flask, redirect, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = '0123456'
app.debug = True
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def root():
    """Root page"""

    return redirect('/users')


@app.route('/users')
def users_list():
    """List users"""

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users/list.html', users=users)


@app.route('/users/new')
def new_user_form():
    """Form page to add a new user"""

    return render_template('users/new.html')


@app.route('/users/new', methods=['POST'])
def user_add():
    """Add a new user"""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url'] or None

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>')
def user_info(user_id):
    """Display user info"""

    user = User.query.get_or_404(user_id)
    return render_template('users/details.html', user=user)


@app.route('/users/<int:user_id>/edit')
def user_edit_form(user_id):
    """Form page to edit user info"""

    user = User.query.get_or_404(user_id)
    return render_template('users/edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def user_edit(user_id):
    """Edit user info"""

    user = User.query.get_or_404(user_id)

    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url'] or None

    db.session.add(user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=['POST'])
def user_delete(user_id):
    """Delete a user"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect('/users')
