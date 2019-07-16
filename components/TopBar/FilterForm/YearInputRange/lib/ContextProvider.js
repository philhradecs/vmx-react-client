import React, { useReducer } from 'react';
import initReducer from './initReducer';
import { ConfigContext, DispatchContext, StateContext } from './contexts';

export default function ContextProvider({
  children,
  inputRangeOptions,
  value,
  name,
  placeholder
}) {
  const { dropValuesRange, serializer, parser } = inputRangeOptions;
  const { init, reducer } = initReducer(dropValuesRange, serializer, parser);
  const [state, dispatch] = useReducer(reducer, value, init);

  const config = {
    dropValuesRange,
    name,
    placeholder
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
