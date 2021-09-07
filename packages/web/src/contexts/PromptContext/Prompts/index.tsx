import { PlayerSetupPrompt } from './PlayerSetupPrompt'
import { SetPlayerOrderPrompt } from './SetPlayerOrderPrompt'

export const prompts = {
  PlayerSetupPrompt,
  SetPlayerOrderPrompt
} as const

export type Prompts = typeof prompts
