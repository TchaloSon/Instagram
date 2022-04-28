import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{requiresAuth:true}
    },

   {
    path: '/settings',
    name: 'settings',
    meta:{requiresAuth:true},
    component: () => import( '../components/settings.vue')
  },
  {
    path:'/register',
    name:'register',
    meta:{guest:true},
    component: () => import(/* webpackChunkName: "about" */ '../components/register.vue')
  },
  {
    path:'/login',
    name:'login',
    meta:{guest:true},
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
   {
    path:'/chat-room',
    name:'chat',
    meta:{requiresAuth:true},
    component: () => import( '../components/chat.vue')
  }

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

 function isLoggedIn(){
 
  return store.state.isAuth;
   
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // cette route demande une autorisation, vérifions si l'utilisateur est logué.
    // sinon, redirigeons le sur la page de login.
    if (!isLoggedIn()) {
      next({
       name:'login'
      })
    } else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.guest)) {
    // cette route demande une autorisation, vérifions si l'utilisateur est logué.
    // sinon, redirigeons le sur la page de login.
    if (isLoggedIn()) {
      next({
       name:'home'
      })
    } else {
      next()
    }
  }
  else{
    next()
  }
  })





export default router
