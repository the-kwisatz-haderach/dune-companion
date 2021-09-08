import { ReactElement, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useGame, useGameDispatch, usePlayer } from '../../dune-react'
import CommonPhases from './Common/CommonPhases'
import { createPendingActionsChecker } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import {
  commonRuleSet,
  factionRuleSets,
  Factions
} from '@dune-companion/engine'
import { Loading } from '../Loading'
import { withTransition } from '../../hocs/withTransition'
import { ActionMenu } from '../../components/ActionMenu'
import usePromptContext from '../../contexts/PromptContext'
import { useRef } from 'react'

const CommonPhaseWithTransition = withTransition(CommonPhases, ({ phase }) => (
  <Loading phase={phase} />
))

const CommonActionMenu = () => {
  const player = usePlayer()
  const dispatch = useGameDispatch()

  const isReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  return (
    <ActionMenu
      primaryActionLabel={isReady ? 'Not ready' : 'Ready'}
      primaryActionType={isReady ? 'negative' : 'positive'}
      onPrimaryAction={onToggleReady}
    />
  )
}

const SetupActionMenu = () => {
  const hasSetOrder = useRef(false)
  const player = usePlayer()
  const dispatch = useGameDispatch()
  const showPrompt = usePromptContext()

  const isReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  const setPlayerOrder = () => {
    hasSetOrder.current = true
    showPrompt('SetPlayerOrderPrompt', {})
  }

  return hasSetOrder.current || !player.isAdmin ? (
    <ActionMenu
      primaryActionLabel={isReady ? 'Not ready' : 'Ready'}
      primaryActionType={isReady ? 'negative' : 'positive'}
      onPrimaryAction={onToggleReady}
    />
  ) : (
    <ActionMenu
      primaryActionLabel="Set player order"
      primaryActionType="positive"
      onPrimaryAction={setPlayerOrder}
    />
  )
}

const StormActionMenu = () => {
  const hasSetCurrentFirstPlayer = useRef(false)
  const player = usePlayer()
  const dispatch = useGameDispatch()
  const showPrompt = usePromptContext()

  const isReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  const setCurrentFirstPlayer = () => {
    hasSetCurrentFirstPlayer.current = true
    showPrompt('SetCurrentFirstPlayerPrompt', {})
  }

  return hasSetCurrentFirstPlayer.current || !player.isAdmin ? (
    <ActionMenu
      primaryActionLabel={isReady ? 'Not ready' : 'Ready'}
      primaryActionType={isReady ? 'negative' : 'positive'}
      onPrimaryAction={onToggleReady}
    />
  ) : (
    <ActionMenu
      primaryActionLabel="Set first player"
      primaryActionType="positive"
      onPrimaryAction={setCurrentFirstPlayer}
    />
  )
}

function GamePhase(): ReactElement {
  const game = useGame()
  const isPending = useMemo(() => createPendingActionsChecker(game.players), [
    game.players
  ])

  const phaseRules = Object.values(game.players)
    .map(player => player.faction)
    .filter((faction): faction is Factions => faction !== null)
    .flatMap(faction => factionRuleSets[faction][game.currentPhase])

  const rules = [
    ...commonRuleSet[game.currentPhase].filter(
      rule => !game.conditions.advancedMode || rule.isAdvanced
    ),
    ...phaseRules
  ].filter(rule => !rule.inclusionCondition || rule.inclusionCondition(game))

  switch (game.currentPhase) {
    case 'SETUP':
      if (isPending('SELECT_FACTION').forAnyPlayer()) {
        return <FactionSelect />
      }
      return (
        <CommonPhaseWithTransition
          phase={game.currentPhase}
          rules={rules}
          trigger={game.currentPhase}
          ActionMenu={SetupActionMenu}
        />
      )
    case 'STORM':
      return (
        <CommonPhaseWithTransition
          phase={game.currentPhase}
          rules={rules}
          trigger={game.currentPhase}
          ActionMenu={StormActionMenu}
        />
      )
    case 'SPICE_BLOW_AND_NEXUS':
    case 'CHOAM_CHARITY':
    case 'BIDDING':
    case 'REVIVAL':
    case 'SHIPMENT_AND_MOVEMENT':
    case 'BATTLE':
    case 'SPICE_HARVEST':
    case 'MENTAT_PAUSE':
      return (
        <CommonPhaseWithTransition
          phase={game.currentPhase}
          rules={rules}
          trigger={game.currentPhase}
          ActionMenu={CommonActionMenu}
        />
      )
    case 'FINISHED':
      return <p>FINISHED!</p>
    default:
      return <Redirect to="/" />
  }
}

export default GamePhase
