import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(function ([
    users,
    questions,
  ]) {
    return {
      users,
      questions,
    };
  });
};

const saveQuestion = (info) => {
  return _saveQuestion(info);
};

const saveQuestionAnswer = (info) => {
  return _saveQuestionAnswer(info);
};

export { saveQuestion, saveQuestionAnswer, getInitialData };
