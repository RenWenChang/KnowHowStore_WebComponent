export default {
    path: 'eee',
    name: 'eee',
    component: () => import(/* webpackChunkName: "landingPage" */ '@/views/elementsPages/view/eee/index.vue'),
    children: [
        // {
        //     path: 'add',
        //     name: 'UC0105Add',
        //     component: resolve => require(['@/views/UC0105/Add.vue'], resolve),
        // }
    ]
}