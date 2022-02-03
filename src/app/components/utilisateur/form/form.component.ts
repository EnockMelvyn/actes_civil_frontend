import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  loading = false
  formUser : FormGroup
  constructor(private formBuilder: FormBuilder, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      "username" :[],
      "name":[],
      "password" :[]
    }
    )
  }

  public saveUser() {
    this.loading = true
    let user : User = {}
    user.name = this.formUser.get('name')?.value
    user.username = this.formUser.get('username')?.value
    user.password = this.formUser.get('password')?.value

    this.authService.saveUser(user).subscribe(
      (response: any) => {
        this.loading = false
        alert("Utilisateur enregistré avec succès")
        this.router.navigateByUrl("parametre/utilisateur/liste")
      }
    )
  }
}
