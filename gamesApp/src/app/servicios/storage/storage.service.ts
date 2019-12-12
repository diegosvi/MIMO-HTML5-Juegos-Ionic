import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const USERNAME_STORAGE_KEY = 'username';
const AHORCADO_STORAGE_KEY = 'ahorcado-';
const RANKING_STORAGE_KEY = 'ranking';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  public async cleanData() {
    return await this.storage.clear();
  }

  // Username

  public async getUsername() {
    return await this.get(USERNAME_STORAGE_KEY);
  }

  public setUsername(value: any) {
    return this.set(USERNAME_STORAGE_KEY, value);
  }

  // Ahorcado data

  public async getAhorcadoData(username: string) {
    return await this.get(AHORCADO_STORAGE_KEY + username);
  }

  public setAhorcadoData(value: any, username: string) {
    return this.set(AHORCADO_STORAGE_KEY + username, value);
  }

  // Ranking

  public async getRanking() {
    return await this.get(RANKING_STORAGE_KEY);
  }

  public setRanking(value: any) {
    return this.set(RANKING_STORAGE_KEY, value);
  }

  //MARK: Storage functions

  private async get(key: string) {
    return await this.storage.get(key);
  }

  private set(key: string, value: any) {
    return this.storage.set(key, value);
  }

}
