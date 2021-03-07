import {of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RequestMethodService {

  constructor() {
  }

  created() {
    return of(new HttpResponse({status: 201}));
  }

  deleted() {
    return of(new HttpResponse({status: 202}));
  }

  ok(body) {
    return of(new HttpResponse({status: 200, body}));
  }

  unauthorised() {
    return throwError({status: 401, error: {message: 'Unauthorised'}});
  }

  error(message) {
    return throwError({status: 400, error: {message}});
  }
}
