import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class PersonajesComponent implements OnInit, OnChanges{

  @Input() locations: string = 'valor inicial';
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

  ngOnChanges():void {
    this.seachPersonajes();
  }

  private getDataFromService():void{
    this.personajeService.getAllPersonajes(this.pageNum)
    .pipe(
      take(1)
    ).subscribe( (res:any) => {
      const {info, results} = res;
      this.personajes = [...results];
      this.info = info;
    });
  }

  private seachPersonajes(): void {
    this.personajeService.searcgPersonajes(this.locations)
    .pipe(
      take(1)
    ).subscribe((res:any) => {
      console.log(res);
      const {info, results} = res;
      this.personajes = [...results];
      this.info = info;
    });
    
  }

  onAddToFavorites(personaje: Personajes) {
    this.storeService.addPersonaje(personaje);
  }

}
