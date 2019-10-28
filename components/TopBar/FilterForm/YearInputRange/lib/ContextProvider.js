import React, { useReducer } from 'react';
import initReducer from './initReducer';
import { ConfigContext, DispatchContext, StateContext } from './contexts';

export default function ContextProvider({
  children,
  inputRangeOptions,
  value
}) {
  const { init, reducer } = initReducer(inputRangeOptions);
  const [state, dispatch] = useReducer(reducer, value, init);

  const { dropValuesRange } = inputRangeOptions;

  const config = {
    dropValuesRange
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ConfigContext.Provider value={config}>
          {children}
        </ConfigContext.Provider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
