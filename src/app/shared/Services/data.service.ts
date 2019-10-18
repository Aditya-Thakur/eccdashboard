import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Ecc } from 'src/app/models/ecc';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getEccRecord(): Observable<Ecc[]> {
    return this.http.get(`http://localhost:3000/ecc/getAllEcc`).pipe(
      map((res) => {
        return res as Ecc[];
      }),
      catchError(this.handleError));
  }

  getDetailsByEmpId(data): Observable<Book[]> {
    return this.http.post(`http://localhost:3000/book/getBookingInfo`, data).pipe(
      map((res) => {
        return res as Book[];
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
