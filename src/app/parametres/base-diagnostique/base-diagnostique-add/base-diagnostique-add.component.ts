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
  selector: 'app-base-diagnostique-add',
  templateUrl: './base-diagnostique-add.component.html',
  styleUrls: ['./base-diagnostique-add.component.css']
})
export class BaseDiagnostiqueAddComponent implements OnInit {
  id = null;
  diagnostiqueForm: FormGroup;
  modalReference: any = {};
  diagnostiques: Array<any>;
  newDiagnostique: any;
  requesting: boolean;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private http: HttpClient,
              private modalDiagnostique: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { this.diagnostiqueForm = this.formBuilder.group({ }); }

  ngOnInit() {
    this.newDiagnostique = { code_diagnostique: '', libelle_diagnostique: '', desc_diagnostique: '' };
    this.requesting = false;
  }

  open(content) {
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.modalReference = this.modalDiagnostique.open(content, this.ngbModalOptions);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
  }

  ajouterDiagnostique() {
    this.requesting = true;
    this.api.ajouter('basediagnostique', this.newDiagnostique).subscribe((res) => {
      // this.depenses.push(res);
      this.newDiagnostique = {};
      this.requesting = false;
      this.id = res['_id'];
      //this.id != null ? this.closeModal() : this.id = null;
      this.closeModal();
      this.router.navigate(['/parametres/base-diagnostique/base-diagnostique-listing']);
    });
  }

}
