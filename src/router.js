import Vue from 'vue'
import Router from 'vue-router'



//使用限制 禁止資料夾名稱重複
// Fetch routes

let newRouter = [];
const requireModulefolder = require.context('./views/elementsPages/view', true, /\/$/)
requireModulefolder.keys().forEach(folderRoute => {
  let name = folderRoute.substring(0, folderRoute.length - 1);
  let nameStart = name.lastIndexOf('/');
  name = name.substring(nameStart + 1, folderRoute.length);
  let route = {
    name: name,
    path: name,
    component: () => import(/* webpackChunkName: "landingPage" */ `${'./views/elementsPages/view'}/${folderRoute.substring(2, folderRoute.length - 1)}/index.vue`),
    children: [],
    rout: `${'./views/elementsPages/view'}/${folderRoute.substring(2, folderRoute.length - 1)}/index.vue`
  };
  let parentFolderRoute = folderRoute.substring(0, nameStart);
  let removeDot = parentFolderRoute.substring(1, folderRoute.length);
  let parentFolder = removeDot.substring(removeDot.lastIndexOf('/') + 1, folderRoute.length);

  if (parentFolder === '') {
    newRouter.push(route)
  } else {
    let findFolder = function (arr) {
      if (arr) {
        let parentIndex = arr.findIndex(x => x.name === parentFolder);
        if (parentIndex!==(-1)) {
          arr[parentIndex].children.push(route)
        }else{
          for (let i = 0; i < arr.length; i++) {
            findFolder(arr[i].children)
          }
        }
      } 
    }
    findFolder(newRouter)
  }
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
router.router = newRouter;
export default router