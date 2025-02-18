import { EventItem } from "./event-item";
import { RoomItem } from "./room-item";

export interface CompanyItem {
    id: number,
    name: string,
    email: string,
    password: string,
    city: string,
    rooms: RoomItem[],
    events: EventItem[]
}
