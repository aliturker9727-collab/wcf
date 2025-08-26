import { Binary, Messaging } from '../../../../sobee/exports';
export declare namespace Scenario {
    enum Type {
        ScenarioMatch = 0,
        ScenarioRun = 1,
        ScenarioGainBall = 2,
        ScenarioGainOffscreenBall = 3,
        ScenarioPass = 4,
        ScenarioLongPass = 5,
        ScenarioTackle = 6,
        ScenarioSlideTackle = 7,
        ScenarioRunningTackle = 8,
        ScenarioRunningSlideTackle = 9,
        ScenarioShoot = 10,
        ScenarioShootGoalie = 11,
        ScenarioDribble = 12,
        ScenarioPassThrough = 13,
        ScenarioGetPass = 14,
        ScenarioGetLongPass = 15,
        ScenarioFreekick = 16,
        ScenarioOffside = 17,
        ScenarioChat = 18,
        ScenarioMatch1v1 = 19,
        ScenarioMatch2v2 = 20,
        ScenarioMatch3v3 = 21,
        ScenarioMatch6v6 = 22,
        ScenarioMatch1v0 = 23
    }
    namespace State {
        enum Type {
            Starting = 0,
            Success = 1,
            Fail = 2
        }
        /** GClass284 */
        class Information extends Messaging.Event.Base {
            static readonly Id = 11337;
            Content: {
                Status: Scenario.State.Type;
                Type: Scenario.Type;
                Continue: boolean;
            };
            constructor(Data: typeof Information.prototype.Content);
            static Deserialize(Data: Binary.Reader): Information;
            Serialize(): Buffer;
            static Event: Messaging.Emitter.Listener;
        }
    }
    /** GClass179 */
    namespace Control {
        enum Type {
            Start = 0,
            Next = 1,
            Previous = 2,
            Repeat = 3
        }
        class Information extends Messaging.Event.Base {
            static readonly Id = 34595;
            Content: {
                Type: Scenario.Control.Type;
            };
            constructor(Data: typeof Information.prototype.Content);
            static Deserialize(Data: Binary.Reader): Information;
            Serialize(): Buffer;
            static Event: Messaging.Emitter.Listener;
        }
    }
}
