import React from 'react'
import './Arrow.scss';
type Props = {
   type: "increment" | "decrement",
   onClick: any,
   value: number,
   edge: number
}
export default function Arrow({ type, onClick, value, edge }: Props) {

   let className = 'counter__arrow '
   let clickValue = 0;
   let additionalValue = 1;




   if (type === "increment") {
      className += "counter__arrow--increment "
      clickValue = value + additionalValue
   } else {
      className += "counter__arrow--decrement "
      clickValue = value - additionalValue
   }


   if (value === edge) {
      return (
         <button className='counter__arrow counter__arrow--disabled'></button>
      )
   } else {
      return (
         <button onClick={(e) => { onClick(clickValue) }} className={className} ></button>
      )

   }
   return <></>
}
