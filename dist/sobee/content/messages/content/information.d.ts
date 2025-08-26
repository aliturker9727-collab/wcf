import { Binary, Messaging } from '../../../../sobee/exports';
import { Entry } from '../../../../sobee/content/common/exports';
/** GClass250 */
export declare class Information extends Messaging.Event.Base {
    static readonly Id = 27968;
    Content: {
        Version: Binary.Types.Version;
        Unknown: number;
        Password: string;
        Cpu: string;
        Gpu: string;
        Ram: number;
        Software: string;
        Mac: string;
        Entry: Entry;
        Session: string;
        Autorun: boolean;
    };
    constructor(Data: typeof Information.prototype.Content);
    static Deserialize(Data: Binary.Reader): Information;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
}
