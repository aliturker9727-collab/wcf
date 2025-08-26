"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scenario = void 0;
const exports_1 = require("../../../../sobee/exports");
var Scenario;
(function (Scenario) {
    let Type;
    (function (Type) {
        Type[Type["ScenarioMatch"] = 0] = "ScenarioMatch";
        Type[Type["ScenarioRun"] = 1] = "ScenarioRun";
        Type[Type["ScenarioGainBall"] = 2] = "ScenarioGainBall";
        Type[Type["ScenarioGainOffscreenBall"] = 3] = "ScenarioGainOffscreenBall";
        Type[Type["ScenarioPass"] = 4] = "ScenarioPass";
        Type[Type["ScenarioLongPass"] = 5] = "ScenarioLongPass";
        Type[Type["ScenarioTackle"] = 6] = "ScenarioTackle";
        Type[Type["ScenarioSlideTackle"] = 7] = "ScenarioSlideTackle";
        Type[Type["ScenarioRunningTackle"] = 8] = "ScenarioRunningTackle";
        Type[Type["ScenarioRunningSlideTackle"] = 9] = "ScenarioRunningSlideTackle";
        Type[Type["ScenarioShoot"] = 10] = "ScenarioShoot";
        Type[Type["ScenarioShootGoalie"] = 11] = "ScenarioShootGoalie";
        Type[Type["ScenarioDribble"] = 12] = "ScenarioDribble";
        Type[Type["ScenarioPassThrough"] = 13] = "ScenarioPassThrough";
        Type[Type["ScenarioGetPass"] = 14] = "ScenarioGetPass";
        Type[Type["ScenarioGetLongPass"] = 15] = "ScenarioGetLongPass";
        Type[Type["ScenarioFreekick"] = 16] = "ScenarioFreekick";
        Type[Type["ScenarioOffside"] = 17] = "ScenarioOffside";
        Type[Type["ScenarioChat"] = 18] = "ScenarioChat";
        Type[Type["ScenarioMatch1v1"] = 19] = "ScenarioMatch1v1";
        Type[Type["ScenarioMatch2v2"] = 20] = "ScenarioMatch2v2";
        Type[Type["ScenarioMatch3v3"] = 21] = "ScenarioMatch3v3";
        Type[Type["ScenarioMatch6v6"] = 22] = "ScenarioMatch6v6";
        Type[Type["ScenarioMatch1v0"] = 23] = "ScenarioMatch1v0";
    })(Type = Scenario.Type || (Scenario.Type = {}));
    let State;
    (function (State) {
        let Type;
        (function (Type) {
            Type[Type["Starting"] = 0] = "Starting";
            Type[Type["Success"] = 1] = "Success";
            Type[Type["Fail"] = 2] = "Fail";
        })(Type = State.Type || (State.Type = {}));
        /** GClass284 */
        class Information extends exports_1.Messaging.Event.Base {
            constructor(Data) {
                super(Data);
                this.Content = Data;
            }
            static Deserialize(Data) {
                if (!(Data instanceof exports_1.Binary.Reader))
                    throw new Error('Deserialize requires a Binary.Reader instance');
                return new Information({
                    Status: Data.readInt32(),
                    Type: Data.readInt32(),
                    Continue: Data.readBoolean(),
                });
            }
            Serialize() {
                const Data = new exports_1.Binary.Writer();
                Data.writeInt32(this.Content.Status);
                Data.writeInt32(this.Content.Type);
                Data.writeBoolean(this.Content.Continue);
                const Header = new exports_1.Binary.Writer();
                Header.writeUInt32(Data.Content.byteLength + 2);
                Header.writeUInt16(Information.Id);
                return Buffer.concat([Header.Content, Data.Content]);
            }
        }
        Information.Id = 11337;
        Information.Event = (Data, Socket) => {
            // const Received = Class.Deserialize(Data)
            // // console.log(Class.Id, Received.Content)
            // if (Environment.Debug)
            //   Socket.write(new Events.Scenario.Control.Class({ Control: Events.Scenario.Control.Type.Next }).Serialize())
        };
        State.Information = Information;
    })(State = Scenario.State || (Scenario.State = {}));
    /** GClass179 */
    let Control;
    (function (Control) {
        let Type;
        (function (Type) {
            Type[Type["Start"] = 0] = "Start";
            Type[Type["Next"] = 1] = "Next";
            Type[Type["Previous"] = 2] = "Previous";
            Type[Type["Repeat"] = 3] = "Repeat";
        })(Type = Control.Type || (Control.Type = {}));
        class Information extends exports_1.Messaging.Event.Base {
            constructor(Data) {
                super(Data);
                this.Content = Data;
            }
            static Deserialize(Data) {
                if (!(Data instanceof exports_1.Binary.Reader))
                    throw new Error('Deserialize requires a Binary.Reader instance');
                return new Information({
                    Type: Data.readInt32(),
                });
            }
            Serialize() {
                const Data = new exports_1.Binary.Writer();
                Data.writeInt32(this.Content.Type);
                const Header = new exports_1.Binary.Writer();
                Header.writeUInt32(Data.Content.byteLength + 2);
                Header.writeUInt16(Information.Id);
                return Buffer.concat([Header.Content, Data.Content]);
            }
        }
        Information.Id = 34595;
        Information.Event = (Data, Socket) => {
            const Received = Information.Deserialize(Data);
            // console.log(Class.Id, Received.Content)
            if (exports_1.Environment.Debug) {
                const { Client, Room } = Socket;
                switch (Received.Content.Type) {
                    case Scenario.Control.Type.Start: {
                        Room.Clients.Broadcast(new exports_1.Messages.Scenario.State.Information({
                            Status: exports_1.Messages.Scenario.State.Type.Starting,
                            Type: Room.Information.Content.GClass170.Content.Scenario,
                            Continue: true,
                        }));
                    }
                }
            }
        };
        Control.Information = Information;
    })(Control = Scenario.Control || (Scenario.Control = {}));
})(Scenario || (exports.Scenario = Scenario = {}));
