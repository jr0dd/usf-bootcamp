"""Calculator application."""
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def addition():
    """Return numbers added"""

    a = int(request.args["a"])
    b = int(request.args["b"])
    
    return str(add(a,b))

@app.route('/sub')
def subtract():
    """Return numbers subtracted"""

    a = int(request.args["a"])
    b = int(request.args["b"])

    return str(sub(a,b))

@app.route('/mult')
def multiply():
    """Return numbers multiplied"""

    a = int(request.args["a"])
    b = int(request.args["b"])

    return str(mult(a,b))

@app.route('/div')
def divide():
    """Return numbers divided"""

    a = int(request.args["a"])
    b = int(request.args["b"])
    
    return str(div(a,b))


calculators = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div
}

@app.route("/math/<op>")
def do_math(op):
    """Perform math calculations"""

    a = int(request.args["a"])
    b = int(request.args["b"])

    return str(calculators[op](a, b))
