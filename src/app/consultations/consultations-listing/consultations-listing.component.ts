import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../services/service.service';
import { ConsultationsEditComponent } from '../consultations-edit/consultations-edit.component';
import { ConsultationsAddSendComponent } from '../consultations-add-send/consultations-add-send.component';
import { ConsultationsDetailComponent } from '../consultations-detail/consultations-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultations-listing',
  templateUrl: './consultations-listing.component.html',
  styleUrls: ['./consultations-listing.component.css']
})
export class ConsultationsListingComponent implements OnInit {
  @ViewChild(ConsultationsDetailComponent)
  private detailComponent: ConsultationsDetailComponent;

  @ViewChild(ConsultationsEditComponent)
  private editComponent: ConsultationsEditComponent;
  @ViewChild(ConsultationsAddSendComponent)
  private addSendComponent: ConsultationsAddSendComponent;
  private itemsPerPage = 5;
  private total = 0;
  consultations: any;
  patients: any;
  personnes: any;
  specialites: any;
  titres: any;
  services: any;
  consultationChosed: any;

  constructor(private datePipe: DatePipe, private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getConsultations();
    this.getPatients();
  }

  getConsultations() {
    this.api.getAll('consultation').subscribe(data => {
      this.consultations = data; console.log(data);
      for(var i=0; i < this.consultations.length; i++){
        this.consultations[i].medecin = '---';
        this.getTransfertActif(this.consultations[i]);
      }
    }, err => { console.log(err); });
  }

  getTransfertActif(consultation){
    this.api.getActif('ctransfert', consultation._id).subscribe(data => {
      console.log(data);
      if(data && data.length != 0){
        this.getMedecin(consultation, data[0].id_medecin);
      }
    }, err => { console.log(err); });
  }

  getMedecin(consultation, id_medecin){
    this.api.getById('medecin', id_medecin).subscribe(data => {
      this.getMPersonne(consultation, data.id_personne);
    }, err => { console.log(err); });
  }

  getMPersonne(consultation, id_personne){
    this.api.getById('personne', id_personne).subscribe(data => {
      consultation.medecin = data.nom_pers + ' ' + data.prenom_pers;
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

  getOneConsultation(id) {
    this.api.getById('consultation', id).subscribe(data => { this.consultationChosed = data; console.log(data); }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditConsultation(id);
    this.editComponent.openPopup();
  }

  openSend(id) {
    this.addSendComponent.setSource('consultations');
    this.addSendComponent.getHistoriques(id);
    this.addSendComponent.getConsultation(id);
    this.addSendComponent.open();
  }

  choiseConsultation(id){
    this.getOneConsultation(id);
    this.detailComponent.getConsultation(id);
  }

  openFiche(id){

  }

}
