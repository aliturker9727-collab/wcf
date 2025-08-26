"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass222 = void 0;
const exports_1 = require("../../../../sobee/exports");
class GClass222 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new GClass222({
            Squad: Data.readUInt8(),
            Animation: Data.readUInt16(),
            Bool: Data.readBoolean(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeUInt8(this.Content.Squad);
        Data.writeUInt16(this.Content.Animation);
        Data.writeBoolean(this.Content.Bool);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(GClass222.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.GClass222 = GClass222;
GClass222.Id = 10059;
GClass222.Event = (Data) => {
    const Received = GClass222.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
};
