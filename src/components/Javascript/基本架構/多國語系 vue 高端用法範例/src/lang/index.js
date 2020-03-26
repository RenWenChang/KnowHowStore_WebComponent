import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from './dateTimeFormatsGroup/dateTimeFormatsGroup.js'
import language from './login/language.js'
const messages = language;
Vue.use(VueI18n)
const locale = (function () {
  let lang = localStorage.getItem('lang');
  if (lang) {
    return lang
  } else {
    return 'zh-Hant'
  }
})();
const i18n = new VueI18n({
  locale,
  dateTimeFormats,
  messages
})
export default i18n
