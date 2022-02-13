import { Phases } from '@dune-companion/engine'
import { Box, Fade, Slide } from '@material-ui/core'
import { useTransition } from '../hooks/useTransition'
import { CommonActionMenu } from '../pages/GameRoom/Common/CommonActionMenu'
import { Loading } from '../pages/Loading'
import styles from './PhaseLayout.module.css'

type Props = {
  phase: Phases
  delayedPhase: Phases
}

export const PhaseLayout: React.FC<Props> = ({
  children,
  phase,
  delayedPhase
}) => {
  const transition = useTransition(phase, {
    duration: 3500,
    condition: phase !== 'FACTION_SELECT'
  })
  return (
    <>
      <Fade in={!transition} timeout={1000} unmountOnExit>
        <Box position="relative">{children}</Box>
      </Fade>
      <Fade in={transition} timeout={1000} unmountOnExit>
        <Box position="relative" zIndex={10000}>
          <Loading phase={phase} />
        </Box>
      </Fade>
      {delayedPhase !== 'FACTION_SELECT' && (
        <div className={styles.menu}>
          <Slide direction="up" in={!transition}>
            <div>
              <CommonActionMenu />
            </div>
          </Slide>
        </div>
      )}
    </>
  )
}
