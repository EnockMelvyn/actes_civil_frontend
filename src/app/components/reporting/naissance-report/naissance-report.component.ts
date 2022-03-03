
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Naissance } from 'src/app/interfaces/naissance';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';
import { NaissanceService } from 'src/app/services/naissance.service';
import {formatDate} from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-naissance-report',
  templateUrl: './naissance-report.component.html',
  styleUrls: ['./naissance-report.component.scss']
})
export class NaissanceReportComponent implements OnInit, AfterViewInit {
 
  @ViewChild(MatPaginator) paginator : MatPaginator
  loading = false
  dataSource : MatTableDataSource<Naissance> = new MatTableDataSource
  formParam : FormGroup
  colonnes= ['numeroExtrait','typeNaissance','enfant','dateDeclaration','agentDeclareur']
  statuts : any[]
  constructor(private naissanceService: NaissanceService, private formBuilder: FormBuilder, private listService: ListService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.initialisationParam()
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator
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

  public createExcelArray (donnees :any[]): any[] {
    let dataToReturn: any[] = []
    donnees.forEach(element => {
      dataToReturn.push({
        'N° Extrait': element.numeroExtrait,
        'Type de naissance': element.typeNaissance,
        'Nom & prénoms': element.enfant.nom+' '+element.enfant.prenoms,
        'Date de déclaration': element.dateDeclaration ? formatDate(element.dateDeclaration ,'dd/MM/yyyy', 'en-US') : null,
        'Agent déclareur': element.agentDeclareur
      })
    });
    return dataToReturn;
  }

  public exportToExcel () {
    this.dataService.exportToExcel(this.createExcelArray(this.dataSource.data),'Naissance.xlsx');
 }
}
