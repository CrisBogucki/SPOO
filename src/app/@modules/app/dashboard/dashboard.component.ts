import { Component, OnInit } from '@angular/core';
import {User} from "../../../@shared/models/user.model";
import {AuthenticationService} from "../../../@core/services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe((data) => {
      if (data) {
        this.user = data;
      } else {
        this.user = null;
      }
    });
  }

}
