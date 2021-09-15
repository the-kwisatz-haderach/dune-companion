import { Prompts } from './Prompts'

export type IPromptContext = <T extends keyof Prompts>(
  promptName: T,
  props: Omit<Parameters<Prompts[T]>[0], 'closePrompt'>
) => void

export type PromptProps = {
  closePrompt: () => void
}
