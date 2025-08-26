"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const exports_1 = require("../../../../sobee/exports");
var Match;
(function (Match) {
    /** GClass240 */
    class Information extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Information({
                Actor: {
                    Camera: Data.readInt8(),
                    Actioner: Data.readInt8(),
                    Mark: Data.readInt32(),
                },
                Teams: {
                    Home: {
                        Player: (() => {
                            const Array = [];
                            for (let i = 0; i < Data.readInt16(); i++)
                                Array.push(exports_1.Messages.Player.Information.Deserialize(Data));
                            return Array;
                        })(),
                        Spectator: (() => {
                            const Array = [];
                            for (let i = 0; i < Data.readInt16(); i++)
                                Array.push(exports_1.Messages.Player.Information.Deserialize(Data));
                            return Array;
                        })(),
                    },
                    Away: {
                        Player: (() => {
                            const Array = [];
                            for (let i = 0; i < Data.readInt16(); i++)
                                Array.push(exports_1.Messages.Player.Information.Deserialize(Data));
                            return Array;
                        })(),
                        Spectator: (() => {
                            const Array = [];
                            for (let i = 0; i < Data.readInt16(); i++)
                                Array.push(exports_1.Messages.Player.Information.Deserialize(Data));
                            return Array;
                        })(),
                    },
                },
                Ball: { Position: Data.readVector3(), Velocity: Data.readVector3() },
                State: Data.readInt32(),
                Positioning: Data.readInt32(),
                GClass166: (() => {
                    Data.readInt16();
                    return exports_1.Messages.GClass166.Deserialize(Data);
                })(),
                GClass170: (() => {
                    Data.readInt16();
                    return exports_1.Messages.GClass170.Deserialize(Data);
                })(),
                GClass167: (() => {
                    Data.readInt16();
                    return exports_1.Messages.GClass167.Deserialize(Data);
                })(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeInt8(this.Content.Actor.Camera);
            Data.writeInt8(this.Content.Actor.Actioner);
            Data.writeInt32(this.Content.Actor.Mark);
            Data.writeUInt16(this.Content.Teams.Home.Player.length); // for
            this.Content.Teams.Home.Player.forEach((Player) => {
                const Serialized = Player.Serialize();
                Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength));
            });
            Data.writeUInt16(this.Content.Teams.Away.Player.length); // for
            this.Content.Teams.Away.Player.forEach((Player) => {
                const Serialized = Player.Serialize();
                Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength));
            });
            Data.writeUInt16(this.Content.Teams.Home.Spectator.length); // for
            this.Content.Teams.Home.Spectator.forEach((Player) => {
                const Serialized = Player.Serialize();
                Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength));
            });
            Data.writeUInt16(this.Content.Teams.Away.Spectator.length); // for
            this.Content.Teams.Away.Spectator.forEach((Player) => {
                const Serialized = Player.Serialize();
                Data.writeByteUnsafe(Serialized.subarray(4, Serialized.byteLength));
            });
            Data.writeVector3(this.Content.Ball.Position);
            Data.writeVector3(this.Content.Ball.Velocity);
            Data.writeInt32(this.Content.State);
            Data.writeInt32(this.Content.Positioning);
            const GClass166 = this.Content.GClass166.Serialize();
            Data.writeByteUnsafe(GClass166.subarray(4, GClass166.byteLength));
            const GClass170 = this.Content.GClass170.Serialize();
            Data.writeByteUnsafe(GClass170.subarray(4, GClass170.byteLength));
            const GClass167 = this.Content.GClass167.Serialize();
            Data.writeByteUnsafe(GClass167.subarray(4, GClass167.byteLength));
            Data.writeFloat(100);
            Data.writeFloat64(100);
            Data.writeUInt16(0); // for
            Data.writeUInt16(0); // for
            const gclass156_0 = new exports_1.Binary.Writer(); // 4932
            gclass156_0.writeUInt32(0);
            gclass156_0.writeUInt32(0);
            gclass156_0.writeUInt32(0);
            gclass156_0.writeUInt32(0);
            gclass156_0.writeUInt32(0);
            gclass156_0.writeUInt32(0);
            const gclass156_0_header = new exports_1.Binary.Writer();
            gclass156_0_header.writeUInt16(3367);
            Data.writeByteUnsafe(Buffer.concat([gclass156_0_header.Content, gclass156_0.Content]));
            Data.writeUInt16(0); // for
            Data.writeUInt16(0); // for
            const userSessionRights_0 = new exports_1.Binary.Writer(); // 18579
            userSessionRights_0.writeUInt32(0);
            const userSessionRights_0_header = new exports_1.Binary.Writer();
            userSessionRights_0_header.writeUInt16(22256);
            Data.writeByteUnsafe(Buffer.concat([userSessionRights_0_header.Content, userSessionRights_0.Content]));
            const gclass171_0 = new exports_1.Binary.Writer(); // 21588
            gclass171_0.writeUInt32(1);
            const UIEvent = new exports_1.Messages.Match.UI.Notice({
                Label: 'n1rafawn',
                Type: Match.UI.Type.MatchWelcome,
                Squad: 1,
                Timing: 1,
            }).Serialize();
            gclass171_0.writeByteUnsafe(UIEvent.subarray(4, UIEvent.byteLength));
            const gclass171_0_header = new exports_1.Binary.Writer();
            gclass171_0_header.writeUInt16(18999);
            Data.writeByteUnsafe(Buffer.concat([gclass171_0_header.Content, gclass171_0.Content]));
            Data.writeString('');
            Data.writeString('');
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Information.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
        static Default(Input) {
            const { Scenario, State, Positioning, Teams } = Input;
            return new Information({
                Actor: { Camera: -1, Actioner: -1, Mark: -1 },
                Teams: {
                    Home: { Player: [], Spectator: [] },
                    Away: { Player: [], Spectator: [] },
                },
                Ball: { Position: new exports_1.Binary.Types.Vector3(0, 0, 0), Velocity: new exports_1.Binary.Types.Vector3(0, 0, 0) },
                State,
                Positioning,
                GClass166: exports_1.Messages.GClass166.Default(),
                GClass170: exports_1.Messages.GClass170.Default(Scenario, Teams),
                GClass167: exports_1.Messages.GClass167.Default(),
            });
        }
    }
    Information.Id = 11328;
    Information.Event = (Data) => {
        const Received = Information.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Match.Information = Information;
    let UI;
    (function (UI) {
        let Type;
        (function (Type) {
            Type[Type["Goal"] = 0] = "Goal";
            Type[Type["OwnGoal"] = 1] = "OwnGoal";
            Type[Type["Offside"] = 2] = "Offside";
            Type[Type["Corner"] = 3] = "Corner";
            Type[Type["Freekick"] = 4] = "Freekick";
            Type[Type["Penalty"] = 5] = "Penalty";
            Type[Type["YellowCard"] = 6] = "YellowCard";
            Type[Type["YellowToRedCard"] = 7] = "YellowToRedCard";
            Type[Type["RedCard"] = 8] = "RedCard";
            Type[Type["MatchWelcome"] = 9] = "MatchWelcome";
            Type[Type["PlayerJoined"] = 10] = "PlayerJoined";
            Type[Type["PlayerLeft"] = 11] = "PlayerLeft";
        })(Type = UI.Type || (UI.Type = {}));
        /** GClass162 */
        class Notice extends exports_1.Messaging.Event.Base {
            constructor(Data) {
                super(Data);
                this.Content = Data;
            }
            static Deserialize(Data) {
                if (!(Data instanceof exports_1.Binary.Reader))
                    throw new Error('Deserialize requires a Binary.Reader instance');
                return new Notice({
                    Label: Data.readString(),
                    Type: Data.readUInt8(),
                    Squad: Data.readUInt8(),
                    Timing: Data.readFloat(),
                });
            }
            Serialize() {
                const Data = new exports_1.Binary.Writer();
                Data.writeString(this.Content.Label);
                Data.writeUInt8(this.Content.Type);
                Data.writeUInt8(this.Content.Squad);
                Data.writeFloat(this.Content.Timing);
                const Header = new exports_1.Binary.Writer();
                Header.writeUInt32(Data.Content.byteLength + 2);
                Header.writeUInt16(Notice.Id);
                return Buffer.concat([Header.Content, Data.Content]);
            }
        }
        Notice.Id = 16032;
        Notice.Event = (Data) => {
            const Received = Notice.Deserialize(Data);
            // console.log(Class.Id, Received.Content)
        };
        UI.Notice = Notice;
    })(UI = Match.UI || (Match.UI = {}));
    let Positioning;
    (function (Positioning) {
        /** GClass281 - need 11!! */
        class Cutscene extends exports_1.Messaging.Event.Base {
            constructor(Data) {
                super(Data);
                this.Content = Data;
            }
            static Deserialize(Data) {
                if (!(Data instanceof exports_1.Binary.Reader))
                    throw new Error('Deserialize requires a Binary.Reader instance');
                const Temporary = {
                    HP: Data.readArrayUnsafe(11, () => Data.readVector2()),
                    AP: Data.readArrayUnsafe(11, () => Data.readVector2()),
                    HD: Data.readArrayUnsafe(11, () => Data.readFloatVector2()),
                    AD: Data.readArrayUnsafe(11, () => Data.readFloatVector2()),
                    HA: Data.readArrayUnsafe(11, () => Data.readUInt16()),
                    AA: Data.readArrayUnsafe(11, () => Data.readUInt16()),
                };
                return new Cutscene({
                    Type: Data.readInt32(),
                    Positioning: {
                        Home: {
                            Position: Temporary.HP,
                            Direction: Temporary.HD,
                            Animation: Temporary.HA,
                        },
                        Away: {
                            Position: Temporary.AP,
                            Direction: Temporary.AD,
                            Animation: Temporary.AA,
                        },
                    },
                });
            }
            Serialize() {
                const Data = new exports_1.Binary.Writer();
                Data.writeInt32(this.Content.Type);
                this.Content.Positioning.Home.Position.forEach(Position => Data.writeVector2(Position));
                this.Content.Positioning.Away.Position.forEach(Position => Data.writeVector2(Position));
                this.Content.Positioning.Home.Direction.forEach(Direction => Data.writeFloatVector2(Direction));
                this.Content.Positioning.Away.Direction.forEach(Direction => Data.writeFloatVector2(Direction));
                this.Content.Positioning.Home.Animation.forEach(Direction => Data.writeUInt16(Direction));
                this.Content.Positioning.Away.Animation.forEach(Direction => Data.writeUInt16(Direction));
                const Header = new exports_1.Binary.Writer();
                Header.writeUInt32(Data.Content.byteLength + 2);
                Header.writeUInt16(Cutscene.Id);
                return Buffer.concat([Header.Content, Data.Content]);
            }
        }
        Cutscene.Id = 26782;
        Cutscene.Event = (Data) => {
            const Received = Cutscene.Deserialize(Data);
            // console.log(Class.Id, Received.Content)
        };
        Positioning.Cutscene = Cutscene;
    })(Positioning = Match.Positioning || (Match.Positioning = {}));
    let State;
    (function (State) {
        let Type;
        (function (Type) {
            Type[Type["Waiting"] = 0] = "Waiting";
            Type[Type["Positioning"] = 1] = "Positioning";
            Type[Type["Freekick"] = 2] = "Freekick";
            Type[Type["Running"] = 3] = "Running";
            Type[Type["Paused"] = 4] = "Paused";
            Type[Type["Finished"] = 5] = "Finished";
        })(Type = State.Type || (State.Type = {}));
    })(State = Match.State || (Match.State = {}));
})(Match || (exports.Match = Match = {}));
