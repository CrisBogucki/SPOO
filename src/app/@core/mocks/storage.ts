import {Finance} from '../../@shared/models/finance.model';
import {FinanceTypeValue} from '../../@shared/models/finance-type-value.model';
import {FinanceType} from '../../@shared/models/finance-type.model';
import {Consumer} from '../../@shared/models/consumers.model';


// @ts-ignore
import financeJson from './../../@core/mocks/data-seed/finance.json';
// @ts-ignore
import financeTypeJson from './../../@core/mocks/data-seed/finance-type.json';
// @ts-ignore
import financeTypeValueJson from './../../@core/mocks/data-seed/finance-type-value.json';
// @ts-ignore
import consumersJson from './../../@core/mocks/data-seed/consumers.json';
// @ts-ignore
import closedMonthsJson from './../../@core/mocks/data-seed/closed-months.json';

export class Storage {

    static finance: Finance[];
    static financeTypes: FinanceType[];
    static financeTypeValues: FinanceTypeValue[];

    static consumers: Consumer[];
    static closedMonths: Array<string>;

    static init() {
        this.finance = financeJson;
        this.financeTypes = financeTypeJson;
        this.financeTypeValues = financeTypeValueJson;

        this.consumers = consumersJson;
        this.closedMonths = closedMonthsJson;
    }


}
