const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Nav = require('./Nav');

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
            <Switch>
              <Route exact path='/' component={Nav}/>
              <Route render={function () { return <p>Not Found</p> }} />
            </Switch>
        </Router>
      </div>
    )
  }
}

module.exports = App;
