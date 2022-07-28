"""Feedback application."""

from flask import Flask, redirect, request, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
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


# root
@app.route('/')
def root():
    """Render root page and if logged in redirect to user profile"""

    try:
        session['username']
    except:
        return render_template('index.html')
    
    user = session['username']
    return redirect(f'/users/{user}')


# users
@app.route('/register', methods=['GET', 'POST'])
def register_user_form():
    """Form page to add a new user"""

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data

        user = User.register(username, password, first_name, last_name, email)
        db.session.add(user)

        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Please pick another')
            return render_template('users/register.html', form=form)

        session['username'] = user.username
        flash('Your account has successfully been created.')
        return redirect(f'/users/{user.username}')

    return render_template('users/register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_form():
    """Form page for users to login"""

    form = LoginForm()

    if form.validate_on_submit():
        name = form.username.data
        password = form.password.data
        user = User.authenticate(name, password)

        if user:
            session['username'] = user.username
            flash(f'Welcome back {user.username}!')
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Incorrect username/password']

    return render_template('users/login.html', form=form)


@app.route('/logout')
def user_logout():
    """User logout"""

    session.pop('username')
    flash('You have successfully logged out!')

    return redirect('/')


@app.route('/users/<username>', methods=['GET'])
def user_details(username):
    """Show user details"""

    user = User.query.get_or_404(username)

    if 'username' not in session:
        flash('Please login first!')
        return redirect('/login')

    return render_template('users/details.html', user=user)


@app.route('/users/<username>/delete', methods=['POST'])
def user_delete(username):
    """Delete a user"""

    if 'username' not in session:
        flash('Please login first!')
        return redirect('/login')

    user = User.query.get_or_404(username)
    if user.username == session['username']:
        db.session.delete(user)
        flash('Your account has successfully been deleted!')
        db.session.commit()
        return redirect('/')


# feedback
@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def feedback_create(username):
    """Create feedback form"""

    if 'username' not in session:
        flash('Please login first!')
        return redirect('/')

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        feedback = Feedback(title=title, content=content, username=username)

    if feedback.username == session['username']:
        db.session.add(feedback)
        db.session.commit()
        flash('Feedback added!')
        return redirect(f'/users/{feedback.username}')

    return render_template('feedack/create.html', form=form)


@app.route('/feedback/<int:id>/update', methods=['GET', 'POST'])
def feedback_update(id):
    """Form page to update feedback details"""

    if 'username' not in session:
        flash('Please login first!')
        return redirect('/')

    feedback = Feedback.query.get_or_404(id)
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

    if feedback.username == session['username']:
        db.session.add(feedback)
        db.session.commit()
        flash('Feedback updated!')
        return redirect(f'/users/{feedback.username}')

    return render_template('feedack/edit.html', form=form)


@app.route('/feedback/<int:id>/delete', methods=['POST'])
def feedback_delete(id):
    """Delete a feedback"""

    if 'username' not in session:
        flash('Please login first!')
        return redirect('/login')

    feedback = Feedback.query.get_or_404(id)
    if feedback.username == session['username']:
        db.session.delete(feedback)
        db.session.commit()
        flash('Feedback deleted!')
        return redirect(f'/users/{feedback.username}')

    flash('You don\'t have permission to do that!')
    return redirect(f'/users/{feedback.username}')
