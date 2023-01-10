import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/hooks";
import { Dice, System, SystemList } from "../types/types";
import { serverURL } from "../variables/config";
import { clearLog } from "./logSlice";
import { addToPool, resetPool } from "./rollSlice";
import getSetting from "../utils/getSetting";




export const fetchSystemList = createAsyncThunk(
   "systemSlice/fetchSystemList",
   async function () {
      const response = await fetch(serverURL + 'files/systemsList')
      const systemsList = await response.json()
      return systemsList
   }
)

export const fetchSystemData = createAsyncThunk(
   "systemSlice/fetchSystemData",
   async function (system: string, { dispatch }) {

      const response = await fetch(serverURL + 'files/' + system + 'System')
      const data = response.json()
      dispatch(clearLog())
      dispatch(resetPool())
      data.then(data => {
         if (data.preload) {
            data.preload.forEach((dice: string) => dispatch(addToPool(data.dices[+dice])))
         }
      })

      return data
   }
)

type SystemState = {
   systemList: SystemList,
   systemData: System
}

const initialState: SystemState = {
   systemList: [],
   systemData: {

   } as System
}


const systemSlice = createSlice({
   name: "systemSlice",
   initialState: initialState,
   reducers: {
      setRollAmount: (state, action: PayloadAction<number>) => {
         const settings = state.systemData.settings;
         getSetting("RollAmount", settings).value = action.payload
      },
      setSuccessValue: (state, action: PayloadAction<number>) => {
         const settings = state.systemData.settings;
         getSetting("Success", settings).value = action.payload
      },
      setAdvantValue: (state, action: PayloadAction<number>) => {
         const settings = state.systemData.settings;
         getSetting("Advant", settings).value = action.payload
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSystemList.fulfilled, (state, action: PayloadAction<SystemList>) => {
            state.systemList = action.payload
         })
         .addCase(fetchSystemData.fulfilled, (state, action: PayloadAction<System>) => {
            state.systemData = action.payload
         })
   }
})

export default systemSlice.reducer

export const { setRollAmount, setSuccessValue, setAdvantValue } = systemSlice.actions