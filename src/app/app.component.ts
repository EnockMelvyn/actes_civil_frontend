import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deces } from './interfaces/deces';
import { Mariage } from './interfaces/mariage';
import { Naissance } from './interfaces/naissance';
import { DataService } from './services/data.service';
import { DecesService } from './services/deces.service';
import { MariageService } from './services/mariage.service';
import { NaissanceService } from './services/naissance.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Etat civil';
  notif_attente_naissance: Naissance[] = []
  notif_attente_mariage: Mariage[] = []
  notif_attente_deces : Deces[] = []
  notif_attente_actes = 0
  rdv : Mariage[] = []
  roles: string[] = [];
  droits: string[] = []

  constructor(private tokenStorageService: TokenStorageService, private naissanceService:NaissanceService,
    private mariageService: MariageService, private decesService: DecesService, private router:Router, private dataService : DataService) { }

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  triMariage(tableau: Mariage[]){
    if (!tableau) return
    else 
    var pivot = tableau[-1]
    var plus_petit: Mariage[] =[]
    var plus_grand: Mariage[] =[]
    tableau.forEach((value,ind)=>{
      if (value.dateMariage! < pivot.dateMariage!){
        plus_petit.push(value)
      }else {
        plus_grand.push(value)
      }
    })
    console.log(plus_petit)

  }
  initialisationNotification(){
    this.naissanceService.getAllNaissancesStatut("EN_ATTENTE").subscribe(
      (response : Naissance[]) => {
        this.notif_attente_naissance = response
      }
    )
    this.mariageService.getAllMariagesByStatut("EN_ATTENTE").subscribe(
      (response : Mariage[]) => {
        this.notif_attente_mariage = response
      }
    )
    this.decesService.getAllDecesByStatut("EN_ATTENTE").subscribe(
      (response : Deces[]) => {
        this.notif_attente_deces = response
      }
    )
    this.mariageService.getAllMariagesByStatut("APPROUVE").subscribe(
      (response : Mariage[]) => {
        console.log("ALL MARIAGE")
        console.log(response)
        // this.triMariage(response)
        response.forEach((mariage,i)=> {
          if(mariage.rendezvous && mariage.rendezvous!.toLocaleString()< new Date().toLocaleString()){
            this.rdv.push(mariage)
          }
        })
        this.rdv.sort(function(a,b) { 
          return a.rendezvous!>b.rendezvous! ? 1 : a.rendezvous!<b.rendezvous! ? -1 : 0;
        })
        
        // if (response.length <=3){
        //   this.rdv = response
        // } else{
        //   for (var _i = 0; _i < 3; _i++){
        //     this.rdv.push(response[_i])
        //   }
        // }
        console.log("NOTIF MARIAGE")
        console.log(this.rdv.slice(0,3))
      }
    )
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      for(let role of user.roles){
        console.log(role.name)
        this.roles.push(role.name)
      }

      this.username = user.username;
    }
    this.initialisationNotification()

    if( this.roles.includes('ROLE_ADMIN')) {
      this.droits.push("UTILISATEURS_LISTE")
    }
    if( this.roles.includes('ROLE_MAIRE')) {
      this.droits.push("UTILISATEURS_LISTE")
    }
    if( this.roles.includes('ROLE_CHEF_ADMINISTRATIF')) {
      this.droits.push("UTILISATEURS_LISTE")
    }

    // setTimeout(() => window.location.reload(), 60*1000)
  }

  goToForm(acte : string) {
    this.dataService.naissance = {}
    this.dataService.mariage = {}
    this.dataService.deces = {}
    this.router.navigateByUrl("/naissance", { skipLocationChange: true })
    setTimeout(() => this.router.navigateByUrl(acte+"/enregistrer"))
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/login").then(
      ()=>{
        window.location.reload();
      }
    )
  }
  
}
