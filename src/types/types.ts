export type Dice = {
   name: string,
   color: string,
   weight: number,
   queue: number,
   order: number,
   value: string | number,
   values: string[]
}
export type Pool = Dice[]

export type System = {
   name: string,
   settings: Setting[],
   dice: Pool,
   images?: any
}

export type Setting = {
   name: string,
   type: "number" | "string"
}

