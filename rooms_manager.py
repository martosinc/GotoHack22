from typing import Optional, Any

from units import *

__all__ = ['RoomsManager']


class RoomsManager:
    """
    This is rooms manager
    """

    def __init__(self):
        self.rooms = []

    def create(self) -> int:
        """
        Create new room
        :return: room id (int)
        """
        self.rooms.append(Room())

        return len(self.rooms) - 1

    def join(self, room_id: int) -> int:
        """
        Join to room
        :param room_id: room id for join
        :return: return 0 if success else 1
        """
        try:
            self.rooms[room_id].wait_player = False

            return 0
        except IndexError:
            return 1

    def exit(self, room_id: int) -> None:
        """
        Exit from room
        :param room_id:
        :return: nothing
        """
        try:
            self.rooms.pop(room_id)
        except IndexError:
            pass

    def update(self, room_id: int, new_board) -> None:
        """
        Update room board
        :param room_id: (int)
        :param new_board: (Board)
        :return:
        """
        self.rooms[room_id].board = new_board

    def get_rooms_ids(self) -> list:
        """
        Get room IDs that are wait_player == True
        :return: list of ids
        """
        ids = []

        for i, row in enumerate(self.rooms):
            if row.wait_player:
                ids.append(i)

        return ids

    def get_room(self, room_id: int) -> Room:
        try:
            return self.rooms[room_id]
        except IndexError:
            return None

    def get_board(self, room_id: int):
        """
        Get board from room
        :param room_id: room id (int)
        :return: board (Board)
        """
        try:
            return self.rooms[room_id].board
        except IndexError:
            return None
