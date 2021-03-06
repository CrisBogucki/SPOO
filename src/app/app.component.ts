import {Component, Inject, OnInit} from '@angular/core';
import {AppConfig} from './@config/app.config';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    appConfig: AppConfig;

    constructor(@Inject(AppConfig) appConfig) {
        this.appConfig = appConfig;
    }


    ngOnInit(): void {
        document.title = this.appConfig.appName;
    }

}
