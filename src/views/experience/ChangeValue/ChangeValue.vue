<template>
    <div class="cal">
        <SavingSolver
            v-if="investType=='1'"
            :change.sync="DataToRequestAPI__reCale"
            :LimitAmtParam="LimitAmtParam"
            :expectationRevenue="expectationRevenue"
            :DataToRequestAPIInitialPage="DataToRequestAPIInitialPage"
            :Data__Suggest="Data__Suggest"
            :photoShotting="photoShotting"
            :newActiveIndex="newActiveIndex"
            :windowwidth="windowwidth"
        ></SavingSolver>
        <prejection
            v-if="investType=='3'"
            :change.sync="DataToRequestAPI__reCale"
            :isBalanceAmt.sync="isBalanceAmt"
            :LimitAmtParam="LimitAmtParam"
            :expectationRevenue="expectationRevenue"
            :DataToRequestAPIInitialPage="DataToRequestAPIInitialPage"
            :Data__Suggest="Data__Suggest"
            :photoShotting="photoShotting"
            :newActiveIndex="newActiveIndex"
            :windowwidth="windowwidth"
        ></prejection>
        <wealthsolver
            :raw="raw"
            v-if="investType==='2'"
            :change.sync="DataToRequestAPI__reCale"
            :LimitAmtParam="LimitAmtParam"
            :expectationRevenue="expectationRevenue"
            :DataToRequestAPIInitialPage="DataToRequestAPIInitialPage"
            :Data__Suggest="Data__Suggest"
            :photoShotting="photoShotting"
            :newActiveIndex="newActiveIndex"
            :windowwidth="windowwidth"
        ></wealthsolver>
        <div class="spread"></div>

        <!-- <div
            :class="[(newActiveIndex!==1)&&(windowwidth<768)&&!photoShotting?'tabMobileHide':'']"
            class="slider sliderRiskWave"
        >-->
        <div class="slider sliderRiskWave">
            <div class="wrap">
                <span class="title">風險波動調整</span>
                <sliderRiskWave
                    ref="risklevel"
                    :length="riskSlider__afterMapping.length"
                    :min="riskSlider__afterMapping.min"
                    :max="riskSlider__afterMapping.max"
                    :dataLimit="riskSlider__afterMapping.dataLimit"
                    :initValue="riskSlider__afterMapping.initValue"
                    :data="riskSlider__afterMapping"
                    :bestPoint="riskSlider__afterMapping.bestPoint"
                ></sliderRiskWave>
            </div>
        </div>
    </div>
</template>

<script>
import iconAdd from "@/views/experience/img/add.vue";
import iconLess from "@/views/experience/img/less.vue";

