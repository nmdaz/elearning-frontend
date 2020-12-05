import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import EnrolledCourses from '@/views/EnrolledCourses.vue'
import AuthoredCourses from '@/views/AuthoredCourses.vue'
import Courses from '@/views/Courses.vue'
import ForgotPassword from '@/views/ForgotPassword'
import PasswordReset from '@/views/PasswordReset'
import CoursePlayer from '@/views/CoursePlayer'
import CreateCourse from '@/views/CreateCourse'
import EditCourse from '@/views/EditCourse'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
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
        meta: { redirectIfAuth: true }
    },
    {
        path: '/login/:redirect?',
        name: 'Login',
        component: Login,
        meta: { redirectIfAuth: true }
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
        path: '/courses',
        name: 'Courses',
        component: Courses
    },
    {
        path: '/enrolled-courses',
        name: 'EnrolledCourses',
        component: EnrolledCourses,
        meta: { requiresAuth: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                component: EnrolledCourses
            },
            {
                path: 'enrolled-courses',
                component: EnrolledCourses
            },
            {
                path: 'authored-courses',
                component: AuthoredCourses
            }
        ]
    },
    {
        path: '/authored-courses',
        name: 'AuthoredCourses',
        component: AuthoredCourses,
        meta: { requiresAuth: true }
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
        component: CreateCourse,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-course/:courseId',
        name: 'EditCourse',
        component: EditCourse,
        meta: { requiresAuth: true },
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    if (store.state.navbar) {
        store.state.navbar.showLinks = false;
        store.state.navbar.showLeftToggler = false;
    }

    //when browser is refresh or manual url enter
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
