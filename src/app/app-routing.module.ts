import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllAuthGuard} from './@core/guards/all-auth.guard';
import {AdminAuthGuard} from './@core/guards/admin-auth.guard';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./@modules/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./@modules/app/app.module').then(m => m.AppModule),
        canActivate: [AllAuthGuard]
    },
    {
        path: '**', redirectTo: 'app', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
