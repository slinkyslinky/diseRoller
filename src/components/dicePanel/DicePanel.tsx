import React, { useEffect } from 'react'
import LittleButton from '../buttons/LittleButton';

import './DicePanel.scss'
import Gear from '../../svg/Gear'
import Star from '../../svg/Star'
import Modal from '../modal/Modal'
import { useRef } from 'react'
import { useState } from 'react'
import { serverURL } from '../../variables/config.js'
import { Dice, System, SystemList } from '../../types/types';
import DiceComponent from '../dices/DiceComponent';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';

type Props = {

   system: System,
   getSystem: any,
   diceBoard: Dice[],

   clearPool: any,
}


export default function DicePanel({ clearPool, }: Props) {


   const [isModalClosed, setIsModalClosed] = useState<boolean>(true)
   const system = useAppSelector(state => state.systemReducer.systemData)
   const diceBoard = system.dices || []


   function showModal() {
      if (isModalClosed) {
         setIsModalClosed(false)
         setTimeout(() => {
            window.addEventListener("click", closeModalHandler);
         }, 1)
      } else setIsModalClosed(true)

      function closeModalHandler() {
         setIsModalClosed(true)
         window.removeEventListener("click", closeModalHandler)
      }
   }


   const systemsRef = useRef(null)
   let i = 0;
   return (
      <div className='dice-panel'>
         <div className="dice-panel__item">
            <LittleButton img={<Star />} onClick={showModal} modal='' />
         </div>
         <div className="dice-panel__item ">
            <span className="dice-panel__system">{system.name || "No System"}</span>
            <div className="dice-panel__board">
               {diceBoard.map((dice: Dice) => {
                  i++;
                  return <DiceComponent dice={dice} size={"little"} onClick={""} key={i} />
               })}

            </div>
            <div className="dice-panel__empty"></div>

         </div>
         <div className="dice-panel__item">
            <LittleButton img={<Gear />} modal={systemsRef} onClick={showModal} />
            <Modal isClosed={isModalClosed} setIsClosed={setIsModalClosed} />
         </div>
      </div>
   )
}
