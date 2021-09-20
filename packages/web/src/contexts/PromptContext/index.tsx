import { useCallback, useState, createContext, useContext } from 'react'
import { RootPrompt } from './Prompts/RootPrompt'
import { Prompts } from './Prompts'
import { IPromptContext } from './types'

const PromptContext = createContext<IPromptContext>(() => {})

export const PromptProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState<{
    promptName: keyof Prompts
    promptProps: Omit<
      Parameters<Prompts[keyof Prompts]>[0],
      'closePrompt' | 'open'
    >
  }>()

  const showPrompt: IPromptContext = useCallback((promptName, promptProps) => {
    setPrompt({ promptName, promptProps })
    setOpen(true)
  }, [])

  const closePrompt = useCallback(() => {
    // setPrompt(undefined)
    setOpen(false)
  }, [])

  return (
    <PromptContext.Provider value={showPrompt}>
      {children}
      <RootPrompt {...prompt} closePrompt={closePrompt} open={open} />
    </PromptContext.Provider>
  )
}

export default function usePromptContext() {
  return useContext(PromptContext)
}
