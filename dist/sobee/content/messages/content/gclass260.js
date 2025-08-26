"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass260 = void 0;
const exports_1 = require("../../../../sobee/exports");
class GClass260 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new GClass260({});
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        // empty
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(GClass260.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.GClass260 = GClass260;
GClass260.Id = 10804;
GClass260.Event = (Data, Socket) => {
    const Received = GClass260.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
    if (exports_1.Environment.Debug) {
        const { Client, Room } = Socket;
        Client.Information.Match.Content.Velocity = new exports_1.Binary.Types.Vector3(0, 0, 0);
        Room.Clients.Broadcast(new exports_1.Messages.Player.Stop({
            Alerted: false,
            Squad: Client.Information.Initialize.Content.Entry.toSquad(),
            Position: Client.Information.Match.Content.Position,
            Velocity: Client.Information.Match.Content.Velocity,
            Stamina: Client.Information.Match.Content.Stamina,
        }));
    }
};
