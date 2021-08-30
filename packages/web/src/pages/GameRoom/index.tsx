import { ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import { useGame } from '../../dune-react'
import CommonPhases from './Common/CommonPhases'
import SetupPhase from './Setup/SetupPhase'

export default function GameRoom(): ReactElement {
  const { currentPhase } = useGame()
  switch (currentPhase) {
    case 'SETUP':
      return <SetupPhase />
    case 'STORM':
    case 'SPICE_BLOW_AND_NEXUS':
    case 'CHOAM_CHARITY':
    case 'BIDDING':
    case 'REVIVAL':
    case 'SHIPMENT_AND_MOVEMENT':
    case 'BATTLE':
    case 'SPICE_HARVEST':
    case 'MENTAT_PAUSE':
      return <CommonPhases />
    case 'FINISHED':
      return <p>FINISHED!</p>
    default:
      return <Redirect to="/" />
  }
}
