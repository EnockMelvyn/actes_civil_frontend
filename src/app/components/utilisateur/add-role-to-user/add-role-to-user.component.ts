import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.scss']
})
export class AddRoleToUserComponent implements OnInit {

  users : User[] = []
  roles : string [] = []
  formRoleUser : FormGroup
  constructor(private userService : UserService, private listService: ListService, private formBuilder: FormBuilder,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.formRoleUser = this.formBuilder.group({
      "username" : [],
      "rolename" : []
    })
    this.getAllUsers();
    this.roles = this.listService.roles
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response : User[]) => {
        this.users = response
      }
    )
  }

  public addRoleToUser(){
    let roleUser ={"username": this.formRoleUser.get('username')?.value, 
  "rolename": this.formRoleUser.get('rolename')?.value}
    this.authService.addRoleToUser(roleUser).subscribe(
      (response: any) => {
        alert("role ajouté avec succès")
      }
    )
  }
}
