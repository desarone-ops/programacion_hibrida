import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

// Servicio de citas (OJO: en tu estructura es quotes.ts)
import { Quote, QuotesService } from '../../services/quotes';

// Servicio de configuración (Preferences en Actividad 3 Web)
import { SettingsService } from '../../services/settings';

// Componente standalone reutilizable
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

/**
 * Página "Inicio"
 *
 * Requisitos cubiertos:
 * - Mostrar una cita aleatoria al entrar
 * - Botón para mostrar otra cita aleatoria
 * - Opción de borrar la cita en Inicio depende de Settings (toggle)
 *
 * Actividad 3 (Web):
 * - SettingsService carga/guarda con Preferences (persistente en navegador)
 * - QuotesService persiste en IndexedDB (localForage)
 *
 * Nota importante:
 * - La carga inicial de datos persistidos se hace en AppComponent.init():
 *   - await settings.load()
 *   - await quotes.init()
 */
@Component({
  selector: 'app-home',
  standalone: true, // Standalone: no se usa NgModule
  imports: [
    CommonModule,        // *ngIf, etc.
    IonicModule,         // componentes Ionic
    RouterLink,          // routerLink en el HTML (botones de navegación)
    QuoteCardComponent,  // componente para mostrar la cita
  ],
  templateUrl: './home.page.html',
})
export class HomePage {
  /**
   * Cita que se muestra actualmente en pantalla.
   * Se inicializa al entrar a la vista.
   */
  quote!: Quote;

  constructor(
    private quotesService: QuotesService,
    public settings: SettingsService // public para usar settings.permitirBorrarEnInicio en el HTML
  ) {}

  /**
   * Hook de Ionic: se ejecuta cada vez que la vista está por entrar.
   * Ideal para refrescar la cita al volver desde Gestionar/Config.
   */
  ionViewWillEnter(): void {
    this.pickRandomQuote();
  }

  /**
   * Evento del botón "Otra cita".
   * Selecciona y muestra otra cita aleatoria.
   */
  refresh(): void {
    this.pickRandomQuote();
  }

  /**
   * Se llama cuando QuoteCard emite el evento delete (id de la cita).
   *
   * En Actividad 3, remove(...) es async porque persiste en IndexedDB.
   * Después de eliminar, se muestra otra cita aleatoria.
   */
  async deleteQuote(id: number): Promise<void> {
    await this.quotesService.remove(id);
    this.pickRandomQuote();
  }

  /**
   * Método auxiliar:
   * - centraliza cómo se selecciona la cita aleatoria
   * - mejora la mantenibilidad (un solo punto de cambio)
   *
   * Consideración:
   * - Si en el futuro permites dejar la lista vacía, aquí podrías manejar el caso
   *   de "no hay citas". En tu servicio actual hay seed, así que siempre habrá.
   */
private pickRandomQuote(): void {
  const all = this.quotesService.getAll();

  // Si no hay citas (caso extremo), evitamos error
  if (all.length === 0) {
    this.quote = undefined as any;
    return;
  }

  this.quote = this.quotesService.getRandom();
}

}
