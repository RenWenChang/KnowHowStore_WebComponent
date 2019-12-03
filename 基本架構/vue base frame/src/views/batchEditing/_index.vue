<template>
    <div class="frameTabs">
        <!-- <FeatureHeader></FeatureHeader>
        <TabWFP class="frameTabs__tabs"></TabWFP> -->
        <!-- <div class="frameTabs__container">
            <router-view></router-view>
        </div> -->
    </div>
</template>
<script>
import TabWFP from '@/components/TabWFP/_index.vue'
import FeatureHeader from '@/components/FeatureHeader/index.vue'
export default {
    components: {
        TabWFP,
        FeatureHeader
    },
}
</script>