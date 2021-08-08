import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import Home from './pages/Home'

export const Routes = () => (
  <Router>
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </MainLayout>
  </Router>
)
