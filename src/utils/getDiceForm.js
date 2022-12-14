export function getDiceForm(weight) {
   switch (weight) {
      case 4:
         return "d4"
      case 6:
         return "d6"
      case 8:
         return "d8"
      case 10:
         return "d10"
      case 12:
         return "d12"
      case 20:
         return "d20"

      default:
         return ''

   }
}