export declare class Entry {
    private Value;
    constructor(Value?: number);
    get value(): number;
    set value(value: NumberRange<1, 22>);
    toSquad(Splited?: boolean): number;
    static inRange(Value: number): boolean;
}
