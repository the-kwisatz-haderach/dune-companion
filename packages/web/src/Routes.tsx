import { Switch, Route } from 'react-router-dom'
import { WebsocketProvider } from './contexts/WebsocketContext'
import { MainLayout } from './layouts/MainLayout'
import { CreateGame } from './pages/CreateGame'
import { GameRoom } from './pages/GameRoom'
import Home from './pages/Home'

export const Routes = () => (
  <MainLayout>
    <Switch>
      <WebsocketProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={CreateGame} />
        <Route path="/game/:id" component={GameRoom} />
      </WebsocketProvider>
    </Switch>
  </MainLayout>
)
