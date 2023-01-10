import React, { useState } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import Arrow from './Arrow'
import './Counter.scss'


type Props = {
   name: string,
   value: number,
   setValueAction: any
   min: number,
   max: number,
}

export default function Counter({ name, value, setValueAction, min, max }: Props) {

   const dispatch = useAppDispatch()

   return (
      <div className='counter'>
         <Arrow type="increment" onClick={() => dispatch(setValueAction(value + 1))} value={value} edge={max} />
         <div className="counter__value" onClick={() => { dispatch(setValueAction(value + 1)) }}>{value}</div>
         <Arrow type="decrement" onClick={() => dispatch(setValueAction(value - 1))} value={value} edge={min} />
      </div>
   )
}
