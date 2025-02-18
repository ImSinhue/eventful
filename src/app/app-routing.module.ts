import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {PaymentComponent} from './payment/payment.component'


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirección a /home (ruta por defecto)
  { path: 'home', component: EventListComponent }, // Redirección a /home (ruta por defecto)
  { path: 'details/:id', component: EventDetailsComponent }, // Redirección a /home (ruta por defecto)
  { path: 'payment', component: PaymentComponent }, // Redirección a /home (ruta por defecto)
  { path: '**', component: NotfoundComponent }, // Redirección a /home (ruta por defecto)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa y configura las rutas principales
  exports: [RouterModule] // Exporta RouterModule para que esté disponible en otros módulos
})
export class AppRoutingModule { }