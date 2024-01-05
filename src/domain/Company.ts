export type CompanyDto = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export class Company {
  private name: string;
  private catchPhrase: string;
  private bs: string;
  constructor({name, catchPhrase, bs}:CompanyDto) {
    this.name = name;
    this.catchPhrase = catchPhrase;
    this.bs = bs;
  }

  get value() {
    return {
      name: this.name,
      catchPhrase: this.catchPhrase,
      bs: this.bs,
    };
  }

  get toJSON() {
    return this.value;
  }
}
