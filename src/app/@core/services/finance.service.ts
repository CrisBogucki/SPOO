import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FinanceType} from '../../@shared/models/finance-type.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FinanceService {

  constructor(private http: HttpClient) {
  }

  getFinanceType() {
    return this.http
      .get<Array<FinanceType>>(`${environment.apiUrl}/finance/type`)
      .pipe(map(req => req));
  }

  addFinanceType() {
    return this.http.post(`${environment.apiUrl}/finance/type`, {});
  }

  updateFinanceType(obj) {
    return this.http.put(`${environment.apiUrl}/finance/type`, obj);
  }

  removeFinanceType(obj) {
    return this.http.post(`${environment.apiUrl}/finance/type/delete`, obj);
  }


}
