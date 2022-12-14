import diceSet from "./diceSet/diceSet";

export function getImg(value, set) {
   let img = '';

   if (typeof value === 'string') {


      if (value === "success") { return <img src={diceSet[set]?.success} alt="success" /> }
      if (value === "advant") { return <img src={diceSet[set]?.advant} alt="advant" /> }
      if (value === "miscrit") { return <img src={diceSet[set]?.missCrit} alt="miscrit" /> }
      if (value === "crit") { return <img src={diceSet[set]?.crit} alt="crit" /> }
      if (value === "trouble") { return <img src={diceSet[set]?.disadvant} alt="trouble" /> }
      if (value === "failure") { return <img src={diceSet[set]?.miss} alt="failure" /> }

   }

   if (typeof value === 'number') {
      return <div className="dice__number">{value}</div>



   }

   return ''


}

export function getImgLite(value, set) {
   let img = '';

   if (typeof value === 'string') {


      if (value === "success") { return diceSet[set]?.success }
      if (value === "advant") { return diceSet[set]?.advant }
      if (value === "miscrit") { return diceSet[set]?.missCrit }
      if (value === "crit") { return diceSet[set]?.crit }
      if (value === "trouble") { return diceSet[set]?.disadvant }
      if (value === "failure") { return diceSet[set]?.miss }

   }

   if (typeof value === 'number') {
      return { value }



   }

   return ''
}