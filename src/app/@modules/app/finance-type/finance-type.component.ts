import {Component, OnInit} from '@angular/core';
import {FinanceService} from '../../../@core/services/finance.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FinanceType} from '../../../@shared/models/finance-type.model';
import {DialogService} from '../../../@shared/components/modal/dialog.service';

@Component({
  selector: 'app-finance-type',
  templateUrl: './finance-type.component.html'
})
export class FinanceTypeComponent implements OnInit {

  finanseType$: Observable<Array<FinanceType>>;

  constructor(private financeService: FinanceService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.getFinanceType();
  }

  onRefresh() {
    this.getFinanceType();
  }

  onAddRow() {
    this.financeService.addFinanceType().subscribe();
  }

  onUpdateRow(item: FinanceType) {
    this.financeService.updateFinanceType(item).subscribe();
  }

  onRemoveRow(item: FinanceType) {
    this.dialogService.confirmYesNo('Usunąć', 'Czy usunąć rekord?',
      () => {
        this.financeService.removeFinanceType(item).subscribe();
      },
      () => {
      });
  }

  onCancelAndRemoveRow(item: FinanceType) {
    if (item['editableWithOutRemove'] === true) {
      item.editable = false;
    } else {
      this.financeService.removeFinanceType(item).subscribe();
    }
  }


  getFinanceType() {
    this.finanseType$ = this.financeService.getFinanceType().pipe(map(req => req));
  }

  trackByFn(index, item) {
    return index;
  }

}
