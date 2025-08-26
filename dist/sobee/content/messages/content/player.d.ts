import { Binary, Messages, Messaging } from '../../../../sobee/exports';
import { Types } from '../../../../sobee/content/messaging/exports';
export declare namespace Player {
    /** GClass161 */
    class Information extends Messaging.Event.Base {
        static readonly Id = 13968;
        Content: {
            MatchID: number;
            PlayerID: number;
            PlayerName: string;
            Stamina: number;
            Sitting: Types.Enums.Sitting;
            Squad: number;
            Unk1: string;
            Moving: boolean;
            Appearance: Messages.Player.Appearance;
            Position: Binary.Types.Vector2;
            Velocity: Binary.Types.Vector3;
            Direction: Binary.Types.Vector2;
            Invite: boolean;
            Card: Types.Enums.Card;
            LeagueID: number;
            LeagueSort: number;
            LeagueGroupID: number;
            EloPoint: number;
            Skill: [string[], string[]];
            GZipBool: boolean;
            XmlCode: string;
        };
        constructor(Data: typeof Information.prototype.Content);
        static Deserialize(Data: Binary.Reader): Information;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
        static Default(Input?: {
            Match: {
                ID: number;
            };
            Player: {
                ID: number;
                Name: string;
                Squad: number;
                Sitting: Types.Enums.Sitting;
                Position: Binary.Types.Vector2;
            };
        }): Information;
    }
    /** GClass168 */
    class Appearance extends Messaging.Event.Base {
        static readonly Id = 15682;
        Content: {
            Costume: number;
            Body: number;
            Head: Binary.Types.Vector3;
            Neck: {
                Width: number;
                Height: number;
            };
            Shoulder: {
                Width: number;
                Thickness: number;
            };
            Arm: {
                Length: number;
                Width: number;
            };
            Hand: number;
            Abdomen: number;
            Leg: {
                Width: number;
            };
            Calf: {
                Width: number;
            };
            Feet: number;
            Skin: number;
            Cheek: [number, number];
            Chin: number;
            Ear: [number, number];
            Eyebrow: [number, number, number, number];
            Eyes: [number, number, number, number, number, number];
            Face: number;
            Jaw: [number, number, number];
            Lip: [number, number];
            Mouth: [number, number];
            Nose: [number, number, number, number, number, number];
            Unk1: number;
            Unk2: number;
            Unk3: number;
            Unk4: number;
            Unk5: number;
            Unk6: number;
            Unk7: number;
            Unk8: number;
            Unk9: number;
            Unk10: number;
            Unk11: number;
            Unk12: number;
            Unk13: number;
            Unk14: number;
        };
        constructor(Data: typeof Appearance.prototype.Content);
        static Deserialize(Data: Binary.Reader): Appearance;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass209 */
    class Move extends Messaging.Event.Base {
        static readonly Id = 22801;
        Content: {
            Squad: number;
            Position: Binary.Types.Vector2;
            Velocity: Binary.Types.Vector2;
            Sprint: boolean;
            Alerted: boolean;
            Stamina: number;
        };
        constructor(Data: typeof Move.prototype.Content);
        static Deserialize(Data: Binary.Reader): Move;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass247 */
    class Stop extends Messaging.Event.Base {
        static readonly Id = 11600;
        Content: {
            Squad: number;
            Position: Binary.Types.Vector2;
            Velocity: Binary.Types.Vector2;
            Alerted: boolean;
            Stamina: number;
        };
        constructor(Data: typeof Stop.prototype.Content);
        static Deserialize(Data: Binary.Reader): Stop;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass243 */
    class Update extends Messaging.Event.Base {
        static readonly Id = 11089;
        Content: {
            Player: Messages.Player.Information;
        };
        constructor(Data: typeof Update.prototype.Content);
        static Deserialize(Data: Binary.Reader): Update;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass239 */
    class Joined extends Messaging.Event.Base {
        static readonly Id = 15760;
        Content: {
            Player: Messages.Player.Information;
        };
        constructor(Data: typeof Joined.prototype.Content);
        static Deserialize(Data: Binary.Reader): Joined;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
}
