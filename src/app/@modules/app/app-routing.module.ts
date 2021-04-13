import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceTypeComponent} from './finance/finance-type/finance-type.component';
import {FinanceTypeValueComponent} from './finance/finance-type-value/finance-type-value.component';
import {FinanceInTimeComponent} from './finance/finance-in-time/finance-in-time.component';
import {FinanceInConsumerComponent} from './finance/finance-in-consumer/finance-in-consumer.component';
import {UsersComponent} from './users/users/users.component';
import {ConsumersComponent} from './users/consumers/consumers.component';
import {UserAuthGuard} from '../../@core/guards/user-auth.guard';
import {AdminAuthGuard} from '../../@core/guards/admin-auth.guard';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children:
            [
                {path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthGuard]},
                {path: 'finance-type', component: FinanceTypeComponent, canActivate: [AdminAuthGuard]},
                {path: 'finance-type-value', component: FinanceTypeValueComponent, canActivate: [AdminAuthGuard]},
                {path: 'finance-in-time', component: FinanceInTimeComponent, canActivate: [AdminAuthGuard]},
                {path: 'finance-in-consumer/id', component: FinanceInConsumerComponent, canActivate: [AdminAuthGuard]},
                {path: 'users', component: UsersComponent, canActivate: [AdminAuthGuard]},
                {path: 'consumers', component: ConsumersComponent, canActivate: [AdminAuthGuard]},
                {path: '', redirectTo: 'dashboard', canActivate: [UserAuthGuard]}
            ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
