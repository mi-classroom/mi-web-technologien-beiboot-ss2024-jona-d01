import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import Aura from '@primevue/themes/aura'

import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Carousel from 'primevue/carousel'
import FileUpload from 'primevue/fileupload'
import Galleria from 'primevue/galleria'
import InputNumber from 'primevue/inputnumber'
import ProgressSpinner from 'primevue/progressspinner'
import SelectButton from 'primevue/selectbutton'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import Step from 'primevue/step'
import Steps from 'primevue/steps'
import Stepper from 'primevue/stepper'
import StepItem from 'primevue/stepitem'
import StepList from 'primevue/steplist'
import StepPanel from 'primevue/steppanel'
import StepPanels from 'primevue/steppanels'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: '',
      darkModeSelector: '.my-app-dark',
      cssLayer: false
    }
  }
})

app.component('ProgressSpinner', ProgressSpinner)
app.component('FileUpload', FileUpload)
app.component('Steps', Steps)
app.component('Button', Button)
app.component('Badge', Badge)
app.component('Stepper', Stepper)
app.component('StepList', StepList)
app.component('StepPanels', StepPanels)
app.component('StepItem', StepItem)
app.component('Step', Step)
app.component('StepPanel', StepPanel)
app.component('Carousel', Carousel)
app.component('Skeleton', Skeleton)
app.component('Slider', Slider)
app.component('InputNumber', InputNumber)
app.component('Galleria', Galleria)
app.component('SelectButton', SelectButton)

app.mount('#app')
