<template>
    <Container>
        <Row>
            <InputText v-model="allCondition.con_1" :name="$t('condition_1')"></InputText>
            <InputText v-model="allCondition.con_2" :name="$t('condition_2')" :width="'2'"></InputText>
            <InputText v-model="allCondition.con_3" :name="$t('condition_3')"></InputText>
            <ButtonWFP @click="runQuery">{{$t('ButtonWFP_Query')}}</ButtonWFP>
            <ButtonWFP @click="popupMultFilter=true">{{$t('ButtonWFP_AdvancedFilter')}}</ButtonWFP>
            <ButtonWFP @click="clear" :type="'danger'">{{$t('ButtonWFP_Clear')}}</ButtonWFP>
            <refresh @click="runQuery"></refresh>
        </Row>
        <Row :class="{singleRecordQuery:localDataSource.length===0}">
            <kendo-grid
                ref="grid"
                :data-source="localDataSource"
                :data-content="$t('Css_ElemetBeforeContent')"
                :filterable="true"
                style="height:400px;width:100%"
            >
                <kendo-grid-column width="calc(10% - 1em)" :selectable="true"></kendo-grid-column>
                <kendo-grid-column
                    width="calc(10% - 1em)"
                    :command="[{text:$t('Edit'), click:openMaintain}]"
                ></kendo-grid-column>
                <kendo-grid-column :field="'ClientID'" :title="$t('ClientID')"></kendo-grid-column>
                <kendo-grid-column :field="'ClientCName'" :title="$t('ClientCName')"></kendo-grid-column>
                <kendo-grid-column :field="'ClientEName'" :title="$t('ClientEName')"></kendo-grid-column>
                <kendo-grid-column :field="'IdentityNO'" :title="$t('IdentityNO')"></kendo-grid-column>
                <kendo-grid-column :field="'TEL'" :title="$t('TEL')"></kendo-grid-column>
            </kendo-grid>
        </Row>
        <advancedFilter
            @click="popupMultFilter=false"
            v-if="popupMultFilter"
            :showTitle="true"
            :type="'col'"
            :title="$t('ButtonWFP_AdvancedFilter')"
        >
            <template slot="colum">
                <InputText v-model="advancedFilter.con_1" :name="$t('condition_1')"></InputText>
                <InputText
                    v-model="advancedFilter.con_2"
                    :name="$t('condition_2')"
                    :width="'2'"
                ></InputText>
                <InputText v-model="advancedFilter.con_3" :name="$t('condition_3')"></InputText>
            </template>
            <template slot="buttom">
                <ButtonWFP @click="runQuery">{{$t('ButtonWFP_Query')}}</ButtonWFP>
                <ButtonWFP @click="clearAdvancedFilter" :type="'danger'">{{$t('ButtonWFP_Clear')}}</ButtonWFP>
            </template>
        </advancedFilter>
    </Container>
</template>
<script>
import advancedFilter from '@/components/Pop-Ups/base/popUpBase.vue';
import refresh from './refresh.vue';
import { mapActions } from 'vuex';
export default {
    components: {
        refresh,
        advancedFilter
    },
    data: () => ({
        localDataSource: [],
        raw: [],//原始資料 不可變
        popupMultFilter: false,
        allCondition: {
            con_1: '',
            con_2: '',
            con_3: '',
        },
        advancedFilter: {
            con_1: '',
            con_2: '',
            con_3: '',
        },
    }),
    methods: {
        clear() {
            let keys = this.allCondition
            Object.keys(keys).forEach((item) => {
                this.allCondition[item] = ''
            });
        },
        clearAdvancedFilter: function () {
            let keys = this.advancedFilter
            Object.keys(keys).forEach((item) => {
                this.advancedFilter[item] = ''
            });
        },
        distinguishInitRawData() {
            let localDataSource = JSON.parse(sessionStorage.getItem('page-singleRecord_Query_RawData'));
            let RawData_lang = JSON.parse(sessionStorage.getItem('page-singleRecord_Query_RawData_lang'));
            if (RawData_lang !== this.$i18n.locale) {
                sessionStorage.removeItem("page-singleRecord_Query_RawData");
            } else if (localDataSource && RawData_lang) {
                this.localDataSource = localDataSource;
            }
        },
        openMaintain(event) {
            event.preventDefault();
            const tr = event.target.closest("tr"); // get the current table row (tr)
            const grid = this.$refs.grid.kendoWidget();
            const row = grid.dataItem(tr);
            this.createTab({
                id: row.ClientID,
                path: 'maintain',
                label: this.$t('TabMaintain') + ` ( ${row.ClientID} )`,
            })
            this.$nextTick(() => {
                this.$router.push({
                    name: 'singleRecordMaintain',
                    query: {
                        id: row.ClientID,
                    }
                })
            })
        },
        runQuery: async function () {
            const response = await this.getUsers()
            // eslint-disable-next-line 
            const { Datas, ResultCode } = response
            if (ResultCode === '01') {
                this.localDataSource = Datas;
                sessionStorage.setItem('page-singleRecord_Query_RawData', JSON.stringify(this.localDataSource));
                sessionStorage.setItem('page-singleRecord_Query_RawData_lang', JSON.stringify(this.$i18n.locale));
                this.popupMultFilter = false;
            }
        },
        ...mapActions(["getUsers", "createTab"])
    },
    mounted() {
        this.distinguishInitRawData();
    }
}
</script>
<style lang="scss" >
.singleRecordQuery {
    position: relative;
    width: 100%;
    height: 100px;
}
.singleRecordQuery ::before {
    content: attr(data-content);
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    height: 18px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    font-size: 18px;
    z-index: 1;
}
</style>