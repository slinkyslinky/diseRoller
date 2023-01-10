import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./logSlice";

import rollSlice from "./rollSlice";
import systemSlice from "./systemSlice";


export const store = configureStore({
   reducer: {
      systemReducer: systemSlice,
      rollReducer: rollSlice,
      logReducer: logSlice,
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch