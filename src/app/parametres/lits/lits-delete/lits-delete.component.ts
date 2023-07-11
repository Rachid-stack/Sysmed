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
  selector: 'app-lits-delete',
  templateUrl: './lits-delete.component.html',
  styleUrls: ['./lits-delete.component.css']
})
export class LitsDeleteComponent implements OnInit {
  @ViewChild('deleteLitModal') private content;

  id = null;
  deleteLitForm: FormGroup;
  modalReference: any = {};
  lits: Array<any>;
  code_lit: String;
  libelle_lit: String;
  chambres: any;
  deleteLit: any;
  requesting: boolean;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalLit: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.deleteLitForm = this.formBuilder.group({
      code_lit: ['', Validators.required],
      id_chambre: ['', Validators.required],
      libelle_lit: ['', Validators.required],
      desc_lit: ['']
    });
    this.deleteLit = { id_chambre: '', code_lit: '', libelle_lit: '', desc_lit: '' };
    this.getChambres();
    this.requesting = false;
    console.log(this.deleteLit);
  }

  setDeleteLit(id){
    this.getOneLit(id);
    console.log(this.deleteLit);
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalLit.open(this.content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
  }

  getOneLit(id){
    this.api.getById('lit', id).subscribe(data => {
      this.id = id;
      this.deleteLit = data; console.log(data);
      const editData = { id_chambre: data.id_chambre, code_lit: data.code_lit, libelle_lit: data.libelle_lit, desc_lit: data.desc_lit };
      this.deleteLitForm.setValue(editData);
    }, err => { console.log(err); });
  }

  getChambres(){
    this.api.getAll('chambre').subscribe(data => {
      this.chambres = data; console.log(data);
    }, err => { console.log(err); });
  }

  supprimerLit() {
    this.requesting = true;
    this.deleteLit.del = 1;
    this.api.supprimer('lit/', this.deleteLit).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/unites/unites-listing']);
    });
  }

}
