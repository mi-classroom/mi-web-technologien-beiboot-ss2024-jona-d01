import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'

import FileUpload from 'primevue/fileupload'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import Carousel from 'primevue/carousel'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import InputNumber from 'primevue/inputnumber'
import Galleria from 'primevue/galleria'

const app = createApp(App)

app.use(router)

app.use(PrimeVue)
app.component('FileUpload', FileUpload)
app.component('Steps', Steps)
app.component('Button', Button)
app.component('Badge', Badge)
app.component('Stepper', Stepper)
app.component('StepperPanel', StepperPanel)
app.component('Carousel', Carousel)
app.component('Skeleton', Skeleton)
app.component('Slider', Slider)
app.component('InputNumber', InputNumber)
app.component('Galleria', Galleria)

app.mount('#app')
