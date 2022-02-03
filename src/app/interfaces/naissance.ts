import { Personne } from "./personne";

export interface Naissance {
    id? : number 
    numeroExtrait?: string
    statutActe?: string
    typeNaissance? : string
    enfant? : Personne   
    pere? : Personne
    mere? : Personne
    dateDeclaration? :  Date
    agentDeclareur? : string
    langueDeclaration? : string
    interprete? : string
    documents? : string
    agentLecteur? : string
    pereExtrait ?: string
    mereExtrait ?: string
    certificatNaissance ?: string
    createdAt? : Date
    createdBy? : string
    modifiedAt? : Date
    modifiedBy? : string
}
