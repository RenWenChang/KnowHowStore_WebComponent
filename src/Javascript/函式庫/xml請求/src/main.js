import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './_store'
import VueFullPage from 'vue-fullpage.js'
import VueParticles from 'vue-particles' 

Vue.use(VueFullPage);
Vue.use(VueParticles);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

