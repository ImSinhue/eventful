import { RegionItem } from "./region-item";
import { SessionItem } from "./session-item";
import { TicketItem } from "./ticket-item";

// Definir tipos simplificados
export interface MinimalSession {
    id: number;
  }
  
  export interface MinimalRegion {
    id: number;
  }
  
  // Actualizar SeatItem para usar los tipos simplificados
  export interface SeatItem {
    id: number;
    price: number;
    seatNum: number;
    ticket: TicketItem;
    session: MinimalSession;
    region: MinimalRegion;
    seatNumber: number;
    hasTicket: boolean;
  }
  