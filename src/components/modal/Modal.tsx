import React from 'react'
import './modal.scss'

type Props = {
   list: any,
   link: any,
   onItemClick: any,
}

export default function Modal({ list, link, onItemClick }: Props) {

   if (list) {

      return (
         <ul ref={link} className='modal modal--closed'>
            {
               list.map((item: any) => {
                  return <li className='modal__item' key={item} onClick={() => { onItemClick(item, link) }} >{item}</li>
               })}
         </ul>
      )
   } else
      return <></>
}
