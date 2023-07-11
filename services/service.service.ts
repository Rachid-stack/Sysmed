import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { RequestOptions, Request, RequestMethod, Http, Response, Headers } from '@angular/http';

import { environment } from '../src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization' })
};
const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization' });
const options = new RequestOptions({ headers: headers });

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl: any;
  constructor(private http: Http) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Un erreur est survenu : ', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status}, ` +
      `body was : ${error.error}`);
    }
    return throwError('Something bad happened; Please try again later.');
  }

  private extractData(res: Response){
    const body = res.json();
    console.log(body);
    return body || {};
  }

  getAll(route: string){
    return this.http.get(environment.api + '/' + route, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  getAllWhere(route: string, id){
    return this.http.get(environment.api + '/' + route + '/where/' + id, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  getOneWhere(route: string, profile, privilege){
    return this.http.get(environment.api + '/' + route + '/where/' + profile + '/' + privilege, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  getById(route: string, id){
    //url = `${environment.api}/${route}/${id}`;
    return this.http.get(environment.api + '/' + route + '/' + id, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  getByChamp(route: string, id_consultation){
    return this.http.get(environment.api + '/' + route + '/byconsultation/' + id_consultation, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  getActif(route: string, id_consultation){
    return this.http.get(environment.api + '/' + route + '/actif/' + id_consultation, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  ajouter(route: string, object){
    return this.http.post(environment.api + '/' + route + '/add', object, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  modifier(route: string, object){
    return this.http.post(environment.api + '/' + route + '/update/' + object._id, object, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  supprimer(route: string, object){
    return this.http.post(environment.api + '/' + route + '/delete/' + object._id, object, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  supprimerMultiple(route: string, object, id){
    return this.http.post(environment.api + '/' + route + '/delete/multi/' + id, object, options).pipe(map(this.extractData), catchError(this.handleError));
  }

  upload(object){
    return this.http.post(environment.api + '/file/upload', object).pipe(map(this.extractData), catchError(this.handleError));
  }

}
