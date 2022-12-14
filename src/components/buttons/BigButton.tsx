import React from 'react'
import './BigButton.scss'

type Props = {
   type: any,
   pool: any,
   onClick: any,
}

export default function BigButton({ type, pool, onClick }: Props) {
   return (
      <button className={'big-button ' + 'big-button--' + type} onClick={() => { onClick(pool) }}>{type}</button>
   )
}
