import { Phases } from '@dune-companion/engine'
import StormIcon from '@material-ui/icons/FlashOn'
import storm from '../images/phases/storm.png'

export const phaseIcons: Record<Phases, React.FC<{ className?: string }>> = {
  FACTION_SELECT: () => <img src={storm} />,
  STORM: (props) => <img {...props} src={storm} />,
  SPICE_BLOW_AND_NEXUS: StormIcon,
  NEXUS: StormIcon,
  CHOAM_CHARITY: StormIcon,
  BATTLE: StormIcon,
  BIDDING: StormIcon,
  MENTAT_PAUSE: StormIcon,
  REVIVAL: StormIcon,
  SETUP: StormIcon,
  SHIPMENT_AND_MOVEMENT: StormIcon,
  SPICE_HARVEST: StormIcon,
  FINISHED: StormIcon
}
