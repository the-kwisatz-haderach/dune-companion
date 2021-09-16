import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const spacingGuildRules: Record<Phases, RuleSet[]> = {
  FACTION_SELECT: [],
  NEXUS: [],
  SETUP: [],
  STORM: [],
  SPICE_BLOW_AND_NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [
    {
      name: 'Payment for Shipment',
      description:
        'When other factions ship forces onto Dune from their off-planet reserves, they pay the spice to you instead of to the Spice Bank.',
      isAdvanced: false,
      faction: Factions.SPACING_GUILD
    },
    {
      name: 'Three Types of Shipment',
      description:
        'You are capable of making one of three types of shipments each turn:\nYou may ship normally from off-planet reserves to Dune;\nYou may ship any number of forces from any one territory to any other territory on the board;\nYou may ship any number of forces from any one territory back to your reserves.',
      isAdvanced: false,
      faction: Factions.SPACING_GUILD
    },
    {
      name: 'Half Price',
      description:
        'You pay only half the normal fee when shipping your forces, and pay 1 spice for every 2 of your forces shipped back to reserves.',
      isAdvanced: false,
      faction: Factions.SPACING_GUILD
    },
    {
      name: 'Ship and Move When You Wish',
      description:
        'You may take your shipment and move action out of turn. This would allow you to go first or last or in between other players’ turns, however you wish. The rest of the factions must make their shipments and moves in the proper sequence. You do not have to reveal when you intend to make your shipment and move until the moment you wish to take it.',
      isAdvanced: true,
      faction: Factions.SPACING_GUILD
    }
  ],
  BATTLE: [],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [
    {
      name: 'Spacing Guild Special Victory Condition',
      description:
        'If no faction has been able to win the game by the end of play, you have prevented control of Dune and automatically win the game.',
      isAdvanced: false,
      faction: Factions.SPACING_GUILD
    }
  ],
  FINISHED: []
}
