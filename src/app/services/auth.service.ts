import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUserUrl = environment.apiBaseURL
  constructor(private http: HttpClient) { }

  login(params:any): Observable<any>{
    return this.http.post<any>(this.apiUserUrl+"/login", params)
  }

  refreshToken(params : any): Observable<any>{
    return this.http.post<any>(this.apiUserUrl+"/api/token/refresh", params)
  }

  saveUser(user :any): Observable<any>{
    return this.http.post<any>(this.apiUserUrl+"/api/user/save", user)
  }

  addRoleToUser(roleUser :any): Observable<any>{
    return this.http.post<any>(this.apiUserUrl+"/api/role/addtouser" ,roleUser)
  }
}
