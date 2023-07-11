import { NgModule } from '@angular/core';
import { ServicesListingComponent } from './parametres/services/services-listing/services-listing.component';
import { SpecialitesListingComponent } from './parametres/specialites/specialites-listing/specialites-listing.component';
import { ChambresListingComponent } from './parametres/chambres/chambres-listing/chambres-listing.component';
import { TypeRvsListingComponent } from './parametres/type-rvs/type-rvs-listing/type-rvs-listing.component';
import { TypeConsultListingComponent } from './parametres/type-consult/type-consult-listing/type-consult-listing.component';
import { TypeExamenListingComponent } from './parametres/type-examen/type-examen-listing/type-examen-listing.component';
import { BaseMedicamentListingComponent } from './parametres/base-medicament/base-medicament-listing/base-medicament-listing.component';
import { BaseDiagnostiqueListingComponent } from './parametres/base-diagnostique/base-diagnostique-listing/base-diagnostique-listing.component';
import { ProfilListingComponent } from './parametres/profil/profil-listing/profil-listing.component';
import { PersonnelListingComponent } from './parametres/personnel/personnel-listing/personnel-listing.component';
import { UtilisateursListingComponent } from './parametres/utilisateurs/utilisateurs-listing/utilisateurs-listing.component';
import { UpdateComponent } from './parametres/update/update.component';
import { LicenceComponent } from './parametres/licence/licence.component';
import { MenuConfigComponent } from './parametres/menu-config/menu-config.component';
import { PatientsListingComponent } from './patients/patients-listing/patients-listing.component';
import { ConsultationsListingComponent } from './consultations/consultations-listing/consultations-listing.component';
import { OrdonnancesListingComponent } from './ordonnances/ordonnances-listing/ordonnances-listing.component';
import { RdvListingComponent } from './rendez-vous/rdv-listing/rdv-listing.component';
import { DashbordComponent } from './dashbord/dashbord.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'parametres/services/services-listing', component: ServicesListingComponent },
  { path: 'parametres/specialites/specialites-listing', component: SpecialitesListingComponent },
  { path: 'parametres/chambres/chambres-listing', component: ChambresListingComponent },
  { path: 'parametres/type-rvs/type-rvs-listing', component: TypeRvsListingComponent },
  { path: 'parametres/type-consult/type-consult-listing', component: TypeConsultListingComponent },
  { path: 'parametres/type-examen/type-examen-listing', component: TypeExamenListingComponent },
  { path: 'parametres/base-medicament/base-medicament-listing', component: BaseMedicamentListingComponent },
  { path: 'parametres/base-diagnostique/base-diagnostique-listing', component: BaseDiagnostiqueListingComponent },
  { path: 'parametres/profil/profil-listing', component: ProfilListingComponent },
  { path: 'parametres/personnel/personnel-listing', component: PersonnelListingComponent },
  { path: 'parametres/utilisateurs/utilisateurs-listing', component: UtilisateursListingComponent },
  { path: 'parametres/update', component: UpdateComponent },
  { path: 'parametres/licence', component: LicenceComponent },
  { path: 'parametres/menu-config', component: MenuConfigComponent },
  { path: 'patients/patients-listing', component: PatientsListingComponent },
  { path: 'consultations/consultations-listing', component: ConsultationsListingComponent },
  { path: 'ordonnances/ordonnances-listing', component: OrdonnancesListingComponent },
  { path: 'rendez-vous/rdv-listing', component: RdvListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
