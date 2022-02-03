import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Deces } from 'src/app/interfaces/deces';
import { DecesService } from 'src/app/services/deces.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-deces-report',
  templateUrl: './deces-report.component.html',
  styleUrls: ['./deces-report.component.scss']
})
export class DecesReportComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator : MatPaginator
  dataSource : MatTableDataSource<Deces> = new MatTableDataSource
  formParam : FormGroup
  colonnes= ['numeroActe','defunt', 'dateDeces','dateDeclaration','agentDeclareur']
  statuts : any[]

  constructor(private decesService: DecesService, private formBuilder: FormBuilder, private listService: ListService) { }

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

  getDecesByStatutAndPeriode(){
    if(this.formParam.valid) {
      let param = {"statutActe": this.formParam.get('statutActe')?.value, 
      "dateDebut": this.formParam.get('dateDebut')?.value,
      "dateFin": this.formParam.get('dateFin')?.value}
      
      this.decesService.getAllDecesByStatutAndPeriode(param).subscribe(
        (response: any) => {
          console.log(response)
          this.dataSource.data = response
        }, 
        (error : HttpErrorResponse) => {
          console.log(error.error.message)
        } 
      )
    }
  }
}
