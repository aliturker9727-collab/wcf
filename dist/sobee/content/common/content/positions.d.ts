import { Binary } from '../../../../sobee/exports';
import { Types } from '../../../../sobee/content/messaging/exports';
export declare namespace Positions {
    interface Type {
        Home: {
            Position: Binary.Types.Vector2[];
            Direction: Binary.Types.Vector2[];
            Animation: Types.Enums.Animation[];
        };
        Away: {
            Position: Binary.Types.Vector2[];
            Direction: Binary.Types.Vector2[];
            Animation: Types.Enums.Animation[];
        };
    }
    const Kickoff: Type;
}
