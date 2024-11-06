import { TypedEmitter } from 'tiny-typed-emitter'
import type { Binary } from '@/sobee/exports'
import type { Event } from '@/sobee/content/messaging/exports'
import type { Socket } from '@/sobee/content/network/exports'

export namespace Emitter {
  export type Listener = (
    Data: Binary.Reader,
    Socket: {
      Client: Socket.Client.Base
      Room: Socket.Room.Base
    },
  ) => void

  export class Base extends TypedEmitter<{ [Id: number]: Listener }> {
    constructor(Messages: typeof Event.Base[]) {
      super()

      Messages.forEach((Message) => {
        super.on(Message.Id, (Data, Socket) => {
          try {
            Message.Event(Data, Socket)
          }
          catch (error) {
            console.error(`Error on handling event for ${Message.Id}:`, error)
          }
        })
      })
    }
  }
}
