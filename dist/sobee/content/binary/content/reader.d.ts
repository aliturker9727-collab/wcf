import { Binary } from '../../../../sobee/exports';
export declare class Reader {
    private Buffer;
    private Offset;
    constructor(Buffer: Buffer);
    /** [method 1] */
    readBoolean(): boolean;
    /** [method 3] method_5 same */
    readBytes(): number[];
    readInt8(): number;
    /** [method 8] */
    readInt16(): number;
    /** [method 9] */
    readInt32(): number;
    /** [method 10] */
    readInt64(): number;
    /** [method 12] */
    readFloat(): number;
    readFloatVector2(Options?: {
        isDegress?: boolean;
    }): Binary.Types.Vector2;
    readFloat64(): number;
    /** [method 13] */
    readFloatMaybe(): number | null;
    /** [method 14] */
    readString(): string;
    readUInt8(): number;
    /** [method 15] */
    readUInt16(): number;
    /** [method 16] */
    readUInt32(): number;
    /** [method 17] */
    readUInt64(): number;
    /** [method 18] */
    readGuid(): Buffer;
    /** [method 19] */
    readVector2(): Binary.Types.Vector2;
    /** [method 20] */
    readVector3(): Binary.Types.Vector3;
    /** [method 21] */
    readVector4(): Binary.Types.Vector4;
    /** [method 24] */
    readVersion(): Binary.Types.Version;
    readArrayUnsafe<T>(Length: number, Callback: () => T): T[];
    readStringArray(): string[];
}
