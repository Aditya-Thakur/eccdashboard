import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export interface ECC {
  eccNo: number;
  noOfRooms: number;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getEccRecord(): Observable<ECC[]> {
    return this.http.get(`http://localhost:3000/ecc/getAllEcc`).pipe(
      map((res) => {
        return res as ECC[];
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
