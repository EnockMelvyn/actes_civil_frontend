import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deces } from './interfaces/deces';
import { Mariage } from './interfaces/mariage';
import { Naissance } from './interfaces/naissance';
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

  constructor(private tokenStorageService: TokenStorageService, private naissanceService:NaissanceService,
    private mariageService: MariageService, private decesService: DecesService, private router:Router) { }

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

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
    this.mariageService.getAllMariagesByStatut("VALIDE").subscribe(
      (response : Mariage[]) => {
        if (response.length <=3){
          this.rdv = response
        } else{
          for (var _i = 0; _i < 3; _i++){
            this.rdv.push(response[_i])
          }
        }
        console.log(this.rdv)
      }
    )
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    this.initialisationNotification()
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
