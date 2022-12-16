import React from 'react'
import ValueField from '../ValueField/ValueField'
import './SettingsField.scss'

type Props = {
   listOfSettings?: any,
   setRollAmount: any,
   rollAmount: number,

}

export default function SettingsField({ listOfSettings, setRollAmount, rollAmount }: Props) {



   return (
      <div className='settings'>
         <h4>Settings</h4>
         <div className="settings__values">
            {listOfSettings?.map((item: any) => <ValueField type={listOfSettings.type} name={listOfSettings.name} value="" setValue="" />)}
            {/* <ValueField type="number" name="Success" />
            <ValueField type="number" name="Advant" /> */}
            <ValueField type="number" name="Rolls" setValue={setRollAmount} value={rollAmount} />
         </div>

      </div>
   )
}
