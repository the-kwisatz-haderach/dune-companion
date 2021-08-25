import { Factions } from '@dune-companion/engine'
import { ReactComponent as AtreidesIcon } from '../images/factions/atreides.svg'
import { ReactComponent as BeneGesseritIcon } from '../images/factions/bene_gesserit.svg'
import { ReactComponent as EmperorIcon } from '../images/factions/emperor.svg'
import { ReactComponent as FremenIcon } from '../images/factions/fremen.svg'
import { ReactComponent as HarkonnenIcon } from '../images/factions/harkonnen.svg'
import { ReactComponent as SpacingGuildIcon } from '../images/factions/spacing_guild.svg'

export const getFactionIcon = (
  faction: Factions
): React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
  title?: string | undefined
}> => {
  switch (faction) {
    case Factions.HOUSE_ATREIDES:
      return AtreidesIcon
    case Factions.BENE_GESSERIT:
      return BeneGesseritIcon
    case Factions.EMPEROR:
      return EmperorIcon
    case Factions.FREMEN:
      return FremenIcon
    case Factions.HOUSE_HARKONNEN:
      return HarkonnenIcon
    case Factions.SPACING_GUILD:
      return SpacingGuildIcon
    default:
      return AtreidesIcon
  }
}
