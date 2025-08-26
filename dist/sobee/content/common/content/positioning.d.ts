import type { Socket } from '../../../../sobee/content/network/exports';
import { Types } from '../../../../sobee/content/messaging/exports';
import { Positions } from '../../../../sobee/content/common/exports';
export declare class Positioning {
    static Position(Type: Types.Enums.Positioning): Positions.Type | undefined;
    static Change(Room: Socket.Room.Base, Type: Types.Enums.Positioning, Cutscene?: boolean): import("tslog").ILogObjMeta | undefined;
}
