from flask import Flask, request, render_template, redirect

from rooms_manager import RoomsManager

app = Flask(__name__)

app.config['SECRET_KEY'] = ''

app.threaded = True

manager = RoomsManager()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_room')
def create_room():
    return redirect(f"/room/{manager.create()}")


@app.route('/join_room/<room_id>')
def join_room(room_id: int):
    try:
        room_id = int(room_id)
    except TypeError:
        return

    manager.join(room_id)

    return redirect(f"/room/{room_id}")


@app.route('/exit_room', methods=['post'])
def exit_room():
    manager.exit(request.json['room_id'])


@app.route('/room/<room_id>')
def room(room_id):
    return render_template('room.html')


@app.route('/rooms')
def rooms():
    return render_template('rooms.html', rooms=manager.get_rooms_ids())


@app.route('/update', methods=['put'])
def update():
    manager.update(request.json['room_id'], request.json['board'])
    return {'response': 0}

@app.route('/load', methods=['put'])
def load():
    board = manager.get_board(request.json['room_id'])
    if board == {}:
        manager.update(request.json['room_id'], request.json['board'])

    return {'response': 0}

@app.route('/fetch', methods=['put'])
def fetch():
    data = request.json

    board = manager.get_board(data['room_id'])

    return {'response': board}


app.run(debug=True)
