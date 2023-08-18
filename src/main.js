import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/app.css'; // Here
import vue3GoogleLogin from 'vue3-google-login'
import VueCookies from "vue-cookies";

const app = createApp(App)

app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '865537667927-j9hllchd2l870768vrtnok4sevb6816d.apps.googleusercontent.com'
  })
app.use(VueCookies,{ expires: '1d'})

app.mount('#app')
