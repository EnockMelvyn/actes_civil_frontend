import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Naissance } from '../interfaces/naissance';

@Injectable({
  providedIn: 'root'
})
export class NaissanceService {

  private serviceBaseUrl = environment.apiBaseURL+"/naissance"
  constructor(private http: HttpClient) { }

  public getAllNaissancesStatut(statut: string): Observable<Naissance[]> {
    return this.http.get<any>(this.serviceBaseUrl+'/liste/statut?statut='+statut);
  }

  public getNaissancesByStatutAndPeriode(reportParam: any): Observable<Naissance[]> {
    return this.http.post<any>(this.serviceBaseUrl+'/periode', reportParam);
  }
  // public getAllNaissancesValide(): Observable<Naissance[]> {
  //   return this.http.get<any>(this.serviceBaseUrl+'/listeValide');
  // }

  public enregistrerNaissance(naissance: Naissance): Observable<Naissance> {
    return this.http.post<any>(this.serviceBaseUrl,naissance);
  }
  public validerNaissance(naissance: Naissance): Observable<Naissance> {
    return this.http.put<any>(`${this.serviceBaseUrl}/valider/`+ naissance.id, naissance);
  }

}
