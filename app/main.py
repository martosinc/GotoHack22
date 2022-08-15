from flask import Flask, request, render_template, redirect

from rooms_manager import RoomsManager

app = Flask(__name__)

app.config['SECRET_KEY'] = ''

app.threaded = True

manager = RoomsManager()

@app.route('/')
def index():
    return render_template('index.html')


# @app.route('/create_room', methods=['post'])
# def create_room():
#     return redirect(f"/room/{manager.create()}")


# @app.route('/join_room/<room_id>', methods=['post'])
# def join_room(room_id: int):
#     if type(room_id) != int:
#         return redirect('/')

#     manager.join(room_id)

#     return redirect(f"/room/{room_id}")


# @app.route('/exit_room', methods=['post'])
# def exit_room():
#     pass


# @app.route('/room/<room_id>')
# def room(room_id):
#     return render_template('room.html')


@app.route('/update', methods=['put'])
def update():
    if request.method == 'PUT':
        data = request.json
        manager.update(data['room_id'], data['board'])
        return data['board']

@app.route('/fetch', methods=['put'])
def fetch():
    data = request.json
    # print(manager.get_board(data['room_id']))
    return {'response':manager.get_board(data['room_id'])}

@app.route('/loadroom', methods=['put'])
def loadroom():
    data = request.json
    board = manager.get_board(data['room_id'])
    if board == -1:
        manager.create()
        manager.update(data['room_id'], data['board'])
        return {'response':-1}
    return {'response':0}

app.run(debug=True)