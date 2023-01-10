import React from 'react'
import './ValueField.scss'
import Counter from '../../common/counter/Counter'
import { setAdvantValue, setRollAmount, setSuccessValue } from '../../../store/systemSlice';


type Props = {
   type: "number" | "string",
   name: string,
   value: string | number,
}


export default function ValueField({ type = "number", name, value }: Props) {


   let setValueAction;
   switch (name) {
      case "RollAmount":
         setValueAction = setRollAmount
         break;
      case "Success":
         setValueAction = setSuccessValue
         break;
      case "Advant":
         setValueAction = setAdvantValue
         break;

      default:
         break;
   }

   if (typeof value === "number")
      return (
         <div className='value-field'>
            <label htmlFor={name}>{name}:</label>
            <Counter name={name} setValueAction={setValueAction} value={value} min={1} max={20} />

         </div>
      )
   else return <></>
}
