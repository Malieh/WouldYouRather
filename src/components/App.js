import React, { Component, Fragment } from "react";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import NotFound from "./NotFound";
import QuestionPage from "./QuestionPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import { handleInitialData } from "../actions";
import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <Fragment>
        <Router>
          <div className='container'>
            <Nav />
            <div>
              <Switch>
                <ProtectedRoute
                  path='/'
                  exact
                  component={Dashboard}
                  loggedIn={loggedIn}
                />
                <ProtectedRoute
                  path='/leaderboard'
                  exact
                  component={Leaderboard}
                  loggedIn={loggedIn}
                />
                <ProtectedRoute
                  path='/add'
                  exact
                  component={NewQuestion}
                  loggedIn={loggedIn}
                />
                <ProtectedRoute
                  path='/questions/:id'
                  exact
                  component={QuestionPage}
                  loggedIn={loggedIn}
                />
                <Route path='/login' exact component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
