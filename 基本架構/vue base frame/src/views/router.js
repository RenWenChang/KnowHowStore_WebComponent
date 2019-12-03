import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'singleRecordAdd' },
    component: resolve => require(['@/frames/Frame.vue'], resolve),
    children: [
      {
        path: 'single-record',
        name: 'singleRecord',
        component: resolve => require(['@/views/singleRecord/_index.vue'], resolve),
        redirect: { name: 'singleRecordAdd' },
        children: [
          {
            path: 'add',
            name: 'singleRecordAdd',
            component: resolve => require(['@/views/singleRecord/Add.vue'], resolve),
          },
          {
            path: 'query',
            name: 'singleRecordQuery',
            component: resolve => require(['@/views/singleRecord/Query.vue'], resolve),
          },
          {
            path: 'maintain:id?',
            name: 'singleRecordMaintain',
            component: resolve => require(['@/views/singleRecord/Maintain.vue'], resolve),
          },
        ]
      },
      {
        path: 'record-complex',
        name: 'recordComplex',
        component: resolve => require(['@/views/recordComplex/_index.vue'], resolve),
        redirect: { name: 'recordComplexAdd' },
        children: [
          {
            path: 'add',
            name: 'recordComplexAdd',
            component: resolve => require(['@/views/recordComplex/Add.vue'], resolve),
          },
          {
            path: 'query',
            name: 'recordComplexQuery',
            component: resolve => require(['@/views/recordComplex/Query.vue'], resolve),
          }
        ]
      },
      {
        path: 'todo',
        name: 'todo',
        component: resolve => require(['@/views/todoList/_index.vue'], resolve),
        redirect: { name: 'todoListSignOff' },
        children: [
          {
            path: 'sign-off',
            name: 'todoListSignOff',
            component: resolve => require(['@/views/todoList/SignOff.vue'], resolve),
          },
          {
            path: 'report',
            name: 'todoListReport',
            component: resolve => require(['@/views/todoList/Report.vue'], resolve),
          }
        ]
      },
      {
        path: 'review',
        name: 'review',
        component: resolve => require(['@/views/review/_index.vue'], resolve),
        redirect: { name: 'reviewAdd' },
        children: [
          {
            path: 'add',
            name: 'reviewAdd',
            component: resolve => require(['@/views/review/Add.vue'], resolve),
          },
          {
            path: 'query',
            name: 'reviewQuery',
            component: resolve => require(['@/views/review/Query.vue'], resolve),
          }
        ]
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: resolve => require(['@/views/dashboard/_index.vue'], resolve),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/login/login.vue'], resolve)
  }
  // {
  //   path: '*',
  //   redirect: { name: 'singleRecord' },
  // },

]

const router = new VueRouter({
  routes
})

export default router
