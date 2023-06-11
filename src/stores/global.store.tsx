class StoresGlobal {
  value: number;

  constructor() {
    this.value = 0;
  }

  public add(num: number): void {
    this.value += num;
  }

  public subtract(num: number): void {
    this.value -= num;
  }

  public getValue(): number {
    return this.value;
  }
}

export const storesGlobal = new StoresGlobal();

