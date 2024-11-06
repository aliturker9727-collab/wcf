import { Binary, Messaging } from '@/sobee/exports'
import type { Types } from '@/sobee/content/messaging/exports'

export namespace Ball {

  /** GClass212 */
  export class Update extends Messaging.Event.Base {
    public static readonly Id = 11759
    public Content: {
      Position: Binary.Types.Vector3 // vector3
      Velocity: Binary.Types.Vector3 // vector3
    }

    constructor(Data: typeof Update.prototype.Content) {
      super(Data)
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Update {
      if (!(Data instanceof Binary.Reader))
        throw new Error('Deserialize requires a Binary.Reader instance')

      return new Update({
        Position: Data.readVector3(),
        Velocity: Data.readVector3(),
      })
    }

    public Serialize(): Buffer {
      const Data = new Binary.Writer()
      Data.writeVector3(this.Content.Position)
      Data.writeVector3(this.Content.Velocity)

      const Header = new Binary.Writer()
      Header.writeUInt32(Data.Content.byteLength + 2)
      Header.writeUInt16(Update.Id)

      return Buffer.concat([Header.Content, Data.Content])
    }

    public static Event: Messaging.Emitter.Listener = (Data) => {
      const Received = Update.Deserialize(Data)
      // console.log(Class.Id, Received.Content)
    }
  }

  /** GClass191 */
  export class Shoot extends Messaging.Event.Base {
    public static readonly Id = 23814
    public Content: {
      Animation: Types.Enums.Animation // uint16
      Squad: number // byte
      Position: Binary.Types.Vector2 // vector2
      Direction: Binary.Types.Vector2 // floatVector2
      Velocity: Binary.Types.Vector3 // vector3
      Speed: number // float
    }

    constructor(Data: typeof Shoot.prototype.Content) {
      super(Data)
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Shoot {
      if (!(Data instanceof Binary.Reader))
        throw new Error('Deserialize requires a Binary.Reader instance')

      return new Shoot({
        Animation: Data.readUInt16(),
        Squad: Data.readUInt8(),
        Position: Data.readVector2(),
        Direction: Data.readFloatVector2(),
        Velocity: Data.readVector3(),
        Speed: Data.readFloat(),
      })
    }

    public Serialize(): Buffer {
      const Data = new Binary.Writer()
      Data.writeUInt16(this.Content.Animation)
      Data.writeUInt8(this.Content.Squad)
      Data.writeVector2(this.Content.Position)
      Data.writeFloatVector2(this.Content.Direction)
      Data.writeVector3(this.Content.Velocity)
      Data.writeFloat(this.Content.Speed)

      const Header = new Binary.Writer()
      Header.writeUInt32(Data.Content.byteLength + 2)
      Header.writeUInt16(Shoot.Id)

      return Buffer.concat([Header.Content, Data.Content])
    }

    public static Event: Messaging.Emitter.Listener = (Data) => {
      const Received = Shoot.Deserialize(Data)
      // console.log(Class.Id, Received.Content)
    }
  }

  /** GClass195 */
  export class Kickoff extends Messaging.Event.Base {
    public static readonly Id = 15447
    public Content: {
      Animation: Types.Enums.Animation // uint16
      Velocity: Binary.Types.Vector3 // vector3
    }

    constructor(Data: typeof Kickoff.prototype.Content) {
      super(Data)
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Kickoff {
      if (!(Data instanceof Binary.Reader))
        throw new Error('Deserialize requires a Binary.Reader instance')

      return new Kickoff({
        Animation: Data.readUInt16(),
        Velocity: Data.readVector3(),
      })
    }

    public Serialize(): Buffer {
      const Data = new Binary.Writer()
      Data.writeUInt16(this.Content.Animation)
      Data.writeVector3(this.Content.Velocity)

      const Header = new Binary.Writer()
      Header.writeUInt32(Data.Content.byteLength + 2)
      Header.writeUInt16(Kickoff.Id)

      return Buffer.concat([Header.Content, Data.Content])
    }

    public static Event: Messaging.Emitter.Listener = (Data) => {
      const Received = Kickoff.Deserialize(Data)
      // console.log(Class.Id, Received.Content)
    }
  }

  /** GClass282 */
  export class Get extends Messaging.Event.Base {
    public static readonly Id = 11312
    public Content: {
      Squad: number // byte
      Position: Binary.Types.Vector2 // vector2
      Direction: Binary.Types.Vector2 // floatVector2
      Speed: number // float
    }

    constructor(Data: typeof Get.prototype.Content) {
      super(Data)
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Get {
      if (!(Data instanceof Binary.Reader))
        throw new Error('Deserialize requires a Binary.Reader instance')

      return new Get({
        Squad: Data.readUInt8(),
        Position: Data.readVector2(),
        Direction: Data.readFloatVector2(),
        Speed: Data.readFloat(),
      })
    }

    public Serialize(): Buffer {
      const Data = new Binary.Writer()
      Data.writeUInt8(this.Content.Squad)
      Data.writeVector2(this.Content.Position)
      Data.writeFloatVector2(this.Content.Direction)
      Data.writeFloat(this.Content.Speed)

      const Header = new Binary.Writer()
      Header.writeUInt32(Data.Content.byteLength + 2)
      Header.writeUInt16(Get.Id)

      return Buffer.concat([Header.Content, Data.Content])
    }

    public static Event: Messaging.Emitter.Listener = (Data) => {
      const Received = Get.Deserialize(Data)
      // console.log(Class.Id, Received.Content)
    }
  }

}
