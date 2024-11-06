import type { Socket } from '@/sobee/content/network/exports'
import { Messages } from '@/sobee/content/messages'
import { Log } from '@/sobee/exports'
import { Types } from '@/sobee/content/messaging/exports'
import { Positions } from '@/sobee/content/common/exports'

export class Positioning {
  public static Position(Type: Types.Enums.Positioning): Positions.Type | undefined {
    switch (Type) {
      case Types.Enums.Positioning.Kickoff:
        return Positions.Kickoff
      default:
        return undefined
    }
  }

  public static Change(
    Room: Socket.Room.Base,
    Type: Types.Enums.Positioning,
    Cutscene?: boolean,
  ) {
    const Positioning = this.Position(Type)

    if (Positioning) {
      Room.Information.Content.State = Messages.Match.State.Type.Positioning
      Room.Information.Content.Positioning = Type

      Room.Information.Content.Teams.Home.Player.forEach((Player) => {
        Player.Content.Position = Positioning.Home.Position[Player.Content.Squad].Copy()
        Player.Content.Direction = Positioning.Home.Direction[Player.Content.Squad].Copy()
      })

      Room.Information.Content.Teams.Away.Player.forEach((Player) => {
        Player.Content.Position = Positioning.Away.Position[Player.Content.Squad].Copy()
        Player.Content.Direction = Positioning.Away.Direction[Player.Content.Squad].Copy()
      })

      // TODO: If is not a cutscene?
      if (Cutscene)
        Room.Clients.Broadcast(new Messages.Match.Positioning.Cutscene({ Type, Positioning }))
      else
        Log.fatal(`WARNING: Non-Cutscene feature not implemented for positioning change`)
    }
    else {
      return Log.fatal(`Room [${Room.Id}]: Selected positioning ${Types.Enums.Positioning[Type]} not found.`)
    }
  }
}
