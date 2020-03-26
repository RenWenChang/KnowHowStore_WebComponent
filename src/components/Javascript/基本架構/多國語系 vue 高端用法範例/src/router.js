import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 全域禁止回上頁
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});


const routes = [
  {
    path: '/',
    redirect: { name: 'userRecordAdd' },
    component: resolve => require(['@/frames/Frame.vue'], resolve),
    children: [
      {
        path: 'user',
        name: 'user',
        component: resolve => require(['@/views/user/_index.vue'], resolve),
        redirect: { name: 'userRecordAdd' },
        children: [
          {
            path: 'add',
            name: 'userRecordAdd',
            component: resolve => require(['@/views/user/Add.vue'], resolve),
          },
          {
            path: 'query',
            name: 'userRecordQuery',
            component: resolve => require(['@/views/user/Query.vue'], resolve),
          },
          {
            path: 'maintain:id?',
            name: 'userRecordMaintain',
            component: resolve => require(['@/views/user/Maintain.vue'], resolve),
          },
        ]
      },
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
  },
  {
    path: '/tree',
    name: 'tree',
    component: resolve => require(['@/components/RecursiveTree/tree.vue'], resolve)
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
