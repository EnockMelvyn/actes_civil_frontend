import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Deces } from '../interfaces/deces';

@Injectable({
  providedIn: 'root'
})
export class DecesService {

  private serviceBaseUrl = environment.apiBaseURL+"/deces"
  constructor(private http: HttpClient) { }

  public getAllDecesByStatut(statutActe: string): Observable<Deces[]> {
    return this.http.get<any>(this.serviceBaseUrl+'?statut='+statutActe);
  }

  public getAllDecesByStatutAndPeriode(reportParam: any): Observable<Deces[]> {
    return this.http.post<any>(this.serviceBaseUrl+'/periode', reportParam);
  }
  // public getAllNaissancesValide(): Observable<Naissance[]> {
  //   return this.http.get<any>(this.serviceBaseUrl+'/listeValide');
  // }

  public enregistrerDeces(deces: Deces): Observable<Deces> {
    return this.http.post<any>(this.serviceBaseUrl,deces);
  }
  public updateDeces(deces: Deces): Observable<Deces> {
    return this.http.put<any>(this.serviceBaseUrl+'/'+deces.id, deces);
  }
}
