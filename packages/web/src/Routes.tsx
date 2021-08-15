import { Switch, Route, Redirect } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { CreateGame } from './pages/CreateGame'
import { GameRoom } from './pages/GameRoom'
import Home from './pages/Home'

export const Routes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={CreateGame} />
        <Route path="/game/:id" component={GameRoom} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  )
}
