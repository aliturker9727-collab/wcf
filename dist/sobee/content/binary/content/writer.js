"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
class Writer {
    get Content() {
        return this.Buffer.subarray(0, this.Offset);
    }
    constructor() {
        this.Offset = 0;
        this.Buffer = Buffer.alloc(5120); // 5 KB
    }
    writeBoolean(Value) {
        this.writeUInt8(Value ? 0x01 : 0x00);
    }
    writeBytes(Array) {
        this.writeUInt8(Array.length);
        for (const Value of Array)
            this.writeUInt8(Value);
    }
    writeByteUnsafe(Data) {
        this.Buffer.fill(Data, this.Offset, this.Offset + Data.byteLength);
        this.Offset += Data.byteLength;
    }
    writeInt8(Value) {
        this.Buffer.writeInt8(Value, this.Offset);
        this.Offset += 1;
    }
    writeInt16(Value) {
        this.Buffer.writeInt16LE(Value, this.Offset);
        this.Offset += 2;
    }
    writeInt32(Value) {
        this.Buffer.writeInt32LE(Value, this.Offset);
        this.Offset += 4;
    }
    writeInt64(Value) {
        this.Buffer.writeBigInt64LE(BigInt(Value), this.Offset);
        this.Offset += 8;
    }
    writeFloat(Value) {
        this.Buffer.writeFloatLE(Value, this.Offset);
        this.Offset += 4;
    }
    writeFloatVector2(Value, Options) {
        let Base = Math.atan2(Value.Y, Value.X);
        if (Options && Options.isDegress)
            Base = Base / Math.PI * 180.0;
        this.writeFloat(Base);
    }
    writeFloat64(Value) {
        const Array = new Float64Array(1);
        Array[0] = Value;
        this.writeByteUnsafe(Buffer.from(Array.buffer));
    }
    writeString(Value) {
        const Length = Buffer.byteLength(Value, 'utf-8');
        this.writeUInt8(Length);
        this.Buffer.write(Value, this.Offset, Length, 'utf-8');
        this.Offset += Length;
    }
    writeUInt8(Value) {
        this.Buffer.writeUInt8(Value, this.Offset);
        this.Offset += 1;
    }
    writeUInt16(Value) {
        this.Buffer.writeUInt16LE(Value, this.Offset);
        this.Offset += 2;
    }
    writeUInt32(Value) {
        this.Buffer.writeUInt32LE(Value, this.Offset);
        this.Offset += 4;
    }
    writeUInt64(Value) {
        this.Buffer.writeBigUInt64LE(BigInt(Value), this.Offset);
        this.Offset += 8;
    }
    writeGuid(Value) {
        if (Value.length !== 16)
            throw new Error('GUID must be 16 bytes long.');
        this.Buffer = Buffer.concat([this.Buffer, Value]);
        this.Offset += 16;
    }
    writeVector2(Value) {
        this.writeFloat(Value.X);
        this.writeFloat(Value.Y);
    }
    writeVector3(Value) {
        this.writeFloat(Value.X);
        this.writeFloat(Value.Y);
        this.writeFloat(Value.Z);
    }
    writeVector4(Value) {
        this.writeFloat(Value.X);
        this.writeFloat(Value.Y);
        this.writeFloat(Value.Z);
        this.writeFloat(Value.W);
    }
    writeVersion(Value) {
        this.writeInt32(Value[0]);
        this.writeInt32(Value[1]);
        this.writeInt32(Value[2]);
        this.writeInt32(Value[3]);
    }
    writeStringArray(Value) {
        this.writeUInt8(Value.length);
        Value.forEach(v => this.writeString(v));
    }
}
exports.Writer = Writer;
