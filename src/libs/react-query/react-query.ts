import { setLogger } from 'react-query';

export const setReactQueryLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    const noop = () => {};
    setLogger({
      log: noop,
      warn: noop,
      error: noop
    });
  }
};
