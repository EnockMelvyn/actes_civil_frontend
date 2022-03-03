import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent implements OnInit {

  modificationEnCours = false
  user : User = {}
  formUser : FormGroup
  constructor(private userService : UserService, private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder, private authService: AuthService) { 
    }

  ngOnInit(): void {
    // this.user= this.tokenStorageService.getUser().username
    this.getUser()
    this.initForm()
    
  }

  initForm(){
    this.formUser = this.formBuilder.group({
      'username':[this.user.username],
      'name': [this.user.name],
      'oldPassword':[],
      'newPassword': []
    }
    )
  }
  getUser(){
    this.userService.getUser(this.tokenStorageService.getUser().username).subscribe(
      (response: User) => {
        console.log(response)
        this.user = response
        this.formUser = this.formBuilder.group({
          'username':[this.user.username],
          'name': [this.user.name],
          'oldPassword':[],
          'newPassword': []
        }
        )
      }
    )
  }
  modificationPassword(){
    // let user : User = {name: this.formUser.get('name')?.value, username: this.user.username}
    const params = new HttpParams()
    .set('username', this.formUser.get('username')?.value)
    .set('password', this.formUser.get('oldPassword')?.value);

    this.user.password = this.formUser.get('newPassword')?.value
    this.authService.login(params).subscribe(
      ()=>{
        this.userService.userUpdate(this.user).subscribe(
          ()=>{
            alert("Mot de passe modifié avec succès")
            this.ngOnInit()
          }
        )
      },
      (error: HttpErrorResponse) => {
        if(error.status== 403){
          alert("Ancien mot de passe incorrect")
        } else {
          alert("Erreur lors de la mise à jour du mot de passe")
        }
        this.ngOnInit()
      }
    )
  }

  
}
