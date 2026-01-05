import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

import { QuotesStorageWeb } from './quotes-storage.web';
import { QuotesStorageAndroid } from './quotes-storage.android';
import { QuotesStorage } from './quotes-storage';

/**
 * Modelo de una cita.
 */
export interface Quote {
  id: number;
  frase: string;
  autor: string;
}

/**
 * Servicio principal de citas.
 *
 * - Mantiene el estado en memoria (UI rápida)
 * - Persiste según plataforma:
 *   Web -> IndexedDB (localForage)
 *   Android -> SQLite
 */
@Injectable({ providedIn: 'root' })
export class QuotesService {
  private quotes: Quote[] = [];

  /**
   * Seed: datos iniciales si no existe almacenamiento.
   */
  private readonly seed: Quote[] = [
    { id: 1, frase: 'Pienso, luego existo.', autor: 'René Descartes' },
    { id: 2, frase: 'El conocimiento es poder.', autor: 'Francis Bacon' },
    { id: 3, frase: 'La imaginación es más importante que el conocimiento.', autor: 'Albert Einstein' },
  ];

  /**
   * Storage seleccionado según plataforma.
   */
  private storage: QuotesStorage;

  constructor(
    private storageWeb: QuotesStorageWeb,
    private storageAndroid: QuotesStorageAndroid
  ) {
    // Elegimos backend según plataforma
    this.storage = Capacitor.getPlatform() === 'web' ? this.storageWeb : this.storageAndroid;
  }

  /**
   * Inicializa y carga datos persistidos.
   * Se llama una vez en AppComponent.
   */
  async init(): Promise<void> {
    await this.storage.init();

    const stored = await this.storage.loadAll();
    if (stored.length > 0) {
      this.quotes = stored;
      return;
    }

    // Si no había datos, “sembramos”
    this.quotes = [...this.seed];
    await this.storage.saveAll(this.quotes);
  }

  /**
   * Devuelve copia para evitar mutaciones externas.
   */
  getAll(): Quote[] {
    return [...this.quotes];
  }

  /**
   * Devuelve una cita aleatoria.
   */
  getRandom(): Quote {
    const i = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[i];
  }

  /**
   * Agrega cita y persiste.
   */
  async add(frase: string, autor: string): Promise<Quote> {
    const q: Quote = {
      id: Date.now(),
      frase: frase.trim(),
      autor: autor.trim(),
    };

    this.quotes = [q, ...this.quotes];
    await this.storage.saveAll(this.quotes);
    return q;
  }

  /**
   * Elimina por id y persiste.
   */
  async remove(id: number): Promise<void> {
    this.quotes = this.quotes.filter(q => q.id !== id);
    await this.storage.saveAll(this.quotes);
  }

  /**
   * Opcional: limpiar todo (útil para pruebas).
   */
  async clearAll(): Promise<void> {
    this.quotes = [];
    await this.storage.saveAll(this.quotes);
  }
}
