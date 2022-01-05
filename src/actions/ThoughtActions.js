export const AddThoughtAction = (thought) => (dispatch, getState) => {
  const {
    Thought: { thoughts },
  } = getState();

  dispatch({
    type: "ADD_THOUGHT",
    payload: [{ id: thought.id, thought }, ...thoughts],
  });
};

export const RemoveThoughtAction = (thought) => (dispatch, getState) => {
  const {
    Thought: { thoughts },
  } = getState();

  dispatch({
    type: "REMOVE_THOUGHT",
    payload: thoughts.filter((thot) => thot.id !== thought.id),
  });
};
