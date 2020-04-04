import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/questions";

class Question extends Component {
  handleOptionClick = (option) => {
    const { answerQuestion, authedUser, question } = this.props;
    const answer = option === 1 ? "optionOne" : "optionTwo";
    answerQuestion(authedUser, question.id, answer);
  };

  render() {
    const { authedUser, question, users } = this.props,
      answers = Object.keys(users[authedUser].answers),
      answered = answers.indexOf(question.id) > -1 ? true : false,
      votesOpt1 = question.optionOne.votes.length,
      votesOpt2 = question.optionTwo.votes.length,
      votesTotal = votesOpt1 + votesOpt2,
      percentVotesOpt1 = (votesOpt1 / votesTotal).toFixed(2) * 100,
      percentVotesOpt2 = (votesOpt2 / votesTotal).toFixed(2) * 100;

    return (
      <Link to={`/questions/${question.id}`} className='question'>
        <img src={`/${users[question.author].avatarURL}`} className='avatar' />
        <span>Would You Rather</span>
        <div className='option'>
          <button
            className={
              question.optionOne.votes.indexOf(authedUser) > -1
                ? ""
                : answered
                ? "answered"
                : ""
            }
            onClick={() => this.handleOptionClick(1)}
          >
            {question.optionOne.text}
          </button>
          {answered && (
            <span className='stats'>
             {question.optionOne.votes.length} ({percentVotesOpt1}
              % Votes)
            </span>
          )}
        </div>
        <div className='option opt-offset'>
          <button
            className={
              question.optionTwo.votes.indexOf(authedUser) > -1
                ? "question-option-selected"
                : answered
                ? "answered"
                : ""
            }
            onClick={() => this.handleOptionClick(2)}
          >
            {question.optionTwo.text}
          </button>
          {answered && (
            <span className='stats'>
               {question.optionTwo.votes.length} ({percentVotesOpt2}
              % Votes)
            </span>
          )}
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps, actions)(Question);
