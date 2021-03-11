import { Loading, QSpinnerOval } from 'quasar'

Loading.setDefaults({
   backgroundColor: 'grey-8',
   messageColor: 'negative',
   message: 'Loading...',
   spinner: QSpinnerOval,
   spinnerColor: 'negative',
   spinnerSize: '140',
})