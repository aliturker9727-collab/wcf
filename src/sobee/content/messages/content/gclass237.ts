import { Binary, Environment, Messages, Messaging } from '@/sobee/exports'
import { Log } from '@/sobee/content/messaging/exports'
import { Sobee } from '@/sobee'

export class GClass237 extends Messaging.Event.Base {
  public static readonly Id = 42398
  public Content: {
    Velocity: Binary.Types.Vector2 // floatVector2
    Sprint: boolean
  }

  constructor(Data: typeof GClass237.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass237 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass237({
      Velocity: Data.readFloatVector2({ isDegress: true }),
      Sprint: Data.readBoolean(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeFloatVector2(this.Content.Velocity, { isDegress: true })
    Data.writeBoolean(this.Content.Sprint)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass237.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = async (Data, Socket) => {
    const Received = GClass237.Deserialize(Data)
    // console.log(Class.Id, Received.Content)

    if (Environment.Debug) {
      const { Client, Room } = Socket

      const Moving = Client.Components.Get(Sobee.Network.Socket.Client.Components.Moving)

      if (!Moving) {
        Log.error(`Client (${Client.Id}) does not have Moving component.`)
        return Room.Disconnect()
      }

      // TODO: You need stamina system
      Client.Information.Match.Content.Direction = Received.Content.Velocity

      Client.Information.Match.Content.Velocity = new Binary.Types.Vector3(
        Client.Information.Match.Content.Direction.X * (Received.Content.Sprint ? Moving.Sprint : Moving.Speed),
        Client.Information.Match.Content.Direction.Y * (Received.Content.Sprint ? Moving.Sprint : Moving.Speed),
        0,
      )

      Room.Clients.Broadcast(new Messages.Player.Move({
        Alerted: false,
        Sprint: Received.Content.Sprint,
        Squad: Client.Information.Initialize.Content.Entry.toSquad(),
        Position: Client.Information.Match.Content.Position,
        Velocity: Client.Information.Match.Content.Velocity,
        Stamina: Client.Information.Match.Content.Stamina,
      }))
    }
  }
}
