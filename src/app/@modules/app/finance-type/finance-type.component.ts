import {Component, OnInit} from '@angular/core';
import {FinanceService} from '../../../@core/services/finance.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FinanceType} from '../../../@shared/models/finance-type.model';

@Component({
  selector: 'app-finance-type',
  templateUrl: './finance-type.component.html'
})
export class FinanceTypeComponent implements OnInit {

  finanseType$: Observable<Array<FinanceType>>;

  constructor(private financeService: FinanceService) {
  }

  ngOnInit() {
    this.getFinanceType();
  }

  getFinanceType() {
    this.finanseType$ = this.financeService.getFinanceType().pipe(map(req => req));
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
