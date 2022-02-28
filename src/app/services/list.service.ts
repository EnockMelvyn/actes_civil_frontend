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

  roles = ["ROLE_ADMIN", "ROLE_USER","ROLE_AGENT", "ROLE_CHEF_ADMINISTRATIF","ROLE_MAIRE"]
  typeNaissance = [
    {
      "id": "NORMAL",
      "libelle": "Normal"
    },
    {
      "id": "RETARD",
      "libelle": "En retard"
    },
    {
      "id": "AUTRE",
      "libelle": "Autre"
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
