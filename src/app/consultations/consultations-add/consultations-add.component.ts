import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../services/service.service';
import { PatientsChooseComponent } from '../../patients/patients-choose/patients-choose.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from '../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consultations-add',
  templateUrl: './consultations-add.component.html',
  styleUrls: ['./consultations-add.component.css']
})
export class ConsultationsAddComponent implements OnInit {
  @ViewChild(PatientsChooseComponent)
  private patientComponent: PatientsChooseComponent;
  @ViewChild('addConsultationModal') private content;
  id = null;
  consultationForm: FormGroup;
  modalReference: any = {};
  consultations: Array<any>;
  newConsultation: any;
  newReleve: any;
  releveData: any;
  motifs: any;
  specialites: any;
  tconstantes: any;
  id_patient = null;
  id_consultation = null;
  patientChoosed: any;
  nom = '';
  prenom = '';
  code_patient: '';
  checkedMotifs = false;
  requesting: boolean;
  img_class = 'hidden';
  default_class = '';
  showTitle = true;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient, private modalConsultation: NgbModal,
              private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.consultationForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.releveData = { id_consultation: '', id_tconstante: '', valeur: '' };
    this.newReleve = { taille: '', poids: '', imc: '', suface_corps: '', temperature: '', pouls: '', tad: '', tas: '' };
    this.newConsultation = { code_consultation: '', id_specialite: '', libelle_consultation: '', commentaire_consultation: '', resultat_consultation: '', date_consultation: '' };
    this.requesting = false;
    this.getMotifs();
    this.getSpecialites();
    this.getTypeConstantes();
  }

  getMotifs() {
    this.api.getAll('cmotif').subscribe(data => {
      this.motifs = data;
      for(var i=0; i < this.motifs.length; i++){
        this.motifs[i].checked = false;
      }
    }, err => { console.log(err); });
  }

  getTypeConstantes() {
    this.api.getAll('tconstante').subscribe(data => {
      this.tconstantes = data;
    }, err => { console.log(err); });
  }

  getSpecialites() {
    this.api.getAll('specialite').subscribe(data => {
      this.specialites = data;
    }, err => { console.log(err); });
  }

  setPatient(event){
    this.showTitle = true;
    this.patientChoosed = event.value;
    this.id_patient = this.patientChoosed._id;
    this.newConsultation.id_patient = this.id_patient;
    this.code_patient = this.patientChoosed.code_patient;
    this.api.getById('personne', this.patientChoosed.id_personne).subscribe(data => {
      this.nom = data.nom_pers;
      this.prenom = data.prenom_pers;
    }, err => { console.log(err); });
  }

  getPatient(id){
    this.showTitle = false;
    this.id_patient = id;
    this.newConsultation.id_patient = this.id_patient;
    this.api.getById('patient', id).subscribe(data => {
      this.patientChoosed = data;
      this.code_patient = this.patientChoosed.code_patient;
      this.api.getById('personne', this.patientChoosed.id_personne).subscribe(data => {
        this.nom = data.nom_pers;
        this.prenom = data.prenom_pers;
      }, err => { console.log(err); });
    }, err => { console.log(err); });
  }

  hiddeTitle(){
    this.showTitle = false;
  }

  addRemoveData(motif){
    motif.checked = !motif.checked;
    this.controleCheckedMotif();
  }

  controleCheckedMotif(){
    this.checkedMotifs = false;
    for(var i=0; i < this.motifs.length; i++){
      if(this.motifs[i].checked){
        this.checkedMotifs = true;
      }
    }
  }

  saveMotif(id){
    for(var i=0; i < this.motifs.length; i++){
      if(this.motifs[i].checked){
        const mconsultationData = { id_consultation: id, id_motif: this.motifs[i]._id };
        this.api.ajouter('mconsultation', mconsultationData).subscribe((res) => {
          console.log(res);
        });
      }
    }
  }

  saveReleve(id){
    this.releveData.id_consultation = id;
    this.api.getAllWhere('tconstante','TAILLE').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.taille;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','POIDS').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.poids;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','IMC').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.imc;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','SC').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.sc;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TEMPERATURE').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.temperature;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','POULS').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.pouls;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TAD').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.tad;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TAS').subscribe(data => {
      this.releveData.id_tconstante = data[0]._id;
      this.releveData.valeur = this.newReleve.tas;
      this.api.ajouter('releve', this.releveData).subscribe((res) => {
        console.log(res);
      });
    }, err => { console.log(err); });
  }

  choosePatient(){
    this.patientComponent.openPopup();
  }

  open() {
    this.img_class = 'hidden';
    this.default_class = '';
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalConsultation.open(this.content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/consultations/consultations-listing']);
  }

  ajouterConsultation() {
    this.requesting = true;
    this.api.ajouter('consultation', this.newConsultation).subscribe((res) => {
      this.newConsultation = {};
      this.id_consultation = res._id;
      if(this.id_consultation){
        this.saveMotif(this.id_consultation);
        this.saveReleve(this.id_consultation);
      }
    });
    this.closeModal();
    this.router.navigate(['/consultations/consultations-listing']);
  }

}
