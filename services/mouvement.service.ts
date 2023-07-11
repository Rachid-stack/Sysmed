import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Http, Response } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

  constructor(private http: Http) { }

}
