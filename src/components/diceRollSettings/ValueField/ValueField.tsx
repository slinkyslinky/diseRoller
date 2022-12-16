import React from 'react'
import './ValueField.scss'
import Counter from '../../common/counter/Counter'

type Props = {
   type: "number" | "string",
   name: string,
   setValue: any,
   value: string | number,
}


export default function ValueField({ type = "number", name, setValue, value }: Props) {
   if (typeof value === "number")
      return (
         <div className='value-field'>
            <label htmlFor={name}>{name}:</label>
            <Counter name={name} setValue={setValue} value={value} min={1} max={20} />

         </div>
      )
   else return <></>
}
