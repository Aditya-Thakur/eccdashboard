import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { BookService } from '../../Services/book.service';
import { Ecc } from 'src/app/models/ecc';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  listOfEcc = [];
  showBookingForm = true;
  showUnbookingForm = false;
  error = null;
  bookForm; unbookForm;
  msg;
  availableNoOfRooms = 0;
  selectedEccCapacity;
  currentBooking: Book;
  constructor(private dataService: DataService, private bookService: BookService) {
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
    this.unbookForm = new FormGroup({
      employeeId: new FormControl('',
        [
          Validators.required
        ]
      )
    });
  }

  async ngOnInit() {
    this.dataService.getEccRecord().subscribe((res: Ecc[]) => {
      this.listOfEcc = res;
    });
  }

  async getRoom(eccNo) {
    this.availableNoOfRooms = this.listOfEcc.find(x => {
      // tslint:disable-next-line: triple-equals
      return x.eccNo == eccNo;
    }).noOfRooms;
    this.selectedEccCapacity = await Array.from({ length: this.availableNoOfRooms }).map((x, i) => i);
    this.selectedEccCapacity.push(this.availableNoOfRooms);
    this.selectedEccCapacity.shift(0);
  }

  book() {
    this.msg = null;
    this.error = null;
    this.bookService.book(this.bookForm.value).subscribe(
      (res) => {
        this.msg = res;
      }
    );
  }

  unbook() {
    this.msg = null;
    this.error = null;
    this.bookService.unbook(this.unbookForm.value).subscribe(
      (res) => {
        this.msg = res;
        this.currentBooking = null;
      }
    );
  }

  getDetails() {
    this.msg = null;
    this.error = null;
    this.dataService.getDetailsByEmpId(this.unbookForm.value).subscribe(
      (res) => {
        if ( res.length === 1) {
          this.currentBooking = res[0];
        } else {
          this.error = 'Please provide correct employee Id';
        }
      }
      );
  }

  signUpClicked(): void {
    this.msg = null;
    this.error = null;
    this.showBookingForm = this.showBookingForm ? false : true;
    this.showUnbookingForm = this.showUnbookingForm ? false : true;
  }


}

