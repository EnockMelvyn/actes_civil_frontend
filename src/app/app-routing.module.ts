import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormDecesComponent } from './components/form-deces/form-deces.component';
import { FormNaissanceComponent } from './components/form-naissance/form-naissance.component';
import { ListDecesComponent } from './components/list-deces/list-deces.component';
import { ListNaissanceComponent } from './components/list-naissance/list-naissance.component';
import { LoginComponent } from './components/login/login.component';
import { FormMariageComponent } from './components/mariage/form-mariage/form-mariage.component';
import { FormRdvMariageComponent } from './components/mariage/form-rdv-mariage/form-rdv-mariage.component';
import { ListMariageComponent } from './components/mariage/list-mariage/list-mariage.component';
import { DecesReportComponent } from './components/reporting/deces-report/deces-report.component';
import { MariageReportComponent } from './components/reporting/mariage-report/mariage-report.component';
import { NaissanceReportComponent } from './components/reporting/naissance-report/naissance-report.component';
import { AddRoleToUserComponent } from './components/utilisateur/add-role-to-user/add-role-to-user.component';
import { FormComponent } from './components/utilisateur/form/form.component';
import { ListComponent } from './components/utilisateur/list/list.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // { path: '**', redirectTo: '' },
  {path:"", redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'accueil', component: AccueilComponent, canActivate : [AuthGuard]},
  {path:'naissance', children:[
    {path:'liste/statut/:statut', component: ListNaissanceComponent, canActivate : [AuthGuard]},
    {path:'liste/statut', component: ListNaissanceComponent, canActivate : [AuthGuard]},
    // {path:'liste/statut/valide', component: ListNaissanceComponent},
    {path:'enregistrer', component: FormNaissanceComponent , canActivate : [AuthGuard]}
  ]},
  {path:'mariage', children:[
    {path:'liste/:statut', component: ListMariageComponent, canActivate : [AuthGuard]},
    {path:'rdv', component: FormRdvMariageComponent, canActivate : [AuthGuard]},
    //{path:'liste/statut', component: ListNaissanceComponent},
    // {path:'liste/statut/valide', component: ListNaissanceComponent},
    {path:'enregistrer', component: FormMariageComponent, canActivate : [AuthGuard]}
  ]},
  {path:'deces', children:[
    {path:'liste/:statut', component: ListDecesComponent, canActivate : [AuthGuard]},
    //{path:'liste/statut', component: ListNaissanceComponent},
    // {path:'liste/statut/valide', component: ListNaissanceComponent},
    {path:'enregistrer', component: FormDecesComponent, canActivate : [AuthGuard]}
  ]},
  {path:'reporting', children:[
    {path:'naissance', component: NaissanceReportComponent, canActivate : [AuthGuard]},
    {path:'mariage', component: MariageReportComponent, canActivate : [AuthGuard]},
    {path:'deces', component: DecesReportComponent, canActivate : [AuthGuard]}
  ]},
  {path:'parametre', children:[
    {path:'utilisateur', children:[
      {path:'liste', component: ListComponent, canActivate : [AuthGuard]},
      {path:'addRole', component: AddRoleToUserComponent, canActivate : [AuthGuard]},
      //{path:'liste/statut', component: ListNaissanceComponent},
      // {path:'liste/statut/valide', component: ListNaissanceComponent},
      {path:'enregistrer', component: FormComponent, canActivate : [AuthGuard]}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
