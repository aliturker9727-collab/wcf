import { isEqual } from 'lodash'
import { Binary, Environment, Messages, Messaging, Temporary } from '@/sobee/exports'
import { Log, Types } from '@/sobee/content/messaging/exports'
import { Entry, Positioning, Squad } from '@/sobee/content/common/exports'

/** GClass250 */
export class Information extends Messaging.Event.Base {
  public static readonly Id = 27968
  public Content: {
    Version: Binary.Types.Version // 4x int32
    Unknown: number // 0xff filled long
    Password: string // string
    Cpu: string // string
    Gpu: string // string
    Ram: number // int32
    Software: string // string
    Mac: string // string
    Entry: Entry // int32
    Session: string // string
    Autorun: boolean // boolean
  }

  constructor(Data: typeof Information.prototype.Content) {
    super(Data)
    this.Content = Data
  }

  public static Deserialize(Data: Binary.Reader): Information {
    if (!(Data instanceof Binary.Reader))
      throw new Error('Deserialize requires a Binary.Reader instance')

    return new Information({
      Version: Data.readVersion(),
      Unknown: Data.readInt64(),
      Password: Data.readString(),
      Cpu: Data.readString(),
      Gpu: Data.readString(),
      Ram: Data.readInt32(),
      Software: Data.readString(),
      Mac: Data.readString(),
      Entry: new Entry(Data.readInt32()),
      Session: Data.readString(),
      Autorun: Data.readBoolean(),
    })
  }

  public Serialize(): Buffer {
    const Data = new Binary.Writer()
    Data.writeVersion(this.Content.Version)
    Data.writeInt64(this.Content.Unknown)
    Data.writeString(this.Content.Password)
    Data.writeString(this.Content.Cpu)
    Data.writeString(this.Content.Gpu)
    Data.writeInt32(this.Content.Ram)
    Data.writeString(this.Content.Software)
    Data.writeString(this.Content.Mac)
    Data.writeInt32(this.Content.Entry.value)
    Data.writeString(this.Content.Session)
    Data.writeBoolean(this.Content.Autorun)

    const Header = new Binary.Writer()
    Header.writeUInt32(Data.Content.byteLength + 2)
    Header.writeUInt16(Information.Id)

    return Buffer.concat([Header.Content, Data.Content])
  }

  public static Event: Messaging.Emitter.Listener = async (Data, Socket) => {
    const Received = Information.Deserialize(Data)
    // console.log(Class.Id, Received.Content)

    if (Environment.Debug) {
      const { Client, Room } = Socket

      if (!isEqual(Received.Content, Client.Information.Initialize.Content)) {
        Log.error(`Client [${Client.Id}]: Received Information is not same with Initialized`)
        return Client.Disconnect()
      }

      if (Entry.inRange(Client.Information.Initialize.Content.Entry.value)) {
        if (Squad.inRange(Types.Enums.Sitting.HomePlayer, Client.Information.Initialize.Content.Entry.value)) {
          Client.Information.Match = Temporary.Player.Information({ Entry: Client.Information.Initialize.Content.Entry, Sitting: Types.Enums.Sitting.HomePlayer })
          Room.Information.Content.Teams.Home.Player.push(Client.Information.Match)
        }
        else {
          Client.Information.Match = Temporary.Player.Information({ Entry: Client.Information.Initialize.Content.Entry, Sitting: Types.Enums.Sitting.AwayPlayer })
          Room.Information.Content.Teams.Away.Player.push(Client.Information.Match)
        }
      }
      else {
        Log.error(`Client [${Client.Id}]: Actor is out of range.`)
        return Client.Disconnect()
      }

      Room.Clients.Broadcast(new Messages.Player.Joined({ Player: Client.Information.Match }))
      Room.Clients.Broadcast(new Messages.Chat.System.Send({ Text: `${Client.Information.Match.Content.PlayerName} connected. (${Room.Clients.Count} / 22)`, Type: Messages.Chat.System.Type.SCT }))

      Room.Information.Content.Actor.Camera = Client.Information.Initialize.Content.Entry.toSquad()
      // Room.Information.Content.Actor.Actioner = Client.Information.Initialize.Content.Entry.toSquad() // TODO: Dont give everyone a actioner!!
      Room.Information.Content.Actor.Mark = Client.Information.Initialize.Content.Entry.value
      Client.Broadcast(Room.Information)

      await new Promise(resolve => setTimeout(resolve, 2500))
      // Room.Clients.Broadcast(new Events.Match.UIEvent.Class({ Squad: Client.Information.Initialize.Content.Entry, Timing: 5, Label: 'Test UI', Type: Events.Match.UIEvent.Type.PlayerJoined }))
      Client.Broadcast(new Messages.Chat.System.Send({ Text: `Room: ${Room.Id}`, Type: Messages.Chat.System.Type.General }))
      Client.Broadcast(new Messages.Chat.System.Send({ Text: `Client: ${Client.Id}`, Type: Messages.Chat.System.Type.General }))

      // TODO: Change it.
      if (Room.Clients.Count >= 1) {
        Room.Clients.Broadcast(new Messages.Chat.System.Send({ Text: 'Match Beginning...', Type: Messages.Chat.System.Type.SCT }))

        // TODO: try GClass248
        Positioning.Change(Room, Types.Enums.Positioning.Kickoff, true)
      }
    }
  }
}
