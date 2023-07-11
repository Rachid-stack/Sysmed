import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormArray, FormControl } from '@angular/forms';
import { OrdonnancesEditComponent } from '../../ordonnances/ordonnances-edit/ordonnances-edit.component';

@Component({
  selector: 'app-ordonnances-detail',
  templateUrl: './ordonnances-detail.component.html',
  styleUrls: ['./ordonnances-detail.component.css']
})
export class OrdonnancesDetailComponent implements OnInit {
  @ViewChild(OrdonnancesEditComponent)
  private editComponent: OrdonnancesEditComponent;
  ordonnances: any;
  patient: any;
  private itemsPerPage = 5;
  private total = 0;

  constructor(private datePipe: DatePipe, private api: ServiceService, private router: Router, private formBuilder: FormBuilder) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  ngOnInit() {

  }

  getOneOrdonnance(id) {
    this.api.getById('ordonnance', id).subscribe(data => {
      /*if(data && data.length > 0){
        this.getPatient(data.id_patient);
        this.getOrdonnances(data.id_patient);
      }*/
      this.getPatient(data.id_patient);
      this.getOrdonnances(data.id_patient);
      console.log(data);
    }, err => { console.log(err); });
  }


  getPatient(id){
    this.api.getById('patient', id).subscribe(data => {
      this.patient = data;
      this.patient.nom_prenom = "---";
      this.getPPersonne(this.patient, this.patient.id_personne);
      console.log(data);
    }, err => { console.log(err); });
  }

  getOrdonnances(id){
    this.api.getAllWhere('ordonnance', id).subscribe(data => {
      this.ordonnances = data;
      for(var i=0; i < this.ordonnances.length; i++){
        this.ordonnances[i].medecin = '---';
        this.getMedecin(this.ordonnances[i], this.ordonnances[i].id_medecin);
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

  getPPersonne(patient, id_personne){
    this.api.getById('personne', id_personne).subscribe(data => {
      patient.nom_prenom = data.nom_pers + ' ' + data.prenom_pers;
    }, err => { console.log(err); });
  }


  setPatient(id){
    this.getOneOrdonnance(id);

  }


  openEdit(id) {
    this.editComponent.setEditOrdonnance(id);
    this.editComponent.openPopup();
  }
}


