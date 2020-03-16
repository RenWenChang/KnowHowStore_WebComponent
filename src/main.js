
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './_store'
import MessageBox from './components/MesseageBox/MsBox'
import VueParticles from 'vue-particles'
import "./filters"
import "particles.js"
import "./isMobile";
import "babel-polyfill";
import { KinesisContainer, KinesisElement } from 'vue-kinesis'

Vue.use(MessageBox);

Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)
Vue.use(VueParticles);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== "production") {
  // eslint-disable-next-line
  console.log(
    "%c" + "The app info shows only in non-production environment.",
    "color:DodgerBlue"
  );
  // eslint-disable-next-line
  const appVersionLine = "%c" + `    APP_VERSION: ${VERSION_FROM_WEBPACK}`;
  // eslint-disable-next-line
  console.log(appVersionLine, "color:DodgerBlue");
  for (let key in process.env) {
    const value = process.env[key];
    // eslint-disable-next-line
    console.log("%c" + `    ${key}: ${value}`, "color:DodgerBlue");
  }
  // eslint-disable-next-line
  console.log("%c" + "The app info ends.", "color:DodgerBlue");
}
