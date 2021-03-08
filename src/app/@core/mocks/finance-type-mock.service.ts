import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {RequestMethodService} from './request-method.service';
import {FinanceType} from '../../@shared/models/finance-type.model';

// @ts-ignore
import financialTypeJson from './data-seed/financial-type.json';

@Injectable()
export class FinanceTypesMockService implements HttpInterceptor {

  constructor(private request: RequestMethodService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const TYPES: FinanceType[] = financialTypeJson;

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');


    return of(null).pipe(mergeMap(() => {
      // get all
      if (request.url.endsWith('/finance/type') && request.method === 'GET') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const types = TYPES.sort((a, b) => a.name.localeCompare(b.name));
        return this.request.ok(types);
      }

      // add
      if (request.url.endsWith('/finance/type') && request.method === 'POST') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const body: FinanceType = request.body;
        body.id = getMaxId();
        TYPES.push(body);
        return this.request.created();
      }

      // delete
      if (request.url.endsWith('/finance/type/delete') && request.method === 'POST') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const body: FinanceType = request.body;
        const index = TYPES.indexOf(body);
        TYPES.splice(index, 1);
        return this.request.deleted();
      }

      // edit
      if (request.url.endsWith('/finance/type') && request.method === 'PUT') {
        if (!isLoggedIn) {
          return this.request.unauthorised();
        }
        const body: FinanceType = request.body;
        TYPES.find((field) => field.id === body.id).name = body.name;
        TYPES.find((field) => field.id === body.id).name = body.description;
        return this.request.ok(body);
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // private functions
    function getMaxId(): number {
      return TYPES.reduce(
        (max, character) => (character.id > max ? character.id : max),
        // tslint:disable-next-line:radix
        parseInt(String(TYPES[0].id)) + 1
      );
    }

  }
}
