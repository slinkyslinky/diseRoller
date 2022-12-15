import React, { useEffect } from 'react'
import LittleButton from '../buttons/LittleButton';

import './DicePanel.scss'
import Gear from '../../svg/Gear'
import Star from '../../svg/Star'
import Modal from '../modal/Modal'
import { useRef } from 'react'
import { useState } from 'react'
import { serverURL } from '../../variables/config.js'
import { Dice, System } from '../../types/types';
import DiceComponent from '../dices/DiceComponent';

type Props = {
   systems: System[],
   system: System,
   setSystem: any,
   diceBoard: Dice[],
   addToPool: (dice: Dice) => void,
   clearPool: any,
}


export default function DicePanel({ systems, system, setSystem, diceBoard, addToPool, clearPool, }: Props) {


   function chooseSystem(system: System, modal: any) {
      setSystem(system)
      showModal(modal)
      clearPool()
   }

   function showModal(modal: any) {
      modal.current.classList.toggle('modal--closed')
   }


   const systemsRef = useRef(null)
   let i = 0;
   return (
      <div className='dice-panel'>
         <div className="dice-panel__item">
            <LittleButton img={<Star />} onClick={showModal} modal='' />
         </div>
         <div className="dice-panel__item ">
            <span className="dice-panel__system">{system}</span>
            <div className="dice-panel__board">
               {diceBoard.map((dice: Dice) => {
                  i++;
                  return <DiceComponent dice={dice} size={"little"} onClick={addToPool} key={i} />
               })}

            </div>
            <div className="dice-panel__empty"></div>

         </div>
         <div className="dice-panel__item">
            <LittleButton img={<Gear />} modal={systemsRef} onClick={showModal} />
            <Modal link={systemsRef} list={systems} onItemClick={chooseSystem} />
         </div>
      </div>
   )
}
