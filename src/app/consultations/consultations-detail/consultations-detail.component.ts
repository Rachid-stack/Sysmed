import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../../../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultations-detail',
  templateUrl: './consultations-detail.component.html',
  styleUrls: ['./consultations-detail.component.css']
})
export class ConsultationsDetailComponent implements OnInit {
  consultation: any;
  motifs: any;
  transferts: any;
  medecins: any;
  id_consultation: any;
  actif_medecin: any;
  constructor(private api: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
  }

  getHistoriques(id_consultation){
    this.id_consultation = id_consultation;
    //this.getActifTransfert(id_consultation);
    this.api.getByChamp('ctransfert', id_consultation).subscribe(data => {
      this.transferts = data;
    }, err => { console.log(err); });
  }

  /*getActifTransfert(id_consultation){
    this.api.getActif('ctransfert', id_consultation).subscribe(data => {
      if(data && data.length != 0){
        this.actif_medecin = data[0].id_medecin;
      }
    }, err => { console.log(err); });
  }*/

  getTMedecins(){
    this.api.getAll('medecin').subscribe(data => {
      this.medecins = data;
      for(var i=0; i < this.medecins.length; i++){
        this.medecins[i].id = this.medecins[i]._id;
        this.medecins[i].nom = '';
        this.getTMPersonne(this.medecins[i]);
      }
    }, err => { console.log(err); });
  }

  getTMPersonne(medecin){
    this.api.getById('personne', medecin.id_personne).subscribe(data => {
      medecin.nom = data.nom_pers + ' ' + data.prenom_pers;
    }, err => { console.log(err); });
  }

  getMConsultations(id){
    this.api.getAllWhere('mconsultation', id).subscribe(data => {
      this.motifs = data;
      for(var i=0; i < this.motifs.length; i++){
        this.motifs[i].libelle_cmotif = '---';
        this.getMotif(this.motifs[i]);
      }
    }, err => { console.log(err); });
  }

  getMotif(motif){
    this.api.getById('cmotif', motif.id_motif).subscribe(data => {
      motif.libelle_cmotif = data.libelle_cmotif;
    }, err => { console.log(err); });
  }

  getConsultation(id){
    this.api.getById('consultation', id).subscribe(data => {
      this.consultation = data;
      this.consultation.medecin = '---';
      this.getMConsultations(id);
      this.getTMedecins();
      this.getHistoriques(id);
      this.getTransfertActif(this.consultation);
    }, err => { console.log(err); });
  }

  getTransfertActif(consultation){
    this.api.getActif('ctransfert', consultation._id).subscribe(data => {
      console.log(data);
      if(data && data.length != 0){
        this.getMedecin(consultation, data[0].id_medecin);
      }
    }, err => { console.log(err); });
  }

  getMedecin(consultation, id_medecin){
    this.api.getById('medecin', id_medecin).subscribe(data => {
      this.getMPersonne(consultation, data.id_personne);
    }, err => { console.log(err); });
  }

  getMPersonne(consultation, id_personne){
    this.api.getById('personne', id_personne).subscribe(data => {
      consultation.medecin = data.nom_pers + ' ' + data.prenom_pers;
    }, err => { console.log(err); });
  }

}
