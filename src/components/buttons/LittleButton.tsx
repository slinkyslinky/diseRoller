import React from 'react'
import './littleButton.scss'

type Props = {
   img: any,
   onClick: any,
   modal: any,
}

export default function LittleButton({ img, onClick, modal }: Props) {


   return (
      <button className='little-button' onClick={() => onClick(modal)}>
         {img}

      </button>
   )
}
