import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  showBookingForm = true;
  error;
  bookForm;
  constructor() {
    this.bookForm = new FormGroup({
      eccNo: new FormControl('',
      [
        Validators.required
      ]
      ),
      roomNo: new FormControl('', [
        Validators.required
      ]),
      employeeId: new FormControl('',
      [
        Validators.required
      ]
      )
    });
  }

  ngOnInit() {
  }

}
