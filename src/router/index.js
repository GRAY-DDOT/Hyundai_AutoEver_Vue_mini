import { createRouter, createWebHistory } from 'vue-router'

import BodyView from '@/views/BodyView.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      children: [{ path: '', name: 'bodyview', component: BodyView }],
    },
  ],
})

export default router
