
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Deces } from 'src/app/interfaces/deces';
import { DataService } from 'src/app/services/data.service';
import { DecesService } from 'src/app/services/deces.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-deces',
  templateUrl: './list-deces.component.html',
  styleUrls: ['./list-deces.component.scss']
})
export class ListDecesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator : MatPaginator
  titre = ''
  statut = ''
  statutActe = ''
  chemin = environment.jasperserverURL+'/reports/Rapports/Deces.pdf?id='
  allDeces: Deces[] = []
  dataSource : MatTableDataSource<Deces> = new MatTableDataSource()
  // dataSource: 
  colonnes= ['numeroActe','defunt', 'dateDeces','dateDeclaration','agentDeclareur','actions' ]
  
  // 'pere','mere','langueDeclaration','nomInterprète','documents','agentLecteur','statutNaissance','typeNaissance'
  constructor(private decesService: DecesService, private route: ActivatedRoute,
    private router: Router, private dataService: DataService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params)
      this.statut = params.statut
      switch (this.statut) {
        case 'valide':
          this.statutActe= 'valide'
          this.titre = "Liste  des décès validées"
          break;
        case 'attente':
          this.statutActe= 'en_attente'
          this.titre = "Liste  des décès en attente"
          break;
        default:
          this.titre = "Liste des décès"
          break;  
      } 
      this.getAllDeces();

      console.log( this.allDeces)
    })
    console.log(this.statutActe)
    
    
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator

      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm : any, key : any) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase()  
  }

  nestedFilterCheck(search : any, data: any, key: any) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  public getAllDeces(): void {
    this.decesService.getAllDecesByStatut(this.statutActe).subscribe(
      (response: any) => {
        if(response.error_message){
          this.tokenService.signOut()
          window.location.replace("/login")
        } else {
          this.allDeces = response
        this.dataSource.data = response
        console.log(this.allDeces)
        }
      },
      (error : HttpErrorResponse)=> {

      }
    )
  }

  public goToForm(decesSelect:Deces) {
    let deces : Deces |undefined
    deces=this.allDeces.find(decesComp => decesComp.id==decesSelect.id)
    this.dataService.setDeces(deces ? deces : {})
    this.router.navigateByUrl('/deces/enregistrer')
  }
}
