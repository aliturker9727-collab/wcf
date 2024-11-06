import { Binary, Messaging } from '@/sobee/exports'
import { Types } from '@/sobee/content/messaging/exports'

export class GClass166 extends Messaging.Event.Base {
  public static readonly Id = 11279
  public Content: {
    Score: {
      Home: number // byte
      Away: number // byte
    }
    Match: {
      Time: number // double
      Phase: Types.Enums.Phase // int32
    }
    Unk4: number // uint16 unused
    Unk5: number // uint16 unused
    Unk6: number // byte unused
    Unk7: number // byte unused
    Unk8: number // int16 unused
    Unk9: number // int16 unused
  }

  constructor(Data: typeof GClass166.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass166 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass166({
      Score: {
        Home: Data.readUInt8(),
        Away: Data.readUInt8(),
      },
      Match: {
        Time: Data.readFloat64(),
        Phase: Data.readInt32(),
      },
      Unk4: Data.readUInt16(),
      Unk5: Data.readUInt16(),
      Unk6: Data.readInt8(),
      Unk7: Data.readInt8(),
      Unk8: Data.readInt16(),
      Unk9: Data.readInt16(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeUInt8(this.Content.Score.Home)
    Data.writeUInt8(this.Content.Score.Away)
    Data.writeFloat64(this.Content.Match.Time)
    Data.writeInt32(this.Content.Match.Phase)
    Data.writeUInt16(this.Content.Unk4)
    Data.writeUInt16(this.Content.Unk5)
    Data.writeInt8(this.Content.Unk6)
    Data.writeInt8(this.Content.Unk7)
    Data.writeInt16(this.Content.Unk8)
    Data.writeInt16(this.Content.Unk9)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass166.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = (Data) => {
    const Received = GClass166.Deserialize(Data)
    // console.log(Class.Id, Received.Content)
  }

  public static Default(Input: {
    Score: { Home: number, Away: number }
    Match: { Time: number, Phase: Types.Enums.Phase }
  } = {
      Score: { Home: 0, Away: 0 },
      Match: { Time: 0, Phase: Types.Enums.Phase.FirstHalf },
    },
  ): GClass166 {
    const { Score, Match } = Input

    return new GClass166({
      Score,
      Match,
      Unk4: 0,
      Unk5: 0,
      Unk6: 1,
      Unk7: 1,
      Unk8: 1,
      Unk9: 1,
    })
  }
}
