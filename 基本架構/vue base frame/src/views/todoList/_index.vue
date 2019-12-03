<template>
    <div class="frameTabs">
        <FrameTabs>
            <template slot="header">
                <FeatureHeader>To-do list: 待辦事項</FeatureHeader>
            </template>
            <template slot="header">
                <TabWFP class="frameTabs__tabs" :routes="routes"></TabWFP>
            </template>
        </FrameTabs>
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
    data: () => ({
        routes: [
            {
                path: 'sign-off',
                label: '簽核專區',
                suffix: '51'
            },
            {
                path: 'report',
                label: '報表專區',
                suffix: '23'
            },
        ]
    })
}
</script>