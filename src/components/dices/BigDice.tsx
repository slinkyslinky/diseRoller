import React, { useRef } from 'react'
import { useEffect } from 'react'
import { getDiceForm } from '../../utils/getDiceForm'
import './BigDice.scss'
import { getImg } from '../../utils/getImg.js'
import { Dice } from '../../types/types'
type Props = {
   dice: Dice,
   onClick: any,
   onRightClick: any,
   system: any,
}

export default function BigDice({ dice, onClick, onRightClick, system }: Props) {

   function onContextMenu(e: any) {
      e.preventDefault()
      onRightClick(e.currentTarget)
   }





   return (
      <button className={'big-dice dice--' + dice.color + " dice--" + getDiceForm(dice.weight)} data-number={dice.order} onClick={() => { onClick(dice) }} onContextMenu={(e) => onContextMenu(e)}>  {getImg(dice.value, system)}</button>
   )
}
