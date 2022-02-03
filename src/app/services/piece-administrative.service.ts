import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieceAdministrativeService {

  private apiServerUrl = environment.apiBaseURL
  constructor(private http: HttpClient) { }

  getAllPiecesAdmin(): Observable<any>{
    return this.http.get<any>(this.apiServerUrl+"/pieceAdministrative")
  }
}
