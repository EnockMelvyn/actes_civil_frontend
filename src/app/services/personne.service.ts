import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personne } from '../interfaces/personne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  private serviceBaseUrl = environment.apiBaseURL+"/personne"
  constructor(private http: HttpClient) { }

  public getAllPersonne(): Observable<Personne[]> {
    return this.http.get<any>(this.serviceBaseUrl);
  }
}
