export const loadingSelector = actions => ({ ui: { loading } }) =>
  actions.some(action => loading[action]);

export const errorMessageSelector = actions => ({ ui: { error } }) => {
  const errors = actions.map(action => error[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return '';
};
