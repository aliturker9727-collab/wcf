import { Binary, Messaging } from '../../../../sobee/exports';
import { Types } from '../../../../sobee/content/messaging/exports';
export declare class GClass166 extends Messaging.Event.Base {
    static readonly Id = 11279;
    Content: {
        Score: {
            Home: number;
            Away: number;
        };
        Match: {
            Time: number;
            Phase: Types.Enums.Phase;
        };
        Unk4: number;
        Unk5: number;
        Unk6: number;
        Unk7: number;
        Unk8: number;
        Unk9: number;
    };
    constructor(Data: typeof GClass166.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass166;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
    static Default(Input?: {
        Score: {
            Home: number;
            Away: number;
        };
        Match: {
            Time: number;
            Phase: Types.Enums.Phase;
        };
    }): GClass166;
}
