import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl = environment.apiBaseURL
  constructor( private http: HttpClient) { }

  public getUser(username: string) : Observable<any> {
    return this.http.get<any>(this.apiServerUrl+"/api/user/"+username)
  }
  
  public userUpdate(user: User) : Observable<any> {
    return this.http.put<any>(this.apiServerUrl+"/api/user/update",user)
  }
  
  public getAllUsers() : Observable<any> {
    return this.http.get<any>(this.apiServerUrl+"/api/users")
  }
}
