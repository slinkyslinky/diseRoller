import React from 'react'
import { useEffect, useRef } from 'react';
import LittleButton from '../buttons/LittleButton';
import LogItem from '../LogItem/LogItem'
import './Log.scss'
import Close from '../../svg/Close'
import { ResultData, System } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { clearLog, toggleLog } from '../../store/logSlice';



export default function Log() {

   const logList = useAppSelector(state => state.logReducer.logList)
   console.log(logList);

   const dispatch = useAppDispatch()
   const system = useAppSelector(state => state.systemReducer.systemData)
   const isLogOpen = useAppSelector(state => state.logReducer.isOpen)
   const logBoxRef = useRef<HTMLDivElement>(null)
   const closeButtonRef = useRef<HTMLButtonElement>(null)

   const maxLogSize = 30
   let i = 0


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

   let logClasses = 'log'

   if (isLogOpen) {
      logClasses += ' log--open'
   }



   return (
      <div className={logClasses} onClick={(e) => openInfo(e)}>
         <button ref={closeButtonRef} className="log__close-button"
            onClick={() => {
               dispatch(toggleLog())
               closeButtonRef.current?.classList.toggle("log__close-button--open")
            }
            }> </button>


         <div className="log__title">
            <h2>Log</h2>
            <LittleButton img={<Close />} onClick={() => dispatch(clearLog())} modal={''} />
         </div>


         <div ref={logBoxRef} className="log__box" >
            {
               logList.map((result: ResultData) => {
                  i++;
                  if (logList.length - i > maxLogSize) return <></>
                  return <LogItem key={i} id={i} resultData={result} system={system} />
               })
            }
         </div>
      </div>
   )
}
