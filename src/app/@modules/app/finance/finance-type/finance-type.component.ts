import {Component, OnInit} from '@angular/core';
import {FinanceTypeService} from '../../../../@core/services/finance-type.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FinanceType} from '../../../../@shared/models/finance-type.model';
import {FinanceTypeValueService} from '../../../../@core/services/finance-type-value.service';
import {DialogService} from '../../../../@shared/components/dialog/dialog.service';
import {FinanceTypeValue} from "../../../../@shared/models/finance-type-value.model";

@Component({
    selector: 'app-finance-type',
    templateUrl: './finance-type.component.html'
})
export class FinanceTypeComponent implements OnInit {

    finanseType$: Observable<Array<FinanceType>>;

    constructor(private financeTypeService: FinanceTypeService,
                private financeTypeValueService: FinanceTypeValueService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.get();
    }

    onRefresh() {
        this.get();
    }

    onAddRow() {
        this.financeTypeService.add().subscribe();
    }

    onUpdateRow(item: FinanceType) {
        this.financeTypeService.update(item).subscribe();
    }

    onRemoveRow(item: FinanceType) {
        this.financeTypeValueService.get().subscribe(data => {
            const isUsed = data.find(x => x.typeId === item.id);
            console.log(isUsed);
            if (isUsed !== undefined) {
                this.dialogService.dialogOk('Usunąć', 'Rekord jest przypisany do wysokości opłat?', () => {
                })
            } else {
                this.dialogService.dialogYesNo('Usunąć', 'Czy usunąć rekord?',
                    () => {
                        this.financeTypeService.remove(item).subscribe();
                    },
                    () => {
                    });
            }
        });
    }

    onCancelAndRemoveRow(item: FinanceType) {
        if (item['editableWithOutRemove'] === true) {
            item.editable = false;
        } else {
            this.financeTypeService.remove(item).subscribe();
        }
    }


    get() {
        this.finanseType$ = this.financeTypeService.get().pipe(map(req => req));
    }

    trackByFn(index, item) {
        return index;
    }

}
