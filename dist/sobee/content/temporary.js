"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temporary = void 0;
const exports_1 = require("../../sobee/exports");
const exports_2 = require("../../sobee/content/messaging/exports");
/** Namespace for temporary solutions before creating ideas. */
var Temporary;
(function (Temporary) {
    /** Temporary solutions for match related things. */
    let Match;
    (function (Match) {
        /**
         * Temporary solution for creating match information.
         *
         * Remove after creating proper solution.
         */
        function Information() {
            return exports_1.Messages.Match.Information.Default({
                Scenario: exports_1.Messages.Scenario.Type.ScenarioMatch,
                State: exports_1.Messages.Match.State.Type.Waiting,
                Positioning: exports_2.Types.Enums.Positioning.Kickoff,
                Teams: {
                    Home: { Color: 5, Name: { Full: 'Gecici Takim 1', Short: 'G1' }, Size: 11 },
                    Away: { Color: 1, Name: { Full: 'Gecici Takim 2', Short: 'G2' }, Size: 11 },
                },
            });
        }
        Match.Information = Information;
    })(Match = Temporary.Match || (Temporary.Match = {}));
    /** Temporary solutions for player related things. */
    let Player;
    (function (Player) {
        /**
         * Temporary solution for creating player.
         *
         * Remove after creating proper solution.
         */
        function Information(Input) {
            const { Entry, Sitting } = Input;
            return exports_1.Messages.Player.Information.Default({
                Match: { ID: 0 },
                Player: {
                    ID: Entry.value,
                    Name: `Oyuncu ${Entry.value}`,
                    Squad: Entry.toSquad(true),
                    Sitting,
                    Position: new exports_1.Binary.Types.Vector2(0, 0),
                },
            });
        }
        Player.Information = Information;
    })(Player = Temporary.Player || (Temporary.Player = {}));
})(Temporary || (exports.Temporary = Temporary = {}));
