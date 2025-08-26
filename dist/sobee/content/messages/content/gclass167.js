"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass167 = void 0;
const exports_1 = require("../../../../sobee/exports");
class GClass167 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new GClass167({
            Unk0: Data.readFloat(),
            Unk1: Data.readFloat(),
            Unk2: Data.readFloat(),
            Unk3: Data.readFloat(),
            Unk4: Data.readVector3(),
            Unk5: Data.readFloat(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeFloat(this.Content.Unk0);
        Data.writeFloat(this.Content.Unk1);
        Data.writeFloat(this.Content.Unk2);
        Data.writeFloat(this.Content.Unk3);
        Data.writeVector3(this.Content.Unk4);
        Data.writeFloat(this.Content.Unk5);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(GClass167.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
    static Default() {
        return new GClass167({
            Unk0: 0,
            Unk1: 0,
            Unk2: 0,
            Unk3: 0,
            Unk4: new exports_1.Binary.Types.Vector3(0, 0, 0),
            Unk5: 0,
        });
    }
}
exports.GClass167 = GClass167;
GClass167.Id = 9384;
GClass167.Event = (Data) => {
    const Received = GClass167.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
};
