<template>
    <div class="home">
        <button @click="apiGetToken">click</button>
        <p>token:{{sysToken}}</p>
        <div>
            <button @click="apiLogin">Login</button>
            {{userToken}}
        </div>
        <button @click="apiPostSavingSolverXML">PostSavingSolverXML</button>
        <button @click="apiPostProjectionSolverXML">PostProjectionSolverXML</button>
        <button @click="apiPostWealthSolverXML">apiPostWealthSolverXML</button>
        {{XML}}
    </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import sandLoad from "@/components/sandLoad.vue"
export default {
    name: 'home',
    data: () => ({
        sysToken: '',
        userToken: '',
        XML: '',

    }),
    methods: {
        apiGetToken: async function() {
            const response = await this.postSysLogin({});
            // console.log(response);
            let sysToken = response.Datas.TokenId;
            this.sysToken = sysToken;

            sessionStorage.setItem('AuthToken', sysToken);

        },
        apiLogin: async function() {
            const config = {
                "userCode": "Admin",
                "userKey": "kpKqA0in14guTmXI3ny+Yl76uiAo0SlYb9JvxqLI0M/aLpFWLNyiEjWChNoLjydk2edVQ6M0qNJ9H9DbY4kg92CA/n0JgqHueORS1TH7HMa5rhG2e+aGeKED9jeCmVEdxRKRfxeb2G5+e2byFPfmxkNXHOOLGXMy09LJkGD7HaQzJ9kUsTE2XavCES2Yn2rnikuM8kAZCCZouW9v4qABjSmKZwqmZS5H4x49H73Z93jK9ErDyZ1JNAq/eJ/3WVZs5KOPB8PppNRHVZdK53jVIuXRr0xcAHKxYg9PAiMNRmz1EYrCkvLmQCf/3Hr8BuVjIi/TD0bZj10T4Ji5fhZjoA=="
            }

            const response = await this.postLogin(config);
            console.log(response)
            let userToken = response.Datas.TokenId;
            this.userToken = userToken;
            sessionStorage.setItem('userToken', userToken);

        },
        apiPostSavingSolverXML: async function() {
            const config = {
                "CusNo": 0,
                "CusBirthday": "2019-12-06",
                "StartYear": "2018",
                "RetirementYear": "2019",
                "TargetNeedAmt": 10,
                "FundPoolCode": "WFE",
                "PortRiskLevel": "01"
            }

            const response = await this.postSavingSolverXML(config);
            console.log(response);
            this.XML = response.Datas.XmlTemplate;
            var xmlDoc = null;
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(this.XML, "text/xml");
            console.log(xmlDoc);
        },
        apiPostProjectionSolverXML: async function() {
            const config = {
                "CusNo": 0,
                "CusBirthday": "2019-12-06",
                "BalanceAmt": 10000,
                "SavingAmt": 5000,
                "StartYear": "2018",
                "RetirementYear": "2019",
                "FundPoolCode": "WFE",
                "PortRiskLevel": "01"
            }
            const response = await this.postProjectionSolverXML(config);
            console.log(response);

        },
        apiPostWealthSolverXML: async function() {
            const config = {
                "CusNo": 0,
                "CusBirthday": "2019-12-06",
                "StartYear": "2018",
                "LifeExpectancyYear": "2019",
                "WithdrawAmt": 50000,
                "FundPoolCode": "WFE",
                "PortRiskLevel": "01"
            }
            const response = await this.postWealthSolverXML(config);
            console.log(response);
        },
        ...mapActions([
            "postSysLogin",
            "postLogin",
            "postSavingSolverXML",
            "postProjectionSolverXML",
            "postWealthSolverXML"
        ])
    },
}
</script>