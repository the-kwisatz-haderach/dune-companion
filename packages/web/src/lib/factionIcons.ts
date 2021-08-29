import { Factions } from '@dune-companion/engine'
import { ReactComponent as AtreidesIcon } from '../images/factions/atreides.svg'
import { ReactComponent as BeneGesseritIcon } from '../images/factions/bene_gesserit.svg'
import { ReactComponent as EmperorIcon } from '../images/factions/emperor.svg'
import { ReactComponent as FremenIcon } from '../images/factions/fremen.svg'
import { ReactComponent as HarkonnenIcon } from '../images/factions/harkonnen.svg'
import { ReactComponent as SpacingGuildIcon } from '../images/factions/spacing_guild.svg'

export const factionIcons: Record<
  Factions,
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
> = {
  [Factions.HOUSE_ATREIDES]: AtreidesIcon,
  [Factions.BENE_GESSERIT]: BeneGesseritIcon,
  [Factions.EMPEROR]: EmperorIcon,
  [Factions.FREMEN]: FremenIcon,
  [Factions.HOUSE_HARKONNEN]: HarkonnenIcon,
  [Factions.SPACING_GUILD]: SpacingGuildIcon
}
