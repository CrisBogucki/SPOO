import {FinanceType} from './finance-type.model';

export class FinanceTypeValue {
  id: number;
  typeId: number;
  type: FinanceType;
  value: string;
  valFrom: Date;
  valTo: Date;
  editable: boolean | false;

  constructor(value: string, valFrom: Date, valTo: Date) {
    this.value = value;
    this.valFrom = valFrom;
    this.valTo = valTo;
  }

  setType(value: FinanceType) {
    this.type = value;
  }


}
