"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass237 = void 0;
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
const sobee_1 = require("../../../../sobee");
class GClass237 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new _a({
            Velocity: Data.readFloatVector2({ isDegress: true }),
            Sprint: Data.readBoolean(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeFloatVector2(this.Content.Velocity, { isDegress: true });
        Data.writeBoolean(this.Content.Sprint);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(_a.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.GClass237 = GClass237;
_a = GClass237;
GClass237.Id = 42398;
GClass237.Event = async (Data, Socket) => {
    const Received = _a.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
    if (exports_1.Environment.Debug) {
        const { Client, Room } = Socket;
        const Moving = Client.Components.Get(sobee_1.Sobee.Network.Socket.Client.Components.Moving);
        if (!Moving) {
            exports_2.Log.error(`Client (${Client.Id}) does not have Moving component.`);
            return Room.Disconnect();
        }
        // TODO: You need stamina system
        Client.Information.Match.Content.Direction = Received.Content.Velocity;
        Client.Information.Match.Content.Velocity = new exports_1.Binary.Types.Vector3(Client.Information.Match.Content.Direction.X * (Received.Content.Sprint ? Moving.Sprint : Moving.Speed), Client.Information.Match.Content.Direction.Y * (Received.Content.Sprint ? Moving.Sprint : Moving.Speed), 0);
        Room.Clients.Broadcast(new exports_1.Messages.Player.Move({
            Alerted: false,
            Sprint: Received.Content.Sprint,
            Squad: Client.Information.Initialize.Content.Entry.toSquad(),
            Position: Client.Information.Match.Content.Position,
            Velocity: Client.Information.Match.Content.Velocity,
            Stamina: Client.Information.Match.Content.Stamina,
        }));
    }
};
