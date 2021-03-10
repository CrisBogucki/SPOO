import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {RequestMethodService} from './request-method.service';
import {FinanceType} from '../../@shared/models/finance-type.model';

// @ts-ignore
import financialTypeJson from './data-seed/financial-type.json';

@Injectable()
export class FinanceTypesMockService implements HttpInterceptor {

  TYPES: FinanceType[];

  constructor(private request: RequestMethodService) {
    this.TYPES = financialTypeJson;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

    return of(null).pipe(mergeMap(() => {

      // get all
      if (request.url.endsWith('/finance/type') && request.method === 'GET') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const types = this.TYPES;
        return this.request.ok(types);
      }

      // add
      if (request.url.endsWith('/finance/type') && request.method === 'POST') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }

        const body: FinanceType = request.body;
        body.id = this.getMaxId();
        body.editable = true;
        this.TYPES.push(body);
        return this.request.created();
      }

      // delete
      if (request.url.endsWith('/finance/type/delete') && request.method === 'POST') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const body: FinanceType = request.body;
        const index = this.TYPES.indexOf(body);
        this.TYPES.splice(index, 1);
        return this.request.deleted();
      }

      // edit
      if (request.url.endsWith('/finance/type') && request.method === 'PUT') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const body: FinanceType = request.body;

        let oldRow = this.TYPES.find(x => x.id === body.id);
        oldRow = body;
        return this.request.ok(body);
      }

      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(10))
      .pipe(dematerialize());
  }

  getMaxId(): number {
    let id = 0;
    for (let i = 0; this.TYPES.length > i; i++) {
      if (this.TYPES[i].id > id) {
        id = this.TYPES[i].id;
      }
    }
    return id + 1;
  }
}
