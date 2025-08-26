import { Binary, Messaging } from '../../../../sobee/exports';
export declare class GClass260 extends Messaging.Event.Base {
    static readonly Id = 10804;
    Content: Record<string, never>;
    constructor(Data: typeof GClass260.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass260;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
