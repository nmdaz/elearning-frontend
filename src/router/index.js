import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import UserCourse from '@/views/UserCourse.vue'
import ForgotPassword from '@/views/ForgotPassword'
import PasswordReset from '@/views/PasswordReset'
import CoursePlayer from '@/views/CoursePlayer'
import Courses from '@/views/Courses'
import CreateCourse from '@/views/CreateCourse'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            redirectIfAuth: true
        }
    },
    {
        path: '/login/:redirect?',
        name: 'Login',
        component: Login,
        meta: { redirectIfAuth: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: Courses
    },
    {
        path: '/mycourses/course/:id',
        name: 'UserCourse',
        component: UserCourse,
        meta: { requiresAuth: true }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/password/reset/:token',
        name: 'PasswordReset',
        component: PasswordReset,
        props: true
    },
    {
        path: '/course-player/:courseId',
        name: 'CoursePlayer',
        component: CoursePlayer,
        props: true
    },
    {
        path: '/create-course',
        name: 'CreateCourse',
        component: CreateCourse
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    if (store.state.navbar)
        store.state.navbar.showLeftToggler = false;

    //browser refresh or manual url enter
    if (from.path === '/' && from.name === null) 
        store.commit('auth/refreshAuthFromSession');

    if (to.meta.requiresAuth && !store.getters['auth/authenticated']) {
        return next('/login');
    }

    if (to.meta.redirectIfAuth  && store.getters['auth/authenticated']) {
        return next('/home');
    }

    if (to.path == '/logout' || to.name == 'Logout') {
        store.commit('auth/logout');
        return next('/login');
    }

    next();
})


export default router
