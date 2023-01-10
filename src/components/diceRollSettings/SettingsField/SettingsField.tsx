import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import ValueField from '../ValueField/ValueField'
import './SettingsField.scss'



export default function SettingsField() {

   const systemSettings = useAppSelector(state => state.systemReducer.systemData.settings)



   return (
      <div className='settings'>
         <h4 >Settings</h4>
         <button className='settings__button big-button big-button--settings' >Settings</button>
         <div className="settings__values">
            {systemSettings?.map((setting: any) => <ValueField key={setting.name} type={setting.type} name={setting.name} value={setting.value} />)}
         </div>

      </div>
   )
}
