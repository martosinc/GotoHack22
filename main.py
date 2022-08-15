from flask import Flask, request, render_template, redirect

from rooms_manager import RoomsManager

app = Flask(__name__)

app.config['SECRET_KEY'] = ''

app.threaded = True

manager = RoomsManager()


@app.route('/', methods=['get', 'post'])
def index():
    return render_template('index.html')


@app.route('/create_room')
def create_room():
    return redirect(f"/room/{manager.create()}")


@app.route('/join_room/<room_id>', methods=['post'])
def join_room(room_id: int):
    if type(room_id) != int and not manager.get_room(room_id).wait_player:
        return redirect('/')

    manager.join(room_id)

    return redirect(f"/room/{room_id}")


@app.route('/exit_room', methods=['post'])
def exit_room():
    pass


@app.route('/room/<room_id>')
def room(room_id):
    return render_template('room.html')


@app.route('/update', methods=['put'])
def update():
    if request.method == 'PUT':
        manager.update(request.json['room_id'], request.json['board'])


@app.route('/fetch', methods=['put'])
def fetch():
    if request.method == 'PUT':
        return manager.get_board(request.json['room_id'])


app.run(debug=True)
