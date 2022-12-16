import React, { useState } from 'react'
import { getImg } from '../../utils/getImg';
import './LogItem.scss'
import LogRollInfo from '../modal/logRollInfo/LogRollInfo';
import { useRef } from 'react';
import { System } from '../../types/types';

type Props = {
   id: number,
   result: any,
   system: System,
}


export default function LogItem({ id, result, system }: Props) {
   let i = 0;
   let logInfoRef = useRef()
   const [isOpen, setIsOpen] = useState<boolean>(false);

   function writeStatus(result: any) {

      if (result.includes("crit")) {
         return "Crit Success!"
      } else if (result.includes("success")) {
         if (result.includes("advant")) {
            return "Success with Advantage!"
         } else if (!result.includes("trouble")) {
            return "Success!"
         } else {
            return "Success with Trouble"
         }
      } else if (result.includes("miscrit")) {
         return "Crit Failure!"
      } else if (result.includes("advant")) {
         return "Failure with Advantage"
      } else if (typeof result[0] === "number") {
         return ""
      } else return "Failure"
   }

   function openInfo() {
      if (isOpen === false) {
         setIsOpen(true)
      } else {
         setIsOpen(false)
      }


   }


   return (
      <div className='log__item' onClick={(e: any) => openInfo()}>
         <div>{id}: </div>
         {/* <div className='log__block'><span>P: </span>{pool.map(item => getImg(item))}</div> */}
         <div className='log__block'>{result.map((item: any) => { i++; return <div key={i} className="log__dice dice--grey">{getImg(item, system.name)} </div> })}</div>
         <div>{writeStatus(result)}</div>
         <LogRollInfo isOpen={isOpen} />
      </div>
   )
}
