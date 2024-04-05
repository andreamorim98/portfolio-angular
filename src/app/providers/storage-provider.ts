import {Injectable} from '@angular/core';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';


@Injectable( { providedIn: 'root' } )
export class StorageProvider {

  get(chave: string): any {
    return localStorage.getItem(chave);
  }

  set(chave: string, valor: any): void {
    localStorage.setItem(chave, valor);
  }

  getAsObject(valor: string): any {
    return JSON.parse(this.get(valor));
  }

  setFromObject(chave: string, valor: any): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  del(chave: string): void {
    localStorage.removeItem(chave);
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
