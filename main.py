from flask import Flask, request, render_template


app = Flask(__name__)

app.config['SECRET_KEY'] = ''

app.threaded = True

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_room', methods=['post'])
def create_room():
    if request.method == "POST":
        pass

@app.route('/motion', methods=['get', 'put'])
def motion():
    if request.method == 'PUT':
        print(request.json)

    return 'Ok'


app.run(debug=True)
