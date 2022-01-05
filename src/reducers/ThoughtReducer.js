export const ThoughtReducer = (state = { thoughts: [] }, action) => {
  switch (action.type) {
    case "ADD_THOUGHT":
      return { thoughts: action.payload };
    case "REMOVE_THOUGHT":
      return { thoughts: action.payload };
    default:
      return state;
  }
};
