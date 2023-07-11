import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MENUS, SOUSMENUS, Menu } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: []
})
export class MenuComponent implements OnInit {
  dahsbord_link = '/dashbord';
  menus = MENUS;
  sousMenus = SOUSMENUS;
  menuCourant = null;
  sousMenuCourant = null;
  navbarOpen = false;


  selectedMenu(menu): void {
    this.menuCourant = menu;
    this.sousMenuCourant = null;
  }

  selectedSousmenu(sousMenu): void {
    this.sousMenuCourant = sousMenu;
    console.log(this.sousMenuCourant);
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  getMenuCourant(): Menu {
    return this.menuCourant;
  }

  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getMenus();
    this.getSMenus();
  }

  getMenus() {
    this.api.getAll('menu').subscribe(data => {
      if(data.length != 0){
        this.menus = data;
      }
      console.log(data); }, err => { console.log(err); });
  }

  getSMenus() {
    this.api.getAll('smenu').subscribe(data => {
      if(data.length != 0){
        this.sousMenus = data;
      }
      console.log(data);
    }, err => { console.log(err); });
  }

}
