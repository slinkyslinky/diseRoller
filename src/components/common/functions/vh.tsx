export default function vh() {
   var vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty('--vh', vh + 'px');

}

