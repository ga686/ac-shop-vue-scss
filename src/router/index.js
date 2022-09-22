import Vue from 'vue'
import VueRouter from 'vue-router'
import shopView from '../views/shopView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shop',
    component: shopView
  },
]

const router = new VueRouter({
  routes
})

export default router