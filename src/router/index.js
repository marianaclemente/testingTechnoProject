import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Produto from '../views/Produto.vue'
// import Carrinho from '../views/Carrinho.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produto/:id',
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
