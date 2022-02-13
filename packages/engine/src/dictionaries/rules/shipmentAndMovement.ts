import { RuleSection } from '../../models'

export const shipmentAndMovementRules: RuleSection[] = [
  {
    title: 'Force Shipment',
    rules: [
      {
        name: 'Shipment of Reserves',
        description:
          'A player with off-planet reserves may make one shipment of any number of forces from their reserves to any one territory on the map.',
        isAdvanced: false
      },
      {
        name: 'Payment',
        description:
          'A player must pay spice to the Spice Bank for their shipment. The cost of shipping off-planet reserves is 1 spice per force shipped into any stronghold and 2 spice per force shipped into any other territory.',
        isAdvanced: false
      },
      {
        name: 'Sectors',
        description:
          'When shipping into a territory lying in several sectors, a player must make clear in which sector of the territory they choose to leave their forces.',
        isAdvanced: false
      },
      {
        name: 'Exceptions',
        description:
          'No player may ship into a sector in storm.\nNo player may ship into a stronghold already occupied by two other players.\nNo player may ship forces from the board back to their reserves.',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'Force Movement',
    description:
      'Each player may move, as a group, any number of their forces from one territory into one other territory. Forces are free to move into, out of, or through any territory occupied by any number of forces with certain restrictions and additional movement advantage mentioned below.',
    rules: [
      {
        name: 'Ornithopters',
        description:
          'A player who starts a force move with one or more forces in either Arrakeen, Carthag, or both has access to ornithopters and may move forces through up to three adjacent territories. The forces moved do not have to be in Arrakeen or Carthag to make the three territory move. Thus, for example, a player with one or more forces in Arrakeen would be able to move forces starting in Tuek’s Sietch through Pasty Mesa and Shield Wall to the Imperial Basin, where they must stop.',
        isAdvanced: false
      },
      {
        name: 'One Adjacent Territory',
        description:
          'A player without a force in either Arrakeen or Carthag at the start of their move does not have access to ornithopters and can only move their forces by foot to one adjacent territory.',
        isAdvanced: false
      },
      {
        name: 'One Force Move',
        description: 'Each player may make only one force move per turn.',
        isAdvanced: false
      },
      {
        name: 'Sectors',
        description:
          "Sectors have no effect on movement. Forces can move into or through a territory ignoring all sectors. A sector's only function is to regulate the movement and coverage of the storm and spice collection.",
        isAdvanced: false
      },
      {
        name: 'Storm',
        description:
          'As defined above in the Storm Phase section, no force may move into, out of, or through a sector in storm. Many territories occupy several sectors, so that a player may move into and out of a territory that is partly in the storm, so long as the group does not pass through the part covered by the storm.\nWhen ending a move in a territory lying in several sectors, a player must make clear in which sector of the territory they choose to leave their forces.\nThe Polar Sink is never in storm.',
        isAdvanced: false
      },
      {
        name: 'Stronghold Blocking',
        description:
          'Like shipment, forces cannot be moved into or through a stronghold if forces of two other players are already there.',
        isAdvanced: false
      },
      {
        name: 'Alliance Blocking',
        description:
          'If for any reason two factions who became allies during the last turn occupy the same territory at the beginning of the next turn, one of those factions must move out of that territory during the Shipment and Movement Phase. If the first faction to ship and move does not move out of the territory, the second faction must move out or lose those forces to the Tleilaxu Tanks.',
        isAdvanced: false,
        inclusionReason: 'Alliance'
      }
    ]
  }
]
