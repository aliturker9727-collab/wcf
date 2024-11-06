import { Binary, Environment, Messages, Messaging } from '@/sobee/exports'
import { Event, Log, Types } from '@/sobee/content/messaging/exports'
import { Sobee } from '@/sobee'

export class GClass236 extends Messaging.Event.Base {
  public static readonly Id = 3905
  public Content: {
    Strength: number // float32
    Degrees: Binary.Types.Vector2 // floatVector2
  }

  constructor(Data: typeof GClass236.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass236 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass236({
      Strength: Data.readFloat(),
      Degrees: Data.readFloatVector2(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeFloat(this.Content.Strength)
    Data.writeFloatVector2(this.Content.Degrees)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass236.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = async (Data, Socket) => {
    const Received = GClass236.Deserialize(Data)
    // console.log(Class.Id, Received.Content)

    if (Environment.Debug) {
      const { Client, Room } = Socket

      const Ball = Room.Components.Get(Sobee.Network.Socket.Room.Components.Ball)

      if (!Ball) {
        Log.error(`Room (${Room.Id}) does not have Ball component.`)
        return Room.Disconnect()
      }

      if (Room.Information.Content.Actor.Actioner % 11 === Client.Information.Match.Content.Squad) {
        Messages.GClass260.Event(
          new Event.Parser(new Messages.GClass260({ }).Serialize()).Content,
          Socket,
        )

        const Speed = Ball.Speed * Received.Content.Strength
        const Safe = Ball.Radius + 0.1

        Client.Information.Match.Content.Direction = Received.Content.Degrees

        Room.Information.Content.Ball.Position = new Binary.Types.Vector3(
          Client.Information.Match.Content.Position.X + Client.Information.Match.Content.Direction.X * Safe,
          Client.Information.Match.Content.Position.Y + Client.Information.Match.Content.Direction.Y * Safe,
          Ball.Boundry.Z,
        )

        Room.Information.Content.Ball.Velocity = new Binary.Types.Vector3(
          Client.Information.Match.Content.Direction.X * Speed,
          Client.Information.Match.Content.Direction.Y * Speed,
          Speed,
        )

        Room.Clients.Broadcast(new Messages.Ball.Shoot({
          Squad: Client.Information.Initialize.Content.Entry.toSquad(),
          Animation: Types.Enums.Animation.ShootLeft, // TODO: Fix animation
          Direction: Client.Information.Match.Content.Direction,
          Position: Room.Information.Content.Ball.Position,
          Velocity: Room.Information.Content.Ball.Velocity,
          Speed: 0,
        }))

        Client.Broadcast(new Messages.Chat.System.Send({ Text: `Shoot ${Room.Information.Content.Actor.Actioner}`, Type: Messages.Chat.System.Type.General }))
        Room.Information.Content.Actor.Actioner = -1
      }
    }
  }
}
