import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../../services/service.service';
import { PersonneChooseComponent } from '../../personnel/personne-choose/personne-choose.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ModalOptions } from '../../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-medecin-add',
  templateUrl: './medecin-add.component.html',
  styleUrls: ['./medecin-add.component.css']
})
export class MedecinAddComponent implements OnInit {
  @ViewChild(PersonneChooseComponent)
  private personneComponent: PersonneChooseComponent;
  url = 'http://localhost:3000/api/uploads/';
  id = null;
  medecinForm: FormGroup;
  modalReference: any = {};
  medecins: Array<any>;
  newMedecin: any;
  newPersonne: any;
  specialites: any;
  titres: any;
  services: any;
  isNew = true;
  id_personne = null;
  personneChoosed: any;
  nom_prenom = '';
  requesting: boolean;
  img_class = 'hidden';
  default_class = '';
  checkedPrivileges = false;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };
  public uploader: FileUploader = new FileUploader({url: environment.api + '/file/upload', itemAlias: 'file'});

  constructor(private http: HttpClient,
              private modalMedecin: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.medecinForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.newPersonne = { photo: '', nom_pers: '', telephone_portable: '', prenom_pers: '', email: '', lieu_naiss_pers: '', date_naiss_pers: '', adresse: '', sexe: '', telephone_fixe: '' };
    this.newMedecin = { code_med: '', id_specialite: '', id_titre: '', id_service: '' };
    this.requesting = false;
    this.getSpecialites();
    this.getServices();
    this.getTitres();

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item);
      if(status === 200) {
        this.img_class = 'img-h-w';
        this.default_class = 'hidden';
        document.getElementById('add_personne_img').setAttribute('src','assets/uploads/' + this.newPersonne.photo);
      }else{
        this.img_class = 'hidden';
        this.default_class = '';
      }
    };
  }

  getSpecialites() {
    this.api.getAll('specialite').subscribe(data => {
      this.specialites = data;
    }, err => { console.log(err); });
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

  choseExiste(){
    this.isNew = false;
  }

  choseNew(){
    this.isNew = true;
  }

  chooseEmp(){
    this.personneComponent.openPopup();
  }

  setPersonne(event){
    this.personneChoosed = event.value;
    this.id_personne = this.personneChoosed._id;
    this.nom_prenom = this.personneChoosed.nom_pers + ' ' + this.personneChoosed.prenom_pers;
  }

  fileChooser(fileInput: string): void {
    document.getElementById(fileInput).click();
  }

  fileChange(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newPersonne.photo = file.name;
      if(this.newPersonne.photo == '' || !this.newPersonne.photo){
        this.img_class = 'hidden';
        this.default_class = '';
      }else{
        this.img_class = 'img-h-w';
        this.default_class = 'hidden';
      }
    }
  }

  saveMedecin(id){
    this.newMedecin.id_personne = id;
    this.api.ajouter('medecin', this.newMedecin).subscribe((res) => {
      this.newMedecin = {};
      console.log(res);
    });
    this.closeModal();
    this.router.navigate(['/parametres/personnel/personnel-listing']);
  }

  open(content) {
    this.img_class = 'hidden';
    this.default_class = '';
    this.newPersonne.photo = '';
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalMedecin.open(content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/personnel/personnel-listing']);
  }

  ajouterPersonnel() {
    this.requesting = true;
    if(!this.isNew && this.id_personne != ''){
      this.saveMedecin(this.id_personne);
    }else{
      this.api.ajouter('personne', this.newPersonne).subscribe((res) => {
        this.newPersonne = {};
        this.id_personne = res._id;
        if(this.id_personne){
          this.saveMedecin(this.id_personne);
        }
      });
    }
  }

}
