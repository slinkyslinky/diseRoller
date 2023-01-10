import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { useAppDispatch } from "../hooks/hooks";
import { Dice, Pool, ResultData, Setting } from "../types/types";
import { serverURL } from "../variables/config";
import { addToLog } from "./logSlice";
import { RootState } from "./store";
import getSetting from "../utils/getSetting"
import timeout from "../utils/timout";


type RollState = {
   pool: Pool,
   resultData: ResultData,
   result: [],
   resultState?: string
   settings: Setting[]
   isRolling: boolean
}

const initialState: RollState = {
   pool: [],
   resultData: { pool: [], result: [], status: '' },
   result: [],
   settings: [

   ],
   isRolling: false,
}
export const fetchRoll = createAsyncThunk(
   "rollSlice/fetchRoll",
   async function (_, { getState, dispatch }) {

      const state = getState() as RootState
      const pool = state.rollReducer.pool
      const settings = state.systemReducer.systemData.settings
      const requestData = {
         pool: pool,
         settings: settings
      }

      const rollAmount = getSetting("RollAmount", settings).value
      const rollDataArray: RollState[] = []


      for (let i = 0; i < rollAmount; i++) {
         const response = await fetch(serverURL + 'functions/roll', {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
         })
         const rollData: RollState = await response.json()
         rollDataArray.push(rollData)
         setTimeout(() => {
            dispatch(addToLog(rollData))
         }, 100 * i)
      }
      await timeout(100 * rollAmount + 200)


      return rollDataArray

   })




const rollSlice = createSlice({
   name: "rollSlice",
   initialState,
   reducers: {
      addToPool: (state, action: PayloadAction<Dice>) => {
         if (state.pool.length < 18) {
            const diceInPool = { ...action.payload }
            let array = [...state.pool, diceInPool]

            array.sort((a, b) => { return a.queue - b.queue })
            array.forEach(dice => dice.order = array.indexOf(dice))
            state.pool = array
            state.resultData.result = []
            state.resultData.pool = []

         }
      },
      removeFromPool: (state, action: PayloadAction<number>) => {

         state.pool = state.pool.filter((dice) => dice.order !== action.payload)
      },
      resetPool: (state) => {

         state.pool = initialState.pool
         state.resultState = initialState.resultState
         state.resultData = initialState.resultData
         state.result = initialState.result
      },



   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRoll.fulfilled, (state, action: PayloadAction<any>) => {
            state.resultData = action.payload[action.payload.length - 1]
            state.isRolling = false
         })
         .addCase(fetchRoll.pending, (state) => {
            state.isRolling = true
         })
         .addCase(fetchRoll.rejected, (state) => {
            state.isRolling = false
         })
   }
})

export default rollSlice.reducer
export const { addToPool, removeFromPool, resetPool } = rollSlice.actions