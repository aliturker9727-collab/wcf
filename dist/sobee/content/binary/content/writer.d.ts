import type { Binary } from '../../../../sobee/exports';
export declare class Writer {
    private Buffer;
    private Offset;
    get Content(): Buffer;
    constructor();
    writeBoolean(Value: boolean): void;
    writeBytes(Array: number[]): void;
    writeByteUnsafe(Data: Buffer): void;
    writeInt8(Value: number): void;
    writeInt16(Value: number): void;
    writeInt32(Value: number): void;
    writeInt64(Value: number): void;
    writeFloat(Value: number): void;
    writeFloatVector2(Value: Binary.Types.Vector2, Options?: {
        isDegress?: boolean;
    }): void;
    writeFloat64(Value: number): void;
    writeString(Value: string): void;
    writeUInt8(Value: number): void;
    writeUInt16(Value: number): void;
    writeUInt32(Value: number): void;
    writeUInt64(Value: number): void;
    writeGuid(Value: Buffer): void;
    writeVector2(Value: Binary.Types.Vector2): void;
    writeVector3(Value: Binary.Types.Vector3): void;
    writeVector4(Value: Binary.Types.Vector4): void;
    writeVersion(Value: Binary.Types.Version): void;
    writeStringArray(Value: string[]): void;
}
