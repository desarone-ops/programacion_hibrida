import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, CapacitorSQLite } from '@capacitor-community/sqlite';
import { Quote } from './quotes';
import { QuotesStorage } from './quotes-storage';

/**
 * Persistencia SQLite (Android).
 * - Crea DB y tabla
 * - Carga todas las citas
 * - Guarda todas las citas (estrategia simple: DELETE + INSERT)
 *
 * Nota: Para evaluación es suficiente y fácil de mantener.
 */
@Injectable({ providedIn: 'root' })
export class QuotesStorageAndroid implements QuotesStorage {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private readonly dbName = 'quotesdb';
  private readonly table = 'quotes';
  private initialized = false;

  async init(): Promise<void> {
    // Solo tiene sentido en plataformas nativas
    if (Capacitor.getPlatform() === 'web') return;
    if (this.initialized) return;

    const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    // Creamos tabla si no existe
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id INTEGER PRIMARY KEY NOT NULL,
        frase TEXT NOT NULL,
        autor TEXT NOT NULL
      );
    `);

    await db.close();
    this.initialized = true;
  }

  async loadAll(): Promise<Quote[]> {
    if (Capacitor.getPlatform() === 'web') return [];

    const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const res = await db.query(`SELECT id, frase, autor FROM ${this.table} ORDER BY id DESC;`);
    await db.close();

    return (res.values ?? []) as Quote[];
  }

  async saveAll(quotes: Quote[]): Promise<void> {
    if (Capacitor.getPlatform() === 'web') return;

    const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    // Estrategia simple: limpiar e insertar todo
    await db.execute(`DELETE FROM ${this.table};`);

    for (const q of quotes) {
      await db.run(
        `INSERT INTO ${this.table} (id, frase, autor) VALUES (?, ?, ?);`,
        [q.id, q.frase, q.autor]
      );
    }

    await db.close();
  }
}
