import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const beneGesseritRules: Record<Phases, RuleSet[]> = {
  SETUP: [
    {
      name: 'Prediction',
      description:
        'After step 1 (Positions) in the Setup Phase, you secretly predict when one other faction will win, placing a turn number card and a faction card from your prediction cards face down behind your Player Shield. Place the unused prediction cards face down back in the box. If the faction you predicted wins (alone or as an ally, even your ally) in the turn you predicted, reveal your prediction and win alone. You also can win normally. You can’t predict that the Spacing Guild or Fremen will win with their special victory conditions.',
      isAdvanced: false,
      faction: Factions.BENE_GESSERIT
    },
    {
      name: 'Start of game',
      description:
        'After the Fremen placement (if that faction is in the game), you start with one peaceful advisor in any territory of your choice. If you are alone in the territory, flip the advisor to a fighter.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    }
  ],
  STORM: [],
  SPICE_BLOW_AND_NEXUS: [
    {
      name: 'Battle',
      description:
        'On each turn after the Spice Blow and NEXUS Phase and before any shipment occurs, in all territories in which you have advisors and wish to battle, announce you are doing so, and flip all of those advisors to fighters.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    }
  ],
  CHOAM_CHARITY: [
    {
      name: 'Charity',
      description:
        'You always receive CHOAM charity of 2 spice regardless of how many spice you already have.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    },
    {
      name: 'Battle',
      description:
        'On each turn after the Spice Blow and NEXUS Phase and before any shipment occurs, in all territories in which you have advisors and wish to battle, announce you are doing so, and flip all of those advisors to fighters.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    }
  ],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [
    {
      name: 'Spiritual Advisors',
      description:
        'Whenever any other faction ships forces onto Dune from off-planet, you may ship 1 force for free from your reserves into the Polar Sink. You may also ship normally, of course.',
      isAdvanced: false,
      faction: Factions.BENE_GESSERIT
    },
    {
      name: 'Advisors',
      description:
        'Whenever any other faction ships forces to Dune from off-planet, you may ship for free one advisor from your reserves into that same territory (instead of the Polar Sink). Advisors in this territory cannot flip to fighters during this turn unless no other forces exist in the territory. Advisors coexist peacefully with other faction forces in the same territory. Advisors have no effect on the play of the other factions whatsoever and cannot collect spice, be involved in combat, prevent another faction’s control of a stronghold, prevent another faction from challenging a stronghold (second force), use ornithopters, or play Family Atomics. Advisors are still susceptible to storms, sandworms, lasgun/shield explosions, and atomics.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    },
    {
      name: 'Fighters',
      description:
        'When you ship forces into an unoccupied territory, you must ship as fighters. If you move advisors into an unoccupied territory, you must flip them to fighters. If you move advisors into an occupied territory, they may remain as advisors or flip to fighters.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    },
    {
      name: 'Intrusion',
      description:
        'When another faction ships or moves into a territory where you have fighters, you may flip them to advisors.',
      isAdvanced: true,
      faction: Factions.BENE_GESSERIT
    }
  ],
  BATTLE: [
    {
      name: 'Voice',
      description:
        'You may Voice your opponent to do as you wish with respect to one of the cards they play in their Battle Plan. For instance, to play or not play a specific weapon (poison weapon, projectile weapon or lasgun) or defense (snooper or shield), a worthless card, or a cheap hero. If your opponent can’t comply with your command, they may do as they wish.',
      isAdvanced: false,
      faction: Factions.BENE_GESSERIT
    }
  ],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
}
