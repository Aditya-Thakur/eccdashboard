import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Ecc } from 'src/app/models/ecc';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addEccRecord(data: Ecc) {
    return this.http.post(`http://localhost:3000/ecc/insertECC`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError));
  }

  updateEccRecord(data) {
    return this.http.post(`http://localhost:3000/ecc/updateECC`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
