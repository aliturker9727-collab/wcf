import { Binary, Messaging } from '@/sobee/exports'

/** GClass291 */
export class Latency extends Messaging.Event.Base {
  public static readonly Id = 7777
  public Content: {
    Time: number // float
  }

  constructor(Data: typeof Latency.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): Latency {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new Latency({
      Time: Data.readFloat(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeFloat(this.Content.Time)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(Latency.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = (Data) => {
    const Received = Latency.Deserialize(Data)
    // console.log(Class.Id, Received.Content)
  }
}
