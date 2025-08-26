import { Binary, Messaging } from '../../../../sobee/exports';
import { Types } from '../../../../sobee/content/messaging/exports';
export declare class GClass238 extends Messaging.Event.Base {
    static readonly Id = 18455;
    Content: {
        Strength: number;
        Direction: Binary.Types.Vector2;
        Type: Types.Enums.HitSubType;
    };
    constructor(Data: typeof GClass238.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass238;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
