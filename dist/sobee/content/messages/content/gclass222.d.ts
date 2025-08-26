import { Binary, Messaging } from '../../../../sobee/exports';
import type { Types } from '../../../../sobee/content/messaging/exports';
export declare class GClass222 extends Messaging.Event.Base {
    static readonly Id = 10059;
    Content: {
        Squad: number;
        Animation: Types.Enums.Animation;
        Bool: boolean;
    };
    constructor(Data: typeof GClass222.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass222;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
