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
  successfulBooking: Book = {
    employeeId : 0,
    eccNo: 0,
    roomNo: 0
  };
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
          Validators.required,
          Validators.pattern('[0-9]{3,8}')
        ]
      )
    });
    this.unbookForm = new FormGroup({
      employeeId: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[0-9]{3,8}')
        ]
      )
    });
  }

   ngOnInit() {
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
    try {
      this.bookService.book(this.bookForm.value).then(
        res => {
          let myRes;
          myRes = res;
          console.log(myRes);
          this.successfulBooking.employeeId = myRes.employeeId;
          this.successfulBooking.roomNo = myRes.roomNo;
          this.successfulBooking.eccNo = myRes.eccNo;
          this.msg = 'Booking successful for Employee No. ' +
                      this.successfulBooking.employeeId + ' in Ecc No. - ' +
                      this.successfulBooking.eccNo + ' in Room no. ' +
                      this.successfulBooking.roomNo + '.';
          // Cleaning the form for next input
          this.bookForm.reset();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  unbook() {
    this.msg = null;
    this.error = null;
    this.bookService.unbook(this.unbookForm.value).then(
      (res) => {
        this.msg = JSON.stringify(res);
        this.currentBooking = null;
        this.unbookForm.reset();
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

