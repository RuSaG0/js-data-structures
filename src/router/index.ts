import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '@/views/page-home.vue'
import PageList from '@/views/page-list.vue'
import PageStack from '@/views/page-stack.vue'
import PageQueue from '@/views/page-queue.vue'
import PageTree from '@/views/page-tree.vue'
import PageGraph from '@/views/page-graph.vue'
import PageSet from '@/views/page-set.vue'
import PageArray from '@/views/page-array.vue'
import PageMap from '@/views/page-map.vue'

import { ERoutes } from '@/router/routes.ts'

const router = createRouter({
  history: createWebHashHistory('/js-data-structures/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
    {
      path: ERoutes.List,
      name: 'list',
      component: PageList,
    },
    {
      path: ERoutes.Stack,
      name: 'stack',
      component: PageStack,
    },
    {
      path: ERoutes.Queue,
      name: 'queue',
      component: PageQueue,
    },
    {
      path: ERoutes.Tree,
      name: 'tree',
      component: PageTree,
    },
    {
      path: ERoutes.Graph,
      name: 'graph',
      component: PageGraph,
    },
    {
      path: ERoutes.Set,
      name: 'set',
      component: PageSet,
    },
    {
      path: ERoutes.Array,
      name: 'array',
      component: PageArray,
    },
    {
      path: ERoutes.Map,
      name: 'map',
      component: PageMap,
    },
  ],
})

export default router
