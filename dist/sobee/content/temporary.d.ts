import type { Entry } from '../../sobee/content/common/exports';
import { Messages } from '../../sobee/exports';
import { Types } from '../../sobee/content/messaging/exports';
/** Namespace for temporary solutions before creating ideas. */
export declare namespace Temporary {
    /** Temporary solutions for match related things. */
    namespace Match {
        /**
         * Temporary solution for creating match information.
         *
         * Remove after creating proper solution.
         */
        function Information(): Messages.Match.Information;
    }
    /** Temporary solutions for player related things. */
    namespace Player {
        /**
         * Temporary solution for creating player.
         *
         * Remove after creating proper solution.
         */
        function Information(Input: {
            Entry: Entry;
            Sitting: Types.Enums.Sitting;
        }): Messages.Player.Information;
    }
}
