import Vue from 'vue'
Vue.prototype.isMobile = function () {
    try {
        document.createEvent("TouchEvent");
        return true;
    }
    catch (e) {
        return false;
    }
}
