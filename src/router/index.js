import Home from '@/views/Home.vue'
import a from '@/views/personal/a.vue'
import b from '@/views/personal/b.vue'
import c from '@/views/personal/c.vue'
import d from '@/views/personal/d.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/a', component: a },
    { path: '/b', component: b },
    { path: '/c', component: c },
    { path: '/d', component: c },
  ],
})

export default router
