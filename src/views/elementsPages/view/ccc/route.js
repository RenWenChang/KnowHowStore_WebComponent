export default {
    path: 'ccc',
    name: 'ccc',
    component: () => import(/* webpackChunkName: "landingPage" */ '@/views/elementsPages/view/ccc/index.vue'),
    children: [
        // {
        //     path: 'add',
        //     name: 'UC0105Add',
        //     component: resolve => require(['@/views/UC0105/Add.vue'], resolve),
        // }
    ]
}