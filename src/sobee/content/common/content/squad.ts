import Lodash from 'lodash'
import { Messaging } from '@/sobee/content/messaging'

export class Squad {
  private Value: number

  constructor(Value: number = 0) {
    this.Value = Value
  }

  public get value(): number {
    return this.Value
  }

  public set value(value: NumberRange<0, 21>) {
    this.Value = value
  }

  public toEntry(Splited?: boolean): number {
    const Squad = this.Value + 1
    return Splited ? (Squad % 10) : Squad
  }

  public static inRange(
    Team: Messaging.Types.Team.Players,
    Value: number,
  ): boolean {
    switch (Team) {
      case Messaging.Types.Enums.Sitting.HomePlayer:
        return Lodash.inRange(Value, 0, 10)
      case Messaging.Types.Enums.Sitting.AwayPlayer:
        return Lodash.inRange(Value, 11, 21)
      default:
        return false
    }
  }
}
