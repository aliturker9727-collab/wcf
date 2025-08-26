export declare class Vector2 {
    X: number;
    Y: number;
    constructor(X: number, Y: number);
    Add(input: Vector2): void;
    Subtract(input: Vector2): void;
    Multiply(input: Vector2): void;
    Divide(input: Vector2): void;
    Equals(input: Vector2): boolean;
    Normalize(): void;
    Truncate(max: number): void;
    Distance(destination: Vector2): number;
    Round(): void;
    Copy(): Vector2;
    get length(): number;
    Flush(): void;
}
