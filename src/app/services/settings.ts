import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

/**
 * Clave donde se guardará la preferencia en el almacenamiento del navegador.
 */
const KEY_PERMITIR_BORRAR = 'permitirBorrarEnInicio';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  /**
   * Valor actual en memoria (fuente de verdad para la UI).
   * Se carga desde Preferences al iniciar la app.
   */
  permitirBorrarEnInicio = false;

  /**
   * Carga la configuración persistida desde Preferences.
   * Debe ejecutarse al iniciar la app (AppComponent).
   */
  async load(): Promise<void> {
    const { value } = await Preferences.get({ key: KEY_PERMITIR_BORRAR });
    this.permitirBorrarEnInicio = value === 'true';
  }

  /**
   * Actualiza el valor en memoria y lo persiste en Preferences.
   */
  async setPermitirBorrarEnInicio(v: boolean): Promise<void> {
    this.permitirBorrarEnInicio = v;
    await Preferences.set({ key: KEY_PERMITIR_BORRAR, value: String(v) });
  }
}
