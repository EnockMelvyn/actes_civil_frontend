import { Injectable } from '@angular/core';
import { Deces } from '../interfaces/deces';
import { Mariage } from '../interfaces/mariage';
import { Naissance } from '../interfaces/naissance';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  naissance : Naissance = {}
  deces : Deces = {}
  mariage : Mariage = {}
  constructor() { }

  public setNaissance(naissance:Naissance) {
    this.naissance = naissance
  }
  public setDeces(deces:Deces) {
    this.deces = deces
  }
}
