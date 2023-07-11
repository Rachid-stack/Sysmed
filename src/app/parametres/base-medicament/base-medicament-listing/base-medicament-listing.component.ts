import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../../services/service.service';
import { BaseMedicamentEditComponent } from '../base-medicament-edit/base-medicament-edit.component';
import { BaseMedicamentDeleteComponent } from '../base-medicament-delete/base-medicament-delete.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base-medicament-listing',
  templateUrl: './base-medicament-listing.component.html',
  styleUrls: ['./base-medicament-listing.component.css']
})
export class BaseMedicamentListingComponent implements OnInit {
  @ViewChild(BaseMedicamentEditComponent)
  private editComponent: BaseMedicamentEditComponent;
  @ViewChild(BaseMedicamentDeleteComponent)
  private deleteComponent: BaseMedicamentDeleteComponent;
  private itemsPerPage = 5;
  private total = 0;
  bmedicaments: any;
  form_pharmas: any;
  labos: any;

  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getBMedicaments();
    this.getFPharmas();
    this.getPHLabos();
  }

  getBMedicaments() {
    this.api.getAll('bmedicament').subscribe(data => { this.bmedicaments = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  getFPharmas() {
    this.api.getAll('fpharmaceutique').subscribe(data => { this.form_pharmas = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  getPHLabos() {
    this.api.getAll('phlabo').subscribe(data => { this.labos = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditBMedicament(id);
    this.editComponent.openPopup();
  }

  openRemove(id) {
    this.deleteComponent.setDeleteBMedicament(id);
    this.deleteComponent.openPopup();
  }

  choiseBMedicament(id){

  }

}
