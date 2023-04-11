import { Injectable } from '@angular/core';
import { Personajes } from '../models/personajes.models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private MyFavorites: Personajes[] = [];

  constructor() { }

  addPersonaje(personaje: Personajes){
    this.MyFavorites.push(personaje);
  }

  getMyFavorites(){
    return this.MyFavorites;
  }

}
