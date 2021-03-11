import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FinanceType} from '../../@shared/models/finance-type.model';

@Injectable({providedIn: 'root'})
export class FinanceTypeService {

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http
      .get<Array<FinanceType>>(`${environment.apiUrl}/finance/type`)
      .pipe(map(req => req));
  }

  add() {
    return this.http.post(`${environment.apiUrl}/finance/type`, {});
  }

  update(item) {
    return this.http.put(`${environment.apiUrl}/finance/type`, item);
  }

  remove(item) {
    return this.http.post(`${environment.apiUrl}/finance/type/delete`, item);
  }


}
