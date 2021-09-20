import { prompts, Prompts } from '.'

export const RootPrompt = (props: {
  promptName?: keyof Prompts
  promptProps?: Omit<
    Parameters<Prompts[keyof Prompts]>[0],
    'closePrompt' | 'open'
  >
  closePrompt: () => void
  open: boolean
}) => {
  if (!props.promptName) return <></>
  const { promptName, promptProps, closePrompt, open } = props
  const Prompt = prompts[promptName]
  return (
    <Prompt {...(promptProps ?? {})} closePrompt={closePrompt} open={open} />
  )
}
