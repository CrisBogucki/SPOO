import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../@core/services/authentication.service';
import {User} from '../../../@shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('navBurger', {read: false, static: false}) navBurger: ElementRef;
  @ViewChild('navMenu', {read: false, static: false}) navMenu: ElementRef;

  user: User;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe((data) => {
      if (data) {
        this.user = data;
      } else {
        this.user = null;
      }
    });
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

}
