import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Ques from "./Question";

const QuestionPage = (props) => {
  const { id, questions } = props,
    ques = questions[id];

  if (ques == null) {
    return <Redirect from='*' to='/not-found' />;
  }

  return (
    <Fragment>
      <h3 className='center'>Question</h3>
      {ques && <Ques question={ques} />}
    </Fragment>
  );
};

const mapStateToProps = ({ questions }, props) => {
  const { id } = props.match.params;

  return {
    id,
    questions,
  };
};

export default connect(mapStateToProps)(QuestionPage);
