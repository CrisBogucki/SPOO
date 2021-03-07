import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceTypeComponent } from './finance-type/finance-type.component';

@NgModule({
    declarations: [LayoutComponent, DashboardComponent, FinanceTypeComponent],
    imports: [
        CommonModule,
        AppRoutingModule
    ]
})
export class AppModule {
}
