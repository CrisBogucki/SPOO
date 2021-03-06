import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./@modules/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./@modules/app/app.module').then(m => m.AppModule)
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
