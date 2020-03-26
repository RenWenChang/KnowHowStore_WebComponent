<template>
    <div id="calendar">
        <dashboardBlockTitle :name="$t('Calendar.title')" :clickTitle="clickTitle">
            <template slot="dd">
                <blockTtileDropdown :dataSourceArray="drop" width="'3'"></blockTtileDropdown>
            </template>
        </dashboardBlockTitle>
        <calendarCom></calendarCom>
    </div>
</template>
<script>
import blockTtileDropdown from '@/components/dashboardBlockTitle/blockTtileDropdown.vue'
import calendarCom from "./calendarCom"
export default {
    components: {
        calendarCom,
        blockTtileDropdown
    },
    data: () => ({
        drop: [
            {
                text: "基金休市",
                click: function (e) {
                    console.log("props", e);
                },
                valus: 1

            },
            {
                text: "基金開市",
                click: function (e) {
                    console.log("props", e);
                },
                valus: 2

            }
        ]
    }),
    methods: {
        clickTitle: function (e) {
            alert('行事曆', e);
        }
    }
}
</script>
<style lang="scss" scoped>
#calendar {
    width: 100%;
    min-width: 400px;
    height: 100%;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.15);
    background-color: #f6f6f6;
    margin-right: 16px;
    padding: 16px;
}
@media screen and (min-width: 1440px) {
    #calendar {
        min-width: 400px;
        min-height: 402px;
        height: 50%;
        margin-bottom: 16px;
        margin-right: 0px;
        border-radius: 4px;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.15);
        background-color: #f6f6f6;
    }
}
</style>