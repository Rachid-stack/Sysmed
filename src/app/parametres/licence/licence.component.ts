import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ServiceService} from '../../../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.css']
})
export class LicenceComponent implements OnInit {
  id = null;
  editLivence: any;
  licences: any;
  tlicences: any;
  img_class = 'hidden';
  requesting: boolean;
  licenceForm: FormGroup;
  public uploader: FileUploader = new FileUploader({url: environment.api + '/file/upload', itemAlias: 'file'});

  constructor(private datePipe: DatePipe, private http: HttpClient,
              private router: Router, private api: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.licenceForm = this.formBuilder.group({
      raison_sociale: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      faxe: ['', Validators.required],
      email: ['', Validators.required],
      nbr_user: ['', Validators.required],
      type_licence: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['']
    });
    this.editLivence = { logo: '', raison_sociale: '', adresse: '', telephone: '', faxe: '', email: '', nbr_user: '', type_licence: '', start_date: '', end_date: '' };
    this.getTLicences();
    this.getLicences();
    this.requesting = false;
    console.log(this.editLivence);

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item);
      if(status === 200) {
        this.img_class = 'img-h-w';
        document.getElementById('licence_img').setAttribute('src','assets/uploads/' + this.editLivence.logo);
      }else{
        this.img_class = 'hidden';
      }
    };

  }

  fileChooser(fileInput: string): void {
    document.getElementById(fileInput).click();
  }

  fileChange(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editLivence.logo = file.name;
      if(this.editLivence.logo == '' || !this.editLivence.logo){
        this.img_class = 'hidden';
      }else{
        this.img_class = 'img-h-w';
      }
    }
  }

  get f () { return this.licenceForm.controls; }

  getTLicences() {
    this.api.getAll('tlicence').subscribe(data => { this.tlicences = data; console.log(data); }, err => { console.log(err); });
  }

  getLicences() {
    this.api.getAll('licence').subscribe(data => {
      this.licences = data;
      for(var i=0; i < data.length; i++){
        this.editLivence = data[i];
        if(data[i].logo && data[i].logo != ''){
          this.img_class = 'img-h-w';
          document.getElementById('licence_img').setAttribute('src','assets/uploads/' + data[i].logo);
        }
        const dataLicence = { raison_sociale: data[i].raison_sociale, adresse: data[i].adresse, telephone: data[i].telephone, faxe: data[i].faxe, email: data[i].email, nbr_user: data[i].nbr_user, type_licence: data[i].type_licence, start_date: this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd'), end_date: this.datePipe.transform(data[i].end_date, 'yyyy-MM-dd') };
        this.licenceForm.setValue(dataLicence);
      }
      console.log(data);
    }, err => { console.log(err); });
  }

  saveLicence() {
    this.requesting = true;
    this.editLivence.raison_sociale = this.f.raison_sociale.value;
    this.editLivence.adresse = this.f.adresse.value;
    this.editLivence.telephone = this.f.telephone.value;
    this.editLivence.faxe = this.f.faxe.value;
    this.editLivence.email = this.f.email.value;
    this.editLivence.nbr_user = this.f.nbr_user.value;
    this.editLivence.type_licence = this.f.type_licence.value;
    this.editLivence.start_date = this.f.start_date.value;
    this.editLivence.end_date = this.f.end_date.value;
    //console.log(this.editLivence);
    if(this.licences.length == 0){
      this.api.ajouter('licence/', this.editLivence).subscribe((res) => {
        console.log(res);
        this.requesting = false;
        this.router.navigate(['/parametres/licence']);
      });
    }else{
      this.api.modifier('licence/', this.editLivence).subscribe((res) => {
        console.log(res);
        this.requesting = false;
        this.router.navigate(['/parametres/licence']);
      });
    }

  }

}
