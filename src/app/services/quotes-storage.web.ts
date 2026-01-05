import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Quote } from './quotes';
import { QuotesStorage } from './quotes-storage';

const KEY_QUOTES = 'quotes_db';

@Injectable({ providedIn: 'root' })
export class QuotesStorageWeb implements QuotesStorage {
  async init(): Promise<void> {
    // En Web no hay inicialización obligatoria.
    return;
  }

  async loadAll(): Promise<Quote[]> {
    const stored = await localforage.getItem<Quote[]>(KEY_QUOTES);
    return stored && Array.isArray(stored) ? stored : [];
  }

  async saveAll(quotes: Quote[]): Promise<void> {
    await localforage.setItem(KEY_QUOTES, quotes);
  }
}
