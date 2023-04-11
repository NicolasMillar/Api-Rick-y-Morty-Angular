import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Personajes } from '../../models/personajes.models';
import { StoreService } from '../../services/store.service';
import { PersonajesService } from '../../services/personajes.service';
import { take } from 'rxjs';

type RequestInfo = {
  next: String;
}

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit{

  @Input() locations: String = 'valor inicial';
  info: RequestInfo = {
    next: '',
  }
  Myfavorite: Personajes[] = [];
  private pageNum=1;
  personajes: Personajes[] = [];

  constructor (
    private storeService: StoreService,
    private personajeService: PersonajesService
  ) {
    this.Myfavorite = this.storeService.getMyFavorites();
  }

  ngOnInit():void {
   this.getDataFromService();
  }

  private getDataFromService():void{
    this.personajeService.getAllPersonajes(this.pageNum)
    .pipe(
      take(1)
    ).subscribe( (res:any) => {
      console.log(res);
      const {info, results} = res;
      this.personajes = [...this.personajes, ...results];
      this.info = info;
    });
  }

  private seachPersonajes(): void {
    //algo voy a poner acá
  }

  onAddToFavorites(personaje: Personajes) {
    this.storeService.addPersonaje(personaje);
  }

}
