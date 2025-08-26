import { Binary } from '../../../../sobee/exports';
import type { Types } from '../../../../sobee/content/messaging/exports';
import { Messaging } from '../../../../sobee/content/messaging';
export declare namespace Widget {
    /** GClass223 */
    class Decline extends Messaging.Event.Base {
        static readonly Id = 11408;
        Content: {
            Reason: Types.Enums.Decline;
        };
        constructor(Data: typeof Decline.prototype.Content);
        static Deserialize(Data: Binary.Reader): Decline;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
}
