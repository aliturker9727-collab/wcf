import { Binary, Messaging } from '../../../../sobee/exports';
export declare namespace Chat {
    namespace System {
        enum Type {
            General = 0,
            Important = 1,
            SCT = 2,
            Anounce = 3,
            Log = 4
        }
        /** GClass278 */
        class Send extends Messaging.Event.Base {
            static readonly Id = 39592;
            Content: {
                Text: string;
                Type: Type;
            };
            constructor(Data: typeof Send.prototype.Content);
            static Deserialize(Data: Binary.Reader): Send;
            Serialize(): Buffer;
            static Event: Messaging.Emitter.Listener;
        }
    }
}
