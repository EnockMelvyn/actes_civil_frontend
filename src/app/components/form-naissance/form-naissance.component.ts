import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Naissance } from 'src/app/interfaces/naissance';
import { Personne } from 'src/app/interfaces/personne';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';
import { NaissanceService } from 'src/app/services/naissance.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-form-naissance',
  templateUrl: './form-naissance.component.html',
  styleUrls: ['./form-naissance.component.scss']
})
export class FormNaissanceComponent implements OnInit {
  naissance: Naissance

  typeNaissance: []
  statutNaissance: []
  formNaissance : FormGroup
  droits : string[]
  constructor(private formBuilder: FormBuilder, private naissanceService: NaissanceService, private listService: ListService,
    private router: Router, private dataService: DataService, private tokenStorageService : TokenStorageService) {

      if( this.tokenStorageService.getUser().roles.includes('ROLE_MAIRE')) {
        this.droits.push("VALIDER")
      }
      if( this.tokenStorageService.getUser().roles.includes('ROLE_CHEF_ADMINISTRATIF')) {
        this.droits.push("VALIDER")
      }
      this.naissance=this.dataService.naissance
    this.formNaissance= formBuilder.group({
      typeDeclaration: [this.naissance.typeNaissance, Validators.required],
      numeroExtrait:[this.naissance.numeroExtrait, Validators.required],
      enfantNom: [this.naissance.enfant?.nom],
      enfantPrenom: [this.naissance.enfant?.prenoms],
      enfantLieuNaissance: [this.naissance.enfant?.lieuNaissance],
      enfantDateHeureNaissance: [this.naissance.enfant?.dateHeureNaissance],
      pereNom: [this.naissance.pere?.nom],
      perePrenom: [this.naissance.pere?.prenoms],
      pereNationalite: [this.naissance.pere?.nationalite],
      pereProfession: [this.naissance.pere?.profession],
      pereResidence: [this.naissance.pere?.lieuResidence],
      pereContact: [this.naissance.pere?.contact],
      pereEmail: [this.naissance.pere?.email],
      mereNom: [this.naissance.mere?.nom],
      merePrenom: [this.naissance.mere?.prenoms],
      mereNationalite: [this.naissance.mere?.nationalite],
      mereProfession: [this.naissance.mere?.profession],
      mereResidence: [this.naissance.mere?.lieuResidence],
      mereContact: [this.naissance.mere?.contact],
      mereEmail: [this.naissance.mere?.email],
      dateHeureDeclaration: [this.naissance.dateDeclaration],
      agentDeclareur: [this.naissance.agentDeclareur],
      interprete: [this.naissance.interprete],
      pereExtrait: [this.naissance.pereExtrait],
      mereExtrait: [this.naissance.mereExtrait],
      certificatNaissance: [this.naissance.certificatNaissance],
      carnetNaissance: [''],
      agentLecteur: [this.naissance.agentLecteur]
      // typeDeclaration: [this.naissance., Validators.required],
      // enfantNom: [this.naissance., Validators.required],
      // enfantPrenom: [this.naissance., Validators.required],
      // enfantLieuNaissance: [this.naissance., Validators.required],
      // enfantDateHeureNaissance: [this.naissance., Validators.required],
      // pereNom: [this.naissance., Validators.required],
      // perePrenom: [this.naissance., Validators.required],
      // pereNationalite: [this.naissance., Validators.required],
      // pereProfession: [this.naissance., Validators.required],
      // pereResidence: [this.naissance., Validators.required],
      // pereContact: [this.naissance., Validators.required],
      // pereEmail: [this.naissance., Validators.required],
      // mereNom: [this.naissance., Validators.required],
      // merePrenom: [this.naissance., Validators.required],
      // mereNationalite: [this.naissance., Validators.required],
      // mereProfession: [this.naissance., Validators.required],
      // mereResidence: [this.naissance., Validators.required],
      // mereContact: [this.naissance., Validators.required],
      // mereEmail: [this.naissance., Validators.required],
      // dateHeureDeclaration: [this.naissance., Validators.required],
      // agentDeclareur: [this.naissance., Validators.required],
      // interprete: [this.naissance., Validators.required],
      // pereExtrait: [this.naissance., Validators.required],
      // mereExtrait: [this.naissance., Validators.required],
      // certificatNaissance: [this.naissance., Validators.required],
      // carnetNaissance: [this.naissance., Validators.required],
      // agentLecteur: [this.naissance., Validators.required]
    })

    this.statutNaissance = this.listService.getStatutActe()
    this.typeNaissance = this.listService.getTypeNaissance()
   }

