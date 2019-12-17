<template>
    <Container>
        <Row>
            <InputText name="ClientID" v-model="localData.ClientID"></InputText>
            <InputEnName name="ClientCName" v-model="localData.ClientCName"></InputEnName>
            <InputEnName name="ClientEName" v-model="localData.ClientEName"></InputEnName>
            <InputEmail name="EmailAddress" v-model="localData.EmailAddress"></InputEmail>
            <InputText name="IdentityNO" v-model="localData.IdentityNO"></InputText>
            <InputText name="TEL" v-model="localData.TEL"></InputText>
        </Row>
        <RowControl>
            <template slot="right">
                <ButtonWFP @click="handleSave()">儲存</ButtonWFP>
                <ButtonEVA></ButtonEVA>
            </template>
        </RowControl>
    </Container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data: () => ({
        clientId: '',
        localData: {
            ClientID: "",
            ClientCName: "",
            ClientEName: "",
            EmailAddress: "",
            IdentityNO: "",
            TEL: ""
        }
    }),
    methods: {
        async  handleSave() {
            const model = {
                "User": {
                    "ClientID": this.localData.ClientID,
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
            const response = await this.postUsers(model)
            if (response.ResultCode === '01') {
                alert('成功')
            }
        },
        ...mapActions(["postUsers"])
    }
}
</script>
