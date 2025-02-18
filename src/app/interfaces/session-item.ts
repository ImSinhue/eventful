import { EventItem } from "./event-item";
import { RoomItem } from "./room-item";
import { SeatItem } from "./seat-item";

export interface SessionItem {
    id: number;
    date: Date;
    seats: SeatItem[];
    room: RoomItem;
    event: EventItem; // Podría ser opcional o id del evento para evitar referencias circulares
}
