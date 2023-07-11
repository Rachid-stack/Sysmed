import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../services/service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from '../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consultations-add-send',
  templateUrl: './consultations-add-send.component.html',
  styleUrls: ['./consultations-add-send.component.css']
})
export class ConsultationsAddSendComponent implements OnInit {
  @ViewChild('addConsultationSendModal') private content;
  id = null;
  consultationSendForm: FormGroup;
  modalReference: any = {};
  medecins: Array<any>;
  consultation: any;
  newCTransfert: any;
  transferts: any;
  actif_medecin: '';
  id_consultation = null;
  nom = '';
  code_patient: '';
  source: 'consultations';
  requesting: boolean;
  img_class = 'hidden';
  default_class = '';
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient, private modalConsultation: NgbModal,
              private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.consultationSendForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.newCTransfert = { id_consultation: '', id_medecin: '', date_transfert: '', note: '', actif: 1 };
    this.requesting = false;
    this.getMedecins();
  }

  /*getActifTransfert(id_consultation){
    this.api.getActif('ctransfert', this.newCTransfert.id_consultation).subscribe(data => {
      if(data && data.length != 0){
        this.actif_medecin = data[0].id_medecin;
      }
    }, err => { console.log(err); });
  }*/

  getMPersonne(medecin){
    this.api.getById('personne', medecin.id_personne).subscribe(data => {
      medecin.nom = data.nom_pers + ' ' + data.prenom_pers;
    }, err => { console.log(err); });
  }

  getMedecins(){
    this.api.getAll('medecin').subscribe(data => {
      this.medecins = data;
      for(var i=0; i < this.medecins.length; i++){
        this.medecins[i].id = this.medecins[i]._id;
        this.medecins[i].nom = '';
        this.getMPersonne(this.medecins[i]);
      }
    }, err => { console.log(err); });
  }

  setSource(source){
    this.source = source;
  }

  getHistoriques(id_consultation){
    this.id_consultation = id_consultation;
    //this.getActifTransfert(id_consultation);
    this.api.getByChamp('ctransfert', id_consultation).subscribe(data => {
      this.transferts = data;
    }, err => { console.log(err); });
  }

  getConsultation(id){
    this.newCTransfert.id_consultation = id;
    this.newCTransfert.actif = 1;
    this.api.getById('consultation', id).subscribe(data => {
      this.consultation = data;
      this.getPatient(data.id_patient);
    }, err => { console.log(err); });
  }

  getPersonne(id_personne){
    this.api.getById('personne', id_personne).subscribe(data => {
      this.nom = data.nom_pers + ' ' + data.prenom_pers;
    }, err => { console.log(err); });
  }

  getPatient(id_patient){
    this.api.getById('patient', id_patient).subscribe(data => {
      this.code_patient = data.code_patient;
      this.getPersonne(data.id_personne);
    }, err => { console.log(err); });
  }

  open() {
    console.log(this.source);
    this.newCTransfert.id_medecin = '';
    this.newCTransfert.date_transfert = '';
    this.newCTransfert.note = '';
    this.img_class = 'hidden';
    this.default_class = '';
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalConsultation.open(this.content, this.ngbModalOptions);
  }

  save(){
    this.api.ajouter('ctransfert', this.newCTransfert).subscribe((res) => {
      this.api.getActif('ctransfert', this.newCTransfert.id_consultation).subscribe(data => {
        console.log(data);
        if(data && data.length == 2){
          data[0].actif = 0;
          this.api.modifier('ctransfert', data[0]).subscribe((res) => {

          });
        }
      }, err => { console.log(err); });
    });

    this.modalReference.close();
    if(this.source == 'consultations'){
      this.router.navigate(['/consultations/consultations-listing']);
    }else{
      this.router.navigate(['/patients/patients-listing']);
    }
  }

  ajouterConsultationSend(){
    this.save();
  }

}
