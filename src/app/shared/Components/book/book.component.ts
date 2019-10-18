import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { BookService } from '../../Services/book.service';

export interface ECC {
  eccNo: number;
  noOfRooms: number;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  listOfEcc = [];
  showBookingForm = true;
  error;
  bookForm;
  msg;
  availableNoOfRooms = 0;
  selectedEccCapacity;
  constructor(private dataService: DataService, private bookService: BookService) {
    this.bookForm = new FormGroup({
      eccNo: new FormControl('',
      [
        Validators.required
      ]
      ),
      roomNo: new FormControl('', [
        Validators.required
      ]),
      employeeId: new FormControl('',
      [
        Validators.required
      ]
      )
    });
  }

  async ngOnInit() {
     this.dataService.getEccRecord().subscribe( (res: ECC[]) => {
      this.listOfEcc = res;
    });
  }

 async getRoom(eccNo) {
    this.availableNoOfRooms = this.listOfEcc.find( x => {
      // tslint:disable-next-line: triple-equals
      return x.eccNo == eccNo;
    }).noOfRooms;
    this.selectedEccCapacity = await Array.from({length: this.availableNoOfRooms}).map((x, i) => i);
    this.selectedEccCapacity.push(this.availableNoOfRooms);
    this.selectedEccCapacity.shift(0);
    console.log(this.selectedEccCapacity);
  }

book() {
  this.bookService.book(this.bookForm.value).subscribe(
    (res) => {
      this.msg = res;
    }
  );
}


}

