import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Mariage } from 'src/app/interfaces/mariage';
import { PieceAdministrative } from 'src/app/interfaces/piece-administrative';
import { User } from 'src/app/interfaces/user';
import { DataService } from 'src/app/services/data.service';
import { MariageService } from 'src/app/services/mariage.service';
import { PieceAdministrativeService } from 'src/app/services/piece-administrative.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-form-mariage',
  templateUrl: './form-mariage.component.html',
  styleUrls: ['./form-mariage.component.scss']
})
export class FormMariageComponent implements OnInit {

  userConnected : User = {}
  mariage: Mariage = {}
  statutActe: []
  piecesAdmin: PieceAdministrative[] = []
  piecesFourni : FormControl = new FormControl()
  formMariage : FormGroup
  regimes = [{
    'id': "COMMUNAUTE",
    'libelle': 'Communauté de biens' 
  },
  {
    'id': "SEPARATION",
    'libelle': 'Séparation de biens' 
  }]
  droits : string[] = []
  roles : string[]=[]
  // filteredPersonnes: Observable<Personne[]> ;
  constructor(private formBuilder: FormBuilder, private mariageService: MariageService, private router:Router,
    private dataService: DataService, private pieceAdminService: PieceAdministrativeService, private tokenStorageService: TokenStorageService) { 
      this.userConnected = this.tokenStorageService.getUser()
      for (let role of this.userConnected.roles!){
        this.roles.push(role.name!)
      }
      if( this.roles.includes('ROLE_MAIRE')) {
        this.droits.push("SIGNER")
        this.droits.push("VALIDER")
      }
      if( this.roles.includes('ROLE_CHEF_ADMINISTRATIF')) {
        this.droits.push("VALIDER")
      }
    }

  ngOnInit(): void {
    this.getAllPiecesAdmin()
    this.initialisationFormMariage()
    console.log(this.mariage )
  }

  getAllPiecesAdmin() {
    this.pieceAdminService.getAllPiecesAdmin().subscribe(
      (response : PieceAdministrative[]) => {
        this.piecesAdmin = response
      }
    )
  }
  enregistrerMariage() {
    let mariage = this.buildObjetMariage()
    this.mariageService.enregistrerMariage(mariage).subscribe(
      (response : Mariage) => {
        alert ("Mariage enregistré")
        this.router.navigateByUrl('/mariage/liste/attente')
        .then(
          ()=> {
            window.location.reload()
          }
        )
      },
      (error : HttpErrorResponse) => {
        console.log(error.error)
      }
    )
  }

  public approuverMariage(): void {
    let mariageNew : Mariage
    mariageNew = this.buildObjetMariage()
    mariageNew.pieces = this.mariage.pieces
    mariageNew.id = this.mariage.id
    mariageNew.statutActe = "APPROUVE"
    console.log(mariageNew)
    this.mariageService.updateMariage(mariageNew).subscribe(
      (response: Mariage) => {
        this.mariage = response
        alert("Mariage approuvé")
        this.router.navigateByUrl('/mariage/liste/approuve').then(
          ()=> {
            window.location.reload()
          }
        )
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        alert(error.error.message)
      }
    )
  }


  public majMariage(statut : string): void {
    let mariageNew : Mariage
    mariageNew = this.buildObjetMariage()
    mariageNew.pieces = this.mariage.pieces
    mariageNew.id = this.mariage.id
    mariageNew.statutActe = statut
    // let idMariage = this.mariage.id
    // this.mariage = this.buildObjetMariage()
    // this.mariage.id = idMariage
    // this.mariage.statutActe= statut
    console.log(mariageNew)
    this.mariageService.updateMariage(mariageNew).subscribe(
      (response: Mariage) => {
        this.mariage = response
        alert("Acte de Mariage mis à jour")
        this.goToListe(statut)
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        alert(error.error.message)
      }
    )
  }

