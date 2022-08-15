from units import *

__all__ = ['RoomsManager']


class RoomsManager:
    def __init__(self):
        self.rooms = []

    def create(self) -> int:
        self.rooms.append(Room())

        return len(self.rooms) - 1

    def join(self, room_id: int) -> int:
        try:
            self.rooms[room_id].wait_player = False

            return 0
        except IndexError:
            return 1

    def exit(self, room_id: int) -> None:
        try:
            self.rooms.pop(room_id)
        except IndexError:
            pass

    def update(self, room_id: int, new_board):
        self.rooms[room_id].board = new_board

    def get_board(self, room_id: int):
        try:
            return self.rooms[room_id].board
        except IndexError:
            return None
