export class FinanceType {
  id: number;
  code: string;
  name: string;
  description: string;

  constructor(code: string, name: string, description: string) {
    this.code = code;
    this.name = name;
    this.description = description;
  }


}
