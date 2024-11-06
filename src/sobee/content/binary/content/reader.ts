import { Binary } from '@/sobee/exports'

export class Reader {
  private Buffer: Buffer
  private Offset: number = 0

  constructor(Buffer: Buffer) {
    this.Buffer = Buffer
  }

  /** [method 1] */
  readBoolean(): boolean {
    const Value = this.Buffer.readUint8(this.Offset) === 0x01
    this.Offset += 1
    return Value
  }

  /** [method 3] method_5 same */
  readBytes(): number[] {
    const Count = this.readInt32()
    const Values: number[] = []

    for (let i = 0; i < Count; i++)
      Values.push(this.readInt8())

    return Values
  }

  readInt8(): number {
    const Value = this.Buffer.readInt8(this.Offset)
    this.Offset += 1
    return Value
  }

  /** [method 8] */
  readInt16(): number {
    const Value = this.Buffer.readInt16LE(this.Offset)
    this.Offset += 2
    return Value
  }

  /** [method 9] */
  readInt32(): number {
    const Value = this.Buffer.readInt32LE(this.Offset)
    this.Offset += 4
    return Value
  }

  /** [method 10] */
  readInt64(): number {
    const Value = Number(this.Buffer.readBigInt64LE(this.Offset))
    this.Offset += 8
    return Value
  }

  /** [method 12] */
  readFloat(): number {
    const Value = this.Buffer.readFloatLE(this.Offset)
    this.Offset += 4
    return Value
  }

  readFloatVector2(Options?: { isDegress?: boolean }): Binary.Types.Vector2 {
    let Value = this.readFloat()

    if (Options && Options.isDegress)
      Value = Value / 180.0 * Math.PI

    return new Binary.Types.Vector2(Math.cos(Value), Math.sin(Value))
  }

  readFloat64(): number {
    const Data = this.Buffer.subarray(this.Offset, this.Offset + 8)
    const Value = new DataView(Data.buffer).getFloat64(0, true)
    this.Offset += 8
    return Value
  }

  /** [method 13] */
  readFloatMaybe(): number | null {
    if (!this.readBoolean())
      return this.readFloat()
    else
      return null
  }

  /** [method 14] */
  readString(): string {
    const Count = this.readInt8()
    if (Count > 0)
      return this.Buffer.subarray(this.Offset, this.Offset += Count).toString()
    else
      return ''
  }

  readUInt8(): number {
    const Value = this.Buffer.readUInt8(this.Offset)
    this.Offset += 1
    return Value
  }

  /** [method 15] */
  readUInt16(): number {
    const Value = this.Buffer.readUInt16LE(this.Offset)
    this.Offset += 2
    return Value
  }

  /** [method 16] */
  readUInt32(): number {
    const Value = this.Buffer.readUInt32LE(this.Offset)
    this.Offset += 4
    return Value
  }

  /** [method 17] */
  readUInt64(): number {
    const Value = Number(this.Buffer.readBigUInt64LE(this.Offset))
    this.Offset += 8
    return Value
  }

  /** [method 18] */
  readGuid(): Buffer {
    const Value = this.Buffer.subarray(this.Offset, 16)
    this.Offset += 16
    return Value
  }

  /** [method 19] */
  readVector2(): Binary.Types.Vector2 {
    return new Binary.Types.Vector2(
      this.readFloat(),
      this.readFloat(),
    )
  }

  /** [method 20] */
  readVector3(): Binary.Types.Vector3 {
    return new Binary.Types.Vector3(
      this.readFloat(),
      this.readFloat(),
      this.readFloat(),
    )
  }

  /** [method 21] */
  readVector4(): Binary.Types.Vector4 {
    return new Binary.Types.Vector4(
      this.readFloat(),
      this.readFloat(),
      this.readFloat(),
      this.readFloat(),
    )
  }

  /** [method 24] */
  readVersion(): Binary.Types.Version {
    return [this.readInt32(), this.readInt32(), this.readInt32(), this.readInt32()]
  }

  readArrayUnsafe<T>(Length: number, Callback: () => T): T[] {
    const Array: T[] = []
    for (let i = 0; i < Length; i++)
      Array.push(Callback())
    return Array
  }

  readStringArray(): string[] {
    const Count = this.readUInt8()
    const Array: string[] = []
    for (let i = 0; i < Count; i++)
      Array.push(this.readString())
    return Array
  }
}
