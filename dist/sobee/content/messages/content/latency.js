"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latency = void 0;
const exports_1 = require("../../../../sobee/exports");
/** GClass291 */
class Latency extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new Latency({
            Time: Data.readFloat(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeFloat(this.Content.Time);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(Latency.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
}
exports.Latency = Latency;
Latency.Id = 7777;
Latency.Event = (Data) => {
    const Received = Latency.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
};
