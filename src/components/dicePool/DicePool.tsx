import React from 'react'
import { useState } from 'react'
import LittleButton from '../buttons/LittleButton'

import './DicePool.scss'
import Close from '../../svg/Close'

import { useRef } from 'react'
import { useEffect } from 'react'
import { getImg } from '../../utils/getImg.js'
import { Dice, System } from '../../types/types'
import DiceComponent from '../dices/DiceComponent'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { resetPool } from '../../store/rollSlice'
import { toggleLog } from '../../store/logSlice'

type Props = {

   removeFromPool: any,
   clearPool: any,
   resultOfRoll: any,
   reroll: any,
}



export default function DicePool({ removeFromPool, clearPool, resultOfRoll, reroll }: Props) {

   const field = useRef<HTMLDivElement>(null)
   const resultItem = useRef<HTMLDivElement>(null)

   const system = useAppSelector(state => state.systemReducer.systemData)
   const pool = useAppSelector(state => state.rollReducer.pool)
   const resultData = useAppSelector(state => state.rollReducer.resultData)
   const isRolling = useAppSelector(state => state.rollReducer.isRolling)



   const dispatch = useAppDispatch()

   let i = 0;
   let j = 0;

   function clearResultBack() {
      const item = resultItem.current
      if (item !== null) {
         item.classList.remove('result--success');
         item.classList.remove('result--advant');
         item.classList.remove('result--neutral');
         item.classList.remove('result--trouble');
         item.classList.remove('result--failure');
         item.classList.remove('result--basic');
      }

   }
   useEffect(() => {
      clearResultBack()
      const item = resultItem.current
      if (item !== null) {
         switch (resultData.status) {
            case 'success':
            case "success&advant":
               item.classList.add('result--success');
               break;
            case 'success&trouble': item.classList.add('result--advant');
               break;
            case 'neutral':
            case 'advant':
               item.classList.add('result--neutral');
               break;
            case 'trouble': item.classList.add('result--trouble');
               break;
            case 'failure':
            case "failure&trouble":
               item.classList.add('result--failure')
               break;
            default:
               item.classList.add('result--basic');
               break;
         }
      }
   }, [resultData.result])




   return (
      <div className='dice-pool'>
         {/* <LittleButton /> */}
         <LittleButton img={<Close />} onClick={() => { dispatch(resetPool()); if (resultItem.current !== null) { resultItem.current?.classList.add('result--basic') }; }} modal={''} />
         <div ref={field} className="dice-pool__field" id="dice-pool__field">
            {pool.map((dice: Dice) => {
               i++
               return <DiceComponent system={system} key={dice.order} dice={dice} onClick={removeFromPool} onRightClick={reroll} />
            }
            )}
         </div>
         <div className="dice-pool__result">
            <div className="dice-pool__result-item">
               <span>Result</span>
            </div>
            <div ref={resultItem} className="dice-pool__result-item">
               {(resultData.result.length > 0) ? resultData.result.map((item: any) => {
                  j++;
                  return <div key={j} className='result-dice dice--grey'>{getImg(item, system.name)}</div>
               }) : <div>Empty</div>}
            </div>

         </div>
      </div>
   )
}
