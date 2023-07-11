import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService} from '../../../../../services/service.service';
import { ChambresEditComponent } from '../chambres-edit/chambres-edit.component';
import { ChambresDeleteComponent } from '../chambres-delete/chambres-delete.component';
import { ChambresAddComponent } from '../chambres-add/chambres-add.component';
import { LitsListingComponent } from '../../lits/lits-listing/lits-listing.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chambres-listing',
  templateUrl: './chambres-listing.component.html',
  styleUrls: ['./chambres-listing.component.css']
})
export class ChambresListingComponent implements OnInit {
  @ViewChild(LitsListingComponent)
  private litComponent: LitsListingComponent;

  @ViewChild(ChambresAddComponent)
  private addComponent: ChambresAddComponent;
  @ViewChild(ChambresEditComponent)
  private editComponent: ChambresEditComponent;
  @ViewChild(ChambresDeleteComponent)
  private deleteComponent: ChambresDeleteComponent;
  private itemsPerPage = 5;
  private total = 0;
  chambres: any;
  unites: any;
  cequipements: any;
  equipements: any;
  choisedChambre: any;
  id = 0;

  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getChambres();
    this.getUnites();
    this.getCEquipements();
    this.getEquipements();
  }

  getChambres() {
    this.api.getAll('chambre').subscribe(data => {
      this.chambres = data;
    }, err => { console.log(err); });
  }

  getCEquipements() {
    this.api.getAll('cequipement').subscribe(data => {
      this.cequipements = data;
    }, err => { console.log(err); });
  }

  getEquipements() {
    this.api.getAll('equipement').subscribe(data => {
      this.equipements = data;
    }, err => { console.log(err); });
  }

  getClass(id){
    for(var i=0; i < this.equipements.length; i++){
      if(this.equipements[i]._id == id){
        return this.equipements[i].class_equipement;
      }
    }
  }

  getUnites(){
    this.api.getAll('unite').subscribe(data => {
      this.unites = data;
    }, err => { console.log(err); });
  }

  setId(id){
    this.id = id;
    this.editComponent.setIdUnite(id);
    this.addComponent.setIdUnite(id);
  }

  getChambresId(id) {
    this.api.getAllWhere('chambre', id).subscribe(data => {
      this.chambres = data;
      if(this.chambres.length == 0){
        this.choiseChambre(null);
      }
      console.log(data);
    }, err => { console.log(err); });
  }

  openEdit(id) {
    this.editComponent.setEditChambre(id);
    this.editComponent.openPopup(id);
  }

  getOneChambre(id){
    this.api.getById('chambre', id).subscribe(data => {
      this.choisedChambre = data; console.log(data);
    }, err => { console.log(err); });
  }

  choiseChambre(id){
    this.getOneChambre(id);
    this.litComponent.setId(id);
    this.litComponent.getLitsId(id);
  }

  openRemove(id) {
    this.deleteComponent.setDeleteChambre(id);
    this.deleteComponent.openPopup();
  }

}
