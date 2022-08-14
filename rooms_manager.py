from units import *


__all__ = ['RoomsManager']

class RoomsManager:
    def __init__(self):
        self.rooms = []

    def create(self) -> int:
        user_id = self.rooms[-1].second_player.id + 1 if len(self.rooms) else 0

        self.rooms.append(Room(Player(user_id), None))

        return len(self.rooms) - 1

    def join(self, room_id: int) -> int:
        try:
            user_id = self.rooms[-1].first_player.id + 1
            self.rooms[room_id].second_player = Player(user_id)

            self.rooms[room_id].wait_player = False

            return 0
        except IndexError:
            return 1

    def get(self, index: int):
        try:
            return self.rooms[index]
        except IndexError:
            return None

    def get_user(self, room_id: int, second: bool):
        pass