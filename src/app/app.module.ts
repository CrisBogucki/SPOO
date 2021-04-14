import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpJwtInterceptor} from './@core/interceptors/http-jwt.interceptor';
import {HttpErrorInterceptor} from './@core/interceptors/http-error.interceptor';

import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppConfig} from './@config/app.config';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SessionConfig} from './@config/session.config';
import {SessionService} from './@core/services/session.service';
import {EmailService} from './@core/services/email.service';
import {AuthorizationMockService, FinanceTypesMockService, FinanceTypesValueMockService, RequestMethodService} from './@core/mocks/mocks';
import {Storage} from "./@core/mocks/storage";


@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    AppConfig, SessionConfig, SessionService, EmailService, Storage,
    {provide: HTTP_INTERCEPTORS, useClass: HttpJwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue: environment.app_base_href},

    RequestMethodService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationMockService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: FinanceTypesMockService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: FinanceTypesValueMockService, multi: true},
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {

}
