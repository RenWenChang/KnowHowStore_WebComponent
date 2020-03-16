<template>
    <div id="wealthsolverCal">
        <div class="switchbar" @click="toggleExperienceInput(!ExperienceInput)">
            <span></span>
        </div>
        <!-- <div
            :class="[(newActiveIndex!==0)&&(windowwidth<768)&&!photoShotting?'tabMobileHide':'']"
            class="titleWrap"
        >-->
        <div class="titleWrap">
            <span class="calcValueTitle">單筆投資</span>
        </div>
        <inputCompYM
            :id="'WdrawYM'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.WdrawYM"
            :change.sync="DataToRequestAPI__reCale.WdrawYM"
            :newActiveIndex="newActiveIndex"
            :max="maxlimit_YM"
            :min="minlimit_YM"
            :pass.sync="pass_status.pass_WdrawAmt"
        >
            <template slot="title">{{'開始提領年月'}}</template>
            <template slot="unit">{{'月'}}</template>
        </inputCompYM>
        <inputComp
            :id="'WdrawYear'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.WdrawYear"
            :change.sync="DataToRequestAPI__reCale.WdrawYear"
            :max="maxlimit_years"
            :min="minlimit_years"
            :pass.sync="pass_status.pass_WdrawYear"
        >
            <template slot="title">{{'提領年期'}}</template>
            <template slot="unit">{{'年'}}</template>
        </inputComp>
        <inputComp
            :value__tabAddLess="1000"
            :id="'WdrawAmt'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.WdrawAmt"
            :change.sync="DataToRequestAPI__reCale.WdrawAmt"
            :min="LimitAmtParam.MinWdrawAmt"
            :max="LimitAmtParam.MaxWdrawAmt"
            :pass.sync="pass_status.pass_WdrawAmt"
        >
            <template slot="title">{{'每月提領金額'}}</template>
            <template slot="unit">{{'元'}}</template>
        </inputComp>

        <div
            class="inputWrap inputWrap__disable"
            :class="[(ExperienceInput)&&(windowwidth<1024)&&!photoShotting?'close___calInput':'']"
        >
            <span class="inputWrap__text">投資金額</span>
            <span class="inputWrap__value">{{Data__Suggest | filterDot(0)}}</span>
            <span class="inputWrap__text">元</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import iconAdd from "@/views/experience/img/add.vue";
import iconLess from "@/views/experience/img/less.vue";
import inputComp from "@/views/experience/ChangeValue/input.vue";
import inputCompYM from "@/views/experience/ChangeValue/input__YM.vue";
import calendarSVG from "@/views/experience/img/calendarSVG.vue";
// import * as d3 from "d3";
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
            WdrawYM: "",
            WdrawYear: 0
        },
        maxlimit_YM: new Date().getFullYear() + 1,
        minlimit_YM: new Date().getFullYear(),
        maxlimit_years: 85,
        minlimit_years: 3,
        pass_status: {
            pass_WdrawAmt: true,
            pass_WdrawYear: true
        }
    }),
    computed: {
        ...mapGetters(["ExperienceInput"])
    },
    watch: {
        DataToRequestAPI__reCale: {
            immediate: true,
            handler: function(newValue) {
                if (
                    sessionStorage.getItem("DataToRequestAPI__InitialPage") &&
                    this.raw.Data__stack
                ) {
                    const list = this.raw.Data__stack.Datas.WFEResult;
                    this.maxlimit_years =
                        85 -
                        newValue.CusAge -
                        (Number(newValue.WdrawYM.substring(0, 4)) -
                            Number(list[0].YM.substring(0, 4)));

                    this.maxlimit_YM =
                        Number(list[0].YM.substring(0, 4)) +
                        Number(85 - newValue.CusAge - newValue.WdrawYear);
                }
                this.isPassMethod();
                this.$emit("update:change", newValue);
            },
            deep: true
        },
        raw: {
            immediate: true,
            handler: function(newValue) {
                if (
                    sessionStorage.getItem("DataToRequestAPI__InitialPage") &&
                    newValue.Data__stack
                ) {
                    const list = newValue.Data__stack.Datas.WFEResult;
                    const expDatas = JSON.parse(
                        sessionStorage.getItem("DataToRequestAPI__InitialPage")
                    );
                    const CusAge = expDatas.CusAge;
                    const WdrawYM = expDatas.WdrawYM;
                    const WdrawYear = expDatas.WdrawYear;
                    this.maxlimit_YM =
                        Number(list[0].YM.substring(0, 4)) +
                        (85 - CusAge - WdrawYear);
                    this.minlimit_YM = Number(list[0].YM.substring(0, 4));
                    this.maxlimit_years =
                        85 -
                        CusAge -
                        (Number(WdrawYM.substring(0, 4)) -
                            Number(list[0].YM.substring(0, 4)));
                }
                this.isPassMethod();
            },
            deep: true
        },
        pass_status: {
            immediate: true,
            handler: function(newValue) {
                this.isPassMethod();
            },
            deep: true
        }
    },
    props: {
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
        Data__Suggest: {
            type: Number,
            default: 0
        },
        raw: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {
        iconAdd,
        iconLess,
        inputComp,
        inputCompYM,
        calendarSVG
    },
    methods: {
        switchInfo: function() {
            this.toggleExperienceInput();
        },
        isPassMethod: function() {
            let pass_status = this.pass_status;
            if (
                pass_status.pass_WdrawAmt &&
                pass_status.pass_WdrawYear &&
                (this.LimitAmtParam.MinWdrawAmt <=this.DataToRequestAPI__reCale.WdrawAmt)
               &&(this.LimitAmtParam.MaxWdrawAmt >=this.DataToRequestAPI__reCale.WdrawAmt)
            ) {
                this.togglecanRegetRaw(true);
            } else {
                this.togglecanRegetRaw(false);
            }
        },
        ...mapActions([
            "toggleExperienceInput",
            "togglecanRegetRaw",
            "togglecanRegetRaw__isInit"
        ])
    },
    mounted: function() {
        this.DataToRequestAPI__reCale = this.DataToRequestAPIInitialPage;
    },
    destroyed() {}
};
</script>
<style lang="scss" src="../experience.scss">
</style>  
<style lang="scss" src="../dateOption.scss">
</style>  