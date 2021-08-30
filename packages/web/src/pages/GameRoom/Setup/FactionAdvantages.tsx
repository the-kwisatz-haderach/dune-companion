import {
  factionRuleSets,
  Factions,
  Phases,
  phases
} from '@dune-companion/engine'
import { Box, createStyles, makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { Card } from '../../../components/Card'
import { Tabs } from '../../../components/Tabs'

const useStyles = makeStyles(theme =>
  createStyles({
    cardContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(3)
      }
    }
  })
)

type Props = {
  faction: Factions
  isAdvancedMode: boolean
}

export const FactionAdvantages = ({ faction, isAdvancedMode }: Props) => {
  const classes = useStyles()
  const filteredPhases = useMemo(
    () =>
      Object.keys(phases).filter(
        phase =>
          factionRuleSets[faction][phase as Phases].filter(
            rule => isAdvancedMode || !rule.isAdvanced
          ).length > 0
      ),
    [isAdvancedMode, faction]
  )
  return (
    <Tabs
      resetDependency={faction}
      sticky
      tabs={filteredPhases.map(phase => ({
        label: phases[phase as Phases].name,
        content: (
          <Box className={classes.cardContainer}>
            {factionRuleSets[faction][phase as Phases]
              .filter(rule => isAdvancedMode || !rule.isAdvanced)
              .map(rule => (
                <Card
                  title={rule.name}
                  meta="Faction rule"
                  phase={phase as Phases}
                  faction={faction}
                  advanced={rule.isAdvanced}
                  body={rule.description}
                />
              ))}
          </Box>
        )
      }))}
    />
  )
}
