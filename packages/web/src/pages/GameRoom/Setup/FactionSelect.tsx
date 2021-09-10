import { ReactElement, useState } from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core'
import { factions, Factions } from '@dune-companion/engine'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import { Card } from '../../../components/Card'
import { Section } from '../../../components/Section'
import { factionIcons } from '../../../lib/factionIcons'
import { ActionMenu } from '../../../components/ActionMenu'
import { Header } from '../../../components/Header'
import { Leader } from '../../../components/Leader'
import { FactionSummary } from './FactionSummary'
import { FactionAdvantages } from './FactionAdvantages'
import dune from '../../../images/dune.jpeg'
import { useAutomaticPrompt } from '../useAutomaticPrompt'

const useStyles = makeStyles(theme =>
  createStyles({
    sideScrollContainer: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      marginLeft: '-1rem',
      marginRight: '-1rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(4)
      },
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    cardContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(3)
      }
    }
  })
)

export default function FactionSelect(): ReactElement {
  const classes = useStyles()
  const factionKeys = Object.keys(factions)
  const [factionIndex, setFactionIndex] = useState(0)
  const { palette } = useTheme()
  const dispatch = useGameDispatch()
  const game = useGame()
  const player = usePlayer()
  useAutomaticPrompt()

  const currentFactionKey = Object.keys(factions)[factionIndex] as Factions
  const currentFaction = factions[currentFactionKey]

  const playerSelected = Object.values(game.players).find(
    player => player.faction === currentFactionKey
  )
  const isSelectedByPlayer = player.id === playerSelected?.id

  const getNextFaction = () => {
    setFactionIndex(curr => (curr + 1) % factionKeys.length)
  }

  const getPreviousFaction = () => {
    setFactionIndex(curr => {
      const prev = curr - 1
      if (prev < 0) {
        return factionKeys.length - 1
      }
      return prev
    })
  }

  const onSelectFaction = (faction: Factions) => {
    if (isSelectedByPlayer) {
      dispatch('SELECT_FACTION', {
        faction: null
      })
      return
    }
    dispatch('SELECT_FACTION', {
      faction
    })
  }

  return (
    <Box>
      <ActionMenu
        primaryActionLabel={isSelectedByPlayer ? 'Deselect' : 'Select'}
        primaryActionType={isSelectedByPlayer ? 'negative' : 'positive'}
        primaryActionPreamble={
          playerSelected && !isSelectedByPlayer
            ? `Selected by ${playerSelected.name}`
            : undefined
        }
        primaryActionIsDisabled={playerSelected && !isSelectedByPlayer}
        secondaryActionLeftLabel="Prev"
        onSecondaryActionLeft={getPreviousFaction}
        secondaryActionRightLabel="Next"
        onSecondaryActionRight={getNextFaction}
        onPrimaryAction={() =>
          onSelectFaction(factionKeys[factionIndex] as Factions)
        }
      />
      <HeaderImage
        title={currentFaction.name}
        preamble="Faction"
        subtitle={currentFaction.keyAdvantage}
        BackdropImage={factionIcons[currentFactionKey]}
        color={palette[currentFactionKey].dark}
        glow={palette[currentFactionKey].light}
      />
      <RoundedContainer>
        <Header
          type="Commanded by"
          title={currentFaction.commander.name}
          description={currentFaction.commander.backstory}
          faction={currentFactionKey}
          img={dune}
        />
        <Section heading="Summary">
          <FactionSummary faction={currentFaction} />
        </Section>
        <Section heading="Leaders">
          <Box className={classes.sideScrollContainer}>
            {currentFaction.leaders.map(leader => (
              <Leader
                key={leader.name}
                faction={currentFactionKey}
                name={leader.name}
                imgSrc={dune}
                description={leader.backstory}
                strength={leader.strength}
              />
            ))}
          </Box>
        </Section>
        <Section heading="Phase Advantages">
          <FactionAdvantages
            faction={currentFactionKey}
            isAdvancedMode={game.conditions.advancedMode}
          />
        </Section>
        <Section heading="Common Advantages">
          <Box className={classes.cardContainer}>
            {currentFaction.advantages
              .filter(rule => !game.conditions.advancedMode || rule.isAdvanced)
              .map(rule => (
                <Card
                  key={rule.name}
                  title={rule.name}
                  meta="Faction rule"
                  faction={currentFactionKey}
                  advanced={rule.isAdvanced}
                  body={rule.description}
                />
              ))}
            {game.conditions.advancedMode && (
              <Card
                title="Karama Power"
                meta="Faction rule"
                faction={currentFactionKey}
                advanced
                body={currentFaction.karamaPower}
              />
            )}
            <Card
              title="Alliance Power"
              meta="Faction rule"
              faction={currentFactionKey}
              body={currentFaction.alliancePower}
            />
          </Box>
        </Section>
        <Section heading="Strategy">
          <Typography variant="body2">{currentFaction.strategy}</Typography>
        </Section>
      </RoundedContainer>
    </Box>
  )
}
