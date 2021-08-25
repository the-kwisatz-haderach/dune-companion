import { Box, createStyles, makeStyles, useTheme } from '@material-ui/core'
import { factions, Factions } from '@dune-companion/engine'
import { ReactElement, useState } from 'react'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import { Card } from '../../../components/Card'
import { FactionHeader } from '../../../components/FactionHeader'
import { factionImages } from '../../../lib/factionImages'
import { Section } from '../../../components/Section'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {}
  })
)

export default function CharacterSelect(): ReactElement {
  const classes = useStyles()
  const [factionIndex, setFactionIndex] = useState(0)
  const { palette } = useTheme()
  const dispatch = useGameDispatch()
  const game = useGame()
  const player = usePlayer()

  const selectedFactions = Object.values(game.players)
    .map(player => player.faction)
    .filter(Boolean) as Factions[]

  const onSelectFaction = (faction: Factions | null) => {
    dispatch('SELECT_FACTION', {
      faction
    })
  }

  const faction = Factions.SPACING_GUILD

  return (
    <Box className={classes.container}>
      <HeaderImage
        title={factions[faction].name}
        preamble="Faction"
        color={palette[faction].dark}
        glow={palette[faction].light}
      />
      <RoundedContainer>
        <FactionHeader faction={faction} />
        <Section heading="Advantages">Test</Section>
        <Box marginY={4}>
          <Card
            title="Storm Rule"
            faction={faction}
            type="phase"
            advanced
            body={
              'Move the Storm Marker normally using the Battle Wheels on the first turn of the game. Subsequent storm movement is determined by you using your Storm Cards. You randomly select a card from the Storm Deck, secretly look at it, and place it face down on the margin of the game board.\nIn the next Storm Phase the number on that Storm Card is revealed; the storm is moved counterclockwise that number of sectors and your Storm Card is returned to the Storm Card Deck. You then shuffle the Storm Deck, randomly select a Storm Card and look at it for the next turns storm movement, and place it face down on the margin of the game board.'
            }
          />
        </Box>
      </RoundedContainer>
    </Box>
  )
}
