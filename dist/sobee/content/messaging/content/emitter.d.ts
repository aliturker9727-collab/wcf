import { TypedEmitter } from 'tiny-typed-emitter';
import type { Binary } from '../../../../sobee/exports';
import type { Event } from '../../../../sobee/content/messaging/exports';
import type { Socket } from '../../../../sobee/content/network/exports';
export declare namespace Emitter {
    type Listener = (Data: Binary.Reader, Socket: {
        Client: Socket.Client.Base;
        Room: Socket.Room.Base;
    }) => void;
    class Base extends TypedEmitter<{
        [Id: number]: Listener;
    }> {
        constructor(Messages: typeof Event.Base[]);
    }
}
