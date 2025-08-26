"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass166 = void 0;
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
class GClass166 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new GClass166({
            Score: {
                Home: Data.readUInt8(),
                Away: Data.readUInt8(),
            },
            Match: {
                Time: Data.readFloat64(),
                Phase: Data.readInt32(),
            },
            Unk4: Data.readUInt16(),
            Unk5: Data.readUInt16(),
            Unk6: Data.readInt8(),
            Unk7: Data.readInt8(),
            Unk8: Data.readInt16(),
            Unk9: Data.readInt16(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeUInt8(this.Content.Score.Home);
        Data.writeUInt8(this.Content.Score.Away);
        Data.writeFloat64(this.Content.Match.Time);
        Data.writeInt32(this.Content.Match.Phase);
        Data.writeUInt16(this.Content.Unk4);
        Data.writeUInt16(this.Content.Unk5);
        Data.writeInt8(this.Content.Unk6);
        Data.writeInt8(this.Content.Unk7);
        Data.writeInt16(this.Content.Unk8);
        Data.writeInt16(this.Content.Unk9);
        const Header = new exports_1.Binary.Writer();
        Header.writeUInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(GClass166.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
    static Default(Input = {
        Score: { Home: 0, Away: 0 },
        Match: { Time: 0, Phase: exports_2.Types.Enums.Phase.FirstHalf },
    }) {
        const { Score, Match } = Input;
        return new GClass166({
            Score,
            Match,
            Unk4: 0,
            Unk5: 0,
            Unk6: 1,
            Unk7: 1,
            Unk8: 1,
            Unk9: 1,
        });
    }
}
exports.GClass166 = GClass166;
GClass166.Id = 11279;
GClass166.Event = (Data) => {
    const Received = GClass166.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
};
