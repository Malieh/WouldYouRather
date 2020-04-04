export const CLEAR_AUTHED_USER = "CLEAR_AUTHED_USER";
export const SET_AUTHED_USER = "SET_AUTHED_USER";

const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

const clearAuthedUser = () => {
  return {
    type: CLEAR_AUTHED_USER,
  };
};

export { clearAuthedUser, setAuthedUser };
