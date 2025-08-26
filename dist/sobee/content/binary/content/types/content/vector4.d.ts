export declare class Vector4 {
    X: number;
    Y: number;
    Z: number;
    W: number;
    constructor(X: number, Y: number, Z: number, W: number);
    Add(input: Vector4): void;
    Subtract(input: Vector4): void;
    Multiply(input: Vector4): void;
    Divide(input: Vector4): void;
    Equals(input: Vector4): boolean;
    Normalize(): void;
    Truncate(max: number): void;
    Distance(destination: Vector4): number;
    Round(): void;
    Copy(): Vector4;
    get length(): number;
    Flush(): void;
}
