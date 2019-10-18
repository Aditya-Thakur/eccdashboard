import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Ecc } from 'src/app/models/ecc';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  eccList = [];
  editData = false;
  eccNoToEdit = 0;
  showData = true;
  updateEccForm;
  msg;
  constructor(private dataService: DataService, private adminService: AdminService) {
    this.updateEccForm = new FormGroup({
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

  async ngOnInit() {
    await this.dataService.getEccRecord().subscribe(
      (res: Ecc[]) => {
        this.eccList = res;
      }
    );
  }

  async updateEccRecord() {
    this.updateEccForm.value.eccNo = this.eccNoToEdit;
    await this.adminService.updateEccRecord(this.updateEccForm.value).subscribe(
      (res) => {
        this.msg = res;
        this.editData = false;
        this.eccNoToEdit = 0;
      }
    );
    await this.dataService.getEccRecord().subscribe(
      (res: Ecc[]) => {
        this.eccList = res;
      }
    );
  }

  edit(eccNo) {
    this.editData = true;
    this.eccNoToEdit = eccNo;
  }

}
