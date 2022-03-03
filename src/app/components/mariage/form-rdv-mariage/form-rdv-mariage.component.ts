import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mariage } from 'src/app/interfaces/mariage';
import { DataService } from 'src/app/services/data.service';
import { MariageService } from 'src/app/services/mariage.service';

@Component({
  selector: 'app-form-rdv-mariage',
  templateUrl: './form-rdv-mariage.component.html',
  styleUrls: ['./form-rdv-mariage.component.scss']
})
export class FormRdvMariageComponent implements OnInit {

  mariage : Mariage
  formRdv : FormGroup
  constructor(private formBuilder: FormBuilder, private mariageService: MariageService,
    private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.mariage = this.dataService.mariage
    this.initialisationFormRdv()
  }

  initialisationFormRdv() {
    this.formRdv = this.formBuilder.group( {
      'rendezvous' : [this.mariage.rendezvous ,Validators.required]
     } )
  }

  public majMariage(): void {
    console.log(this.formRdv.get('rendezvous')?.value)
    this.mariage.rendezvous = this.formRdv.get('rendezvous')?.value
    // this.mariage.statutActe = 'VALIDE'
    this.mariageService.updateMariage(this.mariage).subscribe(
      (response: Mariage) => {
        this.mariage = response
        alert("Rendez-vous enregistré")
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

  goToListe(statutListe: string){
    this.mariage = {}
    this.dataService.mariage= this.mariage
    let statutPage
    switch (statutListe) {
      case 'VALIDE':
        statutPage = 'valide'
        break;
    
      default:
        statutPage = 'attente'
        break;
    }
    this.router.navigateByUrl('/mariage/liste/'+statutPage)
  
  }
}
