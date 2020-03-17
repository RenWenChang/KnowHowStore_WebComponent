import Vue from 'vue'
import Router from 'vue-router'




// Fetch routes
let modules = []
const requireModule = require.context('./views', true, /\/route.js$/)
requireModule.keys().forEach(fileName => {
    const targetModule = requireModule(fileName)
    modules.push(targetModule.default)
})


Vue.use(Router)
const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'history',
  base: process.env.NODE_ENV === 'production' ? '/efirstWeb/' : '/efirstWeb/',
  linkActiveClass: "activeClass",
  scrollBehavior: (to) => {
    switch (to.name) {
      default:
        return { y: 0 }
    }
  },
  routes: [
    {
      path: '*',
      redirect: { name: 'elementsLanding' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: { name: 'landingPage' },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue'),
      children: [
        {
          path: 'HomePage',
          name: 'HomePage',
          component: () => import(/* webpackChunkName: "landingPage" */ './views/HomePage.vue'),
        },
        {
          path: 'landingPage',
          name: 'landingPage',
          component: () => import(/* webpackChunkName: "landingPage" */ './views/landingPage/_index.vue'),
          meta: {
            title: "第一銀行e-First智能理財"
          }
        },
        {
          path: 'experience',
          name: 'experience',
          component: () => import(/* webpackChunkName: "experience" */ '@/views/experience/index.vue'),
          meta: {
            title: "第一銀行e-First智能理財 | WFE"
          }
        },
        {
          path: 'FAQ',
          name: 'FAQ',
          component: () => import(/* webpackChunkName: "FAQ" */ '@/views/FAQ/_index.vue'),
          meta: {
            title: "第一銀行e-First智能理財 | 常見問題"
          }
        },
        {
          path: 'classroom',
          name: 'classroom',
          redirect: { name: 'classroomIndex' },
          component: () => import(/* webpackChunkName: "classroom" */ '@/views/classroom/_index.vue'),
          children: [
            {
              path: '/',
              name: 'classroomIndex',
              component: () => import(/* webpackChunkName: "classroomIndex" */ '@/views/classroom/classroomIndex.vue'),
              meta: {
                title: "第一銀行e-First智能理財 | 理財訊息"
              },
            },
            {
              path: ':id',
              name: 'classroomPage',
              component: () => import(/* webpackChunkName: "classroomPage" */ '@/views/classroom/classroomPage.vue'),
            }
          ]
        },
        {
          path: 'pressuretest',
          name: 'pressuretest',
          component: () => import(/* webpackChunkName: "pressuretest" */ './views/pressuretest.vue'),
          meta: {
            title: "第一銀行e-First智能理財 | api 測試"
          }
        },
        {
          path: 'maintain',
          name: 'maintain',
          component: () => import(/* webpackChunkName: "maintain" */ './views/maintain.vue'),
          meta: {
            title: "第一銀行e-First智能理財 | 系統維護中"
          }
        },
      ]
    },
    {
      path: '/LINE_Login_Landing',
      name: 'LINE_Login_Landing',
      component: () => import(/* webpackChunkName: "LINE_Login_Landing" */ './components/LINE_Login_Landing.vue'),
      meta: {
        title: "第一銀行e-First智能理財 | LINE傳送試算結果"
      }
    },
    {
      path: '/Email_Landing',
      name: 'Email_Landing',
      component: () => import(/* webpackChunkName: "Email_Landing" */ './components/Email_Landing.vue'),
      meta: {
        title: "第一銀行e-First智能理財 | Email傳送試算結果"
      }
    },

    {
      path: '/elementsLanding',
      name: 'elementsLanding',
      component: () => import(/* webpackChunkName: "elementsLanding" */ './views/elementsPages/index.vue'),
      meta: {
        title: "elements"
      },
      children: [
        ...modules,
      ]
    },

  ]
})
router.beforeEach((to, from, next) => {
  //設定每頁的 title (by meta title attribute)        
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const isLoggedIn = true;


  if (isLoggedIn) {
    next();
  } else {
    window.location = encodeURI("/");
  }

});
router.router=modules;
export default router