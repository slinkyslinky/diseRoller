import React, { useState } from 'react'
import Arrow from './Arrow'
import './Counter.scss'


type Props = {
   name: string,
   value: number,
   setValue: any
   min: number,
   max: number,
}

export default function Counter({ name, value, setValue, min, max }: Props) {



   return (
      <div className='counter'>
         <Arrow type="increment" onClick={setValue} value={value} edge={max} />
         <div className="counter__value" onClick={() => { setValue(value + 1) }}>{value}</div>
         <Arrow type="decrement" onClick={setValue} value={value} edge={min} />
      </div>
   )
}