  initialisationFormMariage() {
    this.mariage= this.dataService.mariage
    // this.piecesFourni.setValue(this.mariage.pieces)
    this.formMariage = this.formBuilder.group({
      'dateMariage': [this.mariage.dateMariage],
      'lieuMariage': [this.mariage.lieuMariage],
      'celebrant': [this.mariage.celebrant],
      'nomEpoux': [this.mariage.epoux?.nom],
      'prenomEpoux': [this.mariage.epoux?.prenoms],
      'professionEpoux': [this.mariage.epoux?.profession],
      'dateNaissanceEpoux': [this.mariage.epoux?.dateHeureNaissance],
      'lieuNaissanceEpoux': [this.mariage.epoux?.lieuNaissance],
      'pereEpoux': [this.mariage.epouxPere],
      'mereEpoux': [this.mariage.epouxMere],
      'residenceEpoux': [this.mariage.epoux?.lieuResidence],
      'regimeEpoux': [this.mariage.regimeEpoux],
      'nomEpouse': [this.mariage.epouse?.nom],
      'prenomEpouse': [this.mariage.epouse?.prenoms],
      'professionEpouse': [this.mariage.epouse?.profession],
      'dateNaissanceEpouse': [this.mariage.epouse?.dateHeureNaissance],
      'lieuNaissanceEpouse': [this.mariage.epouse?.lieuNaissance],
      'pereEpouse': [this.mariage.epousePere],
      'mereEpouse': [this.mariage.epouseMere],
      'residenceEpouse': [this.mariage.epouse?.lieuResidence],
      'regimeEpouse': [this.mariage.regimeEpouse],
      'temoinEpoux': [this.mariage.epouxTemoin],
      'temoinEpouse': [this.mariage.epouseTemoin],
      'numeroActe': [this.mariage.numeroActe],
      'agentDeclareur': [this.mariage.agentDeclareur ? this.mariage.agentDeclareur : this.userConnected.username],
      'interprete': [this.mariage.interprete ? this.mariage.interprete : this.userConnected.username],
      'pieces': [this.mariage.pieces]
    })

  }

  goToListe(statutListe: string){
    this.mariage = {}
    this.dataService.mariage= this.mariage
    let statutPage
    switch (statutListe) {
      case 'SIGNE':
        statutPage = 'signe'
        break;
      case 'VALIDE':
        statutPage = 'valide'
        break;
      case 'APPROUVE':
        statutPage = 'approuve'
        break;
      default:
        statutPage = 'attente'
        break;
    }
    this.router.navigateByUrl('/mariage/liste/'+statutPage).then(
      ()=> {
        window.location.reload()
      }
    )
  
  }

  buildObjetMariage(): Mariage {
    
    console.log(this.piecesFourni)
    let mariage : Mariage = {
      id: this.mariage ? this.mariage.id : undefined,
      dateMariage: this.formMariage.get('dateMariage')?.value,
      lieuMariage:this.formMariage.get('lieuMariage')?.value,
      celebrant:this.formMariage.get('celebrant')?.value,
      epoux: {
        nom:this.formMariage.get('nomEpoux')?.value,
        prenoms:this.formMariage.get('prenomEpoux')?.value,
        profession:this.formMariage.get('professionEpoux')?.value,
        dateHeureNaissance: this.formMariage.get('dateNaissanceEpoux')?.value,
        lieuNaissance: this.formMariage.get('lieuNaissanceEpoux')?.value,
        lieuResidence:this.formMariage.get('residenceEpoux')?.value,
      },
      epouxPere: this.formMariage.get('pereEpoux')?.value,
      epouxMere:this.formMariage.get('mereEpoux')?.value,
      regimeEpoux:this.formMariage.get('regimeEpoux')?.value,
      epouse: {
        nom:this.formMariage.get('nomEpouse')?.value,
        prenoms:this.formMariage.get('prenomEpouse')?.value,
        profession:this.formMariage.get('professionEpouse')?.value,
        dateHeureNaissance: this.formMariage.get('dateNaissanceEpouse')?.value,
        lieuNaissance: this.formMariage.get('lieuNaissanceEpouse')?.value,
        lieuResidence:this.formMariage.get('residenceEpouse')?.value,
      },
      epousePere: this.formMariage.get('pereEpouse')?.value,
      epouseMere:this.formMariage.get('mereEpouse')?.value,
      regimeEpouse:this.formMariage.get('regimeEpouse')?.value,
      epouxTemoin:this.formMariage.get('temoinEpoux')?.value,
      epouseTemoin:this.formMariage.get('temoinEpouse')?.value,
      numeroActe:this.formMariage.get('numeroActe')?.value,
      agentDeclareur:this.formMariage.get('agentDeclareur')?.value,
      interprete:this.formMariage.get('interprete')?.value,
      // pieces: this.formMariage.get('pieces')?.value
      pieces: this.piecesFourni.value 
    }
    
    return mariage
  }
}
