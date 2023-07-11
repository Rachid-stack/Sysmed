import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../../services/service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ModalOptions } from '../../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-infirmier-edit',
  templateUrl: './infirmier-edit.component.html',
  styleUrls: ['./infirmier-edit.component.css']
})
export class InfirmierEditComponent implements OnInit {
  @ViewChild('editInfirmierModal') private content;
  id = null;
  editInfirmierForm: FormGroup;
  modalReference: any = {};
  infirmiers: Array<any>;
  code_infirmier: String;
  libelle_infirmier: String;
  desc_infirmier: String;
  editInfirmier: any;
  editPersonne: any;
  titres: any;
  services: any;
  privileges: any;
  img_class = 'hidden';
  default_class = '';
  editData = { nom_pers: '', telephone_portable: '', prenom_pers: '', email: '', lieu_naiss_pers: '', date_naiss_pers: '', adresse: '', telephone_fixe: '', code_inf: '', id_titre: '', id_service: '' };
  requesting: boolean;
  checkedPrivileges = false;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };
  public uploader: FileUploader = new FileUploader({url: environment.api + '/file/upload', itemAlias: 'file'});

  constructor(private datePipe: DatePipe, private http: HttpClient,
              private modalInfirmier: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editInfirmierForm = this.formBuilder.group({
      code_inf: ['', Validators.required],
      id_titre: ['', Validators.required],
      id_service: ['', Validators.required],
      nom_pers: ['', Validators.required],
      prenom_pers: ['', Validators.required],
      telephone_portable: ['', Validators.required],
      email: ['', Validators.required],
      lieu_naiss_pers: ['', Validators.required],
      date_naiss_pers: ['', Validators.required],
      adresse: [''],
      telephone_fixe: ['']
    });
    this.editPersonne = { photo: '', nom_pers: '', telephone_portable: '', prenom_pers: '', email: '', lieu_naiss_pers: '', date_naiss_pers: '', adresse: '', telephone_fixe: '' };
    this.editInfirmier = { code_inf: '', id_titre: '', id_service: '', id_personne: '' };
    this.requesting = false;
    this.getServices();
    this.getTitres();
    console.log(this.editInfirmier);

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item);
      if(status === 200) {
        this.img_class = 'img-h-w';
        this.default_class = 'hidden';
        document.getElementById('edit_personne_img').setAttribute('src','assets/uploads/' + this.editPersonne.photo);
      }else{
        this.img_class = 'hidden';
        this.default_class = '';
      }
    };
  }

  fileChooser(fileInput: string): void {
    document.getElementById(fileInput).click();
  }

  fileChange(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editPersonne.photo = file.name;
      if(this.editPersonne.photo == '' || !this.editPersonne.photo){
        this.img_class = 'hidden';
        this.default_class = '';
      }else{
        this.img_class = 'img-h-w';
        this.default_class = 'hidden';
      }
    }
  }

  getServices() {
    this.api.getAll('service').subscribe(data => {
      this.services = data;
    }, err => { console.log(err); });
  }

  getTitres() {
    this.api.getAll('titre').subscribe(data => {
      this.titres = data;
    }, err => { console.log(err); });
  }

  choseType(){

  }



  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalInfirmier.open(this.content, this.ngbModalOptions);
  }

  setEditInfirmier(id){
    this.getOneInfirmier(id);
    console.log(this.editInfirmier);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/personnel/personnel-listing']);
  }

  getOneInfirmier(id){
    this.api.getById('infirmier', id).subscribe(data => {
      this.id = id;
      this.editInfirmier = data; console.log(data);
      this.editData.code_inf = data.code_inf;
      this.editData.id_titre = data.id_titre;
      this.editData.id_service = data.id_service;
      //this.editData.id_personne = data.id_personne;
      if(this.editInfirmier.id_personne != ''){
        this.getOnePersonne(this.editInfirmier.id_personne);
      }
    }, err => { console.log(err); });
  }

  getOnePersonne(id){
    this.api.getById('personne', id).subscribe(data => {
      this.id = id;
      this.editPersonne = data; console.log(data);
      if(this.editPersonne.photo && this.editPersonne.photo != ''){
        this.img_class = 'img-h-w';
        this.default_class = 'hidden';
        document.getElementById('edit_personne_img').setAttribute('src','assets/uploads/' + this.editPersonne.photo);
      }else{
        this.img_class = 'hidden';
        this.default_class = '';
      }
      this.editData.nom_pers = data.nom_pers;
      this.editData.telephone_portable = data.telephone_portable;
      this.editData.prenom_pers = data.prenom_pers;
      this.editData.email = data.email;
      if(data.lieu_naiss_pers){
        this.editData.lieu_naiss_pers = data.lieu_naiss_pers;
      }
      if(data.date_naiss_pers){
        this.editData.date_naiss_pers = this.datePipe.transform(data.date_naiss_pers, 'yyyy-MM-dd');
      }
      if(data.adresse){
        this.editData.adresse = data.adresse;
      }
      if(data.telephone_fixe){
        this.editData.telephone_fixe = data.telephone_fixe;
      }

      this.editInfirmierForm.setValue(this.editData);
    }, err => { console.log(err); });
  }

  get f () { return this.editInfirmierForm.controls; }

  saveInfirmier(id){
    this.editInfirmier.id_personne = id;
    this.editInfirmier.code_inf = this.f.code_inf.value;
    this.editInfirmier.id_titre = this.f.id_titre.value;
    this.editInfirmier.id_service = this.f.id_service.value;

    this.api.modifier('infirmier', this.editInfirmier).subscribe((res) => {
      this.editInfirmier = {};
      console.log(res);
    });
  }

  modifierInfirmier() {
    this.requesting = true;

    this.editPersonne.nom_pers = this.f.nom_pers.value;
    this.editPersonne.telephone_portable = this.f.telephone_portable.value;
    this.editPersonne.prenom_pers = this.f.prenom_pers.value;
    this.editPersonne.email = this.f.email.value;
    this.editPersonne.lieu_naiss_pers = this.f.lieu_naiss_pers.value;
    this.editPersonne.date_naiss_pers = this.f.date_naiss_pers.value;
    this.editPersonne.adresse = this.f.adresse.value;
    this.editPersonne.telephone_fixe = this.f.telephone_fixe.value;
    //console.log(this.editDiagnostique);
    this.api.modifier('personne', this.editPersonne).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.id = res._id;
      if(this.id){
        this.saveInfirmier(this.id);
      }
      this.closeModal();
      this.router.navigate(['/parametres/personnel/personnel-listing']);
    });
  }

  supprimerInfirmier() {
    this.requesting = true;
    this.editInfirmier.del = 1;

    this.api.supprimer('infirmier/', this.editInfirmier).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/personnel/personnel-listing']);
    });
  }

}
