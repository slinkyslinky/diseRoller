import React, { useState } from 'react'
import { getImg } from '../../utils/getImg';
import './LogItem.scss'
import LogRollInfo from '../modal/logRollInfo/LogRollInfo';
import { useRef } from 'react';
import { ResultData, System } from '../../types/types';

type Props = {
   id: number,
   resultData: ResultData,
   system: System,
}


export default function LogItem({ id, resultData, system }: Props) {
   let i = 0;
   let logInfoRef = useRef()
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const result = resultData.result
   const resultStatus = resultData.status
   let statusClass = ''
   let statusText = ''


   function getStatus() {
      console.log(resultStatus);
      switch (resultStatus) {
         case "crit":
            statusClass = "status--success"
            statusText = "Crit Success!"
            break
         case "success":
            statusClass = "status--success"
            statusText = "Success!"
            break
         case "advant":
            statusClass = "status--advant"
            statusText = "Advant"
            break
         case "success&advant":
            statusClass = "status--success"
            statusText = "Success with Advantage!"
            break
         case "success&trouble":
            statusClass = "status--advant"
            statusText = "Success with Trouble"
            break
         case "miscrit":
            statusClass = "status--failure"
            statusText = "Crit Failure!"
            break
         case "failure&trouble":
            statusClass = "status--failure"
            statusText = "Failure with trouble!"
            break
         case "failure":
            statusClass = "status--failure"
            statusText = "Failure!"
            break
         default:
            break;
      }

   }

   function openInfo() {
      if (isOpen === false) {
         setIsOpen(true)
      } else {
         setIsOpen(false)
      }


   }

   getStatus()

   return (
      <div className={`log__item `} onClick={(e: any) => openInfo()}>
         <div>{id}: </div>
         {/* <div className='log__block'><span>P: </span>{pool.map(item => getImg(item))}</div> */}
         <div className='log__block'>{result.map((item: any) => { i++; return <div key={i} className={`log__dice dice--grey`}>{getImg(item, system.name)} </div> })}</div>
         <div className={statusClass} style={{ opacity: 0.8 }}>{statusText}</div>
         <LogRollInfo isOpen={isOpen} />
      </div>
   )
}
