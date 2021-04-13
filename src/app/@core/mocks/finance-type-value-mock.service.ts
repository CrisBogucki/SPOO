import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {RequestMethodService} from './request-method.service';
import {FinanceTypeValue} from '../../@shared/models/finance-type-value.model';
import {FinanceTypesMockService} from './finance-type-mock.service';

// @ts-ignore
import financialTypeValueJson from './data-seed/finance-type-value.json';


@Injectable()
export class FinanceTypesValueMockService implements HttpInterceptor {

    VALUES: FinanceTypeValue[];

    constructor(private request: RequestMethodService) {
        this.VALUES = financialTypeValueJson;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        return of(null).pipe(mergeMap(() => {

            // get all
            if (request.url.endsWith('/finance/value') && request.method === 'GET') {
                if (!isLoggedIn) {
                    return this.request.unauthorised();
                }
                const types = this.VALUES.sort((x, y) => x.typeId - y.typeId);
                return this.request.ok(types);
            }

            // add
            if (request.url.endsWith('/finance/value') && request.method === 'POST') {
                if (!isLoggedIn) {
                    return this.request.unauthorised();
                }

                const body: FinanceTypeValue = request.body;
                body.id = this.getMaxId();
                body.editable = true;
                this.VALUES.push(body);
                return this.request.created();
            }

            // delete
            if (request.url.endsWith('/finance/value/delete') && request.method === 'POST') {
                if (!isLoggedIn) {
                    return this.request.unauthorised();
                }
                const body: FinanceTypeValue = request.body;
                const index = this.VALUES.indexOf(body);
                this.VALUES.splice(index, 1);
                return this.request.deleted();
            }

            // edit
            if (request.url.endsWith('/finance/value') && request.method === 'PUT') {
                if (!isLoggedIn) {
                    return this.request.unauthorised();
                }
                const body: FinanceTypeValue = request.body;

                let oldRow = this.VALUES.find(x => x.id === body.id);

                oldRow.id = body.id;
                oldRow.typeId = body.typeId;
                oldRow.type = null;
                oldRow.value = body.value;
                oldRow.valFrom = body.valFrom;
                oldRow.valTo = body.valTo;
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
        for (let i = 0; this.VALUES.length > i; i++) {
            if (this.VALUES[i].id > id) {
                id = this.VALUES[i].id;
            }
        }
        return id + 1;
    }
}
