import { ANSWER_QUESTION } from "../actions/questions";

const checker =(store) =>{
  return function (next) {
    return function (action) {
      if (action.type === ANSWER_QUESTION) {
        const users = store.getState().users,
          answers = Object.keys(users[action.authedUser].answers);
        if (answers.indexOf(action.qid) > -1) {
          return alert("Already answered. You canonly answer 1 time.");
        }
      }
      return next(action);
    };
  };
}

export default  checker
