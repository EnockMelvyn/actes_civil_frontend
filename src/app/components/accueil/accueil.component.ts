import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Deces } from 'src/app/interfaces/deces';
import { Mariage } from 'src/app/interfaces/mariage';
import { Naissance } from 'src/app/interfaces/naissance';
import { DecesService } from 'src/app/services/deces.service';
import { MariageService } from 'src/app/services/mariage.service';
import { NaissanceService } from 'src/app/services/naissance.service';
import * as Highcharts from 'highcharts'
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  isHighcharts= typeof Highcharts === 'object'
  highcharts: typeof Highcharts = Highcharts
  categories = ['Jan','Fev','Mars','Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec']
  // chartOptions: Highcharts.Options = {}
  chartOptions: Highcharts.Options = {}
  tableau : number []= []
    // series: [
    // //   // {
    // //   //   name:'Naissance', type:'column',
    // //   //   data:[34,4,2,3,3,8,76,4,1,10,9,5]
    // //   // },

    //   // {
    //   //   name:'Mariage', type:'column',
    //   //   data:[1,1,0,2,0,0,2,1,1,1,0,0]
    //   // }
    // //   // {name:'Février', type:'line', data:[0,4,2]},
    // //   // {name:'Mars', type:'line', data:[0,0,0]},
    // //   // {name:'Avril', type:'line', data:[0,0,0]},
    // //   // {name:'Mai', type:'line', data:[0,0,0]},
    // //   // {name:'Juin', type:'line', data:[0,0,0]},
 
    // ]
  dataNaissance: number[] = []
  naissances: Naissance[]
  mariages: Mariage[]
  deces: Deces[]
  nbre_naissance = 0
  nbre_mariage = 0
  nbre_deces = 0
  nbre_actes = 0
  date = new Date
  firstDay: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  
  constructor(private naissanceService: NaissanceService, private mariageService: MariageService,
    private decesService: DecesService, private dashboardService: DashboardService) {
      console.log("RENTRE")
      this.dashboardService.dataNaissance2().subscribe(
        (reponse: number) => {
          console.log(reponse)
          this.tableau.push(reponse)
          }
      )
    }
              
  ngOnInit(): void {
    this.initialisation()
    
    console.log("VALEUR DASHBOARD")
    console.log(this.tableau.values())
    this.chartOptions =this.getChartOptions()
    // console.log(this.dashboardService.dataNaissance())

    
    // this.donneesDepuisDebutAn()
  }

  getChartOptions(): Highcharts.Options{
    let options : Highcharts.Options ={
      chart: {
        type : "chart",
        
      },
      title:{
        text:" Actes 2022"
      },
      xAxis: {
        categories:['Jan','Fev','Mars','Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec']
      },
      yAxis:{
        title:{
          text:"Nombre"
        }
      },
      series: [
        {name: 'Naissance', data: this.tableau, type:"column"}
      ]}
      return options
  }


  initialisation (){
    let param = {"statutActe": "VALIDE", dateDebut : this.firstDay, dateFin : this.lastDay }
    let paramMariage = {"statutActe": "SIGNE", dateDebut : this.firstDay, dateFin : this.lastDay }
    this.naissanceService.getNaissancesByStatutAndPeriode(param).subscribe(
      (response : Naissance[]) => {
        this.nbre_naissance = response.length
        this.nbre_actes= this.nbre_actes+response.length
      }
    )
    this.mariageService.getAllMariagesByStatutAndPeriode(paramMariage).subscribe(
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

