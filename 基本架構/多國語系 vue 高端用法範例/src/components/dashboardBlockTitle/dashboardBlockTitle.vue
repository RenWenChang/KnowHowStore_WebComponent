<template>
    <div class="dashboardBlockTitle">
        <div class="name_hint" @click="clickTitle($event)">
            <span class="name">{{name}}</span>
            <span class="hint" v-if="hasHint">{{hint}}</span>
        </div>
        <slot name="dd"></slot>
    </div>
</template>
<script>
export default {

    props: {
        name: {
            type: String,
            default: 'ex:代辦事項'
        },
        hint: {
            type: String,
            default: 'ex:顯示近100功能'
        },
        hasHint: {
            type: Boolean,
            default: false
        },

        clickTitle: {
            type: Function,
            default: (e) => {
                return e
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.dashboardBlockTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:16px;
}
.name_hint {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.name {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1px;
    color: #363940;
    margin-right: 16px;
}
.hint {
    display: inline-block;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: 1px;
    text-align: center;
    color: #2f3bf5;
}
.dashboardBlockTitle_dd {
    width: 84px;
}
</style>