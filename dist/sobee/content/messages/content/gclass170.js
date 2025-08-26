"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GClass170 = void 0;
const exports_1 = require("../../../../sobee/exports");
class GClass170 extends exports_1.Messaging.Event.Base {
    constructor(Data) {
        super(Data);
        this.Content = Data;
    }
    static Deserialize(Data) {
        if (!(Data instanceof exports_1.Binary.Reader))
            throw new Error('Deserialize requires a Binary.Reader instance');
        return new GClass170({
            Unk0: Data.readInt32(),
            Unk1: Data.readBoolean(),
            Team1Color: Data.readInt32(),
            Unk2: Data.readInt32(),
            Team2Color: Data.readInt32(),
            Unk3: Data.readInt32(),
            Unk4: Data.readInt32(),
            Unk5: Data.readInt32(),
            Unk6: Data.readInt32(),
            Unk7: Data.readString(),
            Scenario: Data.readInt32(),
            Team1Size: Data.readInt32(),
            Team2Size: Data.readInt32(),
            Team1Name: Data.readString(),
            Team2Name: Data.readString(),
            Team1Short: Data.readString(),
            Team2Short: Data.readString(),
            Unk8: Data.readString(),
            Unk9: Data.readString(),
            Invite: Data.readBoolean(),
            Unk11: Data.readInt32(),
            Unk12: Data.readFloat(),
            Unk13: Data.readInt32(),
            Unk14: Data.readInt8(),
            Unk15: Data.readInt32(),
            Unk16: Data.readFloat(),
            Unk17: Data.readInt32(),
            Unk18: Data.readInt8(),
            Unk19: Data.readInt32(),
            GZipBool: Data.readBoolean(),
            XmlCode: Data.readString(),
        });
    }
    Serialize() {
        const Data = new exports_1.Binary.Writer();
        Data.writeInt32(this.Content.Unk0);
        Data.writeBoolean(this.Content.Unk1);
        Data.writeInt32(this.Content.Team1Color);
        Data.writeInt32(this.Content.Unk2);
        Data.writeInt32(this.Content.Team2Color);
        Data.writeInt32(this.Content.Unk3);
        Data.writeInt32(this.Content.Unk4);
        Data.writeInt32(this.Content.Unk5);
        Data.writeInt32(this.Content.Unk6);
        Data.writeString(this.Content.Unk7);
        Data.writeInt32(this.Content.Scenario);
        Data.writeInt32(this.Content.Team1Size);
        Data.writeInt32(this.Content.Team2Size);
        Data.writeString(this.Content.Team1Name);
        Data.writeString(this.Content.Team2Name);
        Data.writeString(this.Content.Team1Short);
        Data.writeString(this.Content.Team2Short);
        Data.writeString(this.Content.Unk8);
        Data.writeString(this.Content.Unk9);
        Data.writeBoolean(this.Content.Invite);
        Data.writeInt32(this.Content.Unk11);
        Data.writeFloat(this.Content.Unk12);
        Data.writeInt32(this.Content.Unk13);
        Data.writeInt8(this.Content.Unk14);
        Data.writeInt32(this.Content.Unk15);
        Data.writeFloat(this.Content.Unk16);
        Data.writeInt32(this.Content.Unk17);
        Data.writeInt8(this.Content.Unk18);
        Data.writeInt32(this.Content.Unk19);
        Data.writeBoolean(this.Content.GZipBool);
        Data.writeString(this.Content.XmlCode);
        const Header = new exports_1.Binary.Writer();
        Header.writeInt32(Data.Content.byteLength + 2);
        Header.writeUInt16(GClass170.Id);
        return Buffer.concat([Header.Content, Data.Content]);
    }
    static Default(Scenario, Teams) {
        return new GClass170({
            Scenario,
            Team1Color: Teams.Home.Color,
            Team1Name: Teams.Home.Name.Full,
            Team1Short: Teams.Home.Name.Short,
            Team1Size: Teams.Home.Size,
            Team2Color: Teams.Away.Color,
            Team2Name: Teams.Away.Name.Full,
            Team2Short: Teams.Away.Name.Short,
            Team2Size: Teams.Away.Size,
            Unk0: 0,
            Unk1: true,
            Unk2: 0,
            Unk3: 0,
            Unk4: 0,
            Unk5: 0,
            Unk6: 0,
            Unk7: '',
            Unk8: '',
            Unk9: '',
            Invite: false,
            Unk11: 0,
            Unk12: 0,
            Unk13: 0,
            Unk14: 0,
            Unk15: 0,
            Unk16: 0,
            Unk17: 0,
            Unk18: 0,
            Unk19: 0,
            GZipBool: false,
            XmlCode: '<XMLData><Script></Script></XMLData>',
        });
    }
}
exports.GClass170 = GClass170;
GClass170.Id = 30546;
GClass170.Event = (Data) => {
    const Received = GClass170.Deserialize(Data);
    // console.log(Class.Id, Received.Content)
};
