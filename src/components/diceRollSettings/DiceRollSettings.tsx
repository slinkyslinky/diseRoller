import React from 'react'
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
   return (
      <div className='dice-roll-settings'>

         <SettingsField setRollAmount={setRollAmount} rollAmount={rollAmount} />
         <BigButton type='roll' pool={pool} onClick={roll} requestStatus={requestStatus} />
      </div>
   )
}
