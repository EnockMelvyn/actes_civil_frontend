import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent implements OnInit {

  modificationEnCours = false
  user : User = {}
  formUser : FormGroup
  constructor(private userService : UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user= this.tokenStorageService.getUser()
  }

  modificationInformations(){
    
  }
}
