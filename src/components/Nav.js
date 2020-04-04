import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  const { authedUser, users } = props,
    avatar = authedUser ? users[authedUser].avatarURL : "avater.jpg",
    authed = authedUser !== null;

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' exact activeClassName='active'>
            New
          </NavLink>
        </li>
        {authed ? (
          <li>
            <NavLink to='/login' exact activeClassName='active'>
              <div className='nav-user'>
                Logout
                <img src={avatar} className='nav-avatar' />
                {authedUser}
              </div>
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to='/login' exact activeClassName='active'>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser,
  };
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav);
