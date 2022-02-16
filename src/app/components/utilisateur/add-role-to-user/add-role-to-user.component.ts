import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.scss']
})
export class AddRoleToUserComponent implements OnInit {

  users : User[] = []
  roles : Role [] = []
  formRoleUser : FormGroup
  constructor(private userService : UserService, private listService: ListService, private formBuilder: FormBuilder,
    private authService : AuthService, private router : Router, private roleService: RoleService) { }

  ngOnInit(): void {
    this.formRoleUser = this.formBuilder.group({
      "username" : [],
      "rolename" : []
    })
    this.getAllUsers();
   this.getAllRoles()
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response : User[]) => {
        this.users = response
      }
    )
  }
  public getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (response : Role[]) => {
        this.roles = response
      }
    )
  }



  public addRoleToUser(){
    let roleUser ={"username": this.formRoleUser.get('username')?.value, 
  "rolename": this.formRoleUser.get('rolename')?.value}
    this.authService.addRoleToUser(roleUser).subscribe(
      (response: any) => {
        alert("role ajouté avec succès")
        this.router.navigateByUrl("/parametre/utilisateur/liste")
      }
    )
  }
}
