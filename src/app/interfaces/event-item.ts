import { CompanyItem } from "./company-item";
import { RoomItem } from "./room-item";
import { SessionItem } from "./session-item";

export interface EventItem {
    id: number;
    name: string;
    description: string;
    language: string;
    category: string;
    targetAudience: string;
    picture: string;
    sessions: SessionItem[];
    rooms?: RoomItem[]; // Corregido a RoomItem[] y opcional
    company: CompanyItem;
}
