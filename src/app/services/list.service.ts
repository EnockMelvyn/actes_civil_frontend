import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  statutNaissance = [
    {
      "id": "EN_ATTENTE",
      "libelle": "En attente"
    },
    {
      "id": "VALIDE",
      "libelle": "Validé"
    }
  ]
  statutMariage = [
    {
      "id": "EN_ATTENTE",
      "libelle": "En attente"
    },
    {
      "id": "VALIDE",
      "libelle": "Validé"
    },
    {
      "id": "APPROUVE",
      "libelle": "Approuvé"
    },
    {
      "id": "SIGNE",
      "libelle": "Signé"
    }
  ]

  roles = ["ROLE_ADMIN", "ROLE_USER"]
  typeNaissance = [
    {
      "id": "NORMAL",
      "libelle": "Normal"
    },
    {
      "id": "RETARD",
      "libelle": "En retard"
    }
  ]
  constructor() { }

  public getStatutActe(): any {
    return this.statutNaissance
  }

  public getTypeNaissance(): any {
    return this.typeNaissance
  }
}
