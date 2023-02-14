import { PlayerSetupPrompt } from './PlayerSetupPrompt'
import { SetPlayerOrderPrompt } from './SetPlayerOrderPrompt'
import { SetCurrentFirstPlayerPrompt } from './SetCurrentFirstPlayerPrompt'
import { SimplePrompt } from './SimplePrompt'
import { SetPlayerSpicePrompt } from './SetPlayerSpicePrompt'
import { SetPlayerTreacheryCardsPrompt } from './SetPlayerTreacheryCardsPrompt'
import { FactionSelectPrompt } from './FactionSelectPrompt'

export const prompts = {
  PlayerSetupPrompt,
  SetPlayerOrderPrompt,
  SetCurrentFirstPlayerPrompt,
  SimplePrompt,
  SetPlayerSpicePrompt,
  SetPlayerTreacheryCardsPrompt,
  FactionSelectPrompt
} as const

export type Prompts = typeof prompts
