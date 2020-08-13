import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthUser } from '../../models/auth_user.model';
import { environment } from '../../environments/environment';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  isNavbarCollapsed: boolean;
  user: AuthUser = new AuthUser();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isNavbarCollapsed = true;
    this.auth.getAuthenticatedUser().subscribe(
      data => this.user = data,
      error => {
        if (!environment.production) {
          console.log('ERROR:');
          console.log(error);
        }
        this.logOut();
      }
    );
    this.router.navigate(['/dashboard']).finally();
  }

  // To prevent navs to be unselected, one panel is open at all times.
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.nextState === false) {
      $event.preventDefault();
    }
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/login']).finally();
  }
}
