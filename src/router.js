import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'home',
        redirect: '/myrica'
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path: "/myrica",
        name: "myrica",
        component: () =>
            import ('./views/Myrica.vue')
    }
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})