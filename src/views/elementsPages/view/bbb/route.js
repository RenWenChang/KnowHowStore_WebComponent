export default {
    path: 'bbb',
    name: 'bbb',
    component: () => import(/* webpackChunkName: "landingPage" */ '@/views/elementsPages/view/bbb/index.vue'),
    children: [
        // {
        //     path: 'add',
        //     name: 'UC0105Add',
        //     component: resolve => require(['@/views/UC0105/Add.vue'], resolve),
        // }
    ]
}