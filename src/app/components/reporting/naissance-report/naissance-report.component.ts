import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Naissance } from 'src/app/interfaces/naissance';
import { ListService } from 'src/app/services/list.service';
import { NaissanceService } from 'src/app/services/naissance.service';

@Component({
  selector: 'app-naissance-report',
  templateUrl: './naissance-report.component.html',
  styleUrls: ['./naissance-report.component.scss']
})
export class NaissanceReportComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator : MatPaginator
  loading = false
  dataSource : MatTableDataSource<Naissance> = new MatTableDataSource
  formParam : FormGroup
  colonnes= ['numeroExtrait','enfant','dateDeclaration','agentDeclareur']
  statuts : any[]
  constructor(private naissanceService: NaissanceService, private formBuilder: FormBuilder, private listService: ListService) { }

  ngOnInit(): void {
    this.initialisationParam()
  }

  initialisationParam(){
    this.formParam = this.formBuilder.group({
      'dateDebut' : ['', Validators.required],
      'dateFin' : ['', Validators.required],
      'statutActe' : ['', Validators.required],
    })

    this.statuts = this.listService.statutNaissance
  }

  getNaissanceByStatutAndPeriode(){
    this.loading = true
    let param = {"statutActe": this.formParam.get('statutActe')?.value, 
    "dateDebut": this.formParam.get('dateDebut')?.value,
     "dateFin": this.formParam.get('dateFin')?.value}
    
    this.naissanceService.getNaissancesByStatutAndPeriode(param).subscribe(
      (response: any) => {
        this.loading = false
        console.log(response)
        this.dataSource.data = response
      }, 
      (error : HttpErrorResponse) => {
        console.log(error.error.message)
      }
    )
  }
}
