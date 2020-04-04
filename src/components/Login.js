import { setAuthedUser, clearAuthedUser } from "../actions/authedUser";
import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
class Login extends Component {
  state = {
    home: false,
    userId: null,
  };

  handleSelectChange = (e) => {
    const userId = e.target.value;
    this.setState(function (previousState) {
      return {
        ...previousState,
        userId,
      };
    });
  };

  handleLogin = () => {
    const { dispatch } = this.props;
    const { userId } = this.state;
    dispatch(setAuthedUser(userId));
    this.setState(function (previousState) {
      return {
        ...previousState,
        home: true,
      };
    });
  };

  componentDidMount() {
    this.props.dispatch(clearAuthedUser());
  }

  render() {
    const { userId, home } = this.state,
      { history, users } = this.props,
      selected = userId ? userId : -1,
      avatar = userId ? users[userId].avatarURL : "avater.jpg";

    if (home) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />;
      }
      return <Redirect to='/' />;
    }

    return (
      <div>
        <h3 className='center'>Login</h3>
        <div className='login-box'>
          <span>Select user and login</span>
          <div className='u-select'>
            <img src={avatar} className='avatar' />
            <select
              value={selected}
              onChange={(event) => this.handleSelectChange(event)}
            >
              <option value={-1} disabled>
                Select user
              </option>
              {Object.keys(users).map(function (key) {
                return (
                  <option value={users[key].id} key={key}>
                    {users[key].id}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className='btn'
            disabled={userId === null}
            onClick={(e) => this.handleLogin(e)}
          >
            login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
