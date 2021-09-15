import { prompts, Prompts } from './PromptContext/Prompts'

export const RootPrompt = (props: {
  promptName?: keyof Prompts
  promptProps?: Omit<Parameters<Prompts[keyof Prompts]>[0], 'closePrompt'>
  closePrompt: () => void
}) => {
  if (!props.promptName) return <></>
  const { promptName, promptProps, closePrompt } = props
  const Prompt = prompts[promptName]
  return <Prompt {...(promptProps ?? {})} closePrompt={closePrompt} />
}
