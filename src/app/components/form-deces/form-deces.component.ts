import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Deces } from 'src/app/interfaces/deces';
import { Personne } from 'src/app/interfaces/personne';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DecesService } from 'src/app/services/deces.service';
import { ListService } from 'src/app/services/list.service';
import { PersonneService } from 'src/app/services/personne.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-form-deces',
  templateUrl: './form-deces.component.html',
  styleUrls: ['./form-deces.component.scss']
})
export class FormDecesComponent implements OnInit {

  deces: Deces = {}
  personnes: Personne[] = []
  statutActe: []
  formDeces : FormGroup
  myControl = new FormControl();
  filteredPersonnes: Observable<Personne[]> ;
  droits: string []

  constructor(private formBuilder: FormBuilder, private decesService: DecesService, private listService: ListService,
    private router: Router, private dataService: DataService, private personneService: PersonneService, private tokenStorageService: TokenStorageService) {
      if( this.tokenStorageService.getUser().roles.includes('ROLE_MAIRE')) {
        this.droits.push("VALIDER")
      }
      if( this.tokenStorageService.getUser().roles.includes('ROLE_CHEF_ADMINISTRATIF')) {
        this.droits.push("VALIDER")
      }

      this.deces=this.dataService.deces
    this.formDeces= formBuilder.group({
      numeroActe:[this.deces.numeroActe, Validators.required],
      defuntNom: [ this.deces.defunt?.nom, Validators.required],
      defuntPrenom: [ this.deces.defunt?.prenoms, Validators.required],
      defuntProfession: [ this.deces.defunt?.profession, Validators.required],
      defuntResidence: [ this.deces.defunt?.lieuResidence, Validators.required],
      defuntDateNaissance: [ this.deces.defunt?.dateHeureNaissance, Validators.required],
      defuntLieuNaissance: [ this.deces.defunt?.lieuNaissance, Validators.required],
      pereNom: [this.deces.pere?.nom],
      perePrenom: [this.deces.pere?.prenoms],
      pereResidence: [this.deces.pere?.lieuResidence],
      mereNom: [this.deces.mere?.nom],
      merePrenom: [this.deces.mere?.prenoms],
      mereResidence: [this.deces.mere?.lieuResidence],

      lieuDeces: [this.deces.lieuDeces],
      dateDeces: [this.deces.dateDeces],
      
      dateDeclaration: [this.deces.dateDeclaration],
      agentDeclareur: [this.deces.agentDeclareur],
      interprete: [this.deces.interprete],
      agentLecteur: [this.deces.agentLecteur]
    })

    this.statutActe = this.listService.getStatutActe()
   }

  ngOnInit(): void {
  }
  
  buildObject(): Deces {
    let defunt: Personne, pere: Personne, mere:Personne
    defunt = {
      nom: this.formDeces.get('defuntNom')?.value,
      prenoms: this.formDeces.get('defuntPrenom')?.value,
      profession:this.formDeces.get('defuntProfession')?.value,
      lieuResidence: this.formDeces.get('defuntResidence')?.value,
      lieuNaissance: this.formDeces.get('defuntLieuNaissance')?.value,
      dateHeureNaissance: this.formDeces.get('defuntDateNaissance')?.value
    }

    pere = {
      nom: this.formDeces.get('pereNom')?.value,
      prenoms: this.formDeces.get('perePrenom')?.value,
      lieuResidence: this.formDeces.get('pereResidence')?.value
    }
    mere = {
      nom: this.formDeces.get('mereNom')?.value,
      prenoms: this.formDeces.get('merePrenom')?.value,
      lieuResidence: this.formDeces.get('mereResidence')?.value,
    }
    let deces : Deces 
    deces = {
      numeroActe: this.formDeces.get('numeroActe')?.value,
      defunt : defunt,
      pere: pere,
      mere: mere,  
      lieuDeces :  this.formDeces.get('lieuDeces')?.value,
      dateDeces :  this.formDeces.get('dateDeces')?.value,
      dateDeclaration :  this.formDeces.get('dateDeclaration')?.value,
      agentDeclareur : this.formDeces.get('agentDeclareur')?.value,
      langueDeclaration : "Français",
      interprete : this.formDeces.get('interprete')?.value,
      agentLecteur : this.formDeces.get('agentLecteur')?.value
      // documents : this.formDeces.get('pereExtrait')?.value,
      
    }
    console.log(deces)
    return deces
  }

  public enregistrerDeces(): void {
    
    this.decesService.enregistrerDeces(this.buildObject()).subscribe(
      (response: Deces) => {
        this.deces = response
        alert("Décès enregistré")
        this.goToListe(response.statutActe!)
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        alert(error.error.message)
      }
    )
  }

  public majDeces(): void {
    let idDeces = this.deces.id
    this.deces = this.buildObject()
    this.deces.id = idDeces
    this.deces.statutActe= "VALIDE"
    console.log(this.deces)
    this.decesService.updateDeces(this.deces).subscribe(
      (response: Deces) => {
        this.deces = response
        alert("Acte de décès Mise à jour")
        this.goToListe('VALIDE')
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        alert(error.error.message)
      }
    )
  }

  public goToListe(statutListe: string){
    this.deces = {}
    this.dataService.setDeces(this.deces)
    console.log(this.deces)
    let statutPage
    switch (statutListe) {
      case 'VALIDE':
        statutPage = 'valide'
        break;
    
      default:
        statutPage = 'attente'
        break;
    }
    this.router.navigateByUrl('/deces/liste/'+statutPage)
  }


}
