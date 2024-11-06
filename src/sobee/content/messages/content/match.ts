import { Binary, Messages, Messaging } from '@/sobee/exports'
import type { Types } from '@/sobee/content/messaging/exports'

export namespace Match {

  /** GClass240 */
  export class Information extends Messaging.Event.Base {
    public static readonly Id = 11328
    public Content: {
      Actor: {
        Camera: number // byte (-)
        Actioner: number // byte (-)
        Mark: number // int32 (+)
      }
      Teams: {
        Home: {
          Player: Messages.Player.Information[]
          Spectator: Messages.Player.Information[]
        }
        Away: {
          Player: Messages.Player.Information[]
          Spectator: Messages.Player.Information[]
        }
      }
      Ball: {
        Position: Binary.Types.Vector3 // vector3
        Velocity: Binary.Types.Vector3 // vector3
      }
      State: Match.State.Type // int32
      Positioning: Types.Enums.Positioning // int32
      GClass166: Messages.GClass166
      GClass170: Messages.GClass170
      GClass167: Messages.GClass167
    }

    constructor(Data: typeof Information.prototype.Content) {
      super(Data)
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Information {
      if (!(Data instanceof Binary.Reader))
        throw new Error('Deserialize requires a Binary.Reader instance')

      return new Information({
        Actor: {
          Camera: Data.readInt8(),
          Actioner: Data.readInt8(),
          Mark: Data.readInt32(),
        },
        Teams: {
          Home: {
            Player: (() => {
              const Array: Messages.Player.Information[] = []
              for (let i = 0; i < Data.readInt16(); i++)
                Array.push(Messages.Player.Information.Deserialize(Data))
              return Array
            })(),
            Spectator: (() => {
              const Array: Messages.Player.Information[] = []
              for (let i = 0; i < Data.readInt16(); i++)
                Array.push(Messages.Player.Information.Deserialize(Data))
              return Array
            })(),
          },
          Away: {
            Player: (() => {
              const Array: Messages.Player.Information[] = []
              for (let i = 0; i < Data.readInt16(); i++)
                Array.push(Messages.Player.Information.Deserialize(Data))
              return Array
            })(),
            Spectator: (() => {
              const Array: Messages.Player.Information[] = []
              for (let i = 0; i < Data.readInt16(); i++)
                Array.push(Messages.Player.Information.Deserialize(Data))
              return Array
            })(),
          },
        },
        Ball: { Position: Data.readVector3(), Velocity: Data.readVector3() },
        State: Data.readInt32(),
        Positioning: Data.readInt32(),
        GClass166: (() => {
          Data.readInt16()
          return Messages.GClass166.Deserialize(Data)
        })(),
        GClass170: (() => {
          Data.readInt16()
          return Messages.GClass170.Deserialize(Data)
        })(),
        GClass167: (() => {
          Data.readInt16()
          return Messages.GClass167.Deserialize(Data)
        })(),
      })
    }

    public Serialize(): Buffer {
      const Data = new Binary.Writer()
      Data.writeInt8(this.Content.Actor.Camera)
      Data.writeInt8(this.Content.Actor.Actioner)
      Data.writeInt32(this.Content.Actor.Mark)

      Data.writeUInt16(this.Content.Teams.Home.Player.length) // for
      this.Content.Teams.Home.Player.forEach((Player) => {
        const Serialized = Player.Serialize()
        Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength))
      })

