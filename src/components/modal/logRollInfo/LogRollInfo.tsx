import React from 'react'
import { useState } from 'react';

import './logRollInfo.scss';
type Props = {
   isOpen: boolean
}
export default function LogRollInfo({ isOpen }: Props) {

   // const classList = ["log-roll-info", "closed"]
   if (isOpen) {
      return (
         <div className={"log-roll-info"} >logRollInfo</div>
      )
   } else {
      return (
         <></>
      )
   }



}
