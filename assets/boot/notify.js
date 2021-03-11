import { Notify } from 'quasar'

Notify.setDefaults({
   color: 'positive',
   icon: 'check_circle_outline',
   position: 'top',
   progress: true,
   timeout: 3000,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})