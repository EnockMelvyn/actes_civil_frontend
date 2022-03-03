import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Naissance } from 'src/app/interfaces/naissance';
import { DataService } from 'src/app/services/data.service';
import { NaissanceService } from 'src/app/services/naissance.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-naissance',
  templateUrl: './list-naissance.component.html',
  styleUrls: ['./list-naissance.component.scss']
})
export class ListNaissanceComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator : MatPaginator
  titre = ''
  statut = ''
  statutNaissance = ''
  chemin = environment.jasperserverURL+'/reports/Rapports/Naissance.pdf?id='
  naissances: Naissance[] = []
  dataSource : MatTableDataSource<Naissance> = new MatTableDataSource()
  // dataSource: 
  colonnes= ['numeroExtrait','enfant','dateNaissance', 'dateDeclaration','agentDeclareur','actions' ]
  
  // 'pere','mere','langueDeclaration','nomInterprète','documents','agentLecteur','statutNaissance','typeNaissance'
  constructor(private naissanceService: NaissanceService, private route: ActivatedRoute,
    private router: Router, private dataService: DataService, private tokenService : TokenStorageService , private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params)
      this.statut = params.statut
      switch (this.statut) {
        case 'valide':
          this.statutNaissance= 'valide'
          this.titre = "Liste  des naissances validées"
          break;
        case 'attente':
          this.statutNaissance= 'en_attente'
          this.titre = "Liste  des naissances en attente"
          break;
        default:
          this.titre = "Liste des naissances"
          break;  
      } 
      this.getAllNaissance();
    })
    console.log(this.statutNaissance)
    
    
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

  public getAllNaissance(): void {
    this.naissanceService.getAllNaissancesStatut(this.statutNaissance).subscribe(
      (response: any) => {
        if(response.error_message){
          this.tokenService.signOut()
          window.location.replace("/login")
        } else {
          this.naissances = response
          this.dataSource.data = response
          console.log(this.naissances)
        }
      },
      (error : HttpErrorResponse)=> {
      }
    )
  }


  

  public goToForm(naissance:Naissance) {
    this.dataService.setNaissance(naissance)
    this.router.navigateByUrl('/naissance/enregistrer')
  }

}
