import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventItem } from '../interfaces/event-item';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://192.168.215.249:3000/eventful';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los eventos
  getAllEvents(): Observable<EventItem[]> {
    const endpoint = `${this.baseUrl}/event/getallevents`;
    console.log('EventService: getAllEvents called'); 
    return this.http.get<EventItem[]>(endpoint).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un evento por ID
  getEventById(eventId: number): Observable<EventItem> {
    const endpoint = `${this.baseUrl}/event/getevent/${eventId}`;
    return this.http.get<EventItem>(endpoint).pipe(
      catchError(this.handleError)
    );
  }

  // Método que decide si obtener todos los eventos o uno por ID
  getEvents(eventId?: number): Observable<EventItem[] | EventItem> {
    if (eventId) {
      return this.getEventById(eventId);
    } else {
      return this.getAllEvents();
    }
  }

  // Método para comprar tickets
  buyTickets(ticketData: any): Observable<any> {
    const endpoint = `${this.baseUrl}/ticket/buyticket`;
    return this.http.post<any>(endpoint, ticketData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error al procesar la compra.';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error('Error al procesar la compra:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
