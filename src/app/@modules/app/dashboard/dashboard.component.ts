import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../@shared/models/user.model';
import {AuthenticationService} from '../../../@core/services/authentication.service';
import {AppConfig} from '../../../@config/app.config';
import {Storage} from './../../../@core/mocks/storage';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    user: User;
    appConfig: AppConfig;
    paids: any = [];
    forPaid = 0;

    constructor(private authService: AuthenticationService, @Inject(AppConfig) appConfig, private storage: Storage) {
        this.appConfig = appConfig;
    }

    ngOnInit(): void {
        this.authService.getUserObservable().subscribe((data) => {
            if (data) {
                this.user = data;
                this.calcPayment();
            } else {
                this.user = null;
            }
        });
    }

    calcPayment(): any {
        let sum = 0;
        this.storage.consumers.forEach(c => {
            if (c.parentId === this.user.id) {
                this.storage.finance.forEach(f => {
                    if (f.paid === false && f.idConsumer === c.id) {
                        console.log(f.financeValue);
                        this.storage.financeTypeValues.forEach(fv => {
                            const dateFinance = new Date(f.date);
                            const dateValFrom = new Date(fv.valFrom);
                            // @ts-ignore
                            if (dateFinance >= dateValFrom && fv.valTo === '') {
                                f.financeValue.forEach(v => {
                                    if (v === fv.typeId) {
                                        console.log('jest takie', fv.value);
                                        this.storage.financeTypes.forEach(t => {
                                            if (v === t.id) {
                                                this.paids.push({id: v, val: fv.value, name: t.name, day: f.date});
                                                // @ts-ignore
                                                sum = parseFloat(sum) + parseFloat(fv.value);

                                            }
                                        });

                                    }
                                });
                            }
                        });
                    }
                });
            }

        });

        // @ts-ignore
        this.forPaid = parseFloat(sum).toFixed(2);
    }

}
