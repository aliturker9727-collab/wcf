import { Binary, Messages, Messaging } from '../../../../sobee/exports';
import type { Types } from '../../../../sobee/content/messaging/exports';
export declare namespace Match {
    /** GClass240 */
    class Information extends Messaging.Event.Base {
        static readonly Id = 11328;
        Content: {
            Actor: {
                Camera: number;
                Actioner: number;
                Mark: number;
            };
            Teams: {
                Home: {
                    Player: Messages.Player.Information[];
                    Spectator: Messages.Player.Information[];
                };
                Away: {
                    Player: Messages.Player.Information[];
                    Spectator: Messages.Player.Information[];
                };
            };
            Ball: {
                Position: Binary.Types.Vector3;
                Velocity: Binary.Types.Vector3;
            };
            State: Match.State.Type;
            Positioning: Types.Enums.Positioning;
            GClass166: Messages.GClass166;
            GClass170: Messages.GClass170;
            GClass167: Messages.GClass167;
        };
        constructor(Data: typeof Information.prototype.Content);
        static Deserialize(Data: Binary.Reader): Information;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
        static Default(Input: {
            Scenario: Messages.Scenario.Type;
            State: Messages.Match.State.Type;
            Positioning: Types.Enums.Positioning;
            Teams: {
                Home: {
                    Color: number;
                    Size: number;
                    Name: {
                        Full: string;
                        Short: string;
                    };
                };
                Away: {
                    Color: number;
                    Size: number;
                    Name: {
                        Full: string;
                        Short: string;
                    };
                };
            };
        }): Information;
    }
    namespace UI {
        enum Type {
            Goal = 0,
            OwnGoal = 1,
            Offside = 2,
            Corner = 3,
            Freekick = 4,
            Penalty = 5,
            YellowCard = 6,
            YellowToRedCard = 7,
            RedCard = 8,
            MatchWelcome = 9,
            PlayerJoined = 10,
            PlayerLeft = 11
        }
        /** GClass162 */
        class Notice extends Messaging.Event.Base {
            static readonly Id = 16032;
            Content: {
                Label: string;
                Type: Match.UI.Type;
                Squad: number;
                Timing: number;
            };
            constructor(Data: typeof Notice.prototype.Content);
            static Deserialize(Data: Binary.Reader): Notice;
            Serialize(): Buffer;
            static Event: Messaging.Emitter.Listener;
        }
    }
    namespace Positioning {
        /** GClass281 - need 11!! */
        class Cutscene extends Messaging.Event.Base {
            static readonly Id = 26782;
            Content: {
                Type: Types.Enums.Positioning;
                Positioning: {
                    Home: {
                        Position: Binary.Types.Vector2[];
                        Direction: Binary.Types.Vector2[];
                        Animation: Types.Enums.Animation[];
                    };
                    Away: {
                        Position: Binary.Types.Vector2[];
                        Direction: Binary.Types.Vector2[];
                        Animation: Types.Enums.Animation[];
                    };
                };
            };
            constructor(Data: typeof Cutscene.prototype.Content);
            static Deserialize(Data: Buffer | Binary.Reader): Cutscene;
            Serialize(): Buffer;
            static Event: Messaging.Emitter.Listener;
        }
    }
    namespace State {
        enum Type {
            Waiting = 0,
            Positioning = 1,
            Freekick = 2,
            Running = 3,
            Paused = 4,
            Finished = 5
        }
    }
}
