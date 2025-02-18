import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importaciones adicionales
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de rutas

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventListComponent } from './event-list/event-list.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { TicketPurchaseComponent } from './ticket-purchase/ticket-purchase.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PaymentComponent } from './payment/payment.component'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventItemComponent,
    EventDetailsComponent,
    TicketPurchaseComponent,
    NotfoundComponent,
    PaymentComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,         // AÑADIDO
    HttpClientModule,
    RouterModule,
    BrowserModule    // AÑADIDO
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
