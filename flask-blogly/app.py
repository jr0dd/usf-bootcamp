"""Blogly application."""

from flask import Flask, redirect, request, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, User, Post

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


@app.errorhandler(404)
def page_404(e):
    """Error 404 page"""

    return render_template('404.html'), 404


@app.route('/')
def root():
    """Home page"""

    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()

    return render_template('index.html', posts=posts)


@app.route('/users')
def user_list():
    """List users"""

    users = User.query.order_by(User.last_name, User.first_name).all()

    return render_template('users/index.html', users=users)


@app.route('/users/new')
def create_user_form():
    """Form page to add a new user"""

    return render_template('users/create.html')


@app.route('/users/new', methods=['POST'])
def user_create():
    """Add a new user"""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url'] or None

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)

    db.session.add(user)
    db.session.commit()
    flash(f'{user.full_name} successfully created.')

    return redirect('/users')


@app.route('/users/<int:user_id>')
def user_details(user_id):
    """Display user details"""

    user = User.query.get_or_404(user_id)

    return render_template('users/details.html', user=user)


@app.route('/users/<int:user_id>/edit')
def user_edit_form(user_id):
    """Form page to edit user details"""

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
    flash(f'{user.full_name} has been updated.')

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=['POST'])
def user_delete(user_id):
    """Delete a user"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash(f'{user.full_name} has been deleted.')

    return redirect('/users')


@app.route('/users/<int:user_id>/posts/new')
def post_create_form(user_id):
    """Create post form"""

    user = User.query.get_or_404(user_id)

    return render_template('posts/create.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods={'POST'})
def post_create(user_id):
    """Create a post"""

    title = request.form['title']
    content = request.form['content']

    post = Post(title=title, content=content, user_id=user_id)

    db.session.add(post)
    db.session.commit()
    flash(f'{post.title} successfully created.')

    return redirect(f'/users/{user_id}')


@app.route('/posts/<int:post_id>')
def post_details(post_id):
    """Display post details"""

    post = Post.query.get_or_404(post_id)

    return render_template('posts/details.html', post=post)


@app.route('/posts/<int:post_id>/edit')
def post_edit_form(post_id):
    """Form page to edit post details"""

    post = Post.query.get_or_404(post_id)

    return render_template('posts/edit.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def post_edit(post_id):
    """Edit post info"""

    post = Post.query.get_or_404(post_id)

    post.title = request.form['title']
    post.content = request.form['content']

    db.session.add(post)
    db.session.commit()
    flash(f'{post.title} has been updated.')

    return redirect(f'/users/{post.user_id}')


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def post_delete(post_id):
    """Delete a post"""

    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()
    flash(f'{post.title} has been deleted.')

    return redirect(f'/users/{post.user_id}')
