import { Binary, Environment, Messages, Messaging } from '@/sobee/exports'

export class GClass260 extends Messaging.Event.Base {
  public static readonly Id = 10804
  public Content: Record<string, never>

  constructor(Data: typeof GClass260.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass260 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass260({

    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    // empty

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass260.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = (Data, Socket) => {
    const Received = GClass260.Deserialize(Data)
    // console.log(Class.Id, Received.Content)

    if (Environment.Debug) {
      const { Client, Room } = Socket

      Client.Information.Match.Content.Velocity = new Binary.Types.Vector3(0, 0, 0)

      Room.Clients.Broadcast(new Messages.Player.Stop({
        Alerted: false,
        Squad: Client.Information.Initialize.Content.Entry.toSquad(),
        Position: Client.Information.Match.Content.Position,
        Velocity: Client.Information.Match.Content.Velocity,
        Stamina: Client.Information.Match.Content.Stamina,
      }))
    }
  }
}
