import { Component, Input } from '@angular/core';
import { Personajes } from '../../models/personajes.models';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent {

  @Input() personaje!: Personajes;

  constructor(){}

}
