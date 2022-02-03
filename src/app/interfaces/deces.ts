import { Personne } from "./personne";

export interface Deces {

    id? : number 
    numeroActe?: string
    statutActe?: string
    dateDeces? :  Date
    lieuDeces? :  String
    dateDeclaration? :  Date
    defunt? : Personne
    pere? : Personne
    mere? : Personne
    agentDeclareur? : string
    langueDeclaration? : string
    interprete? : string
    documents? : string
    agentLecteur? : string
    createdAt? : Date
    createdBy? : string
    modifiedAt? : Date
    modifiedBy? : string
}
