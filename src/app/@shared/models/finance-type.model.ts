export class FinanceType {
  id: number;
  code: string;
  name: string;
  description: string;
  editable: boolean | false;

  constructor(code: string, name: string, description: string) {
    this.code = code;
    this.name = name;
    this.description = description;
  }
}
