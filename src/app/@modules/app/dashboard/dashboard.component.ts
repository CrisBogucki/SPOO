import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../@shared/models/user.model';
import {AuthenticationService} from '../../../@core/services/authentication.service';
import {AppConfig} from '../../../@config/app.config';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    user: User;
    appConfig: AppConfig;

    constructor(private authService: AuthenticationService, @Inject(AppConfig) appConfig) {
        this.appConfig = appConfig;
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

    calcPayment(){

    }

}
