import { Component } from '@angular/core';


import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { SettingsService } from './services/settings';
import { QuotesService } from './services/quotes';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',

  // CLAVE: en Standalone debes declarar imports aquí
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private settings: SettingsService,
    private quotes: QuotesService
  ) {
    // Iniciamos la carga persistente al crear la app
    void this.init();
  }

  /**
   * Inicializa almacenamiento (Actividad 3 Web):
   * - Preferences (Settings)
   * - IndexedDB vía localForage (Quotes)
   */
  private async init(): Promise<void> {
    await this.settings.load();
    await this.quotes.init();
  }
}