// import * as d3 from "d3";
import sliderRiskWave from "@/components/sildeBar/chooseRiskWave.vue";
import prejection from "@/views/experience/ChangeValue/getProjectionReCalcValue.vue";
import wealthsolver from "@/views/experience/ChangeValue/getWealthSolverReCalcValue.vue";
import SavingSolver from "@/views/experience/ChangeValue/getSavingSolverCalValue.vue";
/* eslint-disable */
export default {
    data: () => ({
        DataToRequestAPI__reCale: {
            //base
            CusAge: 0,
            RiskQuestion: "",
            InvestableAmt: 0,
            //saving
            TargetAmt: 0,
            //projection
            BalanceAmt: 0,
            SavingAmt: 0,
            //saving and projection
            InvYear: 0,
            //wealth
            WdrawAmt: 0,
            WdrawYM: 0,
            WdrawYear: 0
        },
        riskSlider__afterMapping: {
            min: 1,
            max: 10,
            dataLimit: 100,
            initValue: 1,
            PortList: [
                {
                    investGroup: [
                        { AssetName: "-", AssetWgt: "-" },
                        { AssetName: "-", AssetWgt: "-" }
                    ]
                }
            ]
        }, //給預設值
        isBalanceAmt: true
    }),
    watch: {
        DataToRequestAPI__reCale: {
            handler: function(newValue) {
                //物件合併重新試算參數
                function deepClone(initalObj) {
                    //物件深拷貝
                    let obj = {};
                    try {
                        obj = JSON.parse(JSON.stringify(initalObj));
                        return obj;
                    } catch (e) {
                        return e;
                    }
                }
                let newObj = {};
                newObj = deepClone(newValue);
                newObj.RiskQuestion = this.RiskQuestion;
                this.$emit("update:change", newValue);
            },
            deep: true
        },
        riskSlider: function(newValue) {
            this.mappginForChartStructure__sliderRisk();
        },
        newActiveIndex: {
            handler: function(newValue) {
                if (newValue === 1) {
                    this.$nextTick(() => {
                        this.$refs.risklevel.initSlider(true);
                    });
                }
            }
        }
    },
    props: {
        expectationRevenue: {
            type: Number,
            default: 0
        },
        investType: {
            type: String,
            default: "3"
        },
        newActiveIndex: {
            type: Number,
            default: 0
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        },
        photoShotting: {
            type: Boolean,
            default: false
        },
        DataToRequestAPIreCale: {
            type: Object,
            default: () => {
                return {};
            }
        },
        Data__Suggest: {
            type: Number,
            default: 500
        },

        DataToRequestAPIInitialPage: {
            type: Object,
            default: () => {
                return {};
            }
        },
        LimitAmtParam: {
            type: Object,
            default: () => {
                return {};
            }
        },
        riskSlider: {
            type: Object,
            default: () => {
                return {
                    PortList: {}
                };
            }
        },
        raw: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {
        sliderRiskWave,
        iconAdd,
        iconLess,
        prejection,
        wealthsolver,
        SavingSolver
    },
    methods: {
        mappginForChartStructure__sliderRisk: function() {
            let new_riskSlider__afterMapping = {};
            let PortList = [];
            let getMaxOrder = Math.max(
                ...this.riskSlider.PortList.map(item => item.ModelOrder)
            );
            for (let i = 0; i < getMaxOrder; i++) {
                let newobj = {};
                let investGroup = [];
                newobj.investGroup = this.riskSlider.PortList.filter(item => {
                    return item.ModelOrder === i + 1;
                });
                PortList.push(newobj);
                newobj.ModelID = newobj.investGroup[0].ModelID;
                newobj.ModelOrder = i + 1;
            }
            if (this.riskSlider.PortList.length !== 0) {
                new_riskSlider__afterMapping.initValue = this.riskSlider.BestInvest;
                new_riskSlider__afterMapping.bestPoint = this.riskSlider.BestInvest;
                new_riskSlider__afterMapping.PortList = PortList;
                new_riskSlider__afterMapping.length = PortList.length;
                new_riskSlider__afterMapping.max = getMaxOrder;
                new_riskSlider__afterMapping.min = PortList[0].ModelOrder;
                new_riskSlider__afterMapping.dataLimit = Number(
                    (
                        (this.riskSlider.MaxPortLevel / getMaxOrder) *
                        100
                    ).toFixed(0)
                );

                //

                if (
                    JSON.parse(sessionStorage.getItem("thumbTips")).ModelOrder
                ) {
                    if (
                        JSON.parse(sessionStorage.getItem("thumbTips"))
                            .ModelOrder !== this.riskSlider.BestInvest
                    ) {
                        new_riskSlider__afterMapping.initValue = JSON.parse(
                            sessionStorage.getItem("thumbTips")
                        ).ModelOrder;
                    }
                }

                this.riskSlider__afterMapping = new_riskSlider__afterMapping;
            }
        }
    },
    mounted: function() {},
    destroyed() {}
};
</script>
<style lang="scss" src="../experience.scss">
</style>  
<style lang="scss" src="../dateOption.scss">
</style>  