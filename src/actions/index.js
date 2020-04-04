import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { getInitialData } from "../utils/api";

export function handleInitialData() {
  return function (dispatch) {
    getInitialData().then(function ({ users, questions }) {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
