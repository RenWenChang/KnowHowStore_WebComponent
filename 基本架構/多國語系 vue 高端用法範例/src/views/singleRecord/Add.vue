<template>
    <Container>
        <Row>
            <InputText :name="$t('ClientID')" v-model="localData.ClientID" :required="true"></InputText>
            <InputEnName :name="$t('ClientCName')" v-model="localData.ClientCName"></InputEnName>
            <InputEnName :name="$t('ClientEName')" v-model="localData.ClientEName"></InputEnName>
            <InputEmail :name="$t('EmailAddress')" v-model="localData.EmailAddress"></InputEmail>
            <InputText :name="$t('IdentityNO')" v-model="localData.IdentityNO"></InputText>
            <InputText :name="$t('TEL')" v-model="localData.TEL"></InputText>
        </Row>
        <RowControl>
            <template slot="right">
                <ButtonWFP @click="handleSave()">{{$t('Save')}}</ButtonWFP>
                <ButtonWFP>{{$t('buttonEVA_Entry')}}</ButtonWFP>
                <ButtonWFP @click="clear" :type="'danger'">{{$t('ButtonWFP_Clear')}}</ButtonWFP>
                <!-- <ButtonEVA></ButtonEVA> -->
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
        clear:function(){
            Object.keys(this.localData).forEach((item)=>{
                this.localData[item]="";
            })
        },
        ...mapActions(["postUsers"])
    }
}
</script>
