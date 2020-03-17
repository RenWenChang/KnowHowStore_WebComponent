export default {
    path: 'ddd',
    name: 'ddd',
    component: () => import(/* webpackChunkName: "landingPage" */ '@/views/elementsPages/view/ddd/index.vue'),
    children: [
        // {
        //     path: 'add',
        //     name: 'UC0105Add',
        //     component: resolve => require(['@/views/UC0105/Add.vue'], resolve),
        // }
    ]
}