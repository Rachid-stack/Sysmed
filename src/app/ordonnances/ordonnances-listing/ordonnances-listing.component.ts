///<reference path="..\ordonnances-edit\ordonnances-edit.component.ts"/>
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../services/service.service';
import { OrdonnancesEditComponent } from '../ordonnances-edit/ordonnances-edit.component';
/*import { ConsultationsAddSendComponent } from '../consultations-add-send/consultations-add-send.component';*/
import { OrdonnancesDetailComponent } from '../ordonnances-detail/ordonnances-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordonnances-listing',
  templateUrl: './ordonnances-listing.component.html',
  styleUrls: ['./ordonnances-listing.component.css']
})
export class OrdonnancesListingComponent implements OnInit {

  @ViewChild(OrdonnancesEditComponent)
  private editComponent: OrdonnancesEditComponent;
  @ViewChild(OrdonnancesDetailComponent)
  private detailComponent: OrdonnancesDetailComponent;
  private itemsPerPage = 5;
  private total = 0;
  ordonnances: any;
  patients: any;
  personnes: any;
  specialites: any;
  titres: any;
  services: any;
  ordonnanceChosed: any;
  patientChosed: any;

  constructor(private datePipe: DatePipe, private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getOrdonnances();
    this.getPatients();
  }

  getOrdonnances() {
    this.api.getAll('ordonnance').subscribe(data => {
      this.ordonnances = data; console.log(data);
      for(var i=0; i < this.ordonnances.length; i++){
       this.ordonnances[i].medecin = '---';
       this.getMedecin(this.ordonnances[i], this.ordonnances[i].id_medecin);
       }
    }, err => { console.log(err); });
  }

  getTransfertActif(ordonnance){
    this.api.getActif('ctransfert', ordonnance._id).subscribe(data => {
      console.log(data);
      if(data && data.length != 0){
        this.getMedecin(ordonnance, data[0].id_medecin);
      }
    }, err => { console.log(err); });
  }

  getMedecin(ordonnance, id_medecin){
    this.api.getById('medecin', id_medecin).subscribe(data => {
      this.getMPersonne(ordonnance, data.id_personne);
    }, err => { console.log(err); });
  }

  getMPersonne(ordonnance, id_personne){
    this.api.getById('personne', id_personne).subscribe(data => {
      ordonnance.medecin = data.nom_pers + ' ' + data.prenom_pers;
    }, err => { console.log(err); });
  }

  getPatients(){
    this.api.getAll('patient').subscribe(data => {
      this.patients = data;
      this.getPersonnes();
    }, err => { console.log(err); });
  }

  getPNP(){
    for(var i=0; i < this.patients.length; i++){
      for(var j=0; j < this.personnes.length; j++){
        if(this.patients[i].id_personne == this.personnes[j]._id){
          this.patients[i].nom_prenom = this.personnes[j].nom_pers + ' ' + this.personnes[j].prenom_pers;
        }
      }
    }
    console.log(this.patients);
  }

  getPersonnes() {
    this.api.getAll('personne').subscribe(data => {
      this.personnes = data;
      this.getPNP();
    }, err => { console.log(err); });
  }

  getOneOrdonnance(id) {
    this.api.getById('ordonnance', id).subscribe(data => { this.ordonnanceChosed = data; console.log(data); }, err => { console.log(err); });
  }

  getOnePatient(id) {
    this.api.getById('patient', id).subscribe(data => { this.patientChosed = data; console.log(data); }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditOrdonnance(id);
    this.editComponent.open();
  }

  openSend(id) {
    /*this.addSendComponent.setSource('ordonnances');
    this.addSendComponent.getHistoriques(id);
    this.addSendComponent.getOrdonnance(id);
    this.addSendComponent.open();*/
  }

  choiseOrdonnance(id){
    //this.getOnePatient(id);
    this.detailComponent.setPatient(id);
  }

  openFiche(id){

  }

}
