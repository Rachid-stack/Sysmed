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
  selector: 'app-chambres-delete',
  templateUrl: './chambres-delete.component.html',
  styleUrls: ['./chambres-delete.component.css']
})
export class ChambresDeleteComponent implements OnInit {
  @ViewChild('deleteChambreModal') private content;

  id = null;
  deleteChambreForm: FormGroup;
  modalReference: any = {};
  chambres: Array<any>;
  code_chambre: String;
  libelle_chambre: String;
  desc_chambre: String;
  unites: any;
  deleteChambre: any;
  requesting: boolean;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalChambre: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.deleteChambreForm = this.formBuilder.group({
      code_chambre: ['', Validators.required],
      libelle_chambre: ['', Validators.required],
      id_unite: ['', Validators.required],
      desc_chambre: ['']
    });
    this.deleteChambre = { id_unite: '', code_chambre: '', libelle_chambre: '', desc_chambre: '' };
    this.getUnites();
    this.requesting = false;
    console.log(this.deleteChambre);
  }

  setDeleteChambre(id){
    this.getOneChambre(id);
    console.log(this.deleteChambre);
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalChambre.open(this.content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
  }

  getUnites(){
    this.api.getAll('unite').subscribe(data => {
      this.unites = data; console.log(data);
    }, err => { console.log(err); });
  }

  getOneChambre(id){
    this.api.getById('chambre', id).subscribe(data => {
      this.id = id;
      this.deleteChambre = data; console.log(data);
      const editData = { code_chambre: data.code_chambre, libelle_chambre: data.libelle_chambre, desc_chambre: data.desc_chambre, id_unite: data.id_unite };
      this.deleteChambreForm.setValue(editData);
    }, err => { console.log(err); });
  }

  supprimerChambre() {
    this.requesting = true;
    this.deleteChambre.del = 1;
    this.api.supprimer('chambre/', this.deleteChambre).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/parametres/unites/unites-listing']);
    });
  }

}
