import { Binary, Messaging } from '../../../../sobee/exports';
export declare class GClass167 extends Messaging.Event.Base {
    static readonly Id = 9384;
    Content: {
        Unk0: number;
        Unk1: number;
        Unk2: number;
        Unk3: number;
        Unk4: Binary.Types.Vector3;
        Unk5: number;
    };
    constructor(Data: typeof GClass167.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass167;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
    static Default(): GClass167;
}
