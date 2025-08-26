"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
var Player;
(function (Player_1) {
    /** GClass161 */
    class Information extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Information({
                MatchID: Data.readUInt32(),
                PlayerID: Data.readUInt32(), // int32
                PlayerName: Data.readString(), // string
                Stamina: Data.readUInt32(), // int32
                Sitting: Data.readUInt32(), // int32
                Squad: Data.readUInt8(), // byte
                Unk1: Data.readString(), // string
                Moving: Data.readBoolean(), // boolean
                Appearance: (() => {
                    Data.readInt16(); // skip class id
                    return exports_1.Messages.Player.Appearance.Deserialize(Data);
                })(),
                Position: Data.readVector2(), // vector2
                Velocity: Data.readVector3(), // vector3
                Direction: Data.readFloatVector2(), // float
                Invite: Data.readBoolean(), // boolean
                Card: Data.readUInt32(), // int32
                LeagueID: Data.readUInt8(), // byte
                LeagueSort: Data.readUInt32(), // int32
                LeagueGroupID: Data.readUInt32(), // int32
                EloPoint: Data.readFloat(), // float
                Skill: [Data.readStringArray(), Data.readStringArray()], // stringArray[]
                GZipBool: Data.readBoolean(), // boolean
                XmlCode: Data.readString(), // string
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt32(this.Content.MatchID);
            Data.writeUInt32(this.Content.PlayerID);
            Data.writeString(this.Content.PlayerName);
            Data.writeUInt32(this.Content.Stamina);
            Data.writeUInt32(this.Content.Sitting);
            Data.writeUInt8(this.Content.Squad);
            Data.writeString(this.Content.Unk1);
            Data.writeBoolean(this.Content.Moving);
            const GClass168 = this.Content.Appearance.Serialize();
            Data.writeByteUnsafe(GClass168.subarray(4, GClass168.byteLength));
            Data.writeVector2(this.Content.Position);
            Data.writeVector3(this.Content.Velocity);
            Data.writeFloatVector2(this.Content.Direction);
            Data.writeBoolean(this.Content.Invite);
            Data.writeUInt32(this.Content.Card);
            Data.writeUInt8(this.Content.LeagueID);
            Data.writeUInt32(this.Content.LeagueSort);
            Data.writeUInt32(this.Content.LeagueGroupID);
            Data.writeFloat(this.Content.EloPoint);
            this.Content.Skill.forEach(s => Data.writeStringArray(s));
            Data.writeBoolean(this.Content.GZipBool);
            Data.writeString(this.Content.XmlCode);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Information.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
        static Default(Input = {
            Match: { ID: -1 },
            Player: {
                ID: -1,
                Name: 'Uninitialized',
                Squad: -1,
                Position: new exports_1.Binary.Types.Vector2(0, 0),
                Sitting: exports_2.Types.Enums.Sitting.Invalid,
            },
        }) {
            const { Match, Player } = Input;
            return new Information({
                Unk1: '',
                Invite: true,
                GZipBool: false,
                XmlCode: '<XMLData><Script></Script></XMLData>',
                MatchID: Match.ID,
                LeagueGroupID: 1,
                LeagueID: 1,
                LeagueSort: 1,
                EloPoint: 0,
                Position: Player.Position,
                Velocity: new exports_1.Binary.Types.Vector3(0, 0, 0),
                Direction: new exports_1.Binary.Types.Vector2(0, 0),
                PlayerID: Player.ID,
                PlayerName: Player.Name,
                Card: exports_2.Types.Enums.Card.None,
                Sitting: Player.Sitting,
                Squad: Player.Squad,
                Skill: [[], []],
                Moving: false,
                Stamina: 120,
                Appearance: new exports_1.Messages.Player.Appearance({
                    Costume: 0,
                    Body: 128,
                    Head: new exports_1.Binary.Types.Vector3(128, 128, 128),
                    Neck: { Width: 128, Height: 128 },
                    Shoulder: { Width: 128, Thickness: 128 },
                    Arm: { Width: 128, Length: 128 },
                    Hand: 128,
                    Abdomen: 128,
                    Leg: { Width: 128 },
                    Calf: { Width: 128 },
                    Feet: 128,
                    Skin: 128,
                    Cheek: [128, 128],
                    Chin: 128,
                    Ear: [128, 128],
                    Eyebrow: [128, 128, 128, 128],
                    Eyes: [128, 128, 128, 128, 128, 128],
                    Face: 128,
                    Jaw: [128, 128, 128],
                    Lip: [128, 128],
                    Mouth: [128, 128],
                    Nose: [128, 128, 128, 128, 128, 128],
                    Unk1: 0,
                    Unk2: 0,
                    Unk3: 0,
                    Unk4: 0,
                    Unk5: 0,
                    Unk6: 0,
                    Unk7: 0,
                    Unk8: 0,
                    Unk9: 0,
                    Unk10: 44,
                    Unk11: 79,
                    Unk12: 0,
                    Unk13: 128,
                    Unk14: 128,
                }),
            });
        }
    }
    Information.Id = 13968;
    Information.Event = (Data) => {
        const Received = Information.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Player_1.Information = Information;
    /** GClass168 */
    class Appearance extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Appearance({
                Costume: Data.readUInt8(),
                Body: Data.readUInt8(),
                Head: new exports_1.Binary.Types.Vector3(Data.readUInt8(), Data.readUInt8(), Data.readUInt8()),
                Neck: { Width: Data.readUInt8(), Height: Data.readUInt8() },
                Shoulder: { Width: Data.readUInt8(), Thickness: Data.readUInt8() },
                Arm: { Length: Data.readUInt8(), Width: Data.readUInt8() },
                Hand: Data.readUInt8(),
                Abdomen: Data.readUInt8(),
                Leg: { Width: Data.readUInt8() },
                Calf: { Width: Data.readUInt8() },
                Feet: Data.readUInt8(),
                Skin: Data.readUInt8(),
                Cheek: [Data.readUInt8(), Data.readUInt8()],
                Chin: Data.readUInt8(),
                Ear: [Data.readUInt8(), Data.readUInt8()],
                Eyebrow: [Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8()],
                Eyes: [Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8()],
                Face: Data.readUInt8(),
                Jaw: [Data.readUInt8(), Data.readUInt8(), Data.readUInt8()],
                Lip: [Data.readUInt8(), Data.readUInt8()],
                Mouth: [Data.readUInt8(), Data.readUInt8()],
                Nose: [Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8(), Data.readUInt8()],
                Unk1: Data.readUInt8(),
                Unk2: Data.readUInt8(),
                Unk3: Data.readUInt8(),
                Unk4: Data.readUInt8(),
                Unk5: Data.readUInt8(),
                Unk6: Data.readUInt8(),
                Unk7: Data.readUInt8(),
                Unk8: Data.readUInt8(),
                Unk9: Data.readUInt8(),
                Unk10: Data.readUInt8(),
                Unk11: Data.readUInt8(),
                Unk12: Data.readUInt8(),
                Unk13: Data.readUInt8(),
                Unk14: Data.readUInt8(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt8(this.Content.Costume);
            Data.writeUInt8(this.Content.Body);
            Data.writeUInt8(this.Content.Head.X);
            Data.writeUInt8(this.Content.Head.Y);
            Data.writeUInt8(this.Content.Head.Z);
            Data.writeUInt8(this.Content.Neck.Width);
            Data.writeUInt8(this.Content.Neck.Height);
            Data.writeUInt8(this.Content.Shoulder.Width);
            Data.writeUInt8(this.Content.Shoulder.Thickness);
            Data.writeUInt8(this.Content.Arm.Length);
            Data.writeUInt8(this.Content.Arm.Width);
            Data.writeUInt8(this.Content.Hand);
            Data.writeUInt8(this.Content.Abdomen);
            Data.writeUInt8(this.Content.Leg.Width);
            Data.writeUInt8(this.Content.Calf.Width);
            Data.writeUInt8(this.Content.Feet);
            Data.writeUInt8(this.Content.Skin);
            this.Content.Cheek.forEach(v => Data.writeUInt8(v));
            Data.writeUInt8(this.Content.Chin);
            this.Content.Ear.forEach(v => Data.writeUInt8(v));
            this.Content.Eyebrow.forEach(v => Data.writeUInt8(v));
            this.Content.Eyes.forEach(v => Data.writeUInt8(v));
            Data.writeUInt8(this.Content.Face);
            this.Content.Jaw.forEach(v => Data.writeUInt8(v));
            this.Content.Lip.forEach(v => Data.writeUInt8(v));
            this.Content.Mouth.forEach(v => Data.writeUInt8(v));
            this.Content.Nose.forEach(v => Data.writeUInt8(v));
            Data.writeUInt8(this.Content.Unk1);
            Data.writeUInt8(this.Content.Unk2);
            Data.writeUInt8(this.Content.Unk3);
            Data.writeUInt8(this.Content.Unk4);
            Data.writeUInt8(this.Content.Unk5);
            Data.writeUInt8(this.Content.Unk6);
            Data.writeUInt8(this.Content.Unk7);
            Data.writeUInt8(this.Content.Unk8);
            Data.writeUInt8(this.Content.Unk9);
            Data.writeUInt8(this.Content.Unk10);
            Data.writeUInt8(this.Content.Unk11);
            Data.writeUInt8(this.Content.Unk12);
            Data.writeUInt8(this.Content.Unk13);
            Data.writeUInt8(this.Content.Unk14);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Appearance.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Appearance.Id = 15682;
    Appearance.Event = (Data) => {
        const Received = Appearance.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Player_1.Appearance = Appearance;
    /** GClass209 */
    class Move extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Move({
                Squad: Data.readUInt8(),
                Position: new exports_1.Binary.Types.Vector2(Data.readInt16() / 6.0, Data.readInt16() / 6.0),
                Velocity: (() => {
                    const num = Data.readInt16() / 10.0;
                    const _float = Data.readInt16() / 10000.0;
                    return new exports_1.Binary.Types.Vector2(num * Math.cos(_float), num * Math.sin(_float));
                })(),
                Sprint: Data.readBoolean(),
                Alerted: Data.readBoolean(),
                Stamina: Data.readUInt8(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt8(this.Content.Squad);
            Data.writeInt16(this.Content.Position.X * 6.0);
            Data.writeInt16(this.Content.Position.Y * 6.0);
            Data.writeInt16(Math.sqrt(this.Content.Velocity.X * this.Content.Velocity.X + this.Content.Velocity.Y * this.Content.Velocity.Y) * 10.0);
            Data.writeInt16(Math.atan2(this.Content.Velocity.Y, this.Content.Velocity.X) * 10000.0);
            Data.writeBoolean(this.Content.Sprint);
            Data.writeBoolean(this.Content.Alerted);
            Data.writeUInt8(this.Content.Stamina);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Move.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Move.Id = 22801;
    Move.Event = (Data) => {
        const Received = Move.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Player_1.Move = Move;
    /** GClass247 */
    class Stop extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Stop({
                Squad: Data.readUInt8(),
                Position: new exports_1.Binary.Types.Vector2(Data.readInt16() / 6.0, Data.readInt16() / 6.0),
                Velocity: (() => {
                    const num = Data.readInt16() / 10.0;
                    const float_ = Data.readInt16() / 10000.0;
                    return new exports_1.Binary.Types.Vector2(num * Math.cos(float_), num * Math.sin(float_));
                })(),
                Alerted: Data.readBoolean(),
                Stamina: Data.readUInt8(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt8(this.Content.Squad);
            Data.writeInt16(this.Content.Position.X * 6.0);
            Data.writeInt16(this.Content.Position.Y * 6.0);
            Data.writeInt16(Math.sqrt(this.Content.Velocity.X * this.Content.Velocity.X + this.Content.Velocity.Y * this.Content.Velocity.Y) * 10.0);
            Data.writeInt16(Math.atan2(this.Content.Velocity.Y, this.Content.Velocity.X) * 10000.0);
            Data.writeBoolean(this.Content.Alerted);
            Data.writeUInt8(this.Content.Stamina);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Stop.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Stop.Id = 11600;
    Stop.Event = (Data) => {
        const Received = Stop.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Player_1.Stop = Stop;
    /** GClass243 */
    class Update extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Update({
                Player: (() => {
                    Data.readInt16(); // skip class id
                    return exports_1.Messages.Player.Information.Deserialize(Data);
                })(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            const Player = this.Content.Player.Serialize();
            Data.writeByteUnsafe(Player.subarray(4, Player.byteLength));
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Update.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Update.Id = 11089;
    Update.Event = (Data) => {
        const Received = Update.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Player_1.Update = Update;
    /** GClass239 */
    class Joined extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Joined({
                Player: (() => {
                    Data.readInt16(); // skip class id
                    return exports_1.Messages.Player.Information.Deserialize(Data);
                })(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            const Player = this.Content.Player.Serialize();
            Data.writeByteUnsafe(Player.subarray(4, Player.byteLength));
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Joined.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Joined.Id = 15760;
    Joined.Event = (Data) => {
        const Received = Joined.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Player_1.Joined = Joined;
})(Player || (exports.Player = Player = {}));
