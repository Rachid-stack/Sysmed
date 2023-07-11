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
  selector: 'app-base-diagnostique-delete',
  templateUrl: './base-diagnostique-delete.component.html',
  styleUrls: ['./base-diagnostique-delete.component.css']
})
export class BaseDiagnostiqueDeleteComponent implements OnInit {
  @ViewChild('deleteDiagnostiqueModal') private content;

  id = null;
  deleteDiagnostiqueForm: FormGroup;
  modalReference: any = {};
  diagnostiques: Array<any>;
  code_diagnostique: String;
  libelle_diagnostique: String;
  desc_diagnostique: String;
  deleteDiagnostique: any;
  requesting: boolean;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalDiagnostique: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.deleteDiagnostiqueForm = this.formBuilder.group({
      code_diagnostique: ['', Validators.required],
      libelle_diagnostique: ['', Validators.required],
      desc_diagnostique: ['']
    });
    this.deleteDiagnostique = { code_diagnostique: '', libelle_diagnostique: '', desc_diagnostique: '' };
    this.requesting = false;
    console.log(this.deleteDiagnostique);
  }

  setDeleteDiagnostique(id){
    this.getOneDiagnostique(id);
    console.log(this.deleteDiagnostique);
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalDiagnostique.open(this.content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
  }

  getOneDiagnostique(id){
    this.api.getById('basediagnostique', id).subscribe(data => {
      this.id = id;
      this.deleteDiagnostique = data; console.log(data);
      const editData = { code_diagnostique: data.code_diagnostique, libelle_diagnostique: data.libelle_diagnostique, desc_diagnostique: data.desc_diagnostique };
      this.deleteDiagnostiqueForm.setValue(editData);
    }, err => { console.log(err); });
  }

  supprimerDiagnostique() {
    this.requesting = true;
    this.deleteDiagnostique.del = 1;
    //console.log(this.editDiagnostique);
    this.api.supprimer('basediagnostique/', this.deleteDiagnostique).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
    });
  }

}
