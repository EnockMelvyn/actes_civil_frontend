import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormNaissanceComponent } from './components/form-naissance/form-naissance.component';
import { ListNaissanceComponent } from './components/list-naissance/list-naissance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { ListNaissancesValideComponent } from './components/list-naissances-valide/list-naissances-valide.component';
import { ListDecesComponent } from './components/list-deces/list-deces.component';
import { FormDecesComponent } from './components/form-deces/form-deces.component';
import { LoginComponent } from './components/login/login.component';
import { AccueilComponent } from './components/accueil/accueil.component'
import { AuthInterceptor } from './helper/auth.interceptor';
import { ListComponent } from './components/utilisateur/list/list.component';
import { FormComponent } from './components/utilisateur/form/form.component';
import { AddRoleToUserComponent } from './components/utilisateur/add-role-to-user/add-role-to-user.component';
import { ListMariageComponent } from './components/mariage/list-mariage/list-mariage.component';
import { FormMariageComponent } from './components/mariage/form-mariage/form-mariage.component';
import { FormRdvMariageComponent } from './components/mariage/form-rdv-mariage/form-rdv-mariage.component';
import { MariageReportComponent } from './components/reporting/mariage-report/mariage-report.component';
import { NaissanceReportComponent } from './components/reporting/naissance-report/naissance-report.component';
import { DecesReportComponent } from './components/reporting/deces-report/deces-report.component';
import { MonProfilComponent } from './components/utilisateur/mon-profil/mon-profil.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FormNaissanceComponent,
    ListNaissanceComponent,
    ListNaissancesValideComponent,
    ListDecesComponent,
    FormDecesComponent,
    LoginComponent,
    AccueilComponent,
    ListComponent,
    FormComponent,
    AddRoleToUserComponent,
    ListMariageComponent,
    FormMariageComponent,
    FormRdvMariageComponent,
    MariageReportComponent,
    NaissanceReportComponent,
    DecesReportComponent,
    MonProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    HighchartsChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
