import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { SeatItem, MinimalSession, MinimalRegion } from '../interfaces/seat-item';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedSeats: SeatItem[] = [];
  totalAmount: number = 0;
  user: number = 2;  // Puedes poner el ID del usuario aquí temporalmente

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('QueryParams:', params);

      if (params['seats']) {
        this.selectedSeats = JSON.parse(params['seats']);
        console.log('Selected seats loaded:', this.selectedSeats);

        // Verificar que cada asiento tenga sesión y región
        this.selectedSeats.forEach(seat => {
          console.log('Seat:', seat);
          console.log('Session:', seat.session);
          console.log('Region:', seat.region);
        });
      }
      if (params['total']) {
        this.totalAmount = +params['total'];
        console.log('Total amount loaded:', this.totalAmount);
      }
    });
  }

  confirmPayment() {
    const purchaseDate = new Date().toISOString();
    console.log('Purchase Date:', purchaseDate);

    const seatData = this.selectedSeats.map(seat => ({
      seatNum: seat.seatNum,
      price: seat.price,
      session: seat.session,
      region: seat.region
    }));
    console.log('Seat Data:', seatData);
    
    const ticketData = {
      purchaseDate,
      totalPrice: this.totalAmount,
      user: this.user,
      seats: seatData
    };
    console.log('Ticket Data to be sent:', ticketData);

    this.eventService.buyTickets(ticketData).subscribe(
      response => {
        console.log('Response from buyTickets:', response);
        alert('Pago confirmado. Gracias por tu compra.');
        this.router.navigate(['/']); // Redirige al inicio después de completar todas las compras
        this.selectedSeats = []; // Limpia el buffer
      },
      error => {
        console.error('Error al realizar las compras:', error);
        alert('Ocurrió un error al procesar algunas compras. Por favor, intenta nuevamente.');
      }
    );
  }

  cancelPayment() {
    alert('Pago cancelado.');
    this.router.navigate(['/']); // Redirige al inicio si se cancela el pago
  }
}
