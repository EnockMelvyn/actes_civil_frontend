import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Mariage } from 'src/app/interfaces/mariage';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';
import { MariageService } from 'src/app/services/mariage.service';

@Component({
  selector: 'app-mariage-report',
  templateUrl: './mariage-report.component.html',
  styleUrls: ['./mariage-report.component.scss']
})
export class MariageReportComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<Mariage>
  @ViewChild(MatPaginator) paginator : MatPaginator
  dataSource : MatTableDataSource<Mariage> = new MatTableDataSource
  formParam : FormGroup
  colonnes = ['numeroActe','epoux', 'epouse','dateMariage','dateDeclaration','agentDeclareur','rendezvous']
  statuts : any[]
  
  constructor(private mariageService: MariageService, private formBuilder: FormBuilder, private listService: ListService,
    private dataService : DataService) { }

  
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

    this.statuts = this.listService.statutMariage
  }

  getMariageByStatutAndPeriode(){
    let param = {"statutActe": this.formParam.get('statutActe')?.value, 
    "dateDebut": this.formParam.get('dateDebut')?.value,
     "dateFin": this.formParam.get('dateFin')?.value}
    
    this.mariageService.getAllMariagesByStatutAndPeriode(param).subscribe(
      (response: any) => {
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
        'N° Acte': element.numeroActe,
        'Epoux': element.epoux.nom+' '+element.epoux.prenoms,
        'Epouse': element.epouse.nom+' '+element.epouse.prenoms,
        'Date de mariage': element.dateMariage ? formatDate(element.dateMariage ,'dd/MM/yyyy', 'en-US') : null,
        'Date de déclaration': element.dateDeclaration ? formatDate(element.dateDeclaration ,'dd/MM/yyyy', 'en-US') : null,
        'Agent déclareur': element.agentDeclareur,
        'Date rendez-vous': element.rendezvous ? formatDate(element.rendezvous ,'dd/MM/yyyy', 'en-US'): null,
      })
    });
    return dataToReturn;
  }

  public exportToExcel () {
    this.dataService.exportToExcel(this.createExcelArray(this.dataSource.data),'Mariage.xlsx');
 }

}