  ngOnInit(): void {
    console.log(this.typeNaissance)
  }

  buildObject(): Naissance {
    let enfant: Personne, pere: Personne, mere:Personne
    enfant = {
      nom: this.formNaissance.get('enfantNom')?.value,
      prenoms: this.formNaissance.get('enfantPrenom')?.value,
      lieuNaissance: this.formNaissance.get('enfantLieuNaissance')?.value,
      dateHeureNaissance: this.formNaissance.get('enfantDateHeureNaissance')?.value,
      nationalite: this.formNaissance.get('pereNationalite')?.value
    }

    pere = {
      nom: this.formNaissance.get('pereNom')?.value,
      prenoms: this.formNaissance.get('perePrenom')?.value,
      nationalite: this.formNaissance.get('pereNationalite')?.value,
      profession: this.formNaissance.get('pereProfession')?.value,
      lieuResidence: this.formNaissance.get('pereResidence')?.value,
      contact: this.formNaissance.get('pereContact')?.value,
      email: this.formNaissance.get('pereEmail')?.value
    }
    mere = {
      nom: this.formNaissance.get('mereNom')?.value,
      prenoms: this.formNaissance.get('merePrenom')?.value,
      nationalite: this.formNaissance.get('mereNationalite')?.value,
      profession: this.formNaissance.get('mereProfession')?.value,
      lieuResidence: this.formNaissance.get('mereResidence')?.value,
      contact: this.formNaissance.get('mereContact')?.value,
      email: this.formNaissance.get('mereEmail')?.value,
    }
    let naissance : Naissance
    naissance = {
      numeroExtrait: this.formNaissance.get('numeroExtrait')?.value,
      typeNaissance : this.formNaissance.get('typeDeclaration')?.value,
      enfant : enfant,   
      pere : pere,
      mere : mere,
      dateDeclaration :  this.formNaissance.get('dateHeureDeclaration')?.value,
      agentDeclareur : this.formNaissance.get('agentDeclareur')?.value,
      langueDeclaration : "Français",
      interprete : this.formNaissance.get('interprete')?.value,
      pereExtrait : this.formNaissance.get('pereExtrait')?.value,
      agentLecteur : this.formNaissance.get('agentLecteur')?.value,
      mereExtrait : this.formNaissance.get('mereExtrait')?.value,
      certificatNaissance : this.formNaissance.get('certificatNaissance')?.value,
    }

    return naissance
  }

  public enregistrerNaissance(): void {
    
    this.naissanceService.enregistrerNaissance(this.buildObject()).subscribe(
      (response: Naissance) => {
        this.naissance = response
        alert("Naissance enregistrée")
        this.goToListe('EN_ATTENTE')
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        alert(error.error.message)
      }
    )
  }

  public majNaissance(): void {
    let idNaiss = this.naissance.id
    this.naissance = this.buildObject()
    this.naissance.id = idNaiss
    this.naissanceService.validerNaissance(this.naissance).subscribe(
      (response: Naissance) => {
        this.naissance = response
        alert("Naissance Mise à jour")
        this.goToListe('VALIDE')
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        alert(error.error.message)
      }
    )
  }

  public goToListe(statutListe: string){
    this.naissance = {}
    this.dataService.setNaissance(this.naissance)
    console.log(this.naissance)
    let statutPage
    switch (statutListe) {
      case 'VALIDE':
        statutPage = 'valide'
        break;
    
      default:
        statutPage = 'attente'
        break;
    }
    this.router.navigateByUrl('/naissance/liste/statut/'+statutPage)
  }

}
