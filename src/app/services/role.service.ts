import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private serviceBaseUrl = environment.apiBaseURL+"/role"
  constructor(private http: HttpClient) { }

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<any>(this.serviceBaseUrl);
  }
  
  public saveRole(  role : Role): Observable<Role[]> {
    return this.http.post<any>(this.serviceBaseUrl, role);
  }
}
