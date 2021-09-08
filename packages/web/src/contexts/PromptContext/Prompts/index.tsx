import { PlayerSetupPrompt } from './PlayerSetupPrompt'
import { SetPlayerOrderPrompt } from './SetPlayerOrderPrompt'
import { SetCurrentFirstPlayerPrompt } from './SetCurrentFirstPlayerPrompt'

export const prompts = {
  PlayerSetupPrompt,
  SetPlayerOrderPrompt,
  SetCurrentFirstPlayerPrompt
} as const

export type Prompts = typeof prompts
