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
  selector: 'app-chambres-edit',
  templateUrl: './chambres-edit.component.html',
  styleUrls: ['./chambres-edit.component.css']
})
export class ChambresEditComponent implements OnInit {
  @ViewChild('editChambreModal') private content;
  id = null;
  editChambreForm: FormGroup;
  modalReference: any = {};
  chambres: Array<any>;
  code_chambre: String;
  libelle_chambre: String;
  desc_chambre: String;
  editChambre: any;
  unite: any;
  unites: any;
  equipements: any;
  requesting: boolean;
  checkedEquipements = false;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalChambre: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editChambreForm = this.formBuilder.group({
      code_chambre: ['', Validators.required],
      libelle_chambre: ['', Validators.required],
      id_unite: ['', Validators.required],
      desc_chambre: ['']
    });
    this.editChambre = { id_unite: '', code_chambre: '', libelle_chambre: '', desc_chambre: '' };
    this.getUnites();
    this.getEquipements();
    this.requesting = false;
    console.log(this.editChambre);
  }

  getEquipements() {
    this.api.getAll('equipement').subscribe(data => {
      this.equipements = data;
      for(var i=0; i < this.equipements.length; i++){
        this.equipements[i].checked = false;
      }
    }, err => { console.log(err); });
  }

  addRemoveData(equipement){
    equipement.checked = !equipement.checked;
    this.controleCheckedEquipement();
  }

  controleCheckedEquipement(){
    this.checkedEquipements = false;
    for(var i=0; i < this.equipements.length; i++){
      if(this.equipements[i].checked){
        this.checkedEquipements = true;
      }
    }
  }

  saveEquipements(id){
    this.api.getAllWhere('cequipement', id).subscribe(data => {
      for(var i = 0; i < data.length; i++){
        this.api.supprimer('cequipement', data[i]).subscribe((res) => {
          console.log(res);
        });
      }
    }, err => { console.log(err); });

    for(var i=0; i < this.equipements.length; i++){
      if(this.equipements[i].checked){
        const cequipementData = { id_chambre: id, id_equipement: this.equipements[i]._id };
        this.api.ajouter('cequipement', cequipementData).subscribe((res) => {
          console.log(res);
        });
      }
    }
  }

  getOneUnite(id){
    this.api.getById('unite', id).subscribe(data => {
      this.unite = data; console.log(data);
    }, err => { console.log(err); });
  }

  setEditChambre(id){
    this.getOneChambre(id);
    console.log(this.editChambre);
  }

  setIdUnite(id){
    this.getOneUnite(id);
  }

  openPopup(id){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    for(var j = 0; j < this.equipements.length; j++){
      this.equipements[j].checked = false;
    }
    this.getWhere(id);
    this.modalReference = this.modalChambre.open(this.content, this.ngbModalOptions);
  }

  getWhere(id){
    this.api.getAllWhere('cequipement', id).subscribe(data => {
      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < this.equipements.length; j++){
          if(this.equipements[j]._id == data[i].id_equipement){
            this.equipements[j].checked = true;
          }
        }
      }
    }, err => { console.log(err); });
  }

  closeModal(): void {
    this.modalReference.close();
    //this.router.navigate(['/parametres/chambres/chambres-listing']);
  }

  getUnites(){
    this.api.getAll('unite').subscribe(data => {
      this.unites = data; console.log(data);
    }, err => { console.log(err); });
  }

  getOneChambre(id){
    this.api.getById('chambre', id).subscribe(data => {
      this.id = id;
      this.editChambre = data; console.log(data);
      const editData = { code_chambre: data.code_chambre, libelle_chambre: data.libelle_chambre, desc_chambre: data.desc_chambre, id_unite: data.id_unite };
      this.editChambreForm.setValue(editData);
    }, err => { console.log(err); });
  }

  get f () { return this.editChambreForm.controls; }

  modifierChambre() {
    this.requesting = true;
    this.editChambre.code_chambre = this.f.code_chambre.value;
    this.editChambre.libelle_chambre = this.f.libelle_chambre.value;
    this.editChambre.id_unite = this.f.id_unite.value;
    this.editChambre.desc_chambre = this.f.desc_chambre.value;
    //console.log(this.editService);
    this.api.modifier('chambre', this.editChambre).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.id = res._id;
      if(this.id){
        this.saveEquipements(this.id);
      }
      this.closeModal();
      this.router.navigate(['/parametres/chambres/chambres-listing']);
    });
  }

  supprimerChambre() {
    this.requesting = true;
    this.editChambre.del = 1;

    this.api.getAllWhere('cequipement', this.editChambre._id).subscribe(data => {
      for(var i = 0; i < data.length; i++){
        this.api.supprimer('cequipement', data[i]).subscribe((res) => {
          console.log(res);
        });
      }
    }, err => { console.log(err); });

    this.api.supprimer('chambre', this.editChambre).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/chambres/chambres-listing']);
    });
  }

}
