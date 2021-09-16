import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const fremenRules: Record<Phases, RuleSet[]> = {
  FACTION_SELECT: [],
  NEXUS: [],
  SETUP: [],
  STORM: [
    {
      name: 'Storm Rule',
      description:
        'Move the Storm Marker normally using the Battle Wheels on the first turn of the game. Subsequent storm movement is determined by you using your Storm Cards. You randomly select a card from the Storm Deck, secretly look at it, and place it face down on the margin of the game board.\nIn the next Storm Phase the number on that Storm Card is revealed; the storm is moved counterclockwise that number of sectors and your Storm Card is returned to the Storm Card Deck. You then shuffle the Storm Deck, randomly select a Storm Card and look at it for the next turns storm movement, and place it face down on the margin of the game board.',
      isAdvanced: true,
      faction: Factions.FREMEN
    },
    {
      name: 'Storm Losses',
      description:
        'If your forces are caught in a storm, only half of them there are killed (any fractions are rounded up). You may also bring your reserves into a storm at half loss.',
      isAdvanced: true,
      faction: Factions.FREMEN
    }
  ],
  SPICE_BLOW_AND_NEXUS: [
    {
      name: 'Shai-Hulud',
      description:
        'If Shai-Hulud appears in a territory where you have forces, they are not devoured. Upon conclusion of the Nexus, you may ride the sandworm and move some or all of the forces in the territory to any territory subject to storm and occupancy rules. Any forces in that territory are not devoured. If Shai-Hulud appears again and you still have forces in the original territory, you may do this again.',
      isAdvanced: false,
      faction: Factions.FREMEN
    },
    {
      name: 'Sandworms',
      description:
        'During a Spice Blow, all additional sandworms that appear after the first sandworm can be placed by you in any sand territory you wish. Any forces there, except yours, are devoured.',
      isAdvanced: true,
      faction: Factions.FREMEN
    }
  ],
  CHOAM_CHARITY: [],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [
    {
      name: 'Shipment',
      description:
        'During shipment, you may bring any or all of your reserves for free onto the Great Flat or onto any one territory within two territories of the Great Flat (subject to storm and occupancy rules).',
      isAdvanced: false,
      faction: Factions.FREMEN
    },
    {
      name: 'Movement',
      description:
        'During movement you may move your forces two territories instead of one.',
      isAdvanced: false,
      faction: Factions.FREMEN
    }
  ],
  BATTLE: [
    {
      name: 'Fedaykin',
      description:
        'Your three starred forces, Fedaykin, have a special fighting capability. They are worth two normal forces in battle and in taking losses. They are each treated as one force in revival. Only one Fedaykin force can be revived per turn.',
      isAdvanced: true,
      faction: Factions.FREMEN
    },
    {
      name: 'Battles',
      description:
        'Your forces do not require spice to count at their full strength.',
      isAdvanced: true,
      faction: Factions.FREMEN
    }
  ],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [
    {
      name: 'Fremen Special Victory Condition',
      description:
        'If no faction has won by the end of the last turn and if you (or no one) occupies Sietch Tabr and Habbanya Sietch and neither Harkonnen, Atreides nor Emperor occupies Tuek’s Sietch, your plans to alter Dune have succeeded and you and any allies win the game.',
      isAdvanced: false,
      faction: Factions.FREMEN
    }
  ],
  FINISHED: []
}
