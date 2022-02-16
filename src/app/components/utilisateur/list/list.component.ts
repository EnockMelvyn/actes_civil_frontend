import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource : MatTableDataSource<any> = new MatTableDataSource
  colonnes = ["username", "name", "roles"]
  constructor( private userService: UserService, private router : Router, private tokenService: TokenStorageService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response : any) => {
        if(response.error_message){
          this.tokenService.signOut()
          window.location.replace("/login")
        } else {
        this.dataSource.data = response
        }
      }
    )
  }

  public removeRoleToUser(username: string, rolename: string){
    if(confirm("Retirer le rôle "+rolename+" à l'utilisateur "+ username+" ?")){
    let roleUser ={"username": username, "rolename": rolename}
    this.authService.removeRoleToUser(roleUser).subscribe(
      (response: any) => {
        alert("role retiré avec succès")
        this.ngOnInit()
      }
    )
    }
  }

  public goToFormUser() {
    this.router.navigateByUrl("parametre/utilisateur/enregistrer")
  }
  
  public goToFormRoleUser() {
    this.router.navigateByUrl("parametre/utilisateur/addRole")
  }
}
