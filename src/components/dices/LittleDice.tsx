import React from 'react'
import { Dice } from '../../types/types'
import { getDiceForm } from '../../utils/getDiceForm'
import './LittleDIce.scss'

type Props = {
   dice: Dice,
   onClick: any,

}

export default function LittleDice({ dice, onClick }: Props) {




   return (
      <button className={'little-dice dice--' + dice.color + " dice--" + getDiceForm(dice.weight)} onClick={() => { onClick(dice) }}></button>
   )
}
