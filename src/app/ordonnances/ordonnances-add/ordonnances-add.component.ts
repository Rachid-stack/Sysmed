import { Component, OnInit, Renderer2 } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../services/service.service';
import { PatientsChooseComponent } from '../../patients/patients-choose/patients-choose.component';
import { FormBuilder, FormGroup, NgForm, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from '../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

//declare var $: any;

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ordonnances-add',
  templateUrl: './ordonnances-add.component.html',
  styleUrls: ['./ordonnances-add.component.css']
})
export class OrdonnancesAddComponent implements OnInit {
  @ViewChild(PatientsChooseComponent)
  private patientComponent: PatientsChooseComponent;
  @ViewChild('addOrdonnanceModal') private content;
  @ViewChild('medicamentLine') private medicamentLine;
  id = null;
  ordonnanceForm: FormGroup;
  modalReference: any = {};
  consultations: Array<any>;
  newOrdonnance: any;
  medicaments: any;
  medecins: any;
  id_patient = null;
  id_medecin = null;
  id_ordonnance = null;
  patientChoosed: any;
  medecinChoosed: any;
  nom = '';
  prenom = '';
  prescripteur = '';
  table = 'patient';
  code_patient: '';
  requesting: boolean;
  img_class = 'hidden';
  default_class = '';
  showTitle = true;
  nbr_line = 0;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };
  ordonnanceData = { code_patient: '', nom: '', prenom: '', titre: '', prescripteur: '', is_confidential: false };

  constructor(private http: HttpClient, private modalOrdonnance: NgbModal,
              private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder, private renderer: Renderer2) {  }

  ngOnInit() {
    this.ordonnanceForm = this.formBuilder.group({
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

    this.newOrdonnance = { id_patient: '', id_medecin: '', code_ordonnance: '', titre: '', is_confidential: false };
    this.requesting = false;
    this.getMedicaments();
    this.getMedecins();
  }

  get f () { return this.ordonnanceForm.controls; }

  get lineMedicaments(){
    return this.f.line_medicaments as FormArray;
  }

  addLineMedicament(){
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

  getMedecins() {
    this.api.getAll('medecin').subscribe(data => {
      this.medecins = data;
      for(var i=0; i < this.medecins.length; i++){
        this.medecins[i].nom = "";
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
    this.showTitle = true;
    if(this.table == 'patient'){
      this.patientChoosed = event.value;
      this.id_patient = this.patientChoosed._id;
      this.newOrdonnance.id_patient = this.id_patient;
      this.ordonnanceForm.patchValue({code_patient: this.patientChoosed.code_patient});
      this.api.getById('personne', this.patientChoosed.id_personne).subscribe(data => {
        this.ordonnanceForm.patchValue({nom: data.nom_pers, prenom: data.prenom_pers});
      }, err => { console.log(err); });
    }else{
      this.medecinChoosed = event.value;
      this.id_medecin = this.medecinChoosed._id;
      //this.newOrdonnance.id_medecin = this.medecinChoosed._id;
      this.api.getById('personne', this.medecinChoosed.id_personne).subscribe(data => {
        this.ordonnanceForm.patchValue({prescripteur: data.nom_pers+' '+data.prenom_pers});
      }, err => { console.log(err); });
    }
  }

  addMedicament(){
    this.nbr_line++;
    $('#medicamentLine').append("<tr id='"+this.nbr_line+"' class='tabline'><td width='50%'><input list='list_medicament' name='medicament' id='medicament"+this.nbr_line+"' type='text' autocomplete='on' class='form-control medicament' placeholder='m&eacute;dicament'></td><td width='20%'><input name='quantite' id='quantite"+this.nbr_line+"' type='text' class='form-control' placeholder='quantit&eacute;'></td><td width='29%'><input name='posologie' id='posologie"+this.nbr_line+"' type='text' class='form-control' placeholder='posologie'></td><td width='1%'><span class='fa fa-trash patient-select removeline' title='retirer la ligne' style='color: #008000; cursor: pointer;'></span></td></tr>");

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

  saveLignes(id_ordonnance){
    var lines_med = this.f.line_medicaments.value;
    for(var i=0; i<lines_med.length; i++){
      var lineData = {id_ordonnance: id_ordonnance, medicament: lines_med[i].medicament, quantite: lines_med[i].quantite, posologies: lines_med[i].posologie};
      this.api.ajouter('oligne', lineData).subscribe((res) => {

      });
    }
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/ordonnances/ordonnances-listing']);
  }

  ajouterOrdonnance(){
    this.requesting = true;
    this.newOrdonnance.id_patient = this.id_patient;
    this.newOrdonnance.id_medecin = this.id_medecin;
    this.newOrdonnance.code_ordonnance = "";
    this.newOrdonnance.titre = this.f.titre.value;
    this.newOrdonnance.is_confidential = this.f.is_confidential.value;
    this.api.ajouter('ordonnance', this.newOrdonnance).subscribe((res) => {
      this.newOrdonnance = {};
      this.id_ordonnance = res._id;
      if(this.id_ordonnance){
        this.saveLignes(this.id_ordonnance);
      }
    });
    //console.log(lines_med);
    this.closeModal();
    this.router.navigate(['/ordonnances/ordonnances-listing']);
  }

}
