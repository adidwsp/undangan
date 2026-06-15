import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: { template: '<span aria-hidden="true" />' },
  },
  {
    path: '/:slug',
    name: 'guest',
    component: { template: '<span aria-hidden="true" />' },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
