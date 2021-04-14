import {FinanceValue} from '../../@shared/models/finance-value.model';
import {FinanceTypeValue} from '../../@shared/models/finance-type-value.model';
import {FinanceType} from '../../@shared/models/finance-type.model';
import {Consumer} from '../../@shared/models/consumers.model';

export class Storage {

    financeValues: FinanceValue[];
    financeTypeValues: FinanceTypeValue[];
    closedMonths: Array<string>;
    financeTypes: FinanceType[];
    consumers: Consumer[];

    constructor() {
    }


}
