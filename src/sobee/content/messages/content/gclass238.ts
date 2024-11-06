import { Binary, Environment, Messages, Messaging } from '@/sobee/exports'
import { Log, Types } from '@/sobee/content/messaging/exports'
import { Sobee } from '@/sobee'

export class GClass238 extends Messaging.Event.Base {
  public static readonly Id = 18455
  public Content: {
    Strength: number // float
    Direction: Binary.Types.Vector2
    Type: Types.Enums.HitSubType
  }

  constructor(Data: typeof GClass238.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass238 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass238({
      Strength: Data.readFloat(),
      Direction: Data.readVector2(),
      Type: Data.readUInt8(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeFloat(this.Content.Strength)
    Data.writeVector2(this.Content.Direction)
    Data.writeUInt8(this.Content.Type)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass238.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = async (Data, Socket) => {
    const Received = GClass238.Deserialize(Data)
    // console.log(Class.Id, Received.Content)

    if (Environment.Debug) {
      const { Client, Room } = Socket

      const Ball = Room.Components.Get(Sobee.Network.Socket.Room.Components.Ball)

      if (!Ball) {
        Log.error(`Room (${Room.Id}) does not have Ball component.`)
        return Room.Disconnect()
      }

      if (Room.Information.Content.Actor.Actioner % 11 === Client.Information.Match.Content.Squad) {
        const Speed = Ball.Speed * Received.Content.Strength
        const Safe = Ball.Radius + 0.1

        Client.Information.Match.Content.Direction = Received.Content.Direction

        Room.Information.Content.Ball.Position = new Binary.Types.Vector3(
          Client.Information.Match.Content.Position.X + Client.Information.Match.Content.Direction.X * Safe,
          Client.Information.Match.Content.Position.Y + Client.Information.Match.Content.Direction.Y * Safe,
          Ball.Boundry.Z,
        )

        Room.Information.Content.Ball.Velocity = new Binary.Types.Vector3(
          Received.Content.Direction.X * Speed,
          Received.Content.Direction.Y * Speed,
          0,
        )

        Room.Clients.Broadcast(new Messages.Ball.Kickoff({
          Velocity: Room.Information.Content.Ball.Velocity,
          Animation: Types.Enums.Animation.ShootLeft,
        }))

        Client.Broadcast(new Messages.Chat.System.Send({ Text: `Kickoff ${Room.Information.Content.Actor.Actioner}`, Type: Messages.Chat.System.Type.General }))
        Room.Information.Content.Actor.Actioner = -1
      }

      // Player.Content.Direction = Received.Content.Direction
      // switch (Received.Content.Type) {
      //   case Types.Enums.HitSubType.Shoot:
      //     Socket.write(new Player.Ball.Shoot.Class({
      //       Squad: Player.Content.Squad,
      //       Animation: Types.Enums.AnimationType.ShootLeft, // TODO: Fix animation
      //       Direction: Player.Content.Direction,
      //       Position: Player.Content.Position,
      //       Velocity: {
      //          0,
      //         0,
      //         0,
      //       },
      //       Speed: 0,
      //     }).Serialize())
      // }
    }
  }
}
