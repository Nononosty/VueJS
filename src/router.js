import { createRouter, createWebHistory } from 'vue-router'
import Lendings from '@/components/LendingBook.vue'
import Copies from '@/components/CopiesBook.vue'
import Editions from '@/components/EditionsBook.vue'

const routes = [
  {
    path: '/',
    component: Lendings,
  },
  {
    path: '/editions',
    component: Editions,
  },
  {
    path: '/copies',
    component: Copies,
  },
]

const router = createRouter({
  history: createWebHistory(), // Используем режим истории HTML5
  routes, // Список маршрутов
})

export default router
