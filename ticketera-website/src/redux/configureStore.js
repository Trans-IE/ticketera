
import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import { composeWithDevTools } from '@redux-devtools/extension';
import { ReactIsInDevelopmentMode } from '../helpers/buildModeHelper';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import userSlice from "./slices/userSlice";
import userInterfaceSlice from "./slices/userInterfaceSlice";

const loggerMiddleware = createLogger();
const devTools = ReactIsInDevelopmentMode() ? composeWithDevTools(applyMiddleware(ReduxThunk, loggerMiddleware)) : null;


export const store = configureStore(
  {
    reducer: {
      auth: userSlice,
      ui: userInterfaceSlice,
      
    },
    devTools: devTools
  }
);
