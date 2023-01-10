import React from 'react'
import { useAppSelector } from '../../hooks/hooks'
import './BigButton.scss'

type Props = {
   type: any,
   pool: any,
   onClick: any,

}

export default function BigButton({ type, pool, onClick }: Props) {

   const isRolling = useAppSelector(state => state.rollReducer.isRolling)


   if (!isRolling) {
      return (
         <button className={'big-button ' + 'big-button--' + type} onClick={(e) => { onClick(e, pool) }}>{type}</button>
      )
   } else
      return (
         <button className={'big-button big-button--disabled ' + 'big-button--' + type} >ROLLING...</button>
      )

}
