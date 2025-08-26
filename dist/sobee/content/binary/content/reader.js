"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
const exports_1 = require("../../../../sobee/exports");
class Reader {
    constructor(Buffer) {
        this.Offset = 0;
        this.Buffer = Buffer;
    }
    /** [method 1] */
    readBoolean() {
        const Value = this.Buffer.readUint8(this.Offset) === 0x01;
        this.Offset += 1;
        return Value;
    }
    /** [method 3] method_5 same */
    readBytes() {
        const Count = this.readInt32();
        const Values = [];
        for (let i = 0; i < Count; i++)
            Values.push(this.readInt8());
        return Values;
    }
    readInt8() {
        const Value = this.Buffer.readInt8(this.Offset);
        this.Offset += 1;
        return Value;
    }
    /** [method 8] */
    readInt16() {
        const Value = this.Buffer.readInt16LE(this.Offset);
        this.Offset += 2;
        return Value;
    }
    /** [method 9] */
    readInt32() {
        const Value = this.Buffer.readInt32LE(this.Offset);
        this.Offset += 4;
        return Value;
    }
    /** [method 10] */
    readInt64() {
        const Value = Number(this.Buffer.readBigInt64LE(this.Offset));
        this.Offset += 8;
        return Value;
    }
    /** [method 12] */
    readFloat() {
        const Value = this.Buffer.readFloatLE(this.Offset);
        this.Offset += 4;
        return Value;
    }
    readFloatVector2(Options) {
        let Value = this.readFloat();
        if (Options && Options.isDegress)
            Value = Value / 180.0 * Math.PI;
        return new exports_1.Binary.Types.Vector2(Math.cos(Value), Math.sin(Value));
    }
    readFloat64() {
        const Data = this.Buffer.subarray(this.Offset, this.Offset + 8);
        const Value = new DataView(Data.buffer).getFloat64(0, true);
        this.Offset += 8;
        return Value;
    }
    /** [method 13] */
    readFloatMaybe() {
        if (!this.readBoolean())
            return this.readFloat();
        else
            return null;
    }
    /** [method 14] */
    readString() {
        const Count = this.readInt8();
        if (Count > 0)
            return this.Buffer.subarray(this.Offset, this.Offset += Count).toString();
        else
            return '';
    }
    readUInt8() {
        const Value = this.Buffer.readUInt8(this.Offset);
        this.Offset += 1;
        return Value;
    }
    /** [method 15] */
    readUInt16() {
        const Value = this.Buffer.readUInt16LE(this.Offset);
        this.Offset += 2;
        return Value;
    }
    /** [method 16] */
    readUInt32() {
        const Value = this.Buffer.readUInt32LE(this.Offset);
        this.Offset += 4;
        return Value;
    }
    /** [method 17] */
    readUInt64() {
        const Value = Number(this.Buffer.readBigUInt64LE(this.Offset));
        this.Offset += 8;
        return Value;
    }
    /** [method 18] */
    readGuid() {
        const Value = this.Buffer.subarray(this.Offset, 16);
        this.Offset += 16;
        return Value;
    }
    /** [method 19] */
    readVector2() {
        return new exports_1.Binary.Types.Vector2(this.readFloat(), this.readFloat());
    }
    /** [method 20] */
    readVector3() {
        return new exports_1.Binary.Types.Vector3(this.readFloat(), this.readFloat(), this.readFloat());
    }
    /** [method 21] */
    readVector4() {
        return new exports_1.Binary.Types.Vector4(this.readFloat(), this.readFloat(), this.readFloat(), this.readFloat());
    }
    /** [method 24] */
    readVersion() {
        return [this.readInt32(), this.readInt32(), this.readInt32(), this.readInt32()];
    }
    readArrayUnsafe(Length, Callback) {
        const Array = [];
        for (let i = 0; i < Length; i++)
            Array.push(Callback());
        return Array;
    }
    readStringArray() {
        const Count = this.readUInt8();
        const Array = [];
        for (let i = 0; i < Count; i++)
            Array.push(this.readString());
        return Array;
    }
}
exports.Reader = Reader;
