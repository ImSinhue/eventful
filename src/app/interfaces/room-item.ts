import { CompanyItem } from "./company-item";
import { RegionItem } from "./region-item";
import { SessionItem } from "./session-item";

export interface RoomItem {
    id: number;
    name: string;
    regions: RegionItem[];
    sessions: SessionItem[];
    company: CompanyItem;
}
