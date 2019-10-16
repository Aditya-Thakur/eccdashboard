import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showAddEccForm = true;
  addEccForm;
  error;
  msg;
  constructor(private adminService: AdminService) {
    this.addEccForm = new FormGroup({
      eccNo: new FormControl('',
      [
        Validators.required
      ]
      ),
      noOfRooms: new FormControl('', [
        Validators.required
      ])
    });
  }
  addEccRecord() {
    this.adminService.addEccRecord(this.addEccForm.value).subscribe(
      (res) => {
        this.msg = res;
      }
    );
  }

  ngOnInit() {
  }


}
