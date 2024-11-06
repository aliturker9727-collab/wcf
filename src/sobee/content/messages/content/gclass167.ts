import { Binary, Messaging } from '@/sobee/exports'

export class GClass167 extends Messaging.Event.Base {
  public static readonly Id = 9384
  public Content: {
    Unk0: number // float
    Unk1: number // float
    Unk2: number // float
    Unk3: number // float
    Unk4: Binary.Types.Vector3 // vector3
    Unk5: number // float
  }

  constructor(Data: typeof GClass167.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): GClass167 {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new GClass167({
      Unk0: Data.readFloat(),
      Unk1: Data.readFloat(),
      Unk2: Data.readFloat(),
      Unk3: Data.readFloat(),
      Unk4: Data.readVector3(),
      Unk5: Data.readFloat(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeFloat(this.Content.Unk0)
    Data.writeFloat(this.Content.Unk1)
    Data.writeFloat(this.Content.Unk2)
    Data.writeFloat(this.Content.Unk3)
    Data.writeVector3(this.Content.Unk4)
    Data.writeFloat(this.Content.Unk5)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(GClass167.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = (Data) => {
    const Received = GClass167.Deserialize(Data)
    // console.log(Class.Id, Received.Content)
  }

  public static Default(): GClass167 {
    return new GClass167({
      Unk0: 0,
      Unk1: 0,
      Unk2: 0,
      Unk3: 0,
      Unk4: new Binary.Types.Vector3(0, 0, 0),
      Unk5: 0,
    })
  }
}
