<template>
    <Container v-model="clientId">
        <Row>
            <InputText :name="$t('ClientCName')" v-model="localData.ClientCName"></InputText>
            <InputText :name="$t('ClientEName')" v-model="localData.ClientEName"></InputText>
            <InputText :name="$t('ClientID')" v-model="localData.ClientID" :disable="true"></InputText>
            <InputText :name="$t('DataEditType')" v-model="localData.DataEditType"></InputText>
            <InputText :name="$t('EmailAddress')" v-model="localData.EmailAddress"></InputText>
            <InputText :name="$t('IdentityNO')" v-model="localData.IdentityNO"></InputText>
            <InputText :name="$t('TEL')" v-model="localData.TEL"></InputText>
        </Row>
        <RowControl>
            <template slot="left">
                <ButtonSwitchData></ButtonSwitchData>
            </template>
            <template slot="right">
                <ButtonWFP @click="handleSave()">{{$t('Save')}}</ButtonWFP>
                <ButtonWFP>{{$t('buttonEVA_Entry')}}</ButtonWFP>
                <ButtonWFP @click="showConfirm" :type="'danger'">{{$t('ButtonWFP_Delete')}}</ButtonWFP>
            </template>
        </RowControl>
        <popup
            v-if="showPopup"
            :type="'confirm'"
            :exacute="deleteThisUsers"
            @click="showPopup=false"
        >{{$t('confirmText')}}</popup>
    </Container>
</template>
<script>
import popup from '@/components/Pop-Ups/base/popUpBase.vue';
import { mapActions } from 'vuex'
export default {
    watch: {
        $route({ query }) {
            let localData = JSON.parse(sessionStorage.getItem('page-singleRecord_Query_RawData'));
            localData.forEach((item, i) => {
                if (item.ClientID === query.id) {
                    this.localData = localData[i]
                }
            });
        }
    },
    data: () => ({
        clientId: '',
        currentContainer: '基本資料',
        localData: {},
        showPopup: false
    }),
    mounted() {
        this.getData()
    },
    components: {
        popup
    },
    methods: {
        async getData() {
            const response = await this.getUserById(this.clientId)
            const { ResultCode, Datas } = response
            if (ResultCode === '01') {
                this.localData = Datas[0]
            }
        },
        async handleSave() {
            const model = {
                "User": {
                    "ClientID": this.clientId,
                    "ClientCName": this.localData.ClientCName,
                    "ClientEName": this.localData.ClientEName,
                    "IdentityNO": this.localData.IdentityNO,
                    "TEL": this.localData.TEL,
                    "EmailAddress": this.localData.EmailAddress,
                },
                "GroupClients": [
                    {
                        "GroupID": "string",
                        "ClientID": "string",
                    }
                ],
                "BaseModel": {
                    "FlowTableName": "string",
                    "AutoWorkTables": [
                        "string"
                    ],
                    "FunctionID": "string",
                    "FlowID": "string",
                    "FlowAction": 0,
                    "LangCode": "string"
                }
            }
            const response = await this.putUsers(model)
            if (response.ResultCode === '01') {
                alert('成功')
            }
        },
        showConfirm: function () {
            this.showPopup = true;
        },
        async deleteThisUsers() {
            let obj = this.$router.app._route;
            let { query } = obj;
            const model = {
                "User": {
                    "ClientID": this.clientId,
                    "ClientCName": this.localData.ClientCName,
                    "ClientEName": this.localData.ClientEName,
                    "IdentityNO": this.localData.IdentityNO,
                    "TEL": this.localData.TEL,
                    "EmailAddress": this.localData.EmailAddress,
                },
                "GroupClients": [
                    {
                        "GroupID": "string",
                        "ClientID": "string",
                    }
                ],
                "BaseModel": {
                    "FlowTableName": "string",
                    "AutoWorkTables": [
                        "string"
                    ],
                    "FunctionID": "string",
                    "FlowID": "string",
                    "FlowAction": 0,
                    "LangCode": "string"
                }
            }
            const response = await this.deleteUsers(model)
            if (response.ResultCode === '01') {
                alert('成功')
                this.deleteTab(query.id);
                this.$router.push('query').catch(err => {
                    return err
                });
            }
        },
        ...mapActions(["getUserById", "putUsers", "deleteUsers", "deleteTab"])
    }
}
</script>
