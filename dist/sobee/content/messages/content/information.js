"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const lodash_1 = require("lodash");
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
const exports_3 = require("../../../../sobee/content/common/exports");
/** GClass250 */
class Information extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new _a({
            Version: Data.readVersion(),
            Unknown: Data.readInt64(),
            Password: Data.readString(),
            Cpu: Data.readString(),
            Gpu: Data.readString(),
            Ram: Data.readInt32(),
            Software: Data.readString(),
            Mac: Data.readString(),
            Entry: new exports_3.Entry(Data.readInt32()),
            Session: Data.readString(),
            Autorun: Data.readBoolean(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeVersion(this.Content.Version);
        Data.writeInt64(this.Content.Unknown);
        Data.writeString(this.Content.Password);
        Data.writeString(this.Content.Cpu);
        Data.writeString(this.Content.Gpu);
        Data.writeInt32(this.Content.Ram);
        Data.writeString(this.Content.Software);
        Data.writeString(this.Content.Mac);
        Data.writeInt32(this.Content.Entry.value);
        Data.writeString(this.Content.Session);
        Data.writeBoolean(this.Content.Autorun);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(_a.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.Information = Information;
_a = Information;
Information.Id = 27968;
Information.Event = async (Data, Socket) => {
    const Received = _a.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
    if (exports_1.Environment.Debug) {
        const { Client, Room } = Socket;
        if (!(0, lodash_1.isEqual)(Received.Content, Client.Information.Initialize.Content)) {
            exports_2.Log.error(`Client [${Client.Id}]: Received Information is not same with Initialized`);
            return Client.Disconnect();
        }
        if (exports_3.Entry.inRange(Client.Information.Initialize.Content.Entry.value)) {
            if (exports_3.Squad.inRange(exports_2.Types.Enums.Sitting.HomePlayer, Client.Information.Initialize.Content.Entry.value)) {
                Client.Information.Match = exports_1.Temporary.Player.Information({ Entry: Client.Information.Initialize.Content.Entry, Sitting: exports_2.Types.Enums.Sitting.HomePlayer });
                Room.Information.Content.Teams.Home.Player.push(Client.Information.Match);
            }
            else {
                Client.Information.Match = exports_1.Temporary.Player.Information({ Entry: Client.Information.Initialize.Content.Entry, Sitting: exports_2.Types.Enums.Sitting.AwayPlayer });
                Room.Information.Content.Teams.Away.Player.push(Client.Information.Match);
            }
        }
        else {
            exports_2.Log.error(`Client [${Client.Id}]: Actor is out of range.`);
            return Client.Disconnect();
        }
        Room.Clients.Broadcast(new exports_1.Messages.Player.Joined({ Player: Client.Information.Match }));
        Room.Clients.Broadcast(new exports_1.Messages.Chat.System.Send({ Text: `${Client.Information.Match.Content.PlayerName} connected. (${Room.Clients.Count} / 22)`, Type: exports_1.Messages.Chat.System.Type.SCT }));
        Room.Information.Content.Actor.Camera = Client.Information.Initialize.Content.Entry.toSquad();
        // Room.Information.Content.Actor.Actioner = Client.Information.Initialize.Content.Entry.toSquad() // TODO: Dont give everyone a actioner!!
        Room.Information.Content.Actor.Mark = Client.Information.Initialize.Content.Entry.value;
        Client.Broadcast(Room.Information);
        await new Promise(resolve => setTimeout(resolve, 2500));
        // Room.Clients.Broadcast(new Events.Match.UIEvent.Class({ Squad: Client.Information.Initialize.Content.Entry, Timing: 5, Label: 'Test UI', Type: Events.Match.UIEvent.Type.PlayerJoined }))
        Client.Broadcast(new exports_1.Messages.Chat.System.Send({ Text: `Room: ${Room.Id}`, Type: exports_1.Messages.Chat.System.Type.General }));
        Client.Broadcast(new exports_1.Messages.Chat.System.Send({ Text: `Client: ${Client.Id}`, Type: exports_1.Messages.Chat.System.Type.General }));
        // TODO: Change it.
        if (Room.Clients.Count >= 1) {
            Room.Clients.Broadcast(new exports_1.Messages.Chat.System.Send({ Text: 'Match Beginning...', Type: exports_1.Messages.Chat.System.Type.SCT }));
            // TODO: try GClass248
            exports_3.Positioning.Change(Room, exports_2.Types.Enums.Positioning.Kickoff, true);
        }
    }
};
