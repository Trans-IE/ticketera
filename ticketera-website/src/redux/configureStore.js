import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createLogger } from "redux-logger";
import * as ReduxThunk from "redux-thunk";
import userSlice from "./slices/userSlice";
import userInterfaceSlice from "./slices/userInterfaceSlice";
import ticketSlice from "./slices/ticketSlice";
import prioritySlice from "./slices/prioritySlice";
import stateSlice from "./slices/stateSlice";
import responsibleSlice from "./slices/responsibleSlice";
import companySlice from "./slices/companySlice";
import productSlice from "./slices/productSlice";
import failTypeSlice from "./slices/failTypeSlice";
import contractSlice from "./slices/contractSlice";
import brandsSlice from "./slices/brandsSlice";

const loggerMiddleware = createLogger();
const devTools =
  process.env.NODE_ENV === "dev"
    ? composeWithDevTools(applyMiddleware(ReduxThunk, loggerMiddleware))
    : null;

export const store = configureStore({
  reducer: {
    auth: userSlice,
    ui: userInterfaceSlice,
    ticket: ticketSlice,
    priority: prioritySlice,
    state: stateSlice,
    responsible: responsibleSlice,
    company: companySlice,
    product: productSlice,
    failType: failTypeSlice,
    contract: contractSlice,
    brands: brandsSlice,
  },
  devTools: devTools,
});
