//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import 'primeflex/primeflex.css' // Добавьте эту строку
import './style.css' // Убедитесь, что путь правильный

// Глобальная регистрация компонентов PrimeVue
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Регистрируем компоненты глобально
app.component('Button', Button)
app.component('Menubar', Menubar)
app.component('InputText', InputText)
app.component('DataTable', DataTable)
app.component('Column', Column)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '',
      cssLayer: false,
    },
  },
})

app.mount('#app')
