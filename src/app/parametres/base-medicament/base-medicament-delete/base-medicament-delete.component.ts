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
  selector: 'app-base-medicament-delete',
  templateUrl: './base-medicament-delete.component.html',
  styleUrls: ['./base-medicament-delete.component.css']
})
export class BaseMedicamentDeleteComponent implements OnInit {
  @ViewChild('deleteBMedicamentModal') private content;

  id = null;
  deleteBMedicamentForm: FormGroup;
  modalReference: any = {};
  bmedicaments: Array<any>;
  code_bmedicament: String;
  libelle_bmedicament: String;
  desc_bmedicament: String;
  deleteBMedicament: any;
  requesting: boolean;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalBMedicament: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.deleteBMedicamentForm = this.formBuilder.group({
      nom_comercial: ['', Validators.required],
      nom_generique: ['', Validators.required],
      dosage_med: ['', Validators.required],
      forme_pharmacetique: [''],
      is_generic: [''],
      prix_moyen: ['']
    });
    this.deleteBMedicament = { nom_comercial: '', nom_generique: '', dosage_med: '', forme_pharmacetique: '', is_generic: 0, prix_moyen: 0 };
    this.requesting = false;
    console.log(this.deleteBMedicament);
  }

  setDeleteBMedicament(id){
    this.getOneBMedicament(id);
    console.log(this.deleteBMedicament);
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalBMedicament.open(this.content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
  }

  getOneBMedicament(id){
    this.api.getById('bmedicament', id).subscribe(data => {
      this.id = id;
      this.deleteBMedicament = data; console.log(data);
      const editData = { nom_comercial: data.nom_comercial, nom_generique: data.nom_generique, dosage_med: data.dosage_med, forme_pharmacetique: data.forme_pharmacetique, is_generic: data.is_generic, prix_moyen: data.prix_moyen };
      this.deleteBMedicamentForm.setValue(editData);
    }, err => { console.log(err); });
  }

  supprimerBMedicament() {
    this.requesting = true;
    this.deleteBMedicament.del = 1;
    //console.log(this.editBMedicament);
    this.api.supprimer('bmedicament/', this.deleteBMedicament).subscribe((res) => {
      // this.depenses.push(res);
      //this.editBMedicament = {};
      console.log(res);
      this.requesting = false;
      //this.id = res['_id'];
      //this.id != null ? this.closeModal() : this.id = null;
      this.closeModal();
      this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
    });
  }

}
