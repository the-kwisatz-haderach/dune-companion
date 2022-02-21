import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  RouteProps,
  useParams
} from 'react-router-dom'
import { useGameConnection } from './dune-react'
import { GameLayout } from './layouts/GameLayout'
import { StartGame } from './pages/StartGame'
import GameRoom from './pages/GameRoom'
import Home from './pages/Home'

const ConnectedRoute: React.FC<RouteProps> = () => {
  const { id } = useParams<{ id: string }>()
  const { isConnected } = useGameConnection()
  return isConnected() ? (
    <GameRoom />
  ) : (
    <Redirect to={{ pathname: '/game', state: { roomId: id } }} />
  )
}

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/game" component={StartGame} />
      <GameLayout>
        <Route path="/game/:id" component={ConnectedRoute} />
      </GameLayout>
      <Redirect to="/" />
    </Switch>
  )
}
