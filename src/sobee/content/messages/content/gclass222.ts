import { Binary, Messaging } from '@/sobee/exports'
import type { Types } from '@/sobee/content/messaging/exports'

export class GClass222 extends Messaging.Event.Base {
  public static readonly Id = 10059
  public Content: {
    Squad: number // uint8
    Animation: Types.Enums.Animation // uint16
    Bool: boolean //
  }

  constructor(Data: typeof GClass222.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass222 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass222({
      Squad: Data.readUInt8(),
      Animation: Data.readUInt16(),
      Bool: Data.readBoolean(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeUInt8(this.Content.Squad)
    Data.writeUInt16(this.Content.Animation)
    Data.writeBoolean(this.Content.Bool)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass222.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = (Data) => {
    const Received = GClass222.Deserialize(Data)
    // console.log(Class.Id, Received.Content)
  }
}
