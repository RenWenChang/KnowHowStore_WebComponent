export default {
    path: 'aaa',
    name: 'aaa',
    meta: {
        layer: 1,
        label: 'aaa',
    },
    component: () => import(/* webpackChunkName: "landingPage" */ '@/views/elementsPages/view/aaa/index.vue'),
    children: [
        // {
        //     path: 'add',
        //     name: 'UC0105Add',
        //     component: resolve => require(['@/views/UC0105/Add.vue'], resolve),
        // }
    ]
}