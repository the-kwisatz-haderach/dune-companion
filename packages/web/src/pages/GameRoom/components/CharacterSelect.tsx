import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core'
import {
  cities,
  factions,
  Factions,
  combinedRuleSet,
  Phases
} from '@dune-companion/engine'
import { ReactElement, useState } from 'react'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import { Card } from '../../../components/Card'
import { Section } from '../../../components/Section'
import { Showcase } from '../../../components/Showcase'
import { Icon } from '../../../components/Icon'
import dune from '../../../images/dune.jpeg'
import { factionIcons } from '../../../lib/factionIcons'
import { ActionMenu } from '../../../components/ActionMenu'
import { Header } from '../../../components/Header'
import { Tabs } from '../../../components/Tabs'
import { Leader } from '../../../components/Leader'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {},
    actionsContainer: {
      position: 'fixed',
      zIndex: 2,
      bottom: 80,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
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
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(3)
      }
    }
  })
)

export default function CharacterSelect(): ReactElement {
  const classes = useStyles()
  const factionKeys = Object.keys(factions)
  const [factionIndex, setFactionIndex] = useState(0)
  const { palette } = useTheme()
  const dispatch = useGameDispatch()
  const game = useGame()
  const player = usePlayer()

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
    <Box className={classes.container}>
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
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={6}>
              <Showcase
                title="Free revivals"
                body={currentFaction.freeRevivals.toString()}
                Icon={<Icon icon="revival" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Showcase
                title="Starting spice"
                body={currentFaction.startingSpice.toString()}
                Icon={<Icon icon="spice" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Showcase
                title="Starting items"
                body={currentFaction.startingItems.toString()}
                Icon={<Icon icon="treachery-card" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Showcase
                title="Starting forces"
                body={`${currentFaction.startingPlanetaryForces} + ${currentFaction.startingReserveForces}`}
                Icon={<Icon icon="force" />}
              />
            </Grid>
            {currentFaction.startingCity && (
              <Grid item xs={12}>
                <Showcase
                  title="Starting city"
                  body={cities[currentFaction.startingCity].name}
                  Icon={<Icon icon="city" />}
                />
              </Grid>
            )}
          </Grid>
        </Section>
        <Section heading="Leaders">
          <Box className={classes.sideScrollContainer}>
            {currentFaction.leaders.map(leader => (
              <Leader
                faction={currentFactionKey}
                name={leader.name}
                imgSrc={dune}
                description={leader.backstory}
                strength={leader.strength}
              />
            ))}
          </Box>
        </Section>
        <Section heading="Advantages">
          <Tabs
            sticky
            tabs={Object.keys(combinedRuleSet).map(phase => ({
              label: phase,
              content: (
                <Box className={classes.cardContainer}>
                  {combinedRuleSet[phase as Phases]
                    .filter(
                      rule =>
                        rule.faction === currentFactionKey &&
                        (rule.isAdvanced ? game.conditions.advancedMode : true)
                    )
                    .map(rule => (
                      <Card
                        title={rule.name}
                        meta="Faction rule"
                        faction={currentFactionKey}
                        advanced={rule.isAdvanced}
                        body={rule.description}
                      />
                    ))}
                </Box>
              )
            }))}
          />
        </Section>
        <Section heading="Strategy">
          <Typography variant="body2">{currentFaction.strategy}</Typography>
        </Section>
      </RoundedContainer>
    </Box>
  )
}
