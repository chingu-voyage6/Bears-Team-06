const loadingReducer = (state = {}, { type }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS / *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};

export default loadingReducer;
