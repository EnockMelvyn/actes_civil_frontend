import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

const helper = new JwtHelperService()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles : string [] = []

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage : TokenStorageService,
    private router : Router, private userService: UserService) { }

  loginForm : FormGroup
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'username' : ['', Validators.required],
      'password': ['', Validators.required]
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login() {
    const params = new HttpParams()
    .set('username', this.loginForm.get('username')?.value)
    .set('password', this.loginForm.get('password')?.value);

    console.log(params)
    this.authService.login(params).subscribe(
      (response : any) => {
        this.tokenStorage.saveToken(response.access_token);
        console.log(response.access_token)
        let tok = helper.decodeToken(response.access_token);
        let user : User = {} ;
        this.userService.getUser(tok.sub).subscribe(
          (response: User)=>{
            user = response
            this.tokenStorage.saveUser(user);
          }
        )
        // user = {'username': tok.sub, 'roles': tok.roles}

        // this.tokenStorage.saveUser(user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
        // window.location.reload();
        // this.router.navigateByUrl("/accueil")

      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      }
    )
  }

  goToAccueil() {
    // window.location.reload()
    this.router.navigateByUrl("/accueil").then( 
      ()=> {
        window.location.reload()
      }
    )
  }
}