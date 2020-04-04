import { saveQuestion, saveQuestionAnswer } from "../utils/api";

const ADD_QUESTION = "ADD_QUESTION";
const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
const ANSWER_QUESTION = "ANSWER_QUESTION";

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState(),
      questionInfo = {
        optionOneText,
        optionTwoText,
        author: authedUser,
      };
    return saveQuestion(questionInfo).then(function (question) {
      dispatch(addQuestion(question));
    });
  };
};

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const answerQuestion = (authedUser, qid, answer) => {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
};

const handleAnswerQuestion = (question, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState(),
      answerInfo = {
        authedUser,
        qid: question.id,
        answer,
      };
    return saveQuestionAnswer(answerInfo).then(function () {
      dispatch(answerQuestion(authedUser, question, answer));
    });
  };
};

export {
  ADD_QUESTION,
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  addQuestion,
  handleAddQuestion,
  handleAnswerQuestion,
  receiveQuestions,
};
