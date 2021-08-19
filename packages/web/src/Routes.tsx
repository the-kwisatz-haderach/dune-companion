import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { useGameConnection } from './dune-react'
import { MainLayout } from './layouts/MainLayout'
import { CreateGame } from './pages/CreateGame'
import { GameRoom } from './pages/GameRoom'
import Home from './pages/Home'

const ConnectedRoute: React.FC<RouteProps> = props =>
  useGameConnection().isConnected() ? <Route {...props} /> : <Redirect to="/" />

export const Routes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <ConnectedRoute exact path="/game" component={CreateGame} />
        <ConnectedRoute path="/game/:id" component={GameRoom} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  )
}
