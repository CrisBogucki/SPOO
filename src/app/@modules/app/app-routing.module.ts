import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceTypeComponent} from './finance-type/finance-type.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:
      [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'finance-type', component: FinanceTypeComponent},
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
