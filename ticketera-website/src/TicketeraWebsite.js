import React from "react";

import { Provider } from "react-redux";
import { store } from './redux/configureStore';

import { AppRouter } from './routers/AppRouter';
import { Toaster } from "sonner";
import { MainScreen } from "./components/root/MainScreen";
import { TicketsScreen } from "./components/ticket/TicketsScreen";
import { BrowserRouter } from "react-router-dom";


const TicketeraWebsite = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />

      </BrowserRouter>
{/*     <TicketsScreen /> */}
{/*       <MainScreen /> */}
      <Toaster richColors closeButton />
    </Provider>
  );
};

export default TicketeraWebsite;
