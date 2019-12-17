<template>
    <Container v-model="clientId">
        <Row>
            <InputText name="ClientCName" v-model="localData.ClientCName"></InputText>
            <InputText name="ClientEName" v-model="localData.ClientEName"></InputText>
            <InputText name="ClientID" v-model="localData.ClientID"></InputText>
            <InputText name="DataEditType" v-model="localData.DataEditType"></InputText>
            <InputText name="EmailAddress" v-model="localData.EmailAddress"></InputText>
            <InputText name="IdentityNO" v-model="localData.IdentityNO"></InputText>
            <InputText name="TEL" v-model="localData.TEL"></InputText>
        </Row>
        <RowControl>
            <template slot="right">
                <ButtonWFP @click="handleSave()">儲存</ButtonWFP>
            </template>
        </RowControl>
    </Container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({
        clientId: '',
        currentContainer: '基本資料',
        localData: {}
    }),
    mounted() {
        this.getData()
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
        ...mapActions(["getUserById", "putUsers"])
    }
}
</script>
