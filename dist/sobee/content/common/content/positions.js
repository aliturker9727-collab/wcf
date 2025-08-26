"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Positions = void 0;
const exports_1 = require("../../../../sobee/exports");
const exports_2 = require("../../../../sobee/content/messaging/exports");
var Positions;
(function (Positions) {
    Positions.Kickoff = {
        // TODO: 8.position need 0 for kickoff
        Home: {
            Position: [
                new exports_1.Binary.Types.Vector2(-4160, 20), // Goalkeeper
                new exports_1.Binary.Types.Vector2(-3140, -1900), // Left Full-back
                new exports_1.Binary.Types.Vector2(-3140, 1860), // Right Full-back
                new exports_1.Binary.Types.Vector2(-3300, -20), // Left Center-back
                new exports_1.Binary.Types.Vector2(-1960, 960), // Right Center-back
                new exports_1.Binary.Types.Vector2(-1940, -720), // Left Midfielder
                new exports_1.Binary.Types.Vector2(-1140, -2360), // Right Midfielder
                new exports_1.Binary.Types.Vector2(-1040, 80), // Center Midfielder 1
                new exports_1.Binary.Types.Vector2(-140, -200), // Center Midfielder 2
                new exports_1.Binary.Types.Vector2(-480, 1780), // Left Forward
                new exports_1.Binary.Types.Vector2(-180, 260), // Right Forward
            ],
            Direction: Array.from({ length: 11 }).fill(new exports_1.Binary.Types.Vector2(1, 0)),
            Animation: Array.from({ length: 11 }).fill(exports_2.Types.Enums.Animation.WaitIdle1),
        },
        Away: {
            Position: [
                new exports_1.Binary.Types.Vector2(4200, 20), // Goalkeeper
                new exports_1.Binary.Types.Vector2(3140, 1900), // Left Full-back
                new exports_1.Binary.Types.Vector2(3140, -1880), // Right Full-back
                new exports_1.Binary.Types.Vector2(3380, 20), // Left Center-back
                new exports_1.Binary.Types.Vector2(2320, -840), // Right Center-back
                new exports_1.Binary.Types.Vector2(2320, 780), // Left Midfielder
                new exports_1.Binary.Types.Vector2(1260, 2320), // Right Midfielder
                new exports_1.Binary.Types.Vector2(1060, 80), // Center Midfielder 1
                new exports_1.Binary.Types.Vector2(220, 980), // Center Midfielder 2
                new exports_1.Binary.Types.Vector2(260, -980), // Left Forward
                new exports_1.Binary.Types.Vector2(1180, -2340), // Right Forward
            ],
            Direction: Array.from({ length: 11 }).fill(new exports_1.Binary.Types.Vector2(-1, 0)),
            Animation: Array.from({ length: 11 }).fill(exports_2.Types.Enums.Animation.WaitIdle1),
        },
    };
})(Positions || (exports.Positions = Positions = {}));
