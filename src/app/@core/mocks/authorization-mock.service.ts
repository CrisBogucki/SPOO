import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {User} from '../../@shared/models/user.model';
import {RequestMethodService} from './request-method.service';

// @ts-ignore
import accountJson from './data-seed/account.json';

import './../../../assets/libs/smtp.js';

declare let Email: any;

@Injectable()
export class AuthorizationMockService implements HttpInterceptor {

    constructor(private request: RequestMethodService) {
        this.sendMail();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const users: User[] = accountJson;

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/account/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) {
                    return this.request.error('Login lub hasło są niepoprawne');
                }
                return this.request.ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`
                });
            }

            if (request.url.endsWith('/account/forgot') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username);
                if (!user) {
                    return this.request.error(`Brak użytkownika w bazie`);
                }

                return this.request.ok({
                    password: user.password
                });
            }

            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (!isLoggedIn) {
                    return this.request.unauthorised();
                }
                return this.request.ok(users);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    sendMail() {
        Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'fx57@o2.pl',
            Password: 'soop11$K',
            To: 'fx57@o2.pl',
            From: 'fx57@o2.pl',
            Subject: 'Temat',
            Body: `<i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>{this.model.name} <br /> <b>Email: </b>{this.model.email}<br /> <b>Subject: </b>{this.model.subject}<br /> <b>Message:</b> <br /> {this.model.message} <br><br> <b>~End of Message.~</b> `
        }).then(message => {
            alert(message);
        });

    }
}

