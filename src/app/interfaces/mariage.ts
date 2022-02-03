import { Personne } from "./personne";
import { PieceAdministrative } from "./piece-administrative";

export interface Mariage {
    id?:number;
    dateMariage?: Date

    lieuMariage?:string
    celebrant?: string;
    epoux?: Personne;
    epouxPere?: Personne;
    epouxMere?: Personne;

    epouse?:Personne;
    epousePere?:Personne;
    epouseMere?:Personne;

    regimeEpoux?: string ;
    regimeEpouse?: string;

    statutActe ?: string;

    epouxTemoin?: string;
    epouseTemoin?: string;

    numeroActe?: string
    agentDeclareur?: string;
    langueDeclaration?: string;
    interprete?: string;
    documents?: string;
    pieces ?: PieceAdministrative[] 
    rendezvous ?: Date
    rendezvousIsOk ?: boolean

    agentLecteur?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?:Date;
    modifiedBy?: string;
}
