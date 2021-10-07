import Vue from 'vue'
import VueRouter from 'vue-router'

//Components
import posts from './components/list-posts.vue'
import users from './components/list-users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    name: 'users',
    component: users
  },
  {
    path: '/posts',
    name: 'posts',
    component: posts
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router