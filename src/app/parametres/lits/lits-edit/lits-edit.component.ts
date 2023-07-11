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
  selector: 'app-lits-edit',
  templateUrl: './lits-edit.component.html',
  styleUrls: ['./lits-edit.component.css']
})
export class LitsEditComponent implements OnInit {
  @ViewChild('editLitModal') private content;
  id = null;
  editLitForm: FormGroup;
  modalReference: any = {};
  lits: Array<any>;
  code_lit: String;
  libelle_lit: String;
  editLit: any;
  chambre: any;
  chambres: any;
  requesting: boolean;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalLit: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editLitForm = this.formBuilder.group({
      code_lit: ['', Validators.required],
      id_chambre: ['', Validators.required],
      libelle_lit: ['', Validators.required],
      desc_lit: ['']
    });
    this.editLit = { id_chambre: '', code_lit: '', libelle_lit: '', desc_lit: '' };
    this.getChambres();
    this.requesting = false;
    console.log(this.editLit);
  }

  getOneChambre(id){
    this.api.getById('chambre', id).subscribe(data => {
      this.chambre = data; console.log(data);
    }, err => { console.log(err); });
  }

  setEditLit(id){
    this.getOneLit(id);
    console.log(this.editLit);
  }

  setIdChambre(id){
    this.getOneChambre(id);
    this.getOneChambre(id);
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
      this.editLit = data; console.log(data);
      const editData = { id_chambre: data.id_chambre, code_lit: data.code_lit, libelle_lit: data.libelle_lit, desc_lit: data.desc_lit };
      this.editLitForm.setValue(editData);
    }, err => { console.log(err); });
  }

  getChambres(){
    this.api.getAll('chambre').subscribe(data => {
      this.chambres = data; console.log(data);
    }, err => { console.log(err); });
  }

  get f () { return this.editLitForm.controls; }

  modifierLit() {
    this.requesting = true;
    this.editLit.code_lit = this.f.code_lit.value;
    this.editLit.id_chambre = this.f.id_chambre.value;
    this.editLit.libelle_lit = this.f.libelle_lit.value;
    this.editLit.desc_lit = this.f.desc_lit.value;
    //console.log(this.editService);
    this.api.modifier('lit/', this.editLit).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/chambres/chambres-listing']);
    });
  }

  supprimerLit() {
    this.requesting = true;
    this.editLit.del = 1;
    this.api.supprimer('lit/', this.editLit).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/chambres/chambres-listing']);
    });
  }

}
