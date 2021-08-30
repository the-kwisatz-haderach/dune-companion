import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { useGameConnection } from './dune-react'
import { GameLayout } from './layouts/GameLayout'
import { StartGame } from './pages/StartGame'
import GameRoom from './pages/GameRoom'
import Home from './pages/Home'

const ConnectedRoute: React.FC<RouteProps> = props =>
  useGameConnection().isConnected() ? <Route {...props} /> : <Redirect to="/" />

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/game" component={StartGame} />
      <GameLayout>
        <ConnectedRoute path="/game/:id" component={GameRoom} />
      </GameLayout>
      <Redirect to="/" />
    </Switch>
  )
}
