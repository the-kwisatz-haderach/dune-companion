import { Phases } from '@dune-companion/engine'
import { SvgIconTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import StormIcon from '@material-ui/icons/FlashOn'

export const phaseIcons: Record<
  Phases,
  OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
> = {
  FACTION_SELECT: StormIcon,
  STORM: StormIcon,
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
