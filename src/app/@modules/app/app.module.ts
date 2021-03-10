import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceTypeComponent} from './finance-type/finance-type.component';
import {FinanceTypeValueComponent} from './finance-type-value/finance-type-value.component';
import {FormsModule} from '@angular/forms';
import {SharedComponetsModule} from '../../@shared/components/shared.componets.module';
import {DialogService} from '../../@shared/components/modal/dialog.service';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent, FinanceTypeComponent, FinanceTypeValueComponent],
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
