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
  {
    path: '/0',
    name: 'shopInfo',
    component: shopView
  },
  {
    path: '/1',
    name: 'shopDelivery',
    component: shopView
  },
  {
    path: '/2',
    name: 'shopPayment',
    component: shopView
  }
]

const router = new VueRouter({
  routes
})

export default router