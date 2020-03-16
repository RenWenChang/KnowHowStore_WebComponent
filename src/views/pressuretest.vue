<template>
    <div class="pressuretest">
        <button @click="reGetRaw('1')">getSavingSolverXml</button>
        <button @click="reGetRaw('3')">getProjectionSolverXML</button>
        <button @click="reGetRaw('2')">getWealthSolverXML</button>
        <div>result:</div>
        <div id="result">{{result}}</div>
        <div>XMLString:</div>
        <div id="testJSON">{{Data}}</div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
    name: 'aaa',
    components: {

    },
    data: () => ({
        result: '',
        Data: ''
    }),
    methods: {
        reGetRaw: async function (investType) {
            //call api then
            if (investType === '1') {
                let sentdata = {
                    CusAge: 22,
                    RiskQuestion: "03",
                    InvestableAmt: "05",
                    TargetAmt: 10000,
                    BalanceAmt: 0,
                    SavingAmt: 0,
                    InvYear: 10,
                    WdrawAmt: 0,
                    WdrawYM: 0,
                    WdrawYear: 0,
                }
                this.result = '----';
                await sessionStorage.setItem('DataToRequestAPI__InitialPage', JSON.stringify(sentdata));
                this.raw = await this.apiGetSavingSolverXml();
                this.result = '成功';

            } else if (investType === '3') {
                let sentdata = {
                    CusAge: 27,
                    RiskQuestion: "03",
                    InvestableAmt: "02",
                    TargetAmt: 0,
                    BalanceAmt: 0,
                    SavingAmt: 1000000,
                    InvYear: 10,
                    WdrawAmt: 0,
                    WdrawYM: "",
                    WdrawYear: 0,
                }
                this.result = '----';
                await sessionStorage.setItem('DataToRequestAPI__InitialPage', JSON.stringify(sentdata));
                this.raw = await this.apiGetProjectionSolverXML();
                this.result = '成功';

            } else if (investType === '2') {
                let sentdata = {
                    CusAge: 59,
                    RiskQuestion: "03",
                    InvestableAmt: "05",
                    TargetAmt: 0,
                    BalanceAmt: 0,
                    SavingAmt: 0,
                    InvYear: 0,
                    WdrawAmt: 7000,
                    WdrawYM: "202301",
                    WdrawYear: 5,
                }
                this.result = '----';
                await sessionStorage.setItem('DataToRequestAPI__InitialPage', JSON.stringify(sentdata));
                this.raw = await this.apiGetWealthSolverXML();
                this.result = '成功';
            }
        },
        apiGetSavingSolverXml: async function () {
            const { XMLString,
            //  ModelIDURL, RiskLevelURL, PortPerformURL 
             } = await this.getSavingSolverXml__pressuretest();
            const Data__stack = await this.apiPutSavingSolver(XMLString);
            // const Data__line = await this.apiGetPortPerform(PortPerformURL);
            // const Data__riskSlider = await this.apiGetRiskLevels(RiskLevelURL);
            // const Data__piebar = await this.apiGetPortfolioAllocates(ModelIDURL);
            // const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            this.Data = Data__stack;
            // return {
            //     Data__stack, Data__line, Data__riskSlider, Data__piebar, Data__LimitAmtParam
            // }
        },

        apiGetWealthSolverXML: async function () {
            const { XMLString
            // , ModelIDURL, RiskLevelURL, PortPerformURL
             } = await this.getWealthSolverXML__pressuretest();
            const Data__stack = await this.apiPutWealthSolver(XMLString);
            // const Data__line = await this.apiGetPortPerform(PortPerformURL);
            // const Data__riskSlider = await this.apiGetRiskLevels(RiskLevelURL);
            // const Data__piebar = await this.apiGetPortfolioAllocates(ModelIDURL);
            // const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            this.Data = Data__stack;
            // return {
            //     Data__stack, Data__line, Data__riskSlider, Data__piebar, Data__LimitAmtParam
            // }
        },
        apiGetProjectionSolverXML: async function () {
            const { XMLString
            // , ModelIDURL, RiskLevelURL, PortPerformURL 
            } = await this.getProjectionSolverXML__pressuretest();
            const Data__stack = await this.apiPutProjection(XMLString);
            // const Data__line = await this.apiGetPortPerform(PortPerformURL);
            // const Data__riskSlider = await this.apiGetRiskLevels(RiskLevelURL);
            // const Data__piebar = await this.apiGetPortfolioAllocates(ModelIDURL);
            // const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            this.Data = Data__stack;
            // return {
            //     Data__stack, Data__line, Data__riskSlider, Data__piebar, Data__LimitAmtParam
            // }
        },

        apiPutSavingSolver: async function (XMLString) {
            let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
            const data = {
                "XMLString": `${XMLString}`,
                "InvYear": QA.InvYear,
                "CusAge": QA.CusAge
            }
            const response = await this.putSavingSolver(data);
            return response
        },
        apiPutWealthSolver: async function (XMLString) {
            let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
            const data = {
                "XMLString": `${XMLString}`,
                "CusAge": QA.CusAge
            }
            const response = await this.putWealthSolver(data);
            return response

        },
        apiPutProjection: async function (XMLString) {
            let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
            const data = {
                "XMLString": `${XMLString}`,
                "BalanceAmt": QA.BalanceAmt,
                "SavingAmt": QA.SavingAmt,
                "InvYear": QA.InvYear,
                "CusAge": QA.CusAge
            }
            const response = await this.putProjection(data);
            return response

        },
        apiGetPortPerform: async function (PortPerformURL) {
            const response = await this.getPortPerform__pressuretest(PortPerformURL);
            return response
        },

        apiGetRiskLevels: async function (RiskLevelURL) {
            const response = await this.getRiskLevels__pressuretest(RiskLevelURL);
            return response
        },
        apiGetPortfolioAllocates: async function (ModelIDURL) {
            const response = await this.getPortfolioAllocates__pressuretest(ModelIDURL);
            return response
        },
        apiGetLimitAmtParam: async function () {
            const response = await this.getLimitAmtParam__pressuretest();
            return response
        },

        ...mapActions([
            "putSavingSolver",
            "putProjection",
            "putWealthSolver",

            "getSavingSolverXml__pressuretest",
            "getWealthSolverXML__pressuretest",
            "getProjectionSolverXML__pressuretest",
            "getPortPerform__pressuretest",
            "getRiskLevels__pressuretest",
            "getPortfolioAllocates__pressuretest",
            "getLimitAmtParam__pressuretest",
            "toggleispr",
        ])
    },
    mounted() {


        this.toggleispr(true);
    },
    destroyed() {
        this.toggleispr(false);
    }
}
</script>
<style lang="scss" scoped>
.particlesBox {
    width: 30%;
    height: 100%;
}
.jumpBall {
    width: 100px;
    height: 100px;
    background-color: #00f;
    border-radius: 50%;
    transform: scaleX(1) scaleY(1) translateY(0px);
    animation: jump 1s infinite;
}
@keyframes jump {
    0% {
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
    25% {
        transform: scaleX(1.1) scaleY(0.9) translateY(0px);
    }
    50% {
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
    75% {
        transform: scaleX(1.1) scaleY(0.9) translateY(0px);
    }
    100% {
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
}
</style>
