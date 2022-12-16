import React from 'react'
import './BigButton.scss'

type Props = {
   type: any,
   pool: any,
   onClick: any,
   requestStatus: string,
}

export default function BigButton({ type, pool, onClick, requestStatus }: Props) {

   if (requestStatus !== "pending") {
      return (
         <button className={'big-button ' + 'big-button--' + type} onClick={(e) => { onClick(e, pool) }}>{type}</button>
      )
   } else
      return (
         <button className={'big-button big-button--disabled ' + 'big-button--' + type} >ROLLING...</button>
      )

}
