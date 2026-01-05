import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './settings.page.html',
})
export class SettingsPage {
  constructor(public settings: SettingsService) {}

  /**
   * Cuando el usuario cambia el toggle, guardamos en Preferences.
   */
  async toggle(value: boolean): Promise<void> {
    await this.settings.setPermitirBorrarEnInicio(value);
  }
}
