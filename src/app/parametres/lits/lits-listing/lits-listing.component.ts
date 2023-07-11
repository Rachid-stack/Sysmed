import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../../services/service.service';
import { LitsEditComponent } from '../lits-edit/lits-edit.component';
import { LitsDeleteComponent } from '../lits-delete/lits-delete.component';
import { LitsAddComponent } from '../lits-add/lits-add.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lits-listing',
  templateUrl: './lits-listing.component.html',
  styleUrls: ['./lits-listing.component.css']
})
export class LitsListingComponent implements OnInit {
  @ViewChild(LitsAddComponent)
  private addComponent: LitsAddComponent;
  @ViewChild(LitsEditComponent)
  private editComponent: LitsEditComponent;
  @ViewChild(LitsDeleteComponent)
  private deleteComponent: LitsDeleteComponent;
  private itemsPerPage = 5;
  private total = 0;
  lits: any;
  id = 0;

  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getLits();
  }

  getLits() {
    this.api.getAll('lit').subscribe(data => { this.lits = data; console.log(data); }, err => { console.log(err); });
  }

  setId(id){
    this.id = id;
    this.editComponent.setIdChambre(id);
    this.addComponent.setIdChambre(id);
  }

  getLitsId(id) {
    this.api.getAllWhere('lit', id).subscribe(data => { this.lits = data; console.log(data); }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditLit(id);
    this.editComponent.openPopup();
  }

  openRemove(id) {
    this.deleteComponent.setDeleteLit(id);
    this.deleteComponent.openPopup();
  }

}
