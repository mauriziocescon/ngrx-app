export class Enum {

  protected value: string;

  public static toEnum(val: string): Enum {
    return new Enum(val);
  }

  constructor(value: string) {
    this.value = value;
  }

  public toString(): string {
    return this.value;
  }
}
