import {NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthorizationMockService} from './authorization-mock.service';
import {FinanceTypesMockService} from './finance-type-mock.service';
import {RequestMethodService} from './request-method.service';

@NgModule({
  providers: [
    RequestMethodService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationMockService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: FinanceTypesMockService, multi: true},
  ],
})
export class MockModule {
}
