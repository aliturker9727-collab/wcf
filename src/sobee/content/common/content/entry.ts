import Lodash from 'lodash'

export class Entry {
  private Value: number

  constructor(Value: number = 0) {
    this.Value = Value
  }

  public get value(): number {
    return this.Value
  }

  public set value(value: NumberRange<1, 22>) {
    this.Value = value
  }

  public toSquad(Splited?: boolean): number {
    const Squad = this.Value - 1
    return Splited ? (Squad % 11) : Squad
  }

  public static inRange(
    Value: number,
  ): boolean {
    return Lodash.inRange(Value, 1, 22)
  }
}
