import { Phases } from '@dune-companion/engine'
import storm from '../images/phases/storm.jpeg'
import spice_blow from '../images/phases/spice_blow.jpeg'
import nexus from '../images/phases/nexus.jpeg'
import bidding from '../images/phases/bidding.jpeg'
import revival from '../images/phases/revival.png'
import shipment_and_movement from '../images/phases/shipment_and_movement.jpeg'
import battle from '../images/phases/battle.jpeg'
import spice_harvest from '../images/phases/spice_harvest.jpeg'
import mentat_pause from '../images/phases/mentat_pause.jpeg'

export const phaseImages: Record<Phases, string> = {
  FACTION_SELECT: storm,
  STORM: storm,
  SPICE_BLOW_AND_NEXUS: spice_blow,
  NEXUS: nexus,
  CHOAM_CHARITY: storm,
  BATTLE: battle,
  BIDDING: bidding,
  MENTAT_PAUSE: mentat_pause,
  REVIVAL: revival,
  SETUP: storm,
  SHIPMENT_AND_MOVEMENT: shipment_and_movement,
  SPICE_HARVEST: spice_harvest,
  FINISHED: storm
}
