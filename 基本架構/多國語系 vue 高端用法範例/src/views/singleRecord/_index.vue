<template>
    <div class="frameTabs">
        <FrameTabs>
            <template slot="header">
                <FeatureHeader>Maintain: 單筆資料新增</FeatureHeader>
            </template>
            <template slot="tabs">
                <TabWFP :routes="baseTabs" class="frameTabs__tabs"></TabWFP>
            </template>
        </FrameTabs>
    </div>
</template>
<script>
import language from './language.js'
export default {
    computed: {
        baseTabs: function () {
            return [
                {
                    path: 'add',
                    label: this.$t('TabAdd'),
                },
                {
                    path: 'query',
                    label: this.$t('Query'),
                }
            ]
        }
    },
    beforeCreate() {
        let locale = this.$i18n.locale;
        this.$i18n.setLocaleMessage(locale, language[locale]);
    }
}

</script>