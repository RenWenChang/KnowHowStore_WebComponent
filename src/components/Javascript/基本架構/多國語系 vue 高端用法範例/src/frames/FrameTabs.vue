<template>
    <div class="frameTabs">
        <div class="frameTabs__header">
            <slot name="header"></slot>
        </div>
        <!-- <FeatureHeader></FeatureHeader> -->
        <slot name="tabs"></slot>
        <!-- <TabWFP class="frameTabs__tabs"></TabWFP> -->
        <div class="frameTabs__container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
// import TabWFP from '@/components/TabWFP/_index.vue'
// import FeatureHeader from '@/components/FeatureHeader/index.vue'
export default {
    components: {
        // TabWFP,
        // FeatureHeader
    },
}
</script>
<style lang="scss" scoped>
.frameTabs {
    background-color: #63666d;
    .frameTabs__container {
        background-color: #f6f6f6;
        min-height: 750px;
    }
    .frameTabs__header {
        padding-top: 12px;
    }
    .frameTabs__menuItem {
        color: #ffffff;
        height: 24px;
        display: flex;
        padding: 16px 30px;
        > * {
            align-self: center;
        }
        .menuItem__name {
            margin-left: 8px;
        }
    }
    .frameTabs__tabs {
        margin-top: 12px;
    }
    .frameTabs__list {
        display: flex;
    }
}
</style>