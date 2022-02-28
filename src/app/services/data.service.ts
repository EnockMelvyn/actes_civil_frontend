import { Injectable } from '@angular/core';
import { Deces } from '../interfaces/deces';
import { Mariage } from '../interfaces/mariage';
import { Naissance } from '../interfaces/naissance';
import *  as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  naissance : Naissance = {}
  deces : Deces = {}
  mariage : Mariage = {}
  constructor() { }

  public setNaissance(naissance:Naissance) {
    this.naissance = naissance
  }
  public setDeces(deces:Deces) {
    this.deces = deces
  }

  public exportToExcel (jsonArry: any, fileName:string) {
    // XLSX.utils.
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(jsonArry);
  
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Page 1');
  
    /* save to file */  
    XLSX.writeFile(wb,fileName);
  }
}
