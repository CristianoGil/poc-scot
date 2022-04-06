import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SignaturePDF from '../views/SignaturePDF.vue';
import SignedPDF from '../views/SignedPDF.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/signature/:personData',
        name: 'SignaturePdf',
        component: SignaturePDF,
        props: true,
    },
    {
        name: 'Signed',
        path: '/signed/:signedPDF',
        component: SignedPDF,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
