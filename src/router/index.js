// import { createRouter, createWebHistory } from 'vue-router'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Produto from '../views/Produto.vue'
// import Carrinho from '../views/Carrinho.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Produto',
    component: Produto,
    props: true
  },
  // {
  //   path: '/produto',
  //   name: 'produto',
  //   component: Produto,
  //   props: true,
  //   children: [
  //     {
  //       path: ":id",
  //       component: Produto,

  //     }
  //   ]
  // },
  // {
  //   path: '/Carrinho',
  //   name: 'Carrinho',
  //   component: Carrinho
  // },
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
const router = new VueRouter({mode: 'history', routes: routes})

export default router
