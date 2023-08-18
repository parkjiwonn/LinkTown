import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Signup from '../views/Account/Signup.vue'
import Login from '../views/Account/Login.vue'
import ResetPass from '../views/Account/ResetPassword.vue'
import MyPage from '../views/MyPage/MyPage.vue'
import UpdateProfile from '../views/MyPage/UpdateProfile.vue'
import AccessWallet from '../views/MyPage/AccessWallet.vue'
import Register from '../views/Talent/Register.vue'
import Trade from '../views/Talent/Trade.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Trade',
      name: 'Trade',
      component: Trade
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/AccessWallet',
      name: 'AccessWallet',
      component: AccessWallet
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
    {
      path: '/UpdateProfile',
      name: 'UpdateProfile',
      component: UpdateProfile
    },

  ]
})

export default router
