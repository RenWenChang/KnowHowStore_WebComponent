import Vue from 'vue'
import Router from 'vue-router'




// Fetch routes

let newRouter =[];
const requireModulefolder = require.context('./views/elementsPages/view', true, /\/$/)
requireModulefolder.keys().forEach(fileName => {
  let component =fileName;
  let name =fileName.substring(0,fileName.length-1);
  let nameStart=name.lastIndexOf('/');
  name=name.substring(nameStart+1,fileName.length);
  let route={};
  route.name=name;
  route.path=name;
  route.component= () => import(/* webpackChunkName: "landingPage" */ `${'./views/elementsPages/view'}/${name}/index.vue`);
  newRouter.push(route)
  console.log(component);
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
      path: '/elementsLanding',
      name: 'elementsLanding',
      component: () => import(/* webpackChunkName: "elementsLanding" */ './views/elementsPages/index.vue'),
      meta: {
        title: "elements"
      },
      children: [
        ...newRouter,
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
router.router=newRouter;
export default router