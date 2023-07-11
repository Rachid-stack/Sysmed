import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularDraggableModule } from 'angular2-draggable';
import { NgxSortableModule } from 'ngx-sortable';
import { SortablejsModule } from 'angular-sortablejs';
/*import { AngularDraggableModule  } from 'ng-draggable';*/
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileSelectDirective , FileUploadModule } from 'ng2-file-upload';

import { ServiceService } from '../../services/service.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ServicesListingComponent } from './parametres/services/services-listing/services-listing.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ServicesAddComponent } from './parametres/services/services-add/services-add.component';
import { ServicesEditComponent } from './parametres/services/services-edit/services-edit.component';
import { ServicesDeleteComponent } from './parametres/services/services-delete/services-delete.component';
import { SpecialitesListingComponent } from './parametres/specialites/specialites-listing/specialites-listing.component';
import { SpecialitesAddComponent } from './parametres/specialites/specialites-add/specialites-add.component';
import { SpecialitesEditComponent } from './parametres/specialites/specialites-edit/specialites-edit.component';
import { SpecialitesDeleteComponent } from './parametres/specialites/specialites-delete/specialites-delete.component';
import { UnitesListingComponent } from './parametres/unites/unites-listing/unites-listing.component';
import { UnitesAddComponent } from './parametres/unites/unites-add/unites-add.component';
import { UnitesEditComponent } from './parametres/unites/unites-edit/unites-edit.component';
import { UnitesDeleteComponent } from './parametres/unites/unites-delete/unites-delete.component';
import { ChambresAddComponent } from './parametres/chambres/chambres-add/chambres-add.component';
import { ChambresEditComponent } from './parametres/chambres/chambres-edit/chambres-edit.component';
import { ChambresDeleteComponent } from './parametres/chambres/chambres-delete/chambres-delete.component';
import { ChambresListingComponent } from './parametres/chambres/chambres-listing/chambres-listing.component';
import { LitsListingComponent } from './parametres/lits/lits-listing/lits-listing.component';
import { LitsAddComponent } from './parametres/lits/lits-add/lits-add.component';
import { LitsEditComponent } from './parametres/lits/lits-edit/lits-edit.component';
import { LitsDeleteComponent } from './parametres/lits/lits-delete/lits-delete.component';
import { TypeRvsListingComponent } from './parametres/type-rvs/type-rvs-listing/type-rvs-listing.component';
import { TypeRvsAddComponent } from './parametres/type-rvs/type-rvs-add/type-rvs-add.component';
import { TypeRvsEditComponent } from './parametres/type-rvs/type-rvs-edit/type-rvs-edit.component';
import { TypeRvsDeleteComponent } from './parametres/type-rvs/type-rvs-delete/type-rvs-delete.component';
import { TypeConsultListingComponent } from './parametres/type-consult/type-consult-listing/type-consult-listing.component';
import { TypeConsultAddComponent } from './parametres/type-consult/type-consult-add/type-consult-add.component';
import { TypeConsultEditComponent } from './parametres/type-consult/type-consult-edit/type-consult-edit.component';
import { TypeConsultDeleteComponent } from './parametres/type-consult/type-consult-delete/type-consult-delete.component';
import { BaseMedicamentListingComponent } from './parametres/base-medicament/base-medicament-listing/base-medicament-listing.component';
import { BaseMedicamentAddComponent } from './parametres/base-medicament/base-medicament-add/base-medicament-add.component';
import { BaseMedicamentEditComponent } from './parametres/base-medicament/base-medicament-edit/base-medicament-edit.component';
import { BaseMedicamentDeleteComponent } from './parametres/base-medicament/base-medicament-delete/base-medicament-delete.component';
import { BaseDiagnostiqueListingComponent } from './parametres/base-diagnostique/base-diagnostique-listing/base-diagnostique-listing.component';
import { BaseDiagnostiqueAddComponent } from './parametres/base-diagnostique/base-diagnostique-add/base-diagnostique-add.component';
import { BaseDiagnostiqueEditComponent } from './parametres/base-diagnostique/base-diagnostique-edit/base-diagnostique-edit.component';
import { BaseDiagnostiqueDeleteComponent } from './parametres/base-diagnostique/base-diagnostique-delete/base-diagnostique-delete.component';
import { PrivilegesAddProfilComponent } from './parametres/privileges/privileges-add-profil/privileges-add-profil.component';
import { ProfilListingComponent } from './parametres/profil/profil-listing/profil-listing.component';
import { ProfilAddComponent } from './parametres/profil/profil-add/profil-add.component';
import { ProfilEditComponent } from './parametres/profil/profil-edit/profil-edit.component';
import { PrivilegesListingComponent } from './parametres/privileges/privileges-listing/privileges-listing.component';
import { PathologiesListingComponent } from './parametres/pathologies/pathologies-listing/pathologies-listing.component';
import { PathologiesAddComponent } from './parametres/pathologies/pathologies-add/pathologies-add.component';
import { PathologiesEditComponent } from './parametres/pathologies/pathologies-edit/pathologies-edit.component';
import { TypeExamenListingComponent } from './parametres/type-examen/type-examen-listing/type-examen-listing.component';
import { TypeExamenAddComponent } from './parametres/type-examen/type-examen-add/type-examen-add.component';
import { TypeExamenEditComponent } from './parametres/type-examen/type-examen-edit/type-examen-edit.component';
import { PersonnelListingComponent } from './parametres/personnel/personnel-listing/personnel-listing.component';
import { MedecinListingComponent } from './parametres/medecin/medecin-listing/medecin-listing.component';
import { MedecinAddComponent } from './parametres/medecin/medecin-add/medecin-add.component';
import { MedecinEditComponent } from './parametres/medecin/medecin-edit/medecin-edit.component';
import { PersonnelDetailComponent } from './parametres/personnel/personnel-detail/personnel-detail.component';
import { UtilisateursListingComponent } from './parametres/utilisateurs/utilisateurs-listing/utilisateurs-listing.component';
import { UtilisateursAddComponent } from './parametres/utilisateurs/utilisateurs-add/utilisateurs-add.component';
import { UtilisateursEditComponent } from './parametres/utilisateurs/utilisateurs-edit/utilisateurs-edit.component';
import { UtilisateursDetailComponent } from './parametres/utilisateurs/utilisateurs-detail/utilisateurs-detail.component';
import { PersonneChooseComponent } from './parametres/personnel/personne-choose/personne-choose.component';
import { InfirmierListingComponent } from './parametres/infirmier/infirmier-listing/infirmier-listing.component';
import { InfirmierAddComponent } from './parametres/infirmier/infirmier-add/infirmier-add.component';
import { InfirmierEditComponent } from './parametres/infirmier/infirmier-edit/infirmier-edit.component';
import { PersonnelAdminListingComponent } from './parametres/personnel-admin/personnel-admin-listing/personnel-admin-listing.component';
import { PersonnelAdminAddComponent } from './parametres/personnel-admin/personnel-admin-add/personnel-admin-add.component';
import { PersonnelAdminEditComponent } from './parametres/personnel-admin/personnel-admin-edit/personnel-admin-edit.component';
import { UpdateComponent } from './parametres/update/update.component';
import { LicenceComponent } from './parametres/licence/licence.component';
import { MenuConfigComponent } from './parametres/menu-config/menu-config.component';
import { PatientsListingComponent } from './patients/patients-listing/patients-listing.component';
import { PatientsAddComponent } from './patients/patients-add/patients-add.component';
import { PatientsEditComponent } from './patients/patients-edit/patients-edit.component';
import { ConsultationsListingComponent } from './consultations/consultations-listing/consultations-listing.component';
import { ConsultationsAddComponent } from './consultations/consultations-add/consultations-add.component';
import { ConsultationsEditComponent } from './consultations/consultations-edit/consultations-edit.component';
import { PatientsChooseComponent } from './patients/patients-choose/patients-choose.component';
import { PatientsDetailComponent } from './patients/patients-detail/patients-detail.component';
import { ConsultationsAddSendComponent } from './consultations/consultations-add-send/consultations-add-send.component';
import { ConsultationsDetailComponent } from './consultations/consultations-detail/consultations-detail.component';
import { OrdonnancesListingComponent } from './ordonnances/ordonnances-listing/ordonnances-listing.component';
import { OrdonnancesAddComponent } from './ordonnances/ordonnances-add/ordonnances-add.component';
import { OrdonnancesEditComponent } from './ordonnances/ordonnances-edit/ordonnances-edit.component';
import { RdvListingComponent } from './rendez-vous/rdv-listing/rdv-listing.component';
import { RdvAddComponent } from './rendez-vous/rdv-add/rdv-add.component';
import { RdvEditComponent } from './rendez-vous/rdv-edit/rdv-edit.component';
import { OrdonnancesDetailComponent } from './ordonnances/ordonnances-detail/ordonnances-detail.component';
import { RdvDetailComponent } from './rendez-vous/rdv-detail/rdv-detail.component';
import { LoginComponent } from './login/login.component';
import { RdvAgendaComponent } from './rendez-vous/rdv-agenda/rdv-agenda.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ServicesListingComponent,
    DashbordComponent,
    ServicesAddComponent,
    ServicesEditComponent,
    ServicesDeleteComponent,
    SpecialitesListingComponent,
    SpecialitesAddComponent,
    SpecialitesEditComponent,
    SpecialitesDeleteComponent,
    UnitesListingComponent,
    UnitesAddComponent,
    UnitesEditComponent,
    UnitesDeleteComponent,
    ChambresAddComponent,
    ChambresEditComponent,
    ChambresDeleteComponent,
    ChambresListingComponent,
    LitsListingComponent,
    LitsAddComponent,
    LitsEditComponent,
    LitsDeleteComponent,
    TypeRvsListingComponent,
    TypeRvsAddComponent,
    TypeRvsEditComponent,
    TypeRvsDeleteComponent,
    TypeConsultListingComponent,
    TypeConsultAddComponent,
    TypeConsultEditComponent,
    TypeConsultDeleteComponent,
    BaseMedicamentListingComponent,
    BaseMedicamentAddComponent,
    BaseMedicamentEditComponent,
    BaseMedicamentDeleteComponent,
    BaseDiagnostiqueListingComponent,
    BaseDiagnostiqueAddComponent,
    BaseDiagnostiqueEditComponent,
    BaseDiagnostiqueDeleteComponent,
    PrivilegesAddProfilComponent,
    ProfilListingComponent,
    ProfilAddComponent,
    ProfilEditComponent,
    PrivilegesListingComponent,
    PathologiesListingComponent,
    PathologiesAddComponent,
    PathologiesEditComponent,
    TypeExamenListingComponent,
    TypeExamenAddComponent,
    TypeExamenEditComponent,
    PersonnelListingComponent,
    MedecinListingComponent,
    MedecinAddComponent,
    MedecinEditComponent,
    PersonnelDetailComponent,
    UtilisateursListingComponent,
    UtilisateursAddComponent,
    UtilisateursEditComponent,
    UtilisateursDetailComponent,
    PersonneChooseComponent,
    InfirmierListingComponent,
    InfirmierAddComponent,
    InfirmierEditComponent,
    PersonnelAdminListingComponent,
    PersonnelAdminAddComponent,
    PersonnelAdminEditComponent,
    UpdateComponent,
    LicenceComponent,
    MenuConfigComponent,
    PatientsListingComponent,
    PatientsAddComponent,
    PatientsEditComponent,
    ConsultationsListingComponent,
    ConsultationsAddComponent,
    ConsultationsEditComponent,
    PatientsChooseComponent,
    PatientsDetailComponent,
    ConsultationsAddSendComponent,
    ConsultationsDetailComponent,
    OrdonnancesListingComponent,
    OrdonnancesAddComponent,
    OrdonnancesEditComponent,
    RdvListingComponent,
    RdvAddComponent,
    RdvEditComponent,
    OrdonnancesDetailComponent,
    RdvDetailComponent,
    LoginComponent,
    RdvAgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    NgbModule.forRoot(),
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    AngularDraggableModule,
    NgxSortableModule,
    BrowserAnimationsModule,
    SortablejsModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
  ],
  providers: [ServiceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
