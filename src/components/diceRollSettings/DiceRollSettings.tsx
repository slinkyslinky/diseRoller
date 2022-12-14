import React from 'react'
import BigButton from '../buttons/BigButton'

import './DiceRollSettings.scss'

type Props = {
   pool: any,
   roll: any,
   getStatistic: any,
}

export default function DiceRollSettings({ pool, roll, getStatistic }: Props) {
   return (
      <div className='dice-roll-settings'>

         <BigButton type='statistic' pool={pool} onClick={getStatistic} />
         <BigButton type='roll' pool={pool} onClick={roll} />
      </div>
   )
}
