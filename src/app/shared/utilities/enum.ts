export class Enum {

  private value: string;

  static toEnum(val: string): Enum {
    return new Enum(val);
  }

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
