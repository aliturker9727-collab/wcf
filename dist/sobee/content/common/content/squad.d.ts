import { Messaging } from '../../../../sobee/content/messaging';
export declare class Squad {
    private Value;
    constructor(Value?: number);
    get value(): number;
    set value(value: NumberRange<0, 21>);
    toEntry(Splited?: boolean): number;
    static inRange(Team: Messaging.Types.Team.Players, Value: number): boolean;
}
