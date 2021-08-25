import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { useGameConnection } from './dune-react'
import { GameLayout } from './layouts/GameLayout'
import { CreateGame } from './pages/CreateGame'
import { GameRoom } from './pages/GameRoom'
import Home from './pages/Home'

const ConnectedRoute: React.FC<RouteProps> = props =>
  useGameConnection().isConnected() ? <Route {...props} /> : <Redirect to="/" />

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ConnectedRoute exact path="/game" component={CreateGame} />
      <GameLayout>
        <ConnectedRoute path="/game/:id" component={GameRoom} />
      </GameLayout>
      <Redirect to="/" />
    </Switch>
  )
}
