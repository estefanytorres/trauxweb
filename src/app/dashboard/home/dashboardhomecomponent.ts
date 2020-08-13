// Angular
import { Component, OnInit } from '@angular/core';
// APP
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class Dashboardhomecomponent implements OnInit {

  user_licenses: any[];

  constructor(private client: ClientService) { }

  ngOnInit() {
    this.client.getUserLicenses().subscribe(
      data => {
        this.user_licenses = data;
        },
        error => console.log(error)
    );
  }

}
