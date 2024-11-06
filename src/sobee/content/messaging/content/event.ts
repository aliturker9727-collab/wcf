import { Binary, type Messaging } from '@/sobee/exports'

export namespace Event {
  export class Base {
    static readonly Id: number
    public Content: Record<string, any>

    constructor(Data: typeof this.Content) {
      this.Content = Data
    }

    public static Deserialize(Data: Binary.Reader): Base {
      throw new Error('Deserialization not implemented')
    }

    public Serialize(): Buffer {
      throw new Error('Serialization not implemented')
    }

    public static Event: Messaging.Emitter.Listener = () => {
      throw new Error('Event not implemented')
    }
  }

  export class Parser {
    public readonly Id: number
    public readonly Size: number
    public readonly Content: Binary.Reader

    constructor(Data: Buffer) {
      this.Size = Data.readUInt32LE(0)
      this.Id = Data.readUInt16LE(4)
      this.Content = new Binary.Reader(Data.subarray(6, this.Size + 6))
    }
  }
}
