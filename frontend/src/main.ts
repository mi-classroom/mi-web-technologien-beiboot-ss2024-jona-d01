import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import Aura from '@primevue/themes/aura'

import FileUpload from 'primevue/fileupload'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Carousel from 'primevue/carousel'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import InputNumber from 'primevue/inputnumber'
import Galleria from 'primevue/galleria'
import SelectButton from 'primevue/selectbutton'

import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'

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
