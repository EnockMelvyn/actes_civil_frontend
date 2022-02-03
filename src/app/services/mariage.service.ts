import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mariage } from '../interfaces/mariage';

@Injectable({
  providedIn: 'root'
})
export class MariageService {

  private serviceBaseUrl = environment.apiBaseURL+"/mariage"
  constructor(private http: HttpClient) { }

  public getAllMariagesByStatut(statutActe: string): Observable<Mariage[]> {
    return this.http.get<any>(this.serviceBaseUrl+'?statut='+statutActe);
  }
  public getAllMariagesByStatutAndPeriode(reportParam: any): Observable<Mariage[]> {
    return this.http.post<any>(this.serviceBaseUrl+'/periode', reportParam);
  }
  // public getAllNaissancesValide(): Observable<Naissance[]> {
  //   return this.http.get<any>(this.serviceBaseUrl+'/listeValide');
  // }

  public enregistrerMariage(mariage: Mariage): Observable<Mariage> {
    return this.http.post<any>(this.serviceBaseUrl+'/save',mariage);
  }
  public updateMariage(mariage: Mariage): Observable<Mariage> {
    return this.http.put<any>(this.serviceBaseUrl+'/'+mariage.id, mariage);
  }
}
