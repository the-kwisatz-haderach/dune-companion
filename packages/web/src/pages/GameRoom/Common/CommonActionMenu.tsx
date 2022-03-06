import { useMemo, useState } from 'react'
import { useGame, useGameActions, usePlayer } from '../../../dune-react'
import PlayerOrderIcon from '@material-ui/icons/FormatListNumbered'
import FirstPlayerIcon from '@material-ui/icons/PlusOne'
import useGameSettingsContext from '../../../contexts/GameSettingsContext/GameSettingsContext'
import { GameActionMenuProps } from '../../../components/GameActionMenu'
import { factionRuleSets, Factions } from '@dune-companion/engine'
import {
  Badge,
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import styles from './CommonActionMenu.module.css'
import { ToggleButton } from '../../../components/ToggleButton'
import { createRuleFilter } from '../helpers'
import { MarginList } from '../../../components/MarginList'
import { RuleCard } from '../../../components/RuleCard'
import { EmptyState } from '../../../components/EmptyState'
import { Icon } from '../../../components/Icon'
import { FactionDetails } from '../../../components/FactionDetails'

const getSecondaryActions = (
  actions: ReturnType<typeof useGameActions>,
  isAdmin?: boolean
) => {
  const secondaryActions: GameActionMenuProps['secondaryActions'] = []
  if (isAdmin) {
    secondaryActions.push(
      {
        label: actions.SET_PLAYER_ORDER.label,
        onClick: actions.SET_PLAYER_ORDER.handler,
        Icon: PlayerOrderIcon
      },
      {
        label: actions.SET_FIRST_PLAYER.label,
        onClick: actions.SET_FIRST_PLAYER.handler,
        Icon: FirstPlayerIcon
      }
    )
  }
  return secondaryActions
}

export const CommonActionMenu = () => {
  const player = usePlayer()
  const actions = useGameActions()
  const game = useGame()
  const [menuIndex, setMenuIndex] = useState<number | null>(null)
  const { showAllFactionRules } = useGameSettingsContext()

  const ruleFilter = useMemo(
    () =>
      createRuleFilter({
        currentPhase: game.currentPhase,
        currentTurn: game.currentTurn,
        advancedMode: game.isAdvancedMode,
        playerFaction: player.faction,
        showAllFactions: showAllFactionRules
      }),
    [
      game.currentPhase,
      game.currentTurn,
      game.isAdvancedMode,
      player.faction,
      showAllFactionRules
    ]
  )

  const playerFactions = useMemo(
    () =>
      Object.values(game.players)
        .map((player) => player.faction)
        .filter((faction): faction is Factions => faction !== null),
    [game.players]
  )

  const factionRules = useMemo(
    () =>
      playerFactions
        .flatMap((faction) => factionRuleSets[faction][game.currentPhase])
        .filter(ruleFilter),
    [playerFactions, game.currentPhase, ruleFilter]
  )

  const onSelectMenuItem = (itemIndex: number) => {
    if (menuIndex === itemIndex) {
      setMenuIndex(null)
    } else {
      setMenuIndex(itemIndex)
    }
  }

  const primaryAction: GameActionMenuProps['primaryAction'] = useMemo(() => {
    const actionKey: keyof typeof actions = player.hasCompletedPhase
      ? 'SET_IS_NOT_READY'
      : 'SET_IS_READY'
    return {
      label: actions[actionKey].label,
      onClick: actions[actionKey].handler,
      style: actions[actionKey].style
    }
  }, [actions, player.hasCompletedPhase])

  const secondaryActions = useMemo(
    () => getSecondaryActions(actions, player?.isAdmin),
    [actions, player?.isAdmin]
  )

  return (
    <>
      <Grid container className={styles.container}>
        <Grid item xs={2}>
          <Button onClick={() => onSelectMenuItem(0)}>
            <Icon icon="menu" size="small" />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => onSelectMenuItem(1)}>
            <Icon icon="home" size="small" />
          </Button>
        </Grid>
        <Grid item xs className={styles.primaryAction}>
          <ToggleButton
            onClick={primaryAction.onClick}
            status={player.hasCompletedPhase}
            disabled={primaryAction.disabled}
          >
            Ready
          </ToggleButton>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => onSelectMenuItem(2)}>
            <Icon icon="cards" size="small" />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => onSelectMenuItem(3)}>
            <Badge badgeContent={factionRules.length} color="error">
              <Icon icon="star" size="small" />
            </Badge>
          </Button>
        </Grid>
      </Grid>
      <Drawer
        anchor="bottom"
        open={menuIndex === 0}
        onClose={() => setMenuIndex(null)}
      >
        <Box height="50vh" paddingBottom={7} paddingTop={2} borderRadius="20%">
          <List>
            {secondaryActions.map(({ onClick, label, Icon }) => (
              <ListItem
                button
                onClick={() => {
                  setMenuIndex(null)
                  onClick()
                }}
              >
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer
        anchor="bottom"
        open={menuIndex === 1}
        onClose={() => setMenuIndex(null)}
      >
        <Box height="50vh" paddingBottom={7} paddingTop={2} borderRadius="20%">
          {player.faction && (
            <FactionDetails
              factionKey={player.faction}
              isAdvancedMode={game.isAdvancedMode}
            />
          )}
        </Box>
      </Drawer>
      <Drawer
        anchor="bottom"
        open={menuIndex === 3}
        onClose={() => setMenuIndex(null)}
      >
        {factionRules.length > 0 ? (
          <Box
            height="50vh"
            paddingBottom={7}
            paddingTop={2}
            borderRadius="20%"
          >
            <MarginList p={2} overflow="auto" height="calc(100% - 22px)">
              {factionRules.map((rule, index) => (
                <RuleCard key={`${rule.name}${index}`} {...rule} />
              ))}
            </MarginList>
          </Box>
        ) : (
          <Box paddingBottom={8} paddingTop={2} px={2}>
            <EmptyState
              title="No faction rules"
              description="There are no faction rules that apply currently."
            />
          </Box>
        )}
      </Drawer>
    </>
  )
}
