import { Binary, Environment, Messages, Messaging } from '@/sobee/exports'

export namespace Scenario {

  export enum Type {
    ScenarioMatch,
    ScenarioRun,
    ScenarioGainBall,
    ScenarioGainOffscreenBall,
    ScenarioPass,
    ScenarioLongPass,
    ScenarioTackle,
    ScenarioSlideTackle,
    ScenarioRunningTackle,
    ScenarioRunningSlideTackle,
    ScenarioShoot,
    ScenarioShootGoalie,
    ScenarioDribble,
    ScenarioPassThrough,
    ScenarioGetPass,
    ScenarioGetLongPass,
    ScenarioFreekick,
    ScenarioOffside,
    ScenarioChat,
    ScenarioMatch1v1,
    ScenarioMatch2v2,
    ScenarioMatch3v3,
    ScenarioMatch6v6,
    ScenarioMatch1v0,
  }

  export namespace State {

    export enum Type {
      Starting,
      Success,
      Fail,
    }

    /** GClass284 */
    export class Information extends Messaging.Event.Base {
      public static readonly Id = 11337
      public Content: {
        Status: Scenario.State.Type // int32
        Type: Scenario.Type // int32
        Continue: boolean
      }

      constructor(Data: typeof Information.prototype.Content) {
        super(Data)
        this.Content = Data
      }

      public static Deserialize(Data: Binary.Reader): Information {
        if (!(Data instanceof Binary.Reader))
          throw new Error('Deserialize requires a Binary.Reader instance')

        return new Information({
          Status: Data.readInt32(),
          Type: Data.readInt32(),
          Continue: Data.readBoolean(),
        })
      }

      public Serialize(): Buffer {
        const Data = new Binary.Writer()
        Data.writeInt32(this.Content.Status)
        Data.writeInt32(this.Content.Type)
        Data.writeBoolean(this.Content.Continue)

        const Header = new Binary.Writer()
        Header.writeUInt32(Data.Content.byteLength + 2)
        Header.writeUInt16(Information.Id)

        return Buffer.concat([Header.Content, Data.Content])
      }

      public static Event: Messaging.Emitter.Listener = (Data, Socket) => {
        // const Received = Class.Deserialize(Data)
        // // console.log(Class.Id, Received.Content)

        // if (Environment.Debug)
        //   Socket.write(new Events.Scenario.Control.Class({ Control: Events.Scenario.Control.Type.Next }).Serialize())
      }
    }

  }

  /** GClass179 */
  export namespace Control {

    export enum Type {
      Start,
      Next,
      Previous,
      Repeat,
    }

    export class Information extends Messaging.Event.Base {
      static readonly Id = 34595
      Content: {
        Type: Scenario.Control.Type // int32
      }

      constructor(Data: typeof Information.prototype.Content) {
        super(Data)
        this.Content = Data
      }

      static Deserialize(Data: Binary.Reader): Information {
        if (!(Data instanceof Binary.Reader))
          throw new Error('Deserialize requires a Binary.Reader instance')

        return new Information({
          Type: Data.readInt32(),
        })
      }

      Serialize(): Buffer {
        const Data = new Binary.Writer()
        Data.writeInt32(this.Content.Type)

        const Header = new Binary.Writer()
        Header.writeUInt32(Data.Content.byteLength + 2)
        Header.writeUInt16(Information.Id)

        return Buffer.concat([Header.Content, Data.Content])
      }

      static Event: Messaging.Emitter.Listener = (Data, Socket) => {
        const Received = Information.Deserialize(Data)
        // console.log(Class.Id, Received.Content)

        if (Environment.Debug) {
          const { Client, Room } = Socket

          switch (Received.Content.Type) {
            case Scenario.Control.Type.Start: {
              Room.Clients.Broadcast(new Messages.Scenario.State.Information({
                Status: Messages.Scenario.State.Type.Starting,
                Type: Room.Information.Content.GClass170.Content.Scenario,
                Continue: true,
              }))
            }
          }
        }
      }
    }

  }

}
