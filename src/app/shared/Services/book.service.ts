import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Ecc } from 'src/app/models/ecc';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  book(data) {
    return this.http.post(`http://localhost:3000/book/bookNewRoom`, data).toPromise()
    .then( res => {
      return res;
    })
    .catch(err => this.handleError(err));
  }

  unbook(data) {
    return this.http.post(`http://localhost:3000/book/unbook`, data).toPromise()
      .then( res => {
        return res;
      })
      .catch(err => this.handleError(err));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
