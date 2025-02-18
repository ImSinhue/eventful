import { RoomItem } from "./room-item";
import { SeatItem } from "./seat-item";

export interface RegionItem {
    id: number,
    name: string,
    capacity: number,
    seats: SeatItem[],
    room: RoomItem
}
