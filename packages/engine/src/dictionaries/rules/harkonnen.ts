import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const harkonnenRules: Record<Phases, RuleSet[]> = {
  FACTION_SELECT: [],
  NEXUS: [],
  SETUP: [
    {
      name: 'Traitors',
      description:
        'At the start of the game when you draw 4 Traitor Cards, you keep them all including your own, and any leader cards of other factions can be revealed in a battle as a traitor.',
      isAdvanced: false,
      faction: Factions.HOUSE_HARKONNEN
    }
  ],
  STORM: [],
  SPICE_BLOW_AND_NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [],
  BATTLE: [
    {
      name: 'Captured Leaders',
      description:
        'Every time you win a battle, you can either randomly select 1 leader from the loser (including the leader used in the battle, if not killed, but excluding all leaders already used elsewhere that turn) and place the Leader Disc face down into the Tleilaxu Tanks to gain 2 spice from the Spice Bank; or you can keep the leader and use it once in a battle, after which, if it wasn’t killed during that battle, you must return that leader to its faction. When all of your own leaders have been killed, you must return all captured leaders immediately to their factions. Killed captured leaders are put in the Tleilaxu Tanks from which their factions can revive them (subject to the revival rules). A captured leader used in battle may be claimed as a traitor.',
      isAdvanced: true,
      faction: Factions.HOUSE_HARKONNEN
    }
  ],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
}
