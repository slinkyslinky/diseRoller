import React, { DOMElement, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { RootState } from '../../store/store'
import { fetchSystemData } from '../../store/systemSlice'
import './modal.scss'

type Props = {

   isClosed: boolean,
   setIsClosed: (isClosed: boolean) => void

}

export default function Modal({ isClosed, setIsClosed }: Props) {



   const dispatch = useAppDispatch()
   const systemList = useAppSelector(state => state.systemReducer.systemList)

   function chooseSystem(e: React.MouseEvent<HTMLElement>) {
      const obj = e.target as Element
      console.log(obj)
      if (obj.classList.contains("modal__item")) {

         dispatch(fetchSystemData(obj.innerHTML))
      }

   }

   if (systemList.length > 0) {

      return (
         <ul className={`modal ${isClosed ? "modal--closed" : ""}`} onClick={(e: React.MouseEvent<HTMLElement>) => chooseSystem(e)}>
            {
               systemList.map((item: string) => {
                  return <li className='modal__item' key={item}>{item}</li>
               })}
         </ul>
      )
   } else
      return <></>
}
