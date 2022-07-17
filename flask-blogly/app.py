"""Blogly application."""

from flask import Flask, redirect, request, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from psycopg2 import DatabaseError
from models import db, connect_db, User, Post, Tag

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


# handle errors
@app.errorhandler(404)
def page_404(e):
    """Error 404 page"""

    return render_template('404.html'), 404


# home
@app.route('/')
def root():
    """Home page"""

    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()

    return render_template('index.html', posts=posts)


# users
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


# posts
@app.route('/users/<int:user_id>/posts/new')
def post_create_form(user_id):
    """Create post form"""

    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()

    return render_template('posts/create.html', user=user, tags=tags)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def post_create(user_id):
    """Create a post"""

    title = request.form['title']
    content = request.form['content']
    tag_ids = [int(tag) for tag in request.form.getlist('tags')]

    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    post = Post(title=title, content=content, user_id=user_id, tags=tags)

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
    tags = Tag.query.all()

    return render_template('posts/edit.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def post_edit(post_id):
    """Edit post info"""

    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']

    tag_ids = [int(tag) for tag in request.form.getlist('tags')]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

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


# tags
@app.route('/tags')
def tag_list():
    """List tags"""

    tags = Tag.query.all()

    return render_template('tags/index.html', tags=tags)


@app.route('/tags/new')
def tag_create_form():
    """Form to add a new tag"""

    return render_template('tags/create.html')


@app.route('/tags/new', methods=['POST'])
def tag_create():
    """Create a tag"""

    tag = Tag(name=request.form['name'])

    try:
        db.session.add(tag)
        db.session.commit()
    except:
        flash(f'{tag.name} already exists.')
        db.session.rollback()
        return render_template('tags/create.html', tag=tag)
    else:
        db.session.add(tag)
        db.session.commit()
        flash(f'{tag.name} successfully created.')
        return redirect('/tags')


@app.route('/tags/<int:tag_id>')
def tag_details(tag_id):
    """Tag details"""

    tag = Tag.query.get_or_404(tag_id)

    return render_template('tags/details.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit')
def tag_edit_form(tag_id):
    """Form page to edit a tag"""

    tag = Tag.query.get_or_404(tag_id)

    return render_template('tags/edit.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def tag_edit(tag_id):
    """Edit a tag"""

    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']

    db.session.add(tag)
    db.session.commit()
    flash(f'{tag.name} successfully updated.')
    return redirect('/tags')


@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def tag_delete(tag_id):
    """Delete a tag"""

    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()
    flash(f'{tag.name} has been deleted.')

    return redirect('/tags')
