import { Binary } from '@/sobee/exports'
import { Types } from '@/sobee/content/messaging/exports'

export namespace Positions {

  export interface Type {
    Home: {
      Position: Binary.Types.Vector2[]
      Direction: Binary.Types.Vector2[]
      Animation: Types.Enums.Animation[]
    }
    Away: {
      Position: Binary.Types.Vector2[]
      Direction: Binary.Types.Vector2[]
      Animation: Types.Enums.Animation[]
    }
  }

  export const Kickoff: Type = {
    // TODO: 8.position need 0 for kickoff
    Home: {
      Position: [
        new Binary.Types.Vector2(-4160, 20), // Goalkeeper
        new Binary.Types.Vector2(-3140, -1900), // Left Full-back
        new Binary.Types.Vector2(-3140, 1860), // Right Full-back
        new Binary.Types.Vector2(-3300, -20), // Left Center-back
        new Binary.Types.Vector2(-1960, 960), // Right Center-back
        new Binary.Types.Vector2(-1940, -720), // Left Midfielder
        new Binary.Types.Vector2(-1140, -2360), // Right Midfielder
        new Binary.Types.Vector2(-1040, 80), // Center Midfielder 1
        new Binary.Types.Vector2(-140, -200), // Center Midfielder 2
        new Binary.Types.Vector2(-480, 1780), // Left Forward
        new Binary.Types.Vector2(-180, 260), // Right Forward
      ],
      Direction: Array.from<Binary.Types.Vector2>({ length: 11 }).fill(new Binary.Types.Vector2(1, 0)),
      Animation: Array.from<Types.Enums.Animation>({ length: 11 }).fill(Types.Enums.Animation.WaitIdle1),
    },
    Away: {
      Position: [
        new Binary.Types.Vector2(4200, 20), // Goalkeeper
        new Binary.Types.Vector2(3140, 1900), // Left Full-back
        new Binary.Types.Vector2(3140, -1880), // Right Full-back
        new Binary.Types.Vector2(3380, 20), // Left Center-back
        new Binary.Types.Vector2(2320, -840), // Right Center-back
        new Binary.Types.Vector2(2320, 780), // Left Midfielder
        new Binary.Types.Vector2(1260, 2320), // Right Midfielder
        new Binary.Types.Vector2(1060, 80), // Center Midfielder 1
        new Binary.Types.Vector2(220, 980), // Center Midfielder 2
        new Binary.Types.Vector2(260, -980), // Left Forward
        new Binary.Types.Vector2(1180, -2340), // Right Forward
      ],
      Direction: Array.from<Binary.Types.Vector2>({ length: 11 }).fill(new Binary.Types.Vector2(-1, 0)),
      Animation: Array.from<Types.Enums.Animation>({ length: 11 }).fill(Types.Enums.Animation.WaitIdle1),
    },
  }

}
