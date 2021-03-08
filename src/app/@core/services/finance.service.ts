import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FinanceType} from '../../@shared/models/finance-type.model';

@Injectable({providedIn: 'root'})
export class FinanceService {

  constructor(private http: HttpClient) {
  }

  getFinanceType() {
    const x =  this.http
      .get<Array<FinanceType>>(`${environment.apiUrl}/finance/type`)
      .pipe(map(req => {
        return req;
      }));
    return x;
  }


}
