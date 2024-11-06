import { Binary, Messaging } from '@/sobee/exports'

export namespace Chat {

  export namespace System {
    export enum Type {
      General,
      Important,
      SCT,
      Anounce,
      Log,
    }

    /** GClass278 */
    export class Send extends Messaging.Event.Base {
      public static readonly Id = 39592
      public Content: {
        Text: string
        Type: Type // int32
      }

      constructor(Data: typeof Send.prototype.Content) {
        super(Data)
        this.Content = Data
      }

      public static Deserialize(Data: Binary.Reader): Send {
        if (!(Data instanceof Binary.Reader))
          throw new Error('Deserialize requires a Binary.Reader instance')

        return new Send({
          Text: Data.readString(),
          Type: Data.readInt32(),
        })
      }

      public Serialize(): Buffer {
        const Data = new Binary.Writer()
        Data.writeString(this.Content.Text)
        Data.writeInt32(this.Content.Type)

        const Header = new Binary.Writer()
        Header.writeUInt32(Data.Content.byteLength + 2)
        Header.writeUInt16(Send.Id)

        return Buffer.concat([Header.Content, Data.Content])
      }

      public static Event: Messaging.Emitter.Listener = (Data) => {
        const Received = Send.Deserialize(Data)
        // console.log(Class.Id, Received.Content)
      }
    }
  }

}
