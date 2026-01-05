import { Quote } from './quotes';

/**
 * Contrato único para persistir citas.
 * Tendremos 2 implementaciones:
 * - Web: IndexedDB (localForage)
 * - Android: SQLite
 */
export interface QuotesStorage {
  init(): Promise<void>;
  loadAll(): Promise<Quote[]>;
  saveAll(quotes: Quote[]): Promise<void>;
}
