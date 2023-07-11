import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../../services/service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from '../../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base-medicament-add',
  templateUrl: './base-medicament-add.component.html',
  styleUrls: ['./base-medicament-add.component.css']
})
export class BaseMedicamentAddComponent implements OnInit {
  id = null;
  bmedicamentForm: FormGroup;
  modalReference: any = {};
  bmedicaments: Array<any>;
  newBMedicament: any;
  form_pharmas: any;
  voie_admins: any;
  labos: any;
  requesting: boolean;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalBMedicament: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.bmedicamentForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.newBMedicament = { code_med: '', nom_comercial: '', nom_generique: '', dosage_med: '', form_pharma: '', labo_pharma: '', voie_admin: '', is_generic: false, prix_moyen: '' };
    this.getFPharmas();
    this.getVAdmins();
    this.getPHLabos();
    this.requesting = false;
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

  open(content) {
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalBMedicament.open(content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
  }

  ajouterBMedicament() {
    this.requesting = true;
    this.api.ajouter('bmedicament', this.newBMedicament).subscribe((res) => {
      // this.depenses.push(res);
      this.newBMedicament = {};
      this.requesting = false;
      this.id = res['_id'];
      //this.id != null ? this.closeModal() : this.id = null;
      this.closeModal();
      this.router.navigate(['/parametres/base-medicament/base-medicament-listing']);
    });
  }

}