      Data.writeUInt16(this.Content.Teams.Away.Player.length) // for
      this.Content.Teams.Away.Player.forEach((Player) => {
        const Serialized = Player.Serialize()
        Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength))
      })

      Data.writeUInt16(this.Content.Teams.Home.Spectator.length) // for
      this.Content.Teams.Home.Spectator.forEach((Player) => {
        const Serialized = Player.Serialize()
        Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength))
      })

      Data.writeUInt16(this.Content.Teams.Away.Spectator.length) // for
      this.Content.Teams.Away.Spectator.forEach((Player) => {
        const Serialized = Player.Serialize()
        Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength))
      })

      Data.writeVector3(this.Content.Ball.Position)
      Data.writeVector3(this.Content.Ball.Velocity)
      Data.writeInt32(this.Content.State)
      Data.writeInt32(this.Content.Positioning)

      const GClass166 = this.Content.GClass166.Serialize()
      Data.writeByteUnsafe(GClass166.subarray(4, GClass166.byteLength))

      const GClass170 = this.Content.GClass170.Serialize()
      Data.writeByteUnsafe(GClass170.subarray(4, GClass170.byteLength))

      const GClass167 = this.Content.GClass167.Serialize()
      Data.writeByteUnsafe(GClass167.subarray(4, GClass167.byteLength))

      Data.writeFloat(100)
      Data.writeFloat64(100)
      Data.writeUInt16(0) // for
      Data.writeUInt16(0) // for

      const gclass156_0 = new Binary.Writer() // 4932
      gclass156_0.writeUInt32(0)
      gclass156_0.writeUInt32(0)
      gclass156_0.writeUInt32(0)
      gclass156_0.writeUInt32(0)
      gclass156_0.writeUInt32(0)
      gclass156_0.writeUInt32(0)

      const gclass156_0_header = new Binary.Writer()
      gclass156_0_header.writeUInt16(3367)

      Data.writeByteUnsafe(Buffer.concat([gclass156_0_header.Content, gclass156_0.Content]))

      Data.writeUInt16(0) // for
      Data.writeUInt16(0) // for

      const userSessionRights_0 = new Binary.Writer() // 18579
      userSessionRights_0.writeUInt32(0)

      const userSessionRights_0_header = new Binary.Writer()
      userSessionRights_0_header.writeUInt16(22256)

      Data.writeByteUnsafe(Buffer.concat([userSessionRights_0_header.Content, userSessionRights_0.Content]))

      const gclass171_0 = new Binary.Writer() // 21588
      gclass171_0.writeUInt32(1)

      const UIEvent = new Messages.Match.UI.Notice({
        Label: 'n1rafawn',
        Type: Match.UI.Type.MatchWelcome,
        Squad: 1,
        Timing: 1,
      }).Serialize()
      gclass171_0.writeByteUnsafe(UIEvent.subarray(4, UIEvent.byteLength))

      const gclass171_0_header = new Binary.Writer()
      gclass171_0_header.writeUInt16(18999)

      Data.writeByteUnsafe(Buffer.concat([gclass171_0_header.Content, gclass171_0.Content]))

      Data.writeString('')
      Data.writeString('')

      const Header = new Binary.Writer()
      Header.writeUInt32(Data.Content.byteLength + 2)
      Header.writeUInt16(Information.Id)

      return Buffer.concat([Header.Content, Data.Content])
    }

    public static Event: Messaging.Emitter.Listener = (Data) => {
      const Received = Information.Deserialize(Data)
      // console.log(Class.Id, Received.Content)
    }

    public static Default(Input: {
      Scenario: Messages.Scenario.Type
      State: Messages.Match.State.Type
      Positioning: Types.Enums.Positioning
      Teams: {
        Home: { Color: number, Size: number, Name: { Full: string, Short: string } }
        Away: { Color: number, Size: number, Name: { Full: string, Short: string } }
      }
    }): Information {
      const { Scenario, State, Positioning, Teams } = Input

      return new Information({
        Actor: { Camera: -1, Actioner: -1, Mark: -1 },
        Teams: {
          Home: { Player: [], Spectator: [] },
          Away: { Player: [], Spectator: [] },
        },
        Ball: { Position: new Binary.Types.Vector3(0, 0, 0), Velocity: new Binary.Types.Vector3(0, 0, 0) },
        State,
        Positioning,
        GClass166: Messages.GClass166.Default(),
        GClass170: Messages.GClass170.Default(Scenario, Teams),
        GClass167: Messages.GClass167.Default(),
      })
    }
  }

  export namespace UI {

    export enum Type {
      Goal,
      OwnGoal,
      Offside,
      Corner,
      Freekick,
      Penalty,
      YellowCard,
      YellowToRedCard,
      RedCard,
      MatchWelcome,
      PlayerJoined,
      PlayerLeft,
    }

    /** GClass162 */
    export class Notice extends Messaging.Event.Base {
      public static readonly Id = 16032
      public Content: {
        Label: string // name, label, event owner ?
        Type: Match.UI.Type
        Squad: number
        Timing: number
      }

      constructor(Data: typeof Notice.prototype.Content) {
        super(Data)
        this.Content = Data
      }

      public static Deserialize(Data: Binary.Reader): Notice {
        if (!(Data instanceof Binary.Reader))
          throw new Error('Deserialize requires a Binary.Reader instance')

        return new Notice({
          Label: Data.readString(),
          Type: Data.readUInt8(),
          Squad: Data.readUInt8(),
          Timing: Data.readFloat(),
        })
      }

      public Serialize(): Buffer {
        const Data = new Binary.Writer()
        Data.writeString(this.Content.Label)
        Data.writeUInt8(this.Content.Type)
        Data.writeUInt8(this.Content.Squad)
        Data.writeFloat(this.Content.Timing)

        const Header = new Binary.Writer()
        Header.writeUInt32(Data.Content.byteLength + 2)
        Header.writeUInt16(Notice.Id)

        return Buffer.concat([Header.Content, Data.Content])
      }

      public static Event: Messaging.Emitter.Listener = (Data) => {
        const Received = Notice.Deserialize(Data)
        // console.log(Class.Id, Received.Content)
      }
    }

  }

  export namespace Positioning {

    /** GClass281 - need 11!! */
    export class Cutscene extends Messaging.Event.Base {
      public static readonly Id = 26782
      public Content: {
        Type: Types.Enums.Positioning // int32
        Positioning: {
          Home: {
            Position: Binary.Types.Vector2[]
            Direction: Binary.Types.Vector2[]// floatVector2
            Animation: Types.Enums.Animation[] // uint16
          }
          Away: {
            Position: Binary.Types.Vector2[]
            Direction: Binary.Types.Vector2[]// floatVector2
            Animation: Types.Enums.Animation[] // uint16
          }
        }
      }

      constructor(Data: typeof Cutscene.prototype.Content) {
        super(Data)
        this.Content = Data
      }

      public static Deserialize(Data: Buffer | Binary.Reader): Cutscene {
        if (!(Data instanceof Binary.Reader))
          throw new Error('Deserialize requires a Binary.Reader instance')

        const Temporary = {
          HP: Data.readArrayUnsafe(11, () => Data.readVector2()),
          AP: Data.readArrayUnsafe(11, () => Data.readVector2()),
          HD: Data.readArrayUnsafe(11, () => Data.readFloatVector2()),
          AD: Data.readArrayUnsafe(11, () => Data.readFloatVector2()),
          HA: Data.readArrayUnsafe(11, () => Data.readUInt16()),
          AA: Data.readArrayUnsafe(11, () => Data.readUInt16()),
        }

        return new Cutscene({
          Type: Data.readInt32(),
          Positioning: {
            Home: {
              Position: Temporary.HP,
              Direction: Temporary.HD,
              Animation: Temporary.HA,
            },
            Away: {
              Position: Temporary.AP,
              Direction: Temporary.AD,
              Animation: Temporary.AA,
            },
          },
        })
      }

      public Serialize(): Buffer {
        const Data = new Binary.Writer()
        Data.writeInt32(this.Content.Type)
        this.Content.Positioning.Home.Position.forEach(Position => Data.writeVector2(Position))
        this.Content.Positioning.Away.Position.forEach(Position => Data.writeVector2(Position))
        this.Content.Positioning.Home.Direction.forEach(Direction => Data.writeFloatVector2(Direction))
        this.Content.Positioning.Away.Direction.forEach(Direction => Data.writeFloatVector2(Direction))
        this.Content.Positioning.Home.Animation.forEach(Direction => Data.writeUInt16(Direction))
        this.Content.Positioning.Away.Animation.forEach(Direction => Data.writeUInt16(Direction))

        const Header = new Binary.Writer()
        Header.writeUInt32(Data.Content.byteLength + 2)
        Header.writeUInt16(Cutscene.Id)

        return Buffer.concat([Header.Content, Data.Content])
      }

      public static Event: Messaging.Emitter.Listener = (Data) => {
        const Received = Cutscene.Deserialize(Data)
        // console.log(Class.Id, Received.Content)
      }
    }

  }

  export namespace State {

    export enum Type {
      Positioning,
      Freekick,
      Running,
    }

  }

}
