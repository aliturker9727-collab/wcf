import type { Entry } from '@/sobee/content/common/exports'
import { Binary, Messages } from '@/sobee/exports'
import { Types } from '@/sobee/content/messaging/exports'

/** Namespace for temporary solutions before creating ideas. */
export namespace Temporary {

  /** Temporary solutions for match related things. */
  export namespace Match {

    /**
     * Temporary solution for creating match information.
     *
     * Remove after creating proper solution.
     */
    export function Information() {
      return Messages.Match.Information.Default({
        Scenario: Messages.Scenario.Type.ScenarioMatch,
        State: Messages.Match.State.Type.Positioning,
        Positioning: Types.Enums.Positioning.Kickoff,
        Teams: {
          Home: { Color: 5, Name: { Full: 'Gecici Takim 1', Short: 'G1' }, Size: 11 },
          Away: { Color: 1, Name: { Full: 'Gecici Takim 2', Short: 'G2' }, Size: 11 },
        },
      })
    }

  }

  /** Temporary solutions for player related things. */
  export namespace Player {

    /**
     * Temporary solution for creating player.
     *
     * Remove after creating proper solution.
     */
    export function Information(Input: { Entry: Entry, Sitting: Types.Enums.Sitting }) {
      const { Entry, Sitting } = Input

      return Messages.Player.Information.Default({
        Match: { ID: 0 },
        Player: {
          ID: Entry.value,
          Name: `Oyuncu ${Entry.value}`,
          Squad: Entry.toSquad(true),
          Sitting,
          Position: new Binary.Types.Vector2(0, 0),
        },
      })
    }

  }

}
