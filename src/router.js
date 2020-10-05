import Vue from 'vue'
import Router from 'vue-router'
import getRouterTree__elementsLanding from './routerTree__elementsLanding.js'


//usage notice: duplicate folder name
let elementsLandingChildrenTree = getRouterTree__elementsLanding();

Vue.use(Router)
const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'history',
  base: process.env.NODE_ENV === 'production' ? '/elements/' : '/elements/',
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
      path: '/elementsLanding',
      name: 'elementsLanding',
      component: () => import(/* webpackChunkName: "elementsLanding" */ './views/elementsPages/index.vue'),
      meta: {
        title: "elements"
      },
      children: [
        ...elementsLandingChildrenTree,
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
router.router = elementsLandingChildrenTree;
export default router
