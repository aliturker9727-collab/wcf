import type { Binary } from '@/sobee/exports'

export class Writer {
  private Buffer: Buffer
  private Offset: number = 0

  public get Content(): Buffer {
    return this.Buffer.subarray(0, this.Offset)
  }

  constructor() {
    this.Buffer = Buffer.alloc(5120) // 5 KB
  }

  writeBoolean(Value: boolean): void {
    this.writeUInt8(Value ? 0x01 : 0x00)
  }

  writeBytes(Array: number[]): void {
    this.writeUInt8(Array.length)

    for (const Value of Array)
      this.writeUInt8(Value)
  }

  writeByteUnsafe(Data: Buffer): void {
    this.Buffer.fill(Data, this.Offset, this.Offset + Data.byteLength)
    this.Offset += Data.byteLength
  }

  writeInt8(Value: number): void {
    this.Buffer.writeInt8(Value, this.Offset)
    this.Offset += 1
  }

  writeInt16(Value: number): void {
    this.Buffer.writeInt16LE(Value, this.Offset)
    this.Offset += 2
  }

  writeInt32(Value: number): void {
    this.Buffer.writeInt32LE(Value, this.Offset)
    this.Offset += 4
  }

  writeInt64(Value: number): void {
    this.Buffer.writeBigInt64LE(BigInt(Value), this.Offset)
    this.Offset += 8
  }

  writeFloat(Value: number): void {
    this.Buffer.writeFloatLE(Value, this.Offset)
    this.Offset += 4
  }

  writeFloatVector2(Value: Binary.Types.Vector2, Options?: { isDegress?: boolean }): void {
    let Base = Math.atan2(Value.Y, Value.X)

    if (Options && Options.isDegress)
      Base = Base / Math.PI * 180.0

    this.writeFloat(Base)
  }

  writeFloat64(Value: number): void {
    const Array = new Float64Array(1)
    Array[0] = Value
    this.writeByteUnsafe(Buffer.from(Array.buffer))
  }

  writeString(Value: string): void {
    const Length = Buffer.byteLength(Value, 'utf-8')
    this.writeUInt8(Length)

    this.Buffer.write(Value, this.Offset, Length, 'utf-8')
    this.Offset += Length
  }

  writeUInt8(Value: number): void {
    this.Buffer.writeUInt8(Value, this.Offset)
    this.Offset += 1
  }

  writeUInt16(Value: number): void {
    this.Buffer.writeUInt16LE(Value, this.Offset)
    this.Offset += 2
  }

  writeUInt32(Value: number): void {
    this.Buffer.writeUInt32LE(Value, this.Offset)
    this.Offset += 4
  }

  writeUInt64(Value: number): void {
    this.Buffer.writeBigUInt64LE(BigInt(Value), this.Offset)
    this.Offset += 8
  }

  writeGuid(Value: Buffer): void {
    if (Value.length !== 16)
      throw new Error('GUID must be 16 bytes long.')

    this.Buffer = Buffer.concat([this.Buffer, Value])
    this.Offset += 16
  }

  writeVector2(Value: Binary.Types.Vector2): void {
    this.writeFloat(Value.X)
    this.writeFloat(Value.Y)
  }

  writeVector3(Value: Binary.Types.Vector3): void {
    this.writeFloat(Value.X)
    this.writeFloat(Value.Y)
    this.writeFloat(Value.Z)
  }

  writeVector4(Value: Binary.Types.Vector4): void {
    this.writeFloat(Value.X)
    this.writeFloat(Value.Y)
    this.writeFloat(Value.Z)
    this.writeFloat(Value.W)
  }

  writeVersion(Value: Binary.Types.Version): void {
    this.writeInt32(Value[0])
    this.writeInt32(Value[1])
    this.writeInt32(Value[2])
    this.writeInt32(Value[3])
  }

  writeStringArray(Value: string[]): void {
    this.writeUInt8(Value.length)
    Value.forEach(v => this.writeString(v))
  }
}
