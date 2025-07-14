import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/page-home.vue'
import { ERoutes } from '@/router/routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
    {
      path: ERoutes.List,
      name: 'list',
      component: () => import('../views/page-list.vue'),
    },
    {
      path: ERoutes.Stack,
      name: 'stack',
      component: () => import('../views/page-stack.vue'),
    },
    {
      path: ERoutes.Queue,
      name: 'queue',
      component: () => import('../views/page-queue.vue'),
    },
    {
      path: ERoutes.Tree,
      name: 'tree',
      component: () => import('../views/page-tree.vue'),
    },
    {
      path: ERoutes.Graph,
      name: 'graph',
      component: () => import('../views/page-graph.vue'),
    },
    {
      path: ERoutes.Set,
      name: 'set',
      component: () => import('../views/page-set.vue'),
    },
  ],
})

export default router
