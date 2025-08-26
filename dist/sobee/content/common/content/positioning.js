"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Positioning = void 0;
const messages_1 = require("../../../../sobee/content/messages");
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
const exports_3 = require("../../../../sobee/content/common/exports");
class Positioning {
    static Position(Type) {
        switch (Type) {
            case exports_2.Types.Enums.Positioning.Kickoff:
                return exports_3.Positions.Kickoff;
            default:
                return undefined;
        }
    }
    static Change(Room, Type, Cutscene) {
        const Positioning = this.Position(Type);
        if (Positioning) {
            Room.Information.Content.State = messages_1.Messages.Match.State.Type.Positioning;
            Room.Information.Content.Positioning = Type;
            Room.Information.Content.Teams.Home.Player.forEach((Player) => {
                Player.Content.Position = Positioning.Home.Position[Player.Content.Squad].Copy();
                Player.Content.Direction = Positioning.Home.Direction[Player.Content.Squad].Copy();
            });
            Room.Information.Content.Teams.Away.Player.forEach((Player) => {
                Player.Content.Position = Positioning.Away.Position[Player.Content.Squad].Copy();
                Player.Content.Direction = Positioning.Away.Direction[Player.Content.Squad].Copy();
            });
            // TODO: If is not a cutscene?
            if (Cutscene)
                Room.Clients.Broadcast(new messages_1.Messages.Match.Positioning.Cutscene({ Type, Positioning }));
            else
                exports_1.Log.fatal(`WARNING: Non-Cutscene feature not implemented for positioning change`);
        }
        else {
            return exports_1.Log.fatal(`Room [${Room.Id}]: Selected positioning ${exports_2.Types.Enums.Positioning[Type]} not found.`);
        }
    }
}
exports.Positioning = Positioning;
