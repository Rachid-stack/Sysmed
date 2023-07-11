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
  selector: 'app-base-diagnostique-edit',
  templateUrl: './base-diagnostique-edit.component.html',
  styleUrls: ['./base-diagnostique-edit.component.css']
})
export class BaseDiagnostiqueEditComponent implements OnInit {
  @ViewChild('editDiagnostiqueModal') private content;
  id = null;
  editDiagnostiqueForm: FormGroup;
  modalReference: any = {};
  diagnostiques: Array<any>;
  code_diagnostique: String;
  libelle_diagnostique: String;
  desc_diagnostique: String;
  editDiagnostique: any;
  requesting: boolean;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalDiagnostique: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editDiagnostiqueForm = this.formBuilder.group({
      code_diagnostique: ['', Validators.required],
      libelle_diagnostique: ['', Validators.required],
      desc_diagnostique: ['']
    });
    this.editDiagnostique = { code_diagnostique: '', libelle_diagnostique: '', desc_diagnostique: '' };
    this.requesting = false;
    console.log(this.editDiagnostique);
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalDiagnostique.open(this.content, this.ngbModalOptions);
  }

  setEditDiagnostique(id){
    this.getOneDiagnostique(id);
    console.log(this.editDiagnostique);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
  }

  getOneDiagnostique(id){
    this.api.getById('basediagnostique', id).subscribe(data => {
      this.id = id;
      this.editDiagnostique = data; console.log(data);
      const editData = { code_diagnostique: data.code_diagnostique, libelle_diagnostique: data.libelle_diagnostique, desc_diagnostique: data.desc_diagnostique };
      this.editDiagnostiqueForm.setValue(editData);
    }, err => { console.log(err); });
  }

  get f () { return this.editDiagnostiqueForm.controls; }

  modifierDiagnostique() {
    this.requesting = true;
    this.editDiagnostique.code_diagnostique = this.f.code_diagnostique.value;
    this.editDiagnostique.libelle_diagnostique = this.f.libelle_diagnostique.value;
    this.editDiagnostique.desc_diagnostique = this.f.desc_diagnostique.value;
    //console.log(this.editDiagnostique);
    this.api.modifier('basediagnostique/', this.editDiagnostique).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
    });
  }

  supprimerDiagnostique() {
    this.requesting = true;
    this.editDiagnostique.del = 1;
    //console.log(this.editDiagnostique);
    this.api.supprimer('basediagnostique/', this.editDiagnostique).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
    });
  }

}
