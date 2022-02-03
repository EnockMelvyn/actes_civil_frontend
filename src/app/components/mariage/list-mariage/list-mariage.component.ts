import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Mariage } from 'src/app/interfaces/mariage';
import { DataService } from 'src/app/services/data.service';
import { MariageService } from 'src/app/services/mariage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-mariage',
  templateUrl: './list-mariage.component.html',
  styleUrls: ['./list-mariage.component.scss']
})
export class ListMariageComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator
  allMariages : Mariage[] = []
  statut = ''
  statutActe = ''
  titre = ''
  dataSource : MatTableDataSource<Mariage> = new MatTableDataSource 
  droits : string[]
  colonnes= ['numeroActe','epoux', 'epouse','dateMariage','dateDeclaration','agentDeclareur','rendezvous','actions' ]

  constructor(private mariageServ : MariageService, private route: ActivatedRoute, private dataService : DataService,
    private router : Router, private tokenService: TokenStorageService) { 
      if( this.tokenService.getUser().roles.includes('ROLE_MAIRE')) {
        this.droits.push("RDV")
      }
      if( this.tokenService.getUser().roles.includes('ROLE_CHEF_ADMINISTRATIF')) {
        this.droits.push("RDV")
      }
    }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params)
      this.statut = params.statut
      switch (this.statut) {
        case 'signe':
          this.statutActe= 'signe'
          this.titre = "Liste des mariages signés"
          break;
        case 'valide':
          this.statutActe= 'valide'
          this.titre = "Liste des mariages validés"
          break;
        case 'approuve':
          this.statutActe= 'approuve'
          this.titre = "Liste des mariages approuvés"
          break;
        case 'attente':
          this.statutActe= 'en_attente'
          this.titre = "Liste des mariages en attente"
          break;
        default:
          this.titre = "Liste des mariages"
          break;  
      } 
      this.getAllMariages();

      
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator
  }

  getAllMariages() {
    this.mariageServ.getAllMariagesByStatut(this.statutActe).subscribe(
      (response : any) => {
        if(response.error_message){
          this.tokenService.signOut()
          window.location.replace("/login")
        } else {
          this.dataSource.data = response
        }
      },
      (error : HttpErrorResponse) => {
        console.log(error.error.message)
      }
    )
  }

  public goToForm(mariageSelect:Mariage) {
    let mariage : Mariage |undefined
    mariage=this.allMariages.find(mariageComp => mariageComp.id==mariageSelect.id)
    this.dataService.mariage = mariageSelect
    this.router.navigateByUrl('/mariage/enregistrer')
  }

  public goToRdv(mariageSelect:Mariage) {
    let mariage : Mariage |undefined
    mariage=this.allMariages.find(mariageComp => mariageComp.id==mariageSelect.id)
    this.dataService.mariage = mariageSelect
    this.router.navigateByUrl('/mariage/rdv')
  }


}
