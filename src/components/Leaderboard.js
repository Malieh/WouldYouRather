import { connect } from "react-redux";
import React, { Fragment } from "react";
function Leaderboard(props) {
  const { users } = props,
    userArray = Object.keys(users).map((key) => users[key]),
    sortedUser = userArray.sort((a, b) => {
      return (
        Object.keys(b.answers).length +
        b.questions.length -
        Object.keys(a.answers).length +
        a.questions.length
      );
    });

  return (
    <Fragment>
      <h3 className='center'>Leaderboard</h3>
      <ul className='u-list'>
        {sortedUser.map((user) => (
          <li key={user.id}>
            <div className='u'>
              <img src={user.avatarURL} className='avatar' />
              <span>{user.name}</span>
              <div className='u-stats'>
                <p>Asked: {user.questions.length}</p>
                <p>Answered: {Object.keys(user.answers).length}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
