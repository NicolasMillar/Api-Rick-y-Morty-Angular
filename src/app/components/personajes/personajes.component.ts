import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Personajes } from '../../models/personajes.models'

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnChanges{

  @Input() locations: String = 'valor inicial';

  personajes: Personajes[] = [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      location: "Earth (Replacement Dimension)",
      img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      gender: "Male",
      location: "Earth",
      img: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
    }
  ];

  constructor () {}

  ngOnChanges() {
      //algo voy a hacer aqui solo que aun no lo se
  }

}
