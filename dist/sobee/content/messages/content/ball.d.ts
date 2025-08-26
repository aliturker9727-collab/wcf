import { Binary, Messaging } from '../../../../sobee/exports';
import type { Types } from '../../../../sobee/content/messaging/exports';
export declare namespace Ball {
    /** GClass212 */
    class Update extends Messaging.Event.Base {
        static readonly Id = 11759;
        Content: {
            Position: Binary.Types.Vector3;
            Velocity: Binary.Types.Vector3;
        };
        constructor(Data: typeof Update.prototype.Content);
        static Deserialize(Data: Binary.Reader): Update;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass191 */
    class Shoot extends Messaging.Event.Base {
        static readonly Id = 23814;
        Content: {
            Animation: Types.Enums.Animation;
            Squad: number;
            Position: Binary.Types.Vector2;
            Direction: Binary.Types.Vector2;
            Velocity: Binary.Types.Vector3;
            Speed: number;
        };
        constructor(Data: typeof Shoot.prototype.Content);
        static Deserialize(Data: Binary.Reader): Shoot;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass195 */
    class Kickoff extends Messaging.Event.Base {
        static readonly Id = 15447;
        Content: {
            Animation: Types.Enums.Animation;
            Velocity: Binary.Types.Vector3;
        };
        constructor(Data: typeof Kickoff.prototype.Content);
        static Deserialize(Data: Binary.Reader): Kickoff;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    /** GClass282 */
    class Get extends Messaging.Event.Base {
        static readonly Id = 11312;
        Content: {
            Squad: number;
            Position: Binary.Types.Vector2;
            Direction: Binary.Types.Vector2;
            Speed: number;
        };
        constructor(Data: typeof Get.prototype.Content);
        static Deserialize(Data: Binary.Reader): Get;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
}
