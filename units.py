__all__ = ['Piece', 'Board', 'Room']


class Room:
    def __init__(self):
        self.board = Board(None)

        self.wait_player = True


class Board:
    def __init__(self, json_str):
        self.json = json_str


class Piece:
    def __init__(self, type_id: int):
        self.type_id = type_id
