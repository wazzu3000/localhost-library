import { Injectable } from '@angular/core';

const bookKey = 'book';

@Injectable()
export class DatabaseService {
    private conn: IDBOpenDBRequest;
    private db: IDBDatabase;

    public constructor() {
        this.conn = indexedDB.open('library', 1);
        this.conn.onerror = evt => { };
        this.conn.onsuccess = () => this.db = this.conn.result;

        this.conn.onupgradeneeded = evt => {
            // this.conn.result works like this.db
            if (!this.conn.result.objectStoreNames.contains(bookKey)) {
                this.conn.result.createObjectStore(bookKey, { keyPath: 'id' });
            }
        }
    }

    public save(book: any, id?: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let objectStore = this.getObjectStore('readwrite');
            let request = id ? objectStore.put(book) : objectStore.add(book);
            request.onsuccess = () => resolve();
            request.onerror = evt => reject(evt);
        });
    }

    public getAll(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            let request = this.getObjectStore('readwrite').getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = evt => reject(evt);
        });
    }

    public get(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let request = this.getObjectStore('readwrite').get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = evt => reject(evt);
        });
    }

    public delete(id: string) {
        return new Promise<any>((resolve, reject) => {
            let request = this.getObjectStore('readwrite').delete(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = evt => reject(evt);
        });
    }

    private getObjectStore(type: 'readwrite' | 'readonly') {
        return this.db.transaction(bookKey, type).objectStore(bookKey);
    }
}