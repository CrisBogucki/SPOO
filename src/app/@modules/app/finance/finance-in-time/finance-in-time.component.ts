import {Component, OnInit} from '@angular/core';
import {Consumer} from '../../../../@shared/models/consumers.model';
import {FinanceType} from '../../../../@shared/models/finance-type.model';
import {FinanceValue} from '../../../../@shared/models/finance-value.model';
import {FinanceTypeValue} from '../../../../@shared/models/finance-type-value.model';
import {Tools} from '../../../../@shared/tools';
import {DialogService} from '../../../../@shared/components/dialog/dialog.service';

// @ts-ignore
import dataJson from '../../../../@core/mocks/data-seed/finance.json';
// @ts-ignore
import consumersJson from '../../../../@core/mocks/data-seed/consumers.json';
// @ts-ignore
import financeJson from '../../../../@core/mocks/data-seed/finance.json';
// @ts-ignore
import financeTypeValueJson from '../../../../@core/mocks/data-seed/finance-type-value.json';
// @ts-ignore
import financeTypeJson from '../../../../@core/mocks/data-seed/finance-type.json';
// @ts-ignore
import closedMonthsJson from '../../../../@core/mocks/data-seed/closed-months.json';


@Component({
    selector: 'app-finance-in-time',
    templateUrl: './finance-in-time.component.html'
})
export class FinanceInTimeComponent implements OnInit {

    financeValues: FinanceValue[];
    financeTypeValues: FinanceTypeValue[];
    closedMonths: Array<string>;
    financeTypes: FinanceType[];
    consumers: Consumer[];
    dateFrom: Date;
    dateTo: Date;

    dates;

    constructor(private dialogService: DialogService) {
        this.dates = [];
    }

    ngOnInit() {
        this.consumers = consumersJson;
        this.financeValues = financeJson;
        this.financeTypeValues = financeTypeValueJson;
        this.financeTypes = financeTypeJson;
        this.closedMonths = closedMonthsJson;
        this.dateFrom = new Date('2021-05-10');
        this.dateTo = new Date('2021-05-16');
        this.calcDate();
    }

    onRefresh() {

    }



    calcDate() {
        this.dates = [];
        const start = new Date(this.dateFrom);
        const end = new Date(this.dateTo);
        const loop = new Date(start);
        while (loop <= end) {
            const newDate = loop;
            this.dates.push(new Date(newDate));
            loop.setDate(loop.getDate() + 1);
        }
    }


    getFinaceValue(consumer: Consumer, date: Date) {

        const finVal = this.financeValues.find(x => x.date === date.toISOString().split('T')[0].toString()
            && x.idConsumer === consumer.id);

        if (finVal) {

            let res = '';
            finVal.financeValue.forEach(x => {
                res += this.financeTypes.find(f => f.id === x).code + ',';
            });
            return res;
        }


        return '';
    }

    getPolishDay(s: string) {
        return Tools.getPolishDay(s);
    }

    goNextWeek(numb: number) {
        const tto = new Date(this.dateTo);
        const ffo = new Date(this.dateFrom);
        if (numb > 0) {
            tto.setDate(tto.getDate() + 7);
            ffo.setDate(ffo.getDate() + 7);
        } else {
            tto.setDate(tto.getDate() - 7);
            ffo.setDate(ffo.getDate() - 7);
        }
        this.dateFrom = ffo;
        this.dateTo = tto;
        this.calcDate();
    }

    isClosed(date: any): boolean {
        const dateItem = date.toISOString().split('T')[0].toString();
        let result = false;
        this.closedMonths.forEach(x => {
            if (dateItem.toString().includes(x.toString())) {
                result = true;
            }
        });
        return result;
    }

    onCloseMonth() {
        this.dialogService.dialogYesNo('Zamknięcie miesiąca', 'Czy zamknąć przegladany miesiąc?',
            () => {
                const date = new Date().toISOString().split('T')[0].toString();
                this.closedMonths.push(date.substring(0, 7));
                console.log(this.closedMonths);
                this.calcDate();
            },
            () => {
            });
    }
}
