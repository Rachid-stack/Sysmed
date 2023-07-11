import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../../services/service.service';
import { InfirmierEditComponent } from '../infirmier-edit/infirmier-edit.component';
import { PersonnelDetailComponent } from '../../personnel/personnel-detail/personnel-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infirmier-listing',
  templateUrl: './infirmier-listing.component.html',
  styleUrls: ['./infirmier-listing.component.css']
})
export class InfirmierListingComponent implements OnInit {
  @ViewChild(PersonnelDetailComponent)
  private detailComponent: PersonnelDetailComponent;

  @ViewChild(InfirmierEditComponent)
  private editComponent: InfirmierEditComponent;
  private itemsPerPage = 5;
  private total = 0;
  infirmiers: any;
  personnes: any;
  titres: any;
  services: any;
  infirmierChosed: any;

  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getInfirmiers();
    this.getPersonnes();
    this.getServices();
    this.getTitres();
  }

  getInfirmiers() {
    this.api.getAll('infirmier').subscribe(data => { this.infirmiers = data; console.log(data); }, err => { console.log(err); });
  }

  getPersonnes() {
    this.api.getAll('personne').subscribe(data => {
      this.personnes = data;
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

  getOneInfirmier(id) {
    this.api.getById('infirmier', id).subscribe(data => { this.infirmierChosed = data; console.log(data); }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditInfirmier(id);
    this.editComponent.openPopup();
  }

  choiseInfirmier(id){
    this.getOneInfirmier(id);
    this.detailComponent.setIdInfirmier(id);
  }

}
