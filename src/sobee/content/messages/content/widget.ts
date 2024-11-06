import { Binary } from '@/sobee/exports'
import type { Types } from '@/sobee/content/messaging/exports'
import { Messaging } from '@/sobee/content/messaging'

export namespace Widget {

  /** GClass223 */
  export class Decline extends Messaging.Event.Base {
    public static readonly Id = 11408
    public Content: {
      Reason: Types.Enums.Decline // int32
    }

    constructor(Data: typeof Decline.prototype.Content) {
      super(Data)
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Decline {
      if (!(Data instanceof Binary.Reader))
        throw new Error('Deserialize requires a Binary.Reader instance')

      return new Decline({
        Reason: Data.readInt32(),
      })
    }

    public Serialize(): Buffer {
      const Data = new Binary.Writer()
      Data.writeInt32(this.Content.Reason)

      const Header = new Binary.Writer()
      Header.writeUInt32(Data.Content.byteLength + 2)
      Header.writeUInt16(Decline.Id)

      return Buffer.concat([Header.Content, Data.Content])
    }

    public static Event: Messaging.Emitter.Listener = (Data) => {
      const Received = Decline.Deserialize(Data)
      // console.log(Class.Id, Received.Content)
    }
  }

}
