import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventItem } from '../interfaces/event-item';
import { RoomItem } from '../interfaces/room-item';
import { SessionItem } from '../interfaces/session-item';
import { MinimalRegion, MinimalSession, SeatItem } from '../interfaces/seat-item';
import { RegionItem } from '../interfaces/region-item'; // Importa RegionItem

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit {
  event: EventItem | undefined;
  rooms: { room: RoomItem; sessions: SessionItem[] }[] = [];
  selectedRoom: RoomItem | undefined;
  selectedSession: SessionItem | undefined;
  selectedSeats: SeatItem[] = [];
  seatsLayout: SeatItem[][] = [];
  seatsPerRow: number = 7; // Number of seats per row

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(Number(eventId)).subscribe(
        (event) => {
          this.event = event;
          this.organizeRoomsAndSessions();
        },
        (error) => {
          console.error('Error loading event details:', error);
        }
      );
    }
  }

  organizeRoomsAndSessions(): void {
    if (this.event && this.event.sessions) {
      const roomMap = new Map<number, { room: RoomItem; sessions: SessionItem[] }>();
      this.event.sessions.forEach((session) => {
        const room = session.room;
        if (!roomMap.has(room.id)) {
          roomMap.set(room.id, { room: room, sessions: [] });
        }
        roomMap.get(room.id)?.sessions.push(session);
      });
      this.rooms = Array.from(roomMap.values());
    }
  }

  selectRoom(room: RoomItem): void {
    this.selectedRoom = room;
    this.selectedSession = undefined;
    this.selectedSeats = [];
    this.seatsLayout = [];
  }

  selectSession(session: SessionItem): void {
    this.selectedSession = session;
    this.selectedSeats = [];
    this.generateSeatsLayout();
  }

  getSessionList(roomId: number | undefined): SessionItem[] {
    return this.rooms.find((roomDetail) => roomDetail.room.id === roomId)?.sessions || [];
  }

  generateSeatsLayout(): void {
    if (this.selectedSession) {
      const seats: SeatItem[] = [];
      this.selectedSession.room.regions.forEach(region => {
        seats.push(...region.seats);
      });
      seats.sort((a, b) => a.seatNum - b.seatNum);

      const rows: SeatItem[][] = [];
      let row: SeatItem[] = [];

      seats.forEach((seat, index) => {
        row.push(seat);
        if ((index + 1) % this.seatsPerRow === 0) {
          rows.push(row);
          row = [];
        }
      });

      if (row.length > 0) {
        rows.push(row);
      }

      this.seatsLayout = rows;
    }
  }

  selectSeat(seat: SeatItem): void {
    if (seat.hasTicket) {
      return; // Seat is unavailable
    }
    const index = this.selectedSeats.findIndex((s) => s.id === seat.id);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      // Asignar sesión y región al asiento seleccionado
      const minimalSession: MinimalSession = { id: this.selectedSession!.id };
      const region = this.selectedSession?.room.regions.find(r => r.seats.some(s => s.id === seat.id));
      const minimalRegion: MinimalRegion = { id: region!.id };
  
      const cleanedSeat: SeatItem = {
        ...seat,
        session: minimalSession,
        region: minimalRegion,
        seatNumber: seat.seatNumber,
        hasTicket: seat.hasTicket,
        ticket: seat.ticket
      };
  
      this.selectedSeats.push(cleanedSeat);
    }
  }
  

  isSeatSelected(seat: SeatItem): boolean {
    return this.selectedSeats.some((s) => s.id === seat.id);
  }

  confirmSelection(): void {
    if (this.selectedSeats.length > 0) {
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify(this.selectedSeats), total: this.getTotalPrice() } });
    } else {
      alert('Por favor, selecciona al menos un asiento.');
    }
  }

  getTotalPrice(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }
}
