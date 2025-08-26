export declare class Vector3 {
    X: number;
    Y: number;
    Z: number;
    constructor(X: number, Y: number, Z: number);
    Add(input: Vector3): void;
    Subtract(input: Vector3): void;
    Multiply(input: Vector3): void;
    Divide(input: Vector3): void;
    Equals(input: Vector3): boolean;
    Normalize(): void;
    Truncate(max: number): void;
    Distance(destination: Vector3): number;
    Round(): void;
    Copy(): Vector3;
    get length(): number;
    Flush(): void;
}
