export class KeyValue {
  protected k: any;
  protected v: any;

  constructor(key: any, value: any) {
    this.k = key;
    this.v = value;
  }

  get key(): any {
    return this.k;
  }

  get value(): any {
    return this.v;
  }
}
