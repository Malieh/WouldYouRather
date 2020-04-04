import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    option1: "",
    option2: "",
    home: false,
  };

  handleChange = (e, optionIndex) => {
    const text = e.target.value;
    this.setState((previousState) => {
      return optionIndex === 1
        ? { ...previousState, option1: text }
        : { ...previousState, option2: text };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props,
      { option1, option2 } = this.state;
    dispatch(handleAddQuestion(option1, option2));
    this.setState((previousState) => {
      return {
        ...previousState,
        home: true,
      };
    });
  };

  render() {
    const { authedUser, users } = this.props,
      { option1, option2, home } = this.state;

    if (home === true) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <h3 className='center'>New Question</h3>
        <div className='question'>
          <img
            src={`/${users[authedUser].avatarURL}`}
            className='avatar'
          />
          <span>Would You Rather</span>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className='option'>
              <textarea
                value={option1}
                onChange={(event) => this.handleChange(event, 1)}
              />
              <span className='hint'>Option One</span>
            </div>
            <div className='option opt-offset'>
              <textarea
                value={option2}
                onChange={(e) => this.handleChange(e, 2)}
              />
              <span className='hint'>Option Two</span>
            </div>
            <button
              className='btn'
              type='submit'
              disabled={option1 === "" || option2 === ""}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);
