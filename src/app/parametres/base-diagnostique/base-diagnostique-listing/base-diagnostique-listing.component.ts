import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../../services/service.service';
import { BaseDiagnostiqueEditComponent } from '../base-diagnostique-edit/base-diagnostique-edit.component';
import { BaseDiagnostiqueDeleteComponent } from '../base-diagnostique-delete/base-diagnostique-delete.component';
import { PathologiesListingComponent } from '../../pathologies/pathologies-listing/pathologies-listing.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base-diagnostique-listing',
  templateUrl: './base-diagnostique-listing.component.html',
  styleUrls: ['./base-diagnostique-listing.component.css']
})
export class BaseDiagnostiqueListingComponent implements OnInit {
  @ViewChild(PathologiesListingComponent)
  private pathologieComponent: PathologiesListingComponent;

  @ViewChild(BaseDiagnostiqueEditComponent)
  private editComponent: BaseDiagnostiqueEditComponent;
  @ViewChild(BaseDiagnostiqueDeleteComponent)
  private deleteComponent: BaseDiagnostiqueDeleteComponent;
  private itemsPerPage = 5;
  private total = 0;
  diagnostiques: any;
  choisedCategorie: any;

  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getDiagnostiques();
  }

  getDiagnostiques() {
    this.api.getAll('basediagnostique').subscribe(data => { this.diagnostiques = data; console.log(data); }, err => { console.log(err); });
    //this.api.getAll('service').subscribe((res) => { this.services = res.services; }, err => { console.log(err); });
  }

  choiseCategorie(id){
    this.getOneCategorie(id);
    this.pathologieComponent.setId(id);
    this.pathologieComponent.getPathologiesId(id);
  }

  getOneCategorie(id){
    this.api.getById('basediagnostique', id).subscribe(data => {
      this.choisedCategorie = data; console.log(data);
    }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditDiagnostique(id);
    this.editComponent.openPopup();
  }

  openRemove(id) {
    this.deleteComponent.setDeleteDiagnostique(id);
    this.deleteComponent.openPopup();
  }

}
