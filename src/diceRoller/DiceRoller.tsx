
import { resolve } from 'path';
import React, { DOMElement } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DicePanel from '../components/dicePanel/DicePanel';
import DicePool from '../components/dicePool/DicePool';
import DiceRollSettings from '../components/diceRollSettings/DiceRollSettings';
import Log from '../components/Log/Log'
import { Dice, Pool, System } from '../types/types';
import { getImg } from '../utils/getImg';
import { serverURL } from '../variables/config';

export default function DiceRoller() {



   const [systems, setSystems] = useState<System[]>([])
   const [system, setSystem] = useState<System>({
      name: "No System",
      settings: [],
      dice: []
   })

   const [rollAmount, setRollAmount] = useState(1)
   const [requestStatus, setRequestStatus] = useState('')
   const [pool, setPool] = useState<Pool>([])
   const [resultOfRoll, setResultOfRoll] = useState<any>({
      pool: [],
      result: [],
      status: ''
   })
   const [logList, setLogList] = useState<any>([])

   useEffect(() => {
      fetch(serverURL + 'files/systemsList')

         .then(response => response.json())
         .then(systemList => setSystems(systemList))
      // .catch(setSystems(["Server Error"]))

   }, [])


   function getSystem(system: System) {


      fetch(serverURL + 'files/' + system + 'System')

         .then(response => response.json())
         .then(data => {


            setSystem(data)
         })
         .catch(() => setSystem({ name: "Error", settings: [], dice: [] }))

      // fetch(serverURL + '/files/' + system + 'Img')
      //    .then(response => response.json())
      //    .then(images => console.log(images))
      setLogList([])
   }







   function resetResultOfRoll() {
      setResultOfRoll({
         pool: [],
         result: [],
         status: ''
      })
   }

   function addToPool(dice: Dice): void {
      if (pool.length < 18) {
         const diceInPool = { ...dice }
         let array = [...pool, diceInPool]
         diceInPool.order = array.length
         array.sort((a, b) => { return a.queue - b.queue })
         setPool(array)
         resetResultOfRoll()
         console.log(pool);

      }

   }
   function removeFromPool(dice: Dice) {

      const index = pool.indexOf(dice)
      pool.splice(index, 1)
      setPool([...pool])
      const rest = pool.filter(item => { return item.order > dice.order }
      )
      rest.forEach(item => { item.order-- })
      resetResultOfRoll()

   }
   function clearPool(): void {

      setPool([])
      resetResultOfRoll()

   }
   function roll(e: Event, pool: Pool) {

      toggleAnimation("start")
      resetResultOfRoll()
      const logging: any = []
      let i = 0;
      getRollRequest()


      function getRollRequest() {
         if (i !== rollAmount) {
            setRequestStatus('pending')
            fetch(serverURL + 'functions/roll', {
               method: "POST",
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(pool)
            })
               .then(response => response.json())
               .then((data) => {

                  setResultOfRoll(data)
                  logging.push({ data, pool })
                  setLogList([...logList, ...logging])

                  for (let i = 0; i < pool.length; i++) {
                     pool[i].value = data.pool[i]
                  }
               })
               .then(() => {
                  console.log('workd');

                  i++
                  setTimeout(() => getRollRequest(), 500)
               })
         } else {
            setTimeout(() => toggleAnimation("end"), 0)
            setRequestStatus('compete')
         }

      }




      function toggleAnimation(isStart: "start" | "end") {
         let field = document.getElementById("dice-pool__field")
         if (field !== null) {
            const dicesInField = Array.from(field.children)
            if (isStart === "start") {

               for (let item in dicesInField) {
                  const dice = dicesInField[item]
                  dice.classList.add("big-dice--animated")
                  dice.setAttribute("style", `animation-delay: .${Math.round(Math.random() * 3)}s`)
               }
            } else {
               for (let item in dicesInField) {
                  const dice = dicesInField[item]
                  dice.classList.remove("big-dice--animated")
               }

            }
         }
      }
   }






   function reroll(target: any) {
      const numberOfDice = target.getAttribute("data-number") - 1;
      const dice = pool[numberOfDice]


      fetch(serverURL + 'functions/reroll', {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ dice, numberOfDice, resultOfRoll })
      })
         .then(response => response.json())
         .then((data) => {

            setResultOfRoll(data)
            setLogList([...logList, { data, pool }])

            for (let i = 0; i < pool.length; i++) {
               pool[i].value = data.pool[i]
            }
         })

   }
   function getStatistic(pool: Pool) {
      fetch(serverURL + 'functions/statistic', {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(pool)
      })
         .then(response => response.json())
         .then((data) => {

            setResultOfRoll(data)
            setLogList([...logList, { data }])

            for (let i = 0; i < pool.length; i++) {
               pool[i].value = data.pool[i]
            }
         })
   }

   return (
      <main className='dice-roller' >
         <div className="container">

            <DicePanel systems={systems} system={system} getSystem={getSystem} diceBoard={system.dice} addToPool={addToPool} clearPool={clearPool} />
            <DicePool system={system} removeFromPool={removeFromPool} clearPool={clearPool} pool={pool} resultOfRoll={resultOfRoll} reroll={reroll} />
            <DiceRollSettings pool={pool} roll={roll} getStatistic={getStatistic} requestStatus={requestStatus} rollAmount={rollAmount} setRollAmount={setRollAmount} />
            <Log system={system} logList={logList} setLogList={setLogList} />



         </div>
      </main>
   )
}
