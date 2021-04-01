import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceTypeComponent} from './finance/finance-type/finance-type.component';
import {FinanceTypeValueComponent} from './finance/finance-type-value/finance-type-value.component';
import {FormsModule} from '@angular/forms';
import {SharedComponetsModule} from '../../@shared/components/shared.componets.module';
import {DialogService} from '../../@shared/components/dialog/dialog.service';
import {FinanceInTimeComponent} from './finance/finance-in-time/finance-in-time.component';
import {FinanceInConsumerComponent} from './finance/finance-in-consumer/finance-in-consumer.component';
import {UsersComponent} from './users/users/users.component';
import {ConsumersComponent} from './users/consumers/consumers.component';

@NgModule({
    declarations: [
        LayoutComponent,
        DashboardComponent,
        FinanceTypeComponent,
        FinanceTypeValueComponent,
        FinanceInTimeComponent,
        FinanceInConsumerComponent,
        UsersComponent,
        ConsumersComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        SharedComponetsModule
    ],
    providers: [DialogService]
})
export class AppModule {
}
