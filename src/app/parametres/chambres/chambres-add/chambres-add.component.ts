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
  selector: 'app-chambres-add',
  templateUrl: './chambres-add.component.html',
  styleUrls: ['./chambres-add.component.css']
})
export class ChambresAddComponent implements OnInit {
  id = null;
  idUnite = null;
  chambreForm: FormGroup;
  modalReference: any = {};
  chambres: Array<any>;
  newChambre: any;
  unite: any;
  unites: any;
  equipements: any;
  requesting: boolean;
  checkedEquipements = false;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalChambre: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.chambreForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.newChambre = { id_unite: '', code_chambre: '', libelle_chambre: '', desc_chambre: '' };
    this.getUnites();
    this.getEquipements();
    this.requesting = false;
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

  saveEquipement(id){
    for(var i=0; i < this.equipements.length; i++){
      if(this.equipements[i].checked){
        const cequipementData = { id_chambre: id, id_equipement: this.equipements[i]._id };
        this.api.ajouter('cequipement', cequipementData).subscribe((res) => {
          console.log(res);
        });
      }
    }
  }

  open(content) {
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalChambre.open(content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    //this.router.navigate(['/parametres/chambres/chambres-listing']);
  }

  setIdUnite(id){
    this.idUnite = id;
    this.getOneUnite(id);
  }

  getOneUnite(id){
    this.api.getById('unite', id).subscribe(data => {
      this.unite = data; console.log(data);
    }, err => { console.log(err); });
  }

  getUnites(){
    this.api.getAll('unite').subscribe(data => {
      this.unites = data; console.log(data);
    }, err => { console.log(err); });
  }

  ajouterChambre() {
    this.requesting = true;

    this.api.ajouter('chambre', this.newChambre).subscribe((res) => {
      this.newChambre = {};
      this.requesting = false;
      this.id = res._id;
      if(this.id){
        this.saveEquipement(this.id);
      }
      this.closeModal();
      this.router.navigate(['/parametres/chambres/chambres-listing']);
    });
  }

}
