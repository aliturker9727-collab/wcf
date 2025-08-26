import { Binary, Messaging } from '../../../../sobee/exports';
export declare class GClass237 extends Messaging.Event.Base {
    static readonly Id = 42398;
    Content: {
        Velocity: Binary.Types.Vector2;
        Sprint: boolean;
    };
    constructor(Data: typeof GClass237.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass237;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
