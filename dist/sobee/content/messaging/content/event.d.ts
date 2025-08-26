import { Binary, type Messaging } from '../../../../sobee/exports';
export declare namespace Event {
    class Base {
        static readonly Id: number;
        Content: Record<string, any>;
        constructor(Data: typeof this.Content);
        static Deserialize(Data: Binary.Reader): Base;
        Serialize(): Buffer;
        static Event: Messaging.Emitter.Listener;
    }
    class Parser {
        readonly Id: number;
        readonly Size: number;
        readonly Content: Binary.Reader;
        constructor(Data: Buffer);
    }
}
