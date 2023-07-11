import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../services/service.service';
import { PatientsChooseComponent } from '../../patients/patients-choose/patients-choose.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ModalOptions } from '../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-ordonnances-edit',
  templateUrl: './ordonnances-edit.component.html',
  styleUrls: ['./ordonnances-edit.component.css']
})
export class OrdonnancesEditComponent implements OnInit {
  @ViewChild(PatientsChooseComponent)
  private patientComponent: PatientsChooseComponent;

  @ViewChild('editOrdonnanceModal') private content;

  id = null;
  editOrdonnanceForm: FormGroup;
  editOrdonnance: any;
  modalReference: any = {};
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };
  table = 'patient';
  id_patient = null;
  id_medecin = null;
  requesting: boolean;
  img_class = 'hidden';
  default_class = '';
  patientChoosed: any;
  medecinChoosed: any;
  medicaments: any;
  nbr_line = 0;


  editData = { code_patient: '', nom: '', prenom: '', prescripteur: '', titre: '', is_confidential: false };

  constructor(private http: HttpClient, private modalOrdonnance: NgbModal,
              private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) {}



  ngOnInit() {
      this.editOrdonnanceForm = this.formBuilder.group({
          code_patient: [],
          nom: [],
          prenom: [],
          titre: [],
          prescripteur: [],
          is_confidential: [],
          line_medicaments: this.formBuilder.array([
              this.formBuilder.group({
                  medicament: [],
                  quantite: [],
                  posologie: []
              })
          ])
      });

    this.editOrdonnance = { id_patient: '', id_medecin: '', code_ordonnance: '', titre: '', is_confidential: false };
    this.requesting = false;
      this.getMedicaments();
  }

    get f () { return this.editOrdonnanceForm.controls; }


    get lineMedicaments(){
        return this.f.line_medicaments as FormArray;
    }

    editLineMedicament(){
        this.lineMedicaments.push(this.formBuilder.group({
            medicament: [],
            quantite: [],
            posologie: []
        }));
    }

    removeLineMedicament(index){
        if(this.lineMedicaments.length > 1){
            this.lineMedicaments.removeAt(index);
        }

    }

    getMedicaments() {
        this.api.getAll('bmedicament').subscribe(data => {
            this.medicaments = data;
            for(var i=0; i < this.medicaments.length; i++){
                this.medicaments[i].selected = false;
            }
        }, err => { console.log(err); });
    }

    getLineMedicaments(id){
        this.api.getAllWhere('oligne', id).subscribe(data => {
            for(var i=0; i<this.lineMedicaments.length; i++){
                this.lineMedicaments.removeAt(i);
            }
            for(var i=0; i<data.length; i++){
                var lineData = data[i];
                this.lineMedicaments.push(this.formBuilder.group({
                    medicament: [lineData.medicament],
                    quantite: [lineData.quantite],
                    posologie: [lineData.posologies]
                }));
            }

        }, err => { console.log(err); });
    }

  open() {
    this.img_class = 'hidden';
    this.default_class = '';
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalOrdonnance.open(this.content, this.ngbModalOptions);
  }

  choosePatient(){
    this.table = 'patient';
    this.patientComponent.setTable(this.table);
    this.patientComponent.openPopup();
  }

  choosePrescripteur(){
    this.table = 'medecin';
    this.patientComponent.setTable(this.table);
    this.patientComponent.openPopup();
  }

  setPatient(event){
    //this.showTitle = true;
    if(this.table == 'patient'){
      this.patientChoosed = event.value;
      this.id_patient = this.patientChoosed._id;
      this.editOrdonnance.id_patient = this.id_patient;
      //this.editData.code_patient = this.patientChoosed.code_patient;
      this.editOrdonnanceForm.patchValue({code_patient: this.patientChoosed.code_patient});

        this.api.getById('personne', this.patientChoosed.id_personne).subscribe(data => {
            this.editOrdonnanceForm.patchValue({nom: data.nom_pers, prenom: data.prenom_pers});
        }, err => { console.log(err); });
    }else{
      this.medecinChoosed = event.value;
      this.editOrdonnance.id_medecin = this.medecinChoosed._id;
      //this.code_medecin = this.medecinChoosed.code_medecin;
      this.api.getById('personne', this.medecinChoosed.id_personne).subscribe(data => {
          this.editOrdonnanceForm.patchValue({prescripteur: data.nom_pers+' '+data.prenom_pers});
       // this.editData.prescripteur = data.nom_pers+' '+data.prenom_pers;
      }, err => { console.log(err); });
    }
  }


  getOline(){

    for(var i=0; i < this.medicaments.length; i++){
      this.nbr_line++;
      $('#medicamentLine').append("<tr id='"+i+"' class='.tabline'><td width='50%'><input list='list_medicament' name='medicament' id='medicament"+i+"' type='text' class='form-control medicament' placeholder='m&eacute;dicament'></td><td width='20%'><input name='quantite' id='quantite"+i+"' type='text' class='form-control' placeholder='quantit&eacute;'></td><td width='29%'><input name='posologie' id='posologie"+i+"' type='text' class='form-control' placeholder='posologie'></td><td width='1%'><span class='fa fa-trash patient-select removeline' title='retirer la ligne' style='color: #008000; cursor: pointer;'></span></td></tr>");
    }

    $('.removeline').each(function(){
      $(this).click(function(){
        var nbr_l = $('.removeline').length;
        if(nbr_l > 1){
          var line_to_remove = $(this).parent().parent();//$(this).parent().parent();
          line_to_remove.remove();
        }
      });
    });
  }

  /*setPatient(event){
    this.showTitle = true;
    this.patientChoosed = event.value;
    this.id_patient = this.patientChoosed._id;
    this.newOrdonnance.id_patient = this.id_patient;
    this.editData.code_pers = this.patientChoosed.code_patient;
    this.getOnePersonne(this.patientChoosed.id_personne);
  }*/


  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/ordonnances/ordonnances-listing']);
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this. editData = { code_patient: '', nom: '', prenom: '', prescripteur: '', titre: '', is_confidential: false };
    this.modalReference = this.modalOrdonnance.open(this.content, this.ngbModalOptions);
  }

  setEditOrdonnance(id){
    this.getOneOrdonnance(id);
    this.getLineMedicaments(id);
    console.log(this.editOrdonnance);
    console.log(this.medicaments);
  }


  getOnePatient(id){
    this.api.getById('patient', id).subscribe(data => {
      this.id_patient = data._id;
        this.editOrdonnanceForm.patchValue({code_patient: data.code_patient});
      //this.editData.code_patient = data.code_patient;
      this.getOnePersonne(data.id_personne);
    }, err => { console.log(err); });
  }

  getOneMedecin(id){
    this.api.getById('medecin', id).subscribe(data => {
      this.id_medecin = data._id;
       // this.editOrdonnanceForm.patchValue({code_medecin: data.code_medecin});
      this.getOneMPersonne(data.id_personne);
    }, err => { console.log(err); });
  }

  getOnePersonne(id){
    this.api.getById('personne', id).subscribe(data => {
      //this.editData.nom = data.nom_pers;
      //this.editData.prenom = data.prenom_pers;
        this.editOrdonnanceForm.patchValue({nom: data.nom_pers, prenom: data.prenom_pers});
      //this.editOrdonnanceForm.setValue(this.editData);
    }, err => { console.log(err); });
  }

  getOneMPersonne(id){
    this.api.getById('personne', id).subscribe(data => {
      //this.editData.prescripteur = data.nom_pers+' '+data.prenom_pers;
        this.editOrdonnanceForm.patchValue({prescripteur: data.nom_pers+' '+data.prenom_pers});

    }, err => { console.log(err); });
  }

  getOneOrdonnance(id){
    this.api.getById('ordonnance', id).subscribe(data => {
      this.id = id;
      this.editOrdonnance = data; console.log(data);
      this.editOrdonnanceForm.patchValue({titre: data.titre, is_confidential: data.is_confidential});
      if(data.id_medecin && data.id_medecin != ''){
        this.getOneMedecin(data.id_medecin);
      }
      if(data.id_patient && data.id_patient != ''){
        this.getOnePatient(data.id_patient);
      }
    }, err => { console.log(err); });

  }

  editMedicament(){
    this.nbr_line++;
    $('#medicamentLine').append("<tr id='"+this.nbr_line+"' class='.tabline'><td width='50%'><input name='medicament' id='medicament"+this.nbr_line+"' type='text' autocomplete='on' class='form-control medicament' placeholder='m&eacute;dicament'></td><td width='20%'><input name='quantite' id='quantite"+this.nbr_line+"' type='text' class='form-control' placeholder='quantit&eacute;'></td><td width='29%'><input name='posologie' id='posologie"+this.nbr_line+"' type='text' class='form-control' placeholder='posologie'></td><td width='1%'><span class='fa fa-trash patient-select removeline' title='retirer la ligne' style='color: #008000; cursor: pointer;'></span></td></tr>");

    $('.removeline').each(function(){
      $(this).click(function(){
        var nbr_l = $('.removeline').length;
        if(nbr_l > 1){
          var line_to_remove = $(this).parent().parent();//$(this).parent().parent();
          line_to_remove.remove();
        }
      });
    });
  }


    modifierOrdonnance() {
        this.requesting = true;
        this.editOrdonnance.id_patient = this.id_patient;
        this.editOrdonnance.id_medecin = this.id_medecin;
        this.editOrdonnance.code_ordonnance = "";
        this.editOrdonnance.titre = this.f.titre.value;
        this.editOrdonnance.is_confidential = this.f.is_confidential.value;

        this.api.modifier('ordonnance', this.editOrdonnance).subscribe((res) => {
            console.log(res);
            this.requesting = false;
            this.editOrdonnance = {};
            this.id = res._id;
            if(this.id){
                this.saveLignes(this.id);
            }
            this.closeModal();
            this.router.navigate(['/ordonnances/ordonnances-listing']);
        });
    }


  saveLignes(id_ordonnance){
      var lines_med = this.f.line_medicaments.value;
      this.removeAllOline(id_ordonnance);
      for(var i=0; i<lines_med.length; i++){
          var lineData = {id_ordonnance: id_ordonnance, medicament: lines_med[i].medicament, quantite: lines_med[i].quantite, posologies: lines_med[i].posologie};
          this.api.ajouter('oligne', lineData).subscribe((res) => {

          });
      }
  }

    removeAllOline(id_ordonnance){
        this.api.getAllWhere('oligne', id_ordonnance).subscribe(data => {
            for(var i=0; i<data.length; i++){
                this.supprimerOLine(data[i]);
            }
        }, err => { console.log(err); });
    }

    supprimerOLine(olineData){
        this.api.supprimer('oligne/', olineData).subscribe((res) => {
            console.log(res);
        });
    }

  supprimerOrdonnance() {
    this.requesting = true;
    this.editOrdonnance.del = 1;

    this.api.supprimer('ordonnance/', this.editOrdonnance).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/ordonnances/ordonnances-listing']);
    });
 }

}

