import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personajes } from '../models/personajes.models'

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  personajes: Personajes[] = [];

  constructor(private http: HttpClient) { }

  getAllPersonajes(page = 1){   
    return this.http.get<Personajes[]>('https://rickandmortyapi.com/api/character/?page=${page}');
  }

  searcgPersonajes(query = ''){
    return this.http.get<Personajes[]>('https://rickandmortyapi.com/api/character/?page=${query}');
  }

}
