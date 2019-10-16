import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';

export interface ECC {
  eccNo: number;
  noOfRooms: number;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  eccList = [];
  constructor(private dataService: DataService) { }

 async ngOnInit() {
  await this.dataService.getEccRecord().subscribe(
      (res: ECC[]) => {
        this.eccList = res;
      }
    );
  }

}
