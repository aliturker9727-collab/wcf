"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass238 = void 0;
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
const sobee_1 = require("../../../../sobee");
class GClass238 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new _a({
            Strength: Data.readFloat(),
            Direction: Data.readVector2(),
            Type: Data.readUInt8(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeFloat(this.Content.Strength);
        Data.writeVector2(this.Content.Direction);
        Data.writeUInt8(this.Content.Type);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(_a.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.GClass238 = GClass238;
_a = GClass238;
GClass238.Id = 18455;
GClass238.Event = async (Data, Socket) => {
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
            const Speed = Ball.Speed * Received.Content.Strength;
            const Safe = Ball.Radius + 0.1;
            Client.Information.Match.Content.Direction = Received.Content.Direction;
            Room.Information.Content.Ball.Position = new exports_1.Binary.Types.Vector3(Client.Information.Match.Content.Position.X + Client.Information.Match.Content.Direction.X * Safe, Client.Information.Match.Content.Position.Y + Client.Information.Match.Content.Direction.Y * Safe, Ball.Boundry.Z);
            Room.Information.Content.Ball.Velocity = new exports_1.Binary.Types.Vector3(Received.Content.Direction.X * Speed, Received.Content.Direction.Y * Speed, 0);
            Room.Clients.Broadcast(new exports_1.Messages.Ball.Kickoff({
                Velocity: Room.Information.Content.Ball.Velocity,
                Animation: exports_2.Types.Enums.Animation.ShootLeft,
            }));
            Client.Broadcast(new exports_1.Messages.Chat.System.Send({ Text: `Kickoff ${Room.Information.Content.Actor.Actioner}`, Type: exports_1.Messages.Chat.System.Type.General }));
            Room.Information.Content.Actor.Actioner = -1;
        }
        // Player.Content.Direction = Received.Content.Direction
        // switch (Received.Content.Type) {
        //   case Types.Enums.HitSubType.Shoot:
        //     Socket.write(new Player.Ball.Shoot.Class({
        //       Squad: Player.Content.Squad,
        //       Animation: Types.Enums.AnimationType.ShootLeft, // TODO: Fix animation
        //       Direction: Player.Content.Direction,
        //       Position: Player.Content.Position,
        //       Velocity: {
        //          0,
        //         0,
        //         0,
        //       },
        //       Speed: 0,
        //     }).Serialize())
        // }
    }
};
