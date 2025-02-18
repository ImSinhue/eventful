import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  filterSearch: string = '';
  categorySearch: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        console.log('Eventos obtenidos:', data);
        this.events = data;
        this.filteredEvents = data; // Inicialmente muestra todos los eventos
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
      }
    });
  }

  applyFilter() {
    this.filteredEvents = this.events.filter(event => {
      return (
        (this.filterSearch ? event.name.toLowerCase().includes(this.filterSearch.toLowerCase()) : true) &&
        (this.categorySearch ? event.category === this.categorySearch : true)
      );
    });
  }
}
