import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  add(key: string, value: any) {
    this.remove(key);
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  get<T>(key: string): T {
    let value: string = localStorage.getItem(key);

    if (value && value !== 'undefined' && value !== 'null') {
      try {
        return <T>JSON.parse(value);
      } catch (ex) {
        return null;
      }
    }
    return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
