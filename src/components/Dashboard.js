import React, { Component, Fragment } from "react";

import Question from "./Question";
import { connect } from "react-redux";
class Dashboard extends Component {
  state = {
    answered: false,
  };

  handleFilterClick = function (answered) {
    this.setState(function () {
      return {
        answered,
      };
    });
  };

  render() {
    const { answered } = this.state,
      { authedUser, questions } = this.props,
      quesArray = Object.keys(questions).map((key) => questions[key]),
      filteredQues = quesArray.filter(function (question) {
        const contains =
          question.optionTwo.votes.indexOf(authedUser) > -1 ||
          question.optionOne.votes.indexOf(authedUser) > -1;
        return answered ? contains : !contains;
      }),
      sortedQues = filteredQues.sort(
        (first, second) => second.timestamp - first.timestamp
      );

    return (
      <Fragment>
        <h3 className='center'>Dashboard</h3>
        <div className='b-g'>
          <button
            className={!answered ? "b-l active" : "b-l"}
            onClick={(event) => this.handleFilterClick(false)}
          >
            Unanswered
          </button>
          <button
            className={answered ? "br active" : "b-r"}
            onClick={(event) => this.handleFilterClick(true)}
          >
            Answered
          </button>
        </div>
        <ul className='q-l'>
          {sortedQues.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard);
