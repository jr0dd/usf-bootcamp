from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = '0123456'
app.debug = True

# debug = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route('/')
def board():
    """Create board page"""

    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get("highscore", 0)
    plays = session.get("plays", 0)

    return render_template('index.html', board=board, highscore=highscore, plays=plays)


@app.route('/check', methods=['POST'])
def check():
    """Check if word is in dictionary list"""

    word = request.json['word']
    board = session['board']
    result = boggle_game.check_valid_word(board, word)

    return jsonify(result=result)


@app.route('/score', methods=['POST'])
def score():
    """Collect and process scores and user number of plays"""

    score = request.json['score']
    highscore = session.get('highscore', 0)
    plays = session.get('plays', 0)

    session['plays'] = plays + 1

    if score > highscore:
        session['highscore'] = score
        return jsonify(newHigh=score)
    else:
        return jsonify(msg='keep trying')
