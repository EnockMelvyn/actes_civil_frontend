import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl = environment.apiBaseURL
  constructor( private http: HttpClient) { }

  public getUser(username: string) : Observable<any> {
    return this.http.get<any>(this.apiServerUrl+"/api/user/"+username)
  }
  
  public getAllUsers() : Observable<any> {
    return this.http.get<any>(this.apiServerUrl+"/api/users")
  }
}
