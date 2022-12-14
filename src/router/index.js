import Vue from 'vue'
import VueRouter from 'vue-router'
import shopView from '../views/shopView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'shop',
    props: (route) => ({ id: route.params.id }),
    component: shopView
  },
  {
    path: '/',
    name: 'home',
    component: shopView
  },
  {
    path: '/',
    exact: true,
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router