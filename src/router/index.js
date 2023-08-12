import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Signup from '../views/Account/Signup.vue'
import Login from '../views/Account/Login.vue'
import ResetPass from '../views/Account/ResetPassword.vue'
import MyPage from '../views/MyPage/MyPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },  
    {
      path: '/ResetPass',
      name: 'ResetPass',
      component: ResetPass
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/MyPage',
      name: 'MyPage',
      component: MyPage
    },
  ]
})

export default router
