import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../../services/service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from '../../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base-medicament-edit',
  templateUrl: './base-medicament-edit.component.html',
  styleUrls: ['./base-medicament-edit.component.css']
})
export class BaseMedicamentEditComponent implements OnInit {
  @ViewChild('editBMedicamentModal') private content;
  id = null;
  editBMedicamentForm: FormGroup;
  modalReference: any = {};
  bmedicaments: Array<any>;
  code_bmedicament: String;
  libelle_bmedicament: String;
  desc_bmedicament: String;
  editBMedicament: any;
  form_pharmas: any;
  voie_admins: any;
  labos: any;
  requesting: boolean;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalBMedicament: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editBMedicamentForm = this.formBuilder.group({
      code_med: ['', Validators.required],
      nom_comercial: ['', Validators.required],
      nom_generique: ['', Validators.required],
      dosage_med: ['', Validators.required],
      form_pharma: ['', Validators.required],
      labo_pharma: ['', Validators.required],
      voie_admin: ['', Validators.required],
      is_generic: [''],
      prix_moyen: ['']
    });
    this.editBMedicament = { code_med: '', nom_comercial: '', nom_generique: '', dosage_med: '', form_pharma: '', labo_pharma: '', voie_admin: '', is_generic: false, prix_moyen: '' };
    this.getFPharmas();
    this.getVAdmins();
    this.getPHLabos();
    this.requesting = false;
    console.log(this.editBMedicament);
  }

  getFPharmas() {
    this.api.getAll('fpharmaceutique').subscribe(data => { this.form_pharmas = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  getVAdmins() {
    this.api.getAll('vadministration').subscribe(data => { this.voie_admins = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  getPHLabos() {
    this.api.getAll('phlabo').subscribe(data => { this.labos = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalBMedicament.open(this.content, this.ngbModalOptions);
  }

  setEditBMedicament(id){
    this.getOneBMedicament(id);
    console.log(this.editBMedicament);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
  }

  getOneBMedicament(id){
    this.api.getById('bmedicament', id).subscribe(data => {
      this.id = id;
      this.editBMedicament = data; console.log(data);
      const editData = { code_med: data.code_med, nom_comercial: data.nom_comercial, nom_generique: data.nom_generique, dosage_med: data.dosage_med, form_pharma: data.form_pharma, labo_pharma: data.labo_pharma, voie_admin: data.voie_admin, is_generic: data.is_generic, prix_moyen: data.prix_moyen };
      this.editBMedicamentForm.setValue(editData);
    }, err => { console.log(err); });
  }

  get f () { return this.editBMedicamentForm.controls; }

  modifierBMedicament() {
    this.requesting = true;
    this.editBMedicament.nom_comercial = this.f.nom_comercial.value;
    this.editBMedicament.nom_generique = this.f.nom_generique.value;
    this.editBMedicament.dosage_med = this.f.dosage_med.value;
    this.editBMedicament.form_pharma = this.f.form_pharma.value;
    this.editBMedicament.labo_pharma = this.f.labo_pharma.value;
    this.editBMedicament.voie_admin = this.f.voie_admin.value;
    this.editBMedicament.is_generic = this.f.is_generic.value;
    this.editBMedicament.prix_moyen = this.f.prix_moyen.value;
    //console.log(this.editBMedicament);
    this.api.modifier('bmedicament/', this.editBMedicament).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
    });
  }

  supprimerBMedicament() {
    this.requesting = true;
    this.editBMedicament.del = 1;
    //console.log(this.editBMedicament);
    this.api.supprimer('bmedicament/', this.editBMedicament).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
    });
  }

}
