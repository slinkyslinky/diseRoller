import React from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchRoll } from '../../store/rollSlice'
import BigButton from '../buttons/BigButton'

import './DiceRollSettings.scss'
import SettingsField from './SettingsField/SettingsField'

type Props = {
   pool: any,
   roll: any,
   getStatistic: any,
   requestStatus: string,
   setRollAmount: any,
   rollAmount: number,
}

export default function DiceRollSettings({ pool, roll, requestStatus, setRollAmount, rollAmount }: Props) {

   const dispatch = useAppDispatch()

   return (
      <div className='dice-roll-settings'>

         <SettingsField />
         <BigButton type='roll' pool={pool} onClick={() => dispatch(fetchRoll())} />
      </div>
   )
}
