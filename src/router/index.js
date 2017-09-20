import Vue from 'vue'
import Router from 'vue-router'

import Hello from '../components/Hello'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import FirstSetting from '../components/FirstSetting'
import SecondSetting from '../components/SecondSetting'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/first-setting',
      name: 'FirstSetting',
      component: FirstSetting
    },
    {
      path: '/second-setting',
      name: 'SecondSetting',
      component: SecondSetting
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  // else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router
