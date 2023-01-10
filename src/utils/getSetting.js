export default function getSetting(name, settings) {
   const setting = settings.find(item => item.name === name)
   if (setting) {
      return settings[settings.indexOf(setting)]
   }
   else return undefined
}
