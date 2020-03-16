<template>
    <div id="dashboardWrap">
        <todoList></todoList>
        <notification></notification>
        <div class="functionGroup">
            <calendar></calendar>
            <flowKit></flowKit>
        </div>
    </div>
</template>

<script>
import language from '@/views/dashboard/language.js'
import calendar from '@/views/dashboard/calendar/calendar.vue'
import flowKit from '@/views/dashboard/flowKit/flowKit.vue'
import notification from '@/views/dashboard/notification/notification.vue'
import todoList from '@/views/dashboard/todoList/todoList.vue'

export default {
    components: {
        calendar,
        flowKit,
        notification,
        todoList
    },
    beforeCreate() {
        let locale=this.$i18n.locale;
        this.$i18n.setLocaleMessage(locale, language[locale]);
    },
}
</script>
<style lang="scss" scoped>
#dashboardWrap {
    padding: 16px;
    background-color: #6a6d73;
    min-height: 812px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    color: black;
}

@media screen and (min-width: 1440px) {
    #dashboardWrap {
        padding: 16px;
    }
}
@media screen and (min-width: 1920px) {
    #dashboardWrap {
        padding: 24px;
    }
}
.functionGroup {
    width: 100%;
    min-width: 400px;
    height: inherit;
    order: 1;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 16px;
}
@media screen and (min-width: 1440px) {
    .functionGroup {
        width: 400px;
        order: 0;
        margin-bottom: 0;
        flex-direction: column;
    }
}
</style>