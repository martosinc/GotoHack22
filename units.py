import json

__all__ = ['Piece', 'Board', 'Player', 'Room']


class Room:
    def __init__(self, first_player, second_player):
        self.board = Board(None)
        self.first_player = first_player
        self.second_player = second_player

        self.wait_player = True


class Board:
    def __init__(self, json_str):
        self.matrix = [[]]

        if json_str is not None:
            self.update(json_str)
        else:
            self.matrix = [[-1 for _ in range(8)] for _ in range(8)]

    def update(self, json_str):
        parse_json = json.loads(json_str)
        self.matrix = [list(map(Piece.__init__, x) for x in parse_json['board'])]


class Piece:
    def __init__(self, type_id: int):
        self.type_id = type_id


class Player:
    def __init__(self, id: int):
        self.id = id
