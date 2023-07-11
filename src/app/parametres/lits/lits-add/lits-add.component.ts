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
  selector: 'app-lits-add',
  templateUrl: './lits-add.component.html',
  styleUrls: ['./lits-add.component.css']
})
export class LitsAddComponent implements OnInit {
  id = null;
  idChambre = null;
  litForm: FormGroup;
  modalReference: any = {};
  lits: Array<any>;
  newLit: any;
  chambre: any;
  chambres: any;
  requesting: boolean;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalLit: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.litForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.newLit = { id_chambre: '', code_lit: '', libelle_lit: '', desc_lit: '' };
    this.getChambres();
    this.requesting = false;
  }

  open(content) {
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalLit.open(content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    //this.router.navigate(['/parametres/lits/lits-listing']);
  }

  setIdChambre(id){
    this.idChambre = id;
    this.getOneChambre(id);
  }

  getOneChambre(id){
    this.api.getById('chambre', id).subscribe(data => {
      this.chambre = data; console.log(data);
    }, err => { console.log(err); });
  }

  getChambres(){
    this.api.getAll('chambre').subscribe(data => {
      this.chambres = data; console.log(data);
    }, err => { console.log(err); });
  }

  ajouterLit() {
    this.requesting = true;

    this.api.ajouter('lit', this.newLit).subscribe((res) => {
      this.newLit = {};
      this.requesting = false;
      this.id = res['_id'];
      this.closeModal();
      this.router.navigate(['/parametres/chambres/chambres-listing']);
    });
  }

}
