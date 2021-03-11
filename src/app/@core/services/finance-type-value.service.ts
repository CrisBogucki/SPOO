import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FinanceTypeValue} from '../../@shared/models/finance-type-value.model';

@Injectable({providedIn: 'root'})
export class FinanceTypeValueService {

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http
      .get<Array<FinanceTypeValue>>(`${environment.apiUrl}/finance/value`)
      .pipe(map(req => req));
  }

  add() {
    return this.http.post(`${environment.apiUrl}/finance/value`, {});
  }

  update(item) {
    return this.http.put(`${environment.apiUrl}/finance/value`, item);
  }

  remove(item) {
    return this.http.post(`${environment.apiUrl}/finance/value/delete`, item);
  }


}
