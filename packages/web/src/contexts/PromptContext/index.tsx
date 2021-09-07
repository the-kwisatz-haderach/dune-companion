import { useCallback, useState, createContext, useContext } from 'react'
import { prompts, Prompts } from './Prompts'

type IPromptContext = <T extends keyof Prompts>(
  promptName: T,
  ...props: Parameters<Prompts[T]>
) => void

const PromptContext = createContext<IPromptContext>(() => {})

const RootPrompt = (props: {
  promptName?: keyof Prompts
  promptProps?: Parameters<Prompts[keyof Prompts]>
  closePrompt: () => void
}) => {
  if (!props.promptName) return <></>
  const { promptName, promptProps, closePrompt } = props
  const Prompt = prompts[promptName]
  return <Prompt {...(promptProps ?? {})} closePrompt={closePrompt} />
}

export const PromptProvider: React.FC = ({ children }) => {
  const [prompt, setPrompt] = useState<{
    promptName: keyof Prompts
    promptProps: Parameters<Prompts[keyof Prompts]>
  }>()

  const showPrompt: IPromptContext = useCallback(
    (promptName, ...promptProps) => {
      setPrompt({ promptName, promptProps })
    },
    []
  )

  const closePrompt = useCallback(() => {
    setPrompt(undefined)
  }, [])

  return (
    <PromptContext.Provider value={showPrompt}>
      {children}
      <RootPrompt {...prompt} closePrompt={closePrompt} />
    </PromptContext.Provider>
  )
}

export default function usePromptContext() {
  return useContext(PromptContext)
}
