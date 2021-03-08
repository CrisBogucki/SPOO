import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../../@shared/models/user.model';

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser: BehaviorSubject<User> = this.authenticationService.currentUserSubject;
    if (currentUser && currentUser.value && currentUser.value.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.value.token}`
        }
      });
    }

    return next.handle(request);
  }
}
