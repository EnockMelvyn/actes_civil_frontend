import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Naissance } from '../interfaces/naissance';
import { DecesService } from './deces.service';
import { MariageService } from './mariage.service';
import { NaissanceService } from './naissance.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  tableauData: number[]=[]
  date = new Date
  firstDayOfYear: Date = new Date(this.date.getFullYear(), 0, 1);
  mois = [
    {id:1, libelle: "Janvier", naissance: 0, mariage: 0, deces: 0},
    {"id":2, "libelle": "Février"},
    {"id":3, "libelle": "Mars"},
    {"id":4, "libelle": "Avril"},
    {"id":5, "libelle": "Mai"},
    {"id":6, "libelle": "Juin"},
    {"id":7, "libelle": "Juillet"},
    {"id":8, "libelle": "Août"},
    {"id":9, "libelle": "Septembre"},
    {"id":10, "libelle": "Octobre"},
    {"id":11, "libelle": "Novembre"},
    {"id":12, "libelle": "Décembre"}
  ]
  constructor(private naissanceService : NaissanceService, private mariageService: MariageService, private decesService : DecesService) { }

  //  dataNaissance(): Observable<number> {
  //   // console.log("DONNEES DEPUIS DEBUT ANNEE")
  //   const observable = new Observable(subscribe =>{

  //   })
  //   let param = {"statutActe": "ALL", dateDebut : this.firstDayOfYear, dateFin : this.date }
  //   // let paramMariage = {"statutActe": "SIGNE", dateDebut : this.firstDay, dateFin : this.lastDay }
  //   this.naissanceService.getNaissancesByStatutAndPeriode(param).toPromise().then(
  //     (response : Naissance[]) => {
  //       this.tableauData = []
  //       this.mois.forEach((month,index) => { 
  //       // var chiffres_naissance : number[] = []
  //           let nbre : number = 0
  //           response.forEach(naissance =>{
  //             let dateDec : Date = new Date(naissance.dateDeclaration!)
  //             if (month.id-1 == dateDec.getMonth()){
  //               nbre++
  //             }
  //           })
  //           this.tableauData.push(nbre)
  //           // series.push(nbre)
  //           console.log('series')
  //           console.log(this.tableauData)
  //       })
  //       console.log('series 2')
  //       console.log(this.tableauData)
  //       series.push( this.tableauData)
  //       console.log(series)
  //       // console.log( {name: 'Naissance', data: this.tableauData})
  //       // return {name: 'Naissance', type:'column',data: this.tableauData}

  //     }
  //   ) 
  //   return {name: 'Naissance', type:'column',data: this.tableauData}
  // }
   dataNaissance2(): Observable<any> {
    // console.log("DONNEES DEPUIS DEBUT ANNEE")
    const observable = new Observable(sub =>{
      let param = {"statutActe": "ALL", dateDebut : this.firstDayOfYear, dateFin : this.date }
      this.naissanceService.getNaissancesByStatutAndPeriode(param).toPromise().then(
        (response : Naissance[]) => {
          this.tableauData = []
          this.mois.forEach((month,index) => { 
          // var chiffres_naissance : number[] = []
              let nbre : number = 0
              response.forEach(naissance =>{
                let dateDec : Date = new Date(naissance.dateDeclaration!)
                if (month.id-1 == dateDec.getMonth()){
                  nbre++
                }
              })
              sub.next(nbre)
          })
        }
      )
    })
    return observable
  }

 
}
