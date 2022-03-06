import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  Reducer,
  useMemo
} from 'react'

type GameSettings = {
  showAllFactionRules: boolean
}

const initialGameSettings: GameSettings = {
  showAllFactionRules: false
}

type GameSettingsActions = { type: 'updateRuleVisibility'; payload: boolean }

type GameSettingsDispatch = Dispatch<GameSettingsActions>
type IGameSettingsContext = GameSettings & { dispatch: GameSettingsDispatch }

const GameSettingsContext = createContext<IGameSettingsContext>({
  ...initialGameSettings,
  dispatch: () => {}
})

const gameSettingsReducer: Reducer<GameSettings, GameSettingsActions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'updateRuleVisibility': {
      return {
        ...state,
        showAllFactionRules: action.payload
      }
    }
    default:
      return state
  }
}

export const GameSettingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameSettingsReducer, initialGameSettings)

  const value = useMemo(
    () => ({
      ...state,
      dispatch
    }),
    [state]
  )

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  )
}

export default function useGameSettingsContext() {
  return useContext(GameSettingsContext)
}
