import { PropsWithChildren, ReactElement, useMemo } from 'react'
import { Prompt } from '../../../../components/Prompt'
import { PromptProps } from '../../types'
import { DialogAction } from '../../../../components/Prompt/Prompt'

type Props = {
  title?: string
  primaryAction?: DialogAction
  closable?: boolean
}

export function SimplePrompt({
  open,
  title,
  closePrompt,
  children,
  primaryAction,
  closable = true
}: PropsWithChildren<PromptProps & Props>): ReactElement {
  const actions: [DialogAction, ...DialogAction[]] | undefined = useMemo(
    () =>
      primaryAction && [
        primaryAction,
        ...(closable
          ? [
              {
                label: 'Close',
                onClick: closePrompt
              }
            ]
          : [])
      ],
    [primaryAction, closable, closePrompt]
  )
  return (
    <Prompt
      open={open}
      title={title}
      onClose={closable ? closePrompt : undefined}
      actions={actions}
    >
      {children}
    </Prompt>
  )
}
