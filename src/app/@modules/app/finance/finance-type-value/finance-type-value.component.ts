import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FinanceType} from '../../../../@shared/models/finance-type.model';
import {DialogService} from '../../../../@shared/components/dialog/dialog.service';
import {map} from 'rxjs/operators';
import {FinanceTypeValueService} from '../../../../@core/services/finance-type-value.service';
import {FinanceTypeValue} from '../../../../@shared/models/finance-type-value.model';
import {FinanceTypeService} from '../../../../@core/services/finance-type.service';

@Component({
    selector: 'app-finance-type-value',
    templateUrl: './finance-type-value.component.html'
})
export class FinanceTypeValueComponent implements OnInit {

    finanseTypeValue$: Observable<Array<FinanceTypeValue>>;
    finanseType$: Array<FinanceType>;

    constructor(private financeTypeValueService: FinanceTypeValueService,
                private financeTypeService: FinanceTypeService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.get();
    }

    onRefresh() {
        this.get();
    }

    onAddRow() {
        this.financeTypeValueService.add().subscribe();
    }

    onUpdateRow(item: FinanceTypeValue) {
        console.log(item);
        this.financeTypeValueService.update(item).subscribe();
        this.finanseTypeValue$ = this.finanseTypeValue$.pipe(map(req => {
            for (let i = 0; req.length > i; i++) {
                req[i].type = this.finanseType$.find(x => x.id === req[i].typeId);
            }
            return req;
        }));
    }

    onRemoveRow(item: FinanceTypeValue) {
        this.dialogService.dialogYesNo('Usunąć', 'Czy usunąć rekord?',
            () => {
                this.financeTypeValueService.remove(item).subscribe();
            },
            () => {
            });
    }

    onCancelAndRemoveRow(item: FinanceTypeValue) {
        if (item['editableWithOutRemove'] === true) {
            item.editable = false;
        } else {
            this.financeTypeValueService.remove(item).subscribe();
        }
    }


    get() {
        this.finanseTypeValue$ = null;
        this.financeTypeService.get().subscribe(financeType => {
            this.finanseType$ = financeType;
            this.finanseTypeValue$ = this.financeTypeValueService.get().pipe(map(req => {
                for (let i = 0; req.length > i; i++) {
                    req[i].type = financeType.find(x => x.id === req[i].typeId);
                }
                return req;
            }));
        });
    }

    trackByFn(index, item) {
        return index;
    }

    changeNowWhenUpdate(typeId: number) {
        this.finanseTypeValue$.pipe(map(req => {
            for (let i = 0; req.length > i; i++) {
                if (req[i].typeId === typeId) {
                    req[i].type = this.finanseType$.find(x => x.id === typeId);
                }
            }
            return req;
        }));
    }
}
