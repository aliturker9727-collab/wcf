import type { Types } from '@/sobee/content/messaging/content/types'

export namespace Team {

  export type Players = Types.Enums.Sitting.HomePlayer | Types.Enums.Sitting.AwayPlayer

  export type Spectators = Types.Enums.Sitting.HomeSpectator | Types.Enums.Sitting.AwaySpectator

}
