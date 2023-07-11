import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService} from '../../../../services/service.service';
import { PatientsChooseComponent } from '../../patients/patients-choose/patients-choose.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ModalOptions } from '../../../../node_modules/ngx-bootstrap';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consultations-edit',
  templateUrl: './consultations-edit.component.html',
  styleUrls: ['./consultations-edit.component.css']
})
export class ConsultationsEditComponent implements OnInit {
  @ViewChild(PatientsChooseComponent)
  private patientComponent: PatientsChooseComponent;

  @ViewChild('editConsultationModal') private content;
  id = null;
  editConsultationForm: FormGroup;
  modalReference: any = {};
  consultations: Array<any>;

  editConsultation: any;
  editReleve: any;
  releveData: any;
  motifs: any;
  specialites: any;
  tconstantes: any;
  id_patient = null;
  id_consultation = null;
  personneChoosed: any;
  patientChoosed: any;
  nom = '';
  prenom = '';
  code_patient: '';
  checkedMotifs = false;

  /*editConsultation: any;
  editPersonne: any;
  gsanguins: any;
  rhesuss: any;*/
  img_class = 'hidden';
  default_class = '';
  editData = { code_pers: '', nom_pers: '', prenom_pers: '', code_consultation: '', id_specialite: '', libelle_consultation: '', commentaire_consultation: '', resultat_consultation: '', date_consultation: '', taille: '', poids: '', imc: '', sc: '', temperature: '', pouls: '', tad: '', tas: '' };
  requesting: boolean;
  //content: any;
  ngbModalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false };

  constructor(private datePipe: DatePipe, private http: HttpClient,
              private modalConsultation: NgbModal, private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editConsultationForm = this.formBuilder.group({
      code_pers: ['', Validators.required],
      nom_pers: ['', Validators.required],
      prenom_pers: ['', Validators.required],
      code_consultation: ['', Validators.required],
      id_specialite: ['', Validators.required],
      libelle_consultation: ['', Validators.required],
      commentaire_consultation: [''],
      resultat_consultation: ['', Validators.required],
      date_consultation: ['', Validators.required],
      taille: [''],
      poids: [''],
      imc: [''],
      sc: [''],
      temperature: [''],
      pouls: [''],
      tad: [''],
      tas: ['']
    });
    //this.editPersonne = { photo: '', nom_pers: '', telephone_portable: '', prenom_pers: '', email: '', lieu_naiss_pers: '', date_naiss_pers: '', adresse: '', sexe: '', telephone_fixe: '' };
    //this.editConsultation = { code_consultation: '', num_as_ss: '', id_rhesus: '', id_gsanguin: '', profession: '', signe_particulier: '', commentaire: '' };
    this.releveData = { id_consultation: '', id_tconstante: '', valeur: '' };
    this.editReleve = { taille: '', poids: '', imc: '', sc: '', temperature: '', pouls: '', tad: '', tas: '' };
    this.editConsultation = { code_consultation: '', id_specialite: '', libelle_consultation: '', commentaire_consultation: '', resultat_consultation: '', date_consultation: '' };
    this.requesting = false;
    this.getMotifs();
    this.getSpecialites();
    this.getTypeConstantes();
  }

  getMotifs() {
    this.api.getAll('cmotif').subscribe(data => {
      this.motifs = data;
      for(var i=0; i < this.motifs.length; i++){
        this.motifs[i].checked = false;
      }
    }, err => { console.log(err); });
  }

  getCMChecked(id){
    this.api.getAllWhere('mconsultation', id).subscribe(data => {
      for(var i=0; i < this.motifs.length; i++){
        this.motifs[i].checked = false;
        for(var j=0; j < data.length; j++){
          if(this.motifs[i]._id == data[j].id_motif){
            this.motifs[i].checked = true;
          }
        }
      }
    }, err => { console.log(err); });
  }

  getTypeConstantes() {
    this.api.getAll('tconstante').subscribe(data => {
      this.tconstantes = data;
    }, err => { console.log(err); });
  }

  getSpecialites() {
    this.api.getAll('specialite').subscribe(data => {
      this.specialites = data;
    }, err => { console.log(err); });
  }

  getOnePatient(id){
    this.api.getById('patient', id).subscribe(data => {
      this.id_patient = data._id;
      this.editData.code_pers = data.code_patient;
      this.getOnePersonne(data.id_personne);
    }, err => { console.log(err); });
  }

  getOnePersonne(id){
    this.api.getById('personne', id).subscribe(data => {
      this.editData.nom_pers = data.nom_pers;
      this.editData.prenom_pers = data.prenom_pers;
      this.editConsultationForm.setValue(this.editData);
    }, err => { console.log(err); });
  }

  addRemoveData(motif){
    motif.checked = !motif.checked;
    this.controleCheckedMotif();
  }

  controleCheckedMotif(){
    this.checkedMotifs = false;
    for(var i=0; i < this.motifs.length; i++){
      if(this.motifs[i].checked){
        this.checkedMotifs = true;
      }
    }
  }

  saveMotif(id){
    this.api.getAllWhere('mconsultation', id).subscribe(data => {
      for(var i=0; i < data.length; i++){
        this.api.supprimer('mconsultation', data[i]).subscribe((res) => {
          console.log(res);
        });
      }
    }, err => { console.log(err); });

    for(var i=0; i < this.motifs.length; i++){
      if(this.motifs[i].checked){
        const mconsultationData = { id_consultation: id, id_motif: this.motifs[i]._id };
        this.api.ajouter('mconsultation', mconsultationData).subscribe((res) => {
          console.log(res);
        });
      }
    }
  }

  saveReleve(id){
    //this.releveData.id_consultation = id;
    this.api.getAllWhere('tconstante','TAILLE').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.taille.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','POIDS').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.poids.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','IMC').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.imc.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','SC').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.sc.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TEMPERATURE').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.temperature.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','POULS').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.pouls.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TAD').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.tad.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','tas').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        data[0].valeur = this.f.tas.value;
        this.api.modifier('releve', data[0]).subscribe((res) => {
          console.log(res);
        });
      }, err => { console.log(err); });
    }, err => { console.log(err); });
  }

  getDReleves(id){
    this.api.getAllWhere('tconstante','TAILLE').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.taille = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','POIDS').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.poids = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','IMC').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.imc = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','SC').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.sc = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TEMPERATURE').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.temperature = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','POULS').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.pouls = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TAD').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.tad = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    this.api.getAllWhere('tconstante','TAS').subscribe(data => {
      this.api.getOneWhere('releve', id, data[0]._id).subscribe(data => {
        if(data[0] && data[0].valeur){
          this.editData.tas = data[0].valeur;
          this.editConsultationForm.setValue(this.editData);
        }
      }, err => { console.log(err); });
    }, err => { console.log(err); });
    console.log(this.editData);
  }

  choosePatient(){
    this.patientComponent.openPopup();
  }

  openPopup(){
    this.modalReference.backdrop = 'static';
    this.modalReference.keyboard = false;
    this.editData = { code_pers: '', nom_pers: '', prenom_pers: '', code_consultation: '', id_specialite: '', libelle_consultation: '', commentaire_consultation: '', resultat_consultation: '', date_consultation: '', taille: '', poids: '', imc: '', sc: '', temperature: '', pouls: '', tad: '', tas: '' };
    this.modalReference = this.modalConsultation.open(this.content, this.ngbModalOptions);
  }

  setEditConsultation(id){
    this.getOneConsultation(id);
    console.log(this.editConsultation);
  }

  closeModal(): void {
    this.modalReference.close();
    this.router.navigate(['/consultations/consultations-listing']);
  }

  setPatient(event){
    this.patientChoosed = event.value;
    this.id_patient = this.patientChoosed._id;
    this.editConsultation.id_patient = this.id_patient;
    this.editData.code_pers = this.patientChoosed.code_patient;
    this.api.getById('personne', this.patientChoosed.id_personne).subscribe(data => {
      this.editData.nom_pers = data.nom_pers;
      this.editData.prenom_pers = data.prenom_pers;
      this.editConsultationForm.setValue(this.editData);
    }, err => { console.log(err); });
  }

  getOneConsultation(id){
    this.api.getById('consultation', id).subscribe(data => {
      this.id = id;
      this.id_consultation = id;
      this.editConsultation = data; console.log(data);
      this.editData.code_consultation = data.code_consultation;
      this.editData.id_specialite = data.id_specialite;
      this.editData.libelle_consultation = data.libelle_consultation;
      this.editData.commentaire_consultation = data.commentaire_consultation;
      this.editData.resultat_consultation = data.resultat_consultation;
      this.editData.date_consultation = this.datePipe.transform(data.date_consultation, 'yyyy-MM-dd');
      if(this.id_consultation){
        this.getDReleves(this.id_consultation);
        this.getCMChecked(this.id_consultation);
      }
      if(data.id_patient && data.id_patient != ''){
        this.getOnePatient(data.id_patient);
      }
    }, err => { console.log(err); });

  }



  get f () { return this.editConsultationForm.controls; }

  saveConsultation(id){
    this.editConsultation.id_patient = id;
    this.editConsultation.code_consultation = this.f.code_consultation.value;
    this.editConsultation.id_specialite = this.f.id_specialite.value;
    this.editConsultation.libelle_consultation = this.f.libelle_consultation.value;
    this.editConsultation.commentaire_consultation = this.f.commentaire_consultation.value;
    this.editConsultation.resultat_consultation = this.f.resultat_consultation.value;
    this.editConsultation.date_consultation = this.f.date_consultation.value;

    this.api.modifier('consultation', this.editConsultation).subscribe((res) => {
      this.editConsultation = {};
      console.log(res);
    });
  }

  modifierConsultation() {
    this.requesting = true;

    this.editConsultation.id_patient = this.id_patient;
    this.editConsultation.code_consultation = this.f.code_consultation.value;
    this.editConsultation.id_specialite = this.f.id_specialite.value;
    this.editConsultation.libelle_consultation = this.f.libelle_consultation.value;
    this.editConsultation.commentaire_consultation = this.f.commentaire_consultation.value;
    this.editConsultation.resultat_consultation = this.f.resultat_consultation.value;
    this.editConsultation.date_consultation = this.f.date_consultation.value;
    this.api.modifier('consultation', this.editConsultation).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.id_consultation = res._id;
      if(this.id_consultation){
        this.saveMotif(this.id_consultation);
        this.saveReleve(this.id_consultation);
      }
      this.closeModal();
      this.router.navigate(['/consultations/consultations-listing']);
    });
  }

  supprimerConsultation() {
    this.requesting = true;
    this.editConsultation.del = 1;

    this.api.supprimer('consultation/', this.editConsultation).subscribe((res) => {
      console.log(res);
      this.requesting = false;
      this.closeModal();
      this.router.navigate(['/consultations/consultations-listing']);
    });
  }

}
