from click import prompt
from flask import Flask, request, render_template
from stories import story

app = Flask(__name__)

@app.route('/')
def questions():
    """Create form for questions"""

    inputs = story.prompts
    return render_template('form.html', inputs=inputs)


@app.route('/story')
def show_story():
    """Display rendered story"""

    body = story.generate(request.args)

    return render_template('story.html', body=body)
