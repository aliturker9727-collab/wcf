"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass236 = void 0;
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
const sobee_1 = require("../../../../sobee");
class GClass236 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new _a({
            Strength: Data.readFloat(),
            Degrees: Data.readFloatVector2(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeFloat(this.Content.Strength);
        Data.writeFloatVector2(this.Content.Degrees);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(_a.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.GClass236 = GClass236;
_a = GClass236;
GClass236.Id = 3905;
GClass236.Event = async (Data, Socket) => {
    const Received = _a.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
    if (exports_1.Environment.Debug) {
        const { Client, Room } = Socket;
        const Ball = Room.Components.Get(sobee_1.Sobee.Network.Socket.Room.Components.Ball);
        if (!Ball) {
            exports_2.Log.error(`Room (${Room.Id}) does not have Ball component.`);
            return Room.Disconnect();
        }
        if (Room.Information.Content.Actor.Actioner % 11 === Client.Information.Match.Content.Squad) {
            exports_1.Messages.GClass260.Event(new exports_2.Event.Parser(new exports_1.Messages.GClass260({}).Serialize()).Content, Socket);
            const Speed = Ball.Speed * Received.Content.Strength;
            const Safe = Ball.Radius + 0.1;
            Client.Information.Match.Content.Direction = Received.Content.Degrees;
            Room.Information.Content.Ball.Position = new exports_1.Binary.Types.Vector3(Client.Information.Match.Content.Position.X + Client.Information.Match.Content.Direction.X * Safe, Client.Information.Match.Content.Position.Y + Client.Information.Match.Content.Direction.Y * Safe, Ball.Boundry.Z);
            Room.Information.Content.Ball.Velocity = new exports_1.Binary.Types.Vector3(Client.Information.Match.Content.Direction.X * Speed, Client.Information.Match.Content.Direction.Y * Speed, Speed);
            Room.Clients.Broadcast(new exports_1.Messages.Ball.Shoot({
                Squad: Client.Information.Initialize.Content.Entry.toSquad(),
                Animation: exports_2.Types.Enums.Animation.ShootLeft, // TODO: Fix animation
                Direction: Client.Information.Match.Content.Direction,
                Position: Room.Information.Content.Ball.Position,
                Velocity: Room.Information.Content.Ball.Velocity,
                Speed: 0,
            }));
            Client.Broadcast(new exports_1.Messages.Chat.System.Send({ Text: `Shoot ${Room.Information.Content.Actor.Actioner}`, Type: exports_1.Messages.Chat.System.Type.General }));
            Room.Information.Content.Actor.Actioner = -1;
        }
    }
};
