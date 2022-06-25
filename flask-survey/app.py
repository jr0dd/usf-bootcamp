from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = '0123456'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True

debug = DebugToolbarExtension(app)

responses = []

@app.route('/')
def root():
    """Create start page"""

    title = survey.title
    instructions = survey.instructions

    return render_template('start.html', title=title, instructions=instructions)


@app.route('/start', methods=['POST'])
def start():
    """Actually start the survey."""

    return redirect('/questions/0')


@app.route('/questions/<int:q_id>')
def questions(q_id):
    """Create questions pages"""

    res = len(responses)

    if res == 0 and q_id != 0:
        return redirect('/')

    if res == len(survey.questions) and res > 0:
        return redirect('/thanks')

    if q_id != res:
        flash(f'Invalid question: {q_id}.')
        return redirect(f'/questions/{res}')

    question = survey.questions[q_id]
    choices = question.choices

    return render_template('questions.html', question=question.question, choices=choices, id=q_id)


@app.route('/answer', methods=['POST'])
def answers():
    """Create answer route"""

    choice = request.form['answer']
    responses.append(choice)

    if len(survey.questions) == len(responses):
        return redirect('/thanks')
    else:
        return redirect(f'/questions/{len(responses)}')


@app.route('/thanks')
def thanks():
    """Thank user for participating."""

    return render_template('thanks.html')