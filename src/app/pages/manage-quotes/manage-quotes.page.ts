import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Servicio de citas + modelo (OJO: en tu estructura es quotes.ts)
import { Quote, QuotesService } from '../../services/quotes';

// Componentes standalone reutilizables
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';

/**
 * Página "Gestionar citas"
 *
 * Requisitos cubiertos:
 * - Listar citas existentes
 * - Agregar una cita nueva (con validaciones en QuoteFormComponent)
 * - Eliminar citas existentes
 *
 * Actividad 3 (Web):
 * - QuotesService ahora persiste en IndexedDB (localForage), por eso:
 *   - add(...) es async
 *   - remove(...) es async
 *
 * Nota:
 * - La carga inicial de datos persistidos se realiza en AppComponent (quotes.init()).
 */
@Component({
  selector: 'app-manage-quotes',
  standalone: true, // Standalone: no requiere NgModule
  imports: [
    CommonModule,    // *ngFor, *ngIf
    IonicModule,     // componentes Ionic (ion-header, ion-card, etc.)
    QuoteCardComponent,
    QuoteFormComponent
  ],
  templateUrl: './manage-quotes.page.html',
})
export class ManageQuotesPage {
  /**
   * Lista de citas mostrada en pantalla.
   * Se mantiene sincronizada con el servicio luego de cada operación.
   */
  quotes: Quote[] = [];

  constructor(private quotesService: QuotesService) {}

  /**
   * Hook de ciclo de vida de Ionic.
   * Se ejecuta cada vez que se entra a la vista.
   *
   * Como la inicialización (carga desde IndexedDB) ya se hizo en AppComponent.init(),
   * aquí solo tomamos el estado actual desde el servicio.
   */
  ionViewWillEnter(): void {
    this.refreshList();
  }

  /**
   * Recibe el evento del formulario (QuoteFormComponent)
   * cuando los datos ya pasaron validación.
   *
   * Como add(...) persiste, es async.
   */
  async addQuote(data: { frase: string; autor: string }): Promise<void> {
    await this.quotesService.add(data.frase, data.autor);
    this.refreshList();
  }

  /**
   * Recibe el id desde QuoteCardComponent y elimina la cita.
   *
   * Como remove(...) persiste, es async.
   */
  async removeQuote(id: number): Promise<void> {
    await this.quotesService.remove(id);
    this.refreshList();
  }

  /**
   * Método auxiliar para refrescar la lista desde el servicio.
   * Centraliza la actualización de la UI (mejor mantenibilidad).
   */
  private refreshList(): void {
    this.quotes = this.quotesService.getAll();
  }
}
