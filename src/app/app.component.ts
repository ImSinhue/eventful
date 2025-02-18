import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  selectedSeats: { seatNum: string, price: number }[] = [];

  constructor(private router: Router) {}

  buyTickets(): void {
    if (this.selectedSeats.length === 0) {
      alert('Por favor, selecciona al menos un asiento.');
      return;
    }

    let summary = this.selectedSeats.map(seat => `Asiento ${seat.seatNum}: ${seat.price}€`).join("\n");
    alert(`Compra realizada con éxito. \n\n${summary}\n\nTotal: ${this.getTotalPrice()}€`);
    
    // No navegues manualmente aquí
    this.selectedSeats = []; // Vacía la selección después de comprar
  }

  getTotalPrice(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }
}
