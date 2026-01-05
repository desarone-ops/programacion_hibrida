import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Quote } from '../../services/quotes';

/**
 * Componente reutilizable para mostrar una cita en una tarjeta.
 *
 * Comunicación:
 * - @Input quote: recibe datos del padre
 * - @Input showDelete: controla si aparece el botón eliminar
 * - @Output delete: emite un evento al padre cuando se quiere borrar
 */
@Component({
  selector: 'app-quote-card',
  standalone: true, // Standalone: no requiere NgModule
  imports: [CommonModule, IonicModule], // imports necesarios para *ngIf y componentes Ionic
  templateUrl: './quote-card.component.html',
})
export class QuoteCardComponent {
  /** Cita recibida desde el componente padre */
  @Input() quote!: Quote;

  /** Bandera para decidir si mostrar botón eliminar */
  @Input() showDelete = false;

  /** Evento que emite el id de la cita para que el padre la elimine */
  @Output() delete = new EventEmitter<number>();

  /** Handler del click del botón Eliminar */
  onDelete(): void {
    this.delete.emit(this.quote.id);
  }
}
