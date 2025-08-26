import { Binary, Messaging } from '../../../../sobee/exports';
export declare class GClass236 extends Messaging.Event.Base {
    static readonly Id = 3905;
    Content: {
        Strength: number;
        Degrees: Binary.Types.Vector2;
    };
    constructor(Data: typeof GClass236.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass236;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
