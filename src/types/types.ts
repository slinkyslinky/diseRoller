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
   dices: Pool,
   images?: any
   preload?: string[]
}

export type SystemList = string[]

export type Setting = {
   name: string,
   type: "number" | "string",
   value: number | string
}


export type ResultData = {
   pool: (string | number)[],
   result: (string | number)[],
   status: string
}
