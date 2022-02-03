import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Deces } from 'src/app/interfaces/deces';
import { Mariage } from 'src/app/interfaces/mariage';
import { Naissance } from 'src/app/interfaces/naissance';
import { DecesService } from 'src/app/services/deces.service';
import { MariageService } from 'src/app/services/mariage.service';
import { NaissanceService } from 'src/app/services/naissance.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  nbre_naissance = 0
  nbre_mariage = 0
  nbre_deces = 0
  nbre_actes = 0
  date = new Date
  firstDay: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  constructor(private naissanceService: NaissanceService, private mariageService: MariageService,
    private decesService: DecesService) { }

  ngOnInit(): void {
    
    this.initialisation()
  }

  initialisation (){
    let param = {"statutActe": "VALIDE", dateDebut : this.firstDay, dateFin : this.lastDay }
    this.naissanceService.getNaissancesByStatutAndPeriode(param).subscribe(
      (response : Naissance[]) => {
        this.nbre_naissance = response.length
        this.nbre_actes= this.nbre_actes+response.length
      }
    )
    this.mariageService.getAllMariagesByStatutAndPeriode(param).subscribe(
      (response : Mariage[]) => {
        this.nbre_mariage = response.length
        this.nbre_actes= this.nbre_actes+response.length
      }
    )
    this.decesService.getAllDecesByStatutAndPeriode(param).subscribe(
      (response : Deces[]) => {
        this.nbre_deces = response.length
        this.nbre_actes= this.nbre_actes+response.length
      }
    )
    
  }
}
