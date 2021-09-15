import { useCallback, useState, createContext, useContext } from 'react'
import { RootPrompt } from './Prompts/RootPrompt'
import { Prompts } from './Prompts'
import { IPromptContext } from './types'

const PromptContext = createContext<IPromptContext>(() => {})

export const PromptProvider: React.FC = ({ children }) => {
  const [prompt, setPrompt] = useState<{
    promptName: keyof Prompts
    promptProps: Omit<Parameters<Prompts[keyof Prompts]>[0], 'closePrompt'>
  }>()

  const showPrompt: IPromptContext = useCallback((promptName, promptProps) => {
    setPrompt({ promptName, promptProps })
  }, [])

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
