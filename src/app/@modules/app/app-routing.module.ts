import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceTypeComponent} from './finance/finance-type/finance-type.component';
import {FinanceTypeValueComponent} from './finance/finance-type-value/finance-type-value.component';
import {FinanceInTimeComponent} from './finance/finance-in-time/finance-in-time.component';
import {FinanceInConsumerComponent} from './finance/finance-in-consumer/finance-in-consumer.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:
      [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'finance-type', component: FinanceTypeComponent},
        {path: 'finance-type-value', component: FinanceTypeValueComponent},
        {path: 'finance-in-time', component: FinanceInTimeComponent},
        {path: 'finance-in-consumer/id', component: FinanceInConsumerComponent},
        {path: '', redirectTo: 'dashboard'}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
