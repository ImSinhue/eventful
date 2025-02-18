import { SeatItem } from "./seat-item";
import { UserItem } from "./user-item";

export interface TicketItem {
    id: number,
    purchaseDate: Date,
    totalPrice: number,
    user: UserItem,
    seats: SeatItem[]
}
