import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultData } from "../types/types";


type LogStat = {
   logList: ResultData[],
   isOpen: boolean
}

const initialState: LogStat = {
   logList: [],
   isOpen: false
}



const logSlice = createSlice({
   name: "logSlice",
   initialState,
   reducers: {
      toggleLog: (state) => {
         if (state.isOpen) {
            state.isOpen = false
         } else {
            state.isOpen = true
         }

      },
      addToLog: (state, action: PayloadAction<any>) => {
         state.logList.push(action.payload)

      },
      clearLog: (state) => {
         state.logList = initialState.logList
      }
   },

})

export default logSlice.reducer
export const { addToLog, clearLog, toggleLog } = logSlice.actions