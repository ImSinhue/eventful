import { TicketItem } from "./ticket-item";

export interface UserItem {
    id: number,
    dni: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    birthdate: Date,
    tickets: TicketItem[]
}
