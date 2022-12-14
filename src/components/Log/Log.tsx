import React from 'react'
import { useEffect, useRef } from 'react';
import LittleButton from '../buttons/LittleButton';
import LogItem from '../LogItem/LogItem'
import './Log.scss'
import Close from '../../svg/Close'
import { System } from '../../types/types';


type Props = {
   system: System,
   logList: any,
   setLogList: any,
}
export default function Log({ system, logList, setLogList }: Props) {



   const logBoxRef = useRef<HTMLDivElement>(null)
   let i = 0;


   useEffect(() => {
      const logBox = logBoxRef.current
      if (logBox !== null) {
         logBox.scrollTop = 0 - logBox.scrollHeight
      }

   }, [logList])


   function openInfo(e: any) {
      if (e.target.className === "log__item") {

      }

   }
   function clearLog() {
      setLogList([])
   }


   return (
      <div className='log' onClick={(e) => openInfo(e)}>
         <div className="log__title">
            <h2>Log</h2>
            <LittleButton img={<Close />} onClick={() => { clearLog() }} modal={''} />
         </div>

         <div ref={logBoxRef} className="log__box" >
            {

               logList.map((logItem: any) => { i++; return <LogItem key={i} id={i} result={logItem.data.result} system={system} /> })

            }
         </div>

      </div>
   )
}
