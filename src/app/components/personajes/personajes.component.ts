import { Component, Input, OnInit, OnChanges, Inject, HostListener } from '@angular/core';
import { Personajes } from '../../models/personajes.models';
import { StoreService } from '../../services/store.service';
import { PersonajesService } from '../../services/personajes.service';
import { take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  showGoUpButton = false;



  constructor (
    @Inject(DOCUMENT) private document: Document,
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

  @HostListener('window:scroll', [])
  onWindowScroll():void{
    const yOffSet = window.pageYOffset;
    if((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) >this.showScrollHeight){
      this.showGoUpButton=true;
    }else if(this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight){
      this.showGoUpButton=false;
    }
  }

  scrollDonw():void{
    if(this.info.next){
      this.pageNum++;
      this.getDataFromService();
    }
  }

  scrollTop():void{
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  private getDataFromService():void{
    this.personajeService.getAllPersonajes(this.pageNum)
    .pipe(
      take(1)
    ).subscribe( (res:any) => {
      const {info, results} = res;
      this.personajes = [...this.personajes, ...results];
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
