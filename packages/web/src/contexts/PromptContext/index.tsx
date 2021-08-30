import { useState } from 'react'
import { useContext } from 'react'
import { useCallback } from 'react'
import { createContext } from 'react'
import { Prompt, Props as PromptProps } from '../../components/Prompt'

type IPromptContext = (props: PromptProps) => void

const PromptContext = createContext<IPromptContext>(() => {})

export const PromptProvider: React.FC = ({ children }) => {
  const [prompt, setPrompt] = useState<PromptProps>()

  const showPrompt: IPromptContext = useCallback(props => {
    setPrompt(props)
  }, [])

  return (
    <PromptContext.Provider value={showPrompt}>
      {children}
      {prompt && <Prompt {...prompt} />}
    </PromptContext.Provider>
  )
}

export default function usePromptContext() {
  return useContext(PromptContext)
}
