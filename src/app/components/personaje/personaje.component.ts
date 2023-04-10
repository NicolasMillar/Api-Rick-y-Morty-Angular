import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Personajes } from '../../models/personajes.models';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent {

  @Input() personaje: Personajes = {
    id: 0,
    name: '',
    status: '',
    species: '',
    gender: '',
    location: '',
    img: ''
  };

  @Output() addPersonajes = new EventEmitter<Personajes>();

  constructor(){}

  onAddToFavorites() {
    this.addPersonajes.emit(this.personaje);
  }

}
