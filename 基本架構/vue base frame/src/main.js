import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './views/router.js'
import store from './store'
// Kendo UI
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Grid, GridInstaller } from '@progress/kendo-grid-vue-wrapper'
Vue.use(GridInstaller)
Vue.component('Grid', Grid)
// 
import Row from '@/components/Row.vue'
Vue.component('Row', Row)
import InputText from '@/components/input/InputText.vue'
Vue.component('InputText', InputText)
import Nav from '@/components/Nav/index.vue'
Vue.component('Nav', Nav)
import NavContainer from '@/components/NavContainer.vue'
Vue.component('NavContainer', NavContainer)
import Dropdown from '@/components/Dropdown.vue'
Vue.component('Dropdown', Dropdown)
import CheckboxSingle from '@/components/CheckboxSingle.vue'
Vue.component('CheckboxSingle', CheckboxSingle)
import Radio from '@/components/Radio.vue'
Vue.component('Radio', Radio)
import RowControl from '@/components/RowControl.vue'
Vue.component('RowControl', RowControl)
import AUDI from '@/components/AUDI.vue'
Vue.component('AUDI', AUDI)
import Container from '@/components/Container.vue'
Vue.component('Container', Container)
import FeatureHeader from '@/components/FeatureHeader/index'
Vue.component('FeatureHeader', FeatureHeader)
import FrameTabs from '@/frames/FrameTabs.vue'
Vue.component('FrameTabs', FrameTabs)
import TabWFP from '@/components/TabWFP/_index.vue'
Vue.component('TabWFP', TabWFP)
import TableQuery from '@/components/TableQuery/index.vue'
Vue.component('TableQuery', TableQuery)
import ButtonWFP from '@/components/ButtonWFP.vue'
Vue.component('ButtonWFP', ButtonWFP)
import TableContainer from '@/components/TableContainer.vue'
Vue.component('TableContainer', TableContainer)
import ButtonSimple from '@/components/ButtonSimple.vue'
Vue.component('ButtonSimple', ButtonSimple)
import TableWFP from '@/components/TableWFP/index.vue'
Vue.component('TableWFP', TableWFP)



import dashboardBlockTitle from '@/components/dashboardBlockTitle/dashboardBlockTitle.vue'
Vue.component('dashboardBlockTitle', dashboardBlockTitle)
import ButtonGroupWithoutOverflow from '@/components/ButtonGroupWithoutOverflow/ButtonGroupWithoutOverflow.vue'
Vue.component('ButtonGroupWithoutOverflow', ButtonGroupWithoutOverflow)
import LinkItemGroups from '@/components/LinkItemGroups/LinkItemGroups.vue'
Vue.component('LinkItemGroups', LinkItemGroups)
import BroadcastTemplate from '@/components/AccordionItemGroups/BroadcastTemplate/BroadcastTemplate.vue'
Vue.component('BroadcastTemplate', BroadcastTemplate)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
