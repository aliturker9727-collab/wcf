import { Binary, Messaging } from '../../../../sobee/exports';
/** GClass291 */
export declare class Latency extends Messaging.Event.Base {
    static readonly Id = 7777;
    Content: {
        Time: number;
    };
    constructor(Data: typeof Latency.prototype.Content);
    static Deserialize(Data: Binary.Reader): Latency;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
