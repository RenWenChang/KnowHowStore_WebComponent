<template>
    <div id="savingSolverCal" class="calWrap">
        <div class="switchbar" @click="toggleExperienceInput(!ExperienceInput)">
            <span></span>
        </div>
        <!-- <div
            v-if="savingConme"
            :class="[(newActiveIndex!==0)&&(windowwidth<768)&&!photoShotting?'tabMobileHide':'']"
            class="titleWrap"
        >-->
        <div v-if="savingConme" class="titleWrap">
            <span class="calcValueTitle">每月投資</span>
        </div>

        <div
            v-else
            :class="[(newActiveIndex!==0)&&(windowwidth<768)&&!photoShotting?'tabMobileHide':'']"
            class="tab"
        >
            <button :class="[isBalanceAmt?'active':'']" @click="switchTab(true)">單筆投資</button>
            <button :class="[!isBalanceAmt?'active':'']" @click="switchTab(false)">每月投資</button>
        </div>
        <!-- <div
            :class="[(newActiveIndex!==0)&&(windowwidth<768)&&!photoShotting?'tabMobileHide':'']"
            class="inputWrap"
        >
            <div class="inputWrap__chargeDateWrap">
                <span class="inputWrap__text">扣款日</span>
                <input
                    class="inputWrap__value"
                    v-if="focus__chargeDate"
                    id="cal__focus__chargeDate"
                    type="number"
                    @blur="setfocus__chargeDate(false)"
                    v-model.number="chargeDate"
                    :oninput="limitLength__chargeDate(inputLimit__chargeDate)"
                    :placeholder="`請輸入日期`"
                    @keypress="goBlur__chargeDate"
                />
                <span
                    class="inputWrap__value"
                    v-else
                    @click="setfocus__chargeDate(true)"
                >{{chargeDate}}</span>
                <span class="inputWrap__text">日</span>
            </div>
            <div @click="open__chargeDateselection($event)">
                <img
                    v-if="photoShotting"
                    style="width:24px;height:24px"
                    src="@/views/experience/img/for_IE_screenShot/calendar.png"
                    alt
                />
                <calendarSVG v-else :openOptionsDate="openOptions__Date"></calendarSVG>
            </div>

            <div class="options" :class="[openOptions__Date?'':'options__closed']">
                <div class="arrow"></div>
                <div class="arrowInt"></div>
                <div class="optionContainer">
                    <label
                        class="option"
                        v-for="(item) in 28"
                        :key="item"
                        @click="setfocus__chargeDate(item)"
                    >
                        <input type="radio" name="selection" :checked="chargeDate===item" />
                        <span class="text-7">{{item}}</span>
                    </label>
                </div>
            </div>
        </div>-->

        <inputComp
            :style="{width:windowwidth>=768&&windowwidth<=1024?'100%':''}"
            :id="'InvYear'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.InvYear"
            :change.sync="DataToRequestAPI__reCale.InvYear"
            :max="85-DataToRequestAPI__reCale.CusAge"
            :min="3"
            :pass.sync="pass_status.pass_InvYear"
        >
            <template slot="title">{{'投資年期'}}</template>
            <template slot="unit">{{'年'}}</template>
        </inputComp>

        <inputComp
            :value__tabAddLess="10000"
            :class="[isBalanceAmt?'':'d-none']"
            :id="'BalanceAmt'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.BalanceAmt"
            :change.sync="DataToRequestAPI__reCale.BalanceAmt"
            :min="LimitAmtParam.MinAllotAmt"
            :max="LimitAmtParam.MaxAllotAmt"
            :pass.sync="pass_status.pass_BalanceAmt"
        >
            <template slot="title">{{'單筆投資金額'}}</template>
            <template slot="unit">{{'元'}}</template>
        </inputComp>
        <inputComp
            :value__tabAddLess="1000"
            :class="[isBalanceAmt?'d-none':'']"
            :id="'SavingAmt'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.SavingAmt"
            :change.sync="DataToRequestAPI__reCale.SavingAmt"
            :min="LimitAmtParam.RSPMinAllotAmt"
            :max="LimitAmtParam.RSPMaxAllotAmt"
            :pass.sync="pass_status.pass_SavingAmt"
            :errMsg__overmin="'每月投資金額不可低於'"
        >
            <template slot="title">{{'每月投資金額'}}</template>
            <template slot="unit">{{'元'}}</template>
        </inputComp>

        <inputComp
            :value__tabAddLess="10000"
            :id="'TargetAmt'"
            :photoShotting="photoShotting"
            :windowwidth="windowwidth"
            :value="DataToRequestAPIInitialPage.TargetAmt===''?0:DataToRequestAPIInitialPage.TargetAmt"
            :change.sync="DataToRequestAPI__reCale.TargetAmt"
            :min="LimitAmtParam.MinTargetAmt"
            :max="LimitAmtParam.MaxTargetAmt"
            :pass.sync="pass_status.pass_TargetAmt"
        >
            <template slot="title">{{'目標金額'}}</template>
            <template slot="unit">{{'元'}}</template>
        </inputComp>
        <div
            :style="{width:windowwidth>=768&&windowwidth<=1024?'100%':''}"
            class="inputWrap inputWrap__disable"
            :class="[(ExperienceInput)&&(windowwidth<1024)&&!photoShotting?'close___calInput':'']"
        >
            <span class="inputWrap__text">預期金額</span>
            <span class="inputWrap__value">{{expectationRevenue | filterDot}}</span>
            <span class="inputWrap__text">元</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import inputComp from "@/views/experience/ChangeValue/input.vue";
import iconAdd from "@/views/experience/img/add.vue";
import iconLess from "@/views/experience/img/less.vue";
import calendarSVG from "@/views/experience/img/calendarSVG.vue";
// import * as d3 from "d3";
/* eslint-disable */
export default {
    data: () => ({
        savingConme: true,
        focus__chargeDate: false,
        inputLimit__chargeDate: 2,
        BalanceAmt: 0,
        SavingAmt: 0,
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
        chargeDate: 1,
        openOptions__Date: false,
        isBalanceAmt: true,
        pass_status: {
            pass_SavingAmt: true,
            pass_BalanceAmt: true,
            pass_InvYear: true,
            pass_TargetAmt: true
        }
    }),
    computed: {
        ...mapGetters(["ExperienceInput"])
    },
    watch: {
        pass_status: {
            immediate: true,
            handler: function(newValue) {
                this.isPassMethod();
            },
            deep: true
        },
        DataToRequestAPI__reCale: {
            immediate: true,
            handler: function(newValue) {
                this.$emit("update:change", newValue);
                this.$nextTick(() => {
                    this.isPassMethod__switch(newValue.BalanceAmt !== 0);
                    this.isPassMethod();
                });
            },
            deep: true
        },
        Data__Suggest: {
            immediate: true,
            handler: function(newValue) {
                //init
                if (this.savingConme) {
                    //saving
                    this.DataToRequestAPI__reCale.SavingAmt = newValue;
                    this.DataToRequestAPI__reCale.BalanceAmt = 0;
                }
            },
            deep: true
        },
        DataToRequestAPIInitialPage: {
            immediate: true,
            handler: function(newValue) {
                this.DataToRequestAPI__reCale = newValue;
            },
            deep: true
        },
        isBalanceAmt: {
            immediate: true,
            handler: function(newValue) {
                sessionStorage.setItem("isBalanceAmt", newValue);
                this.isPassMethod__switch(newValue);
            },
            deep: true
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
            default: 500
        }
    },
    components: {
        iconAdd,
        iconLess,
        calendarSVG,
        inputComp
    },
    methods: {
        open__chargeDateselection: function(e) {
            this.openOptions__Date = true;
            e.stopPropagation();
            e.preventDefault();
            document.addEventListener(
                "click",
                this.close__openOptions__Date,
                false
            );
        },
        close__openOptions__Date: function(e) {
            e.stopPropagation();
            this.openOptions__Date = false;
        },
        setfocus__chargeDate: function(focus) {
            if (typeof focus === "boolean") {
                this.focus__chargeDate = focus;
                if (focus) {
                    this.$nextTick(() => {
                        document
                            .querySelector("#cal__focus__chargeDate")
                            .focus();
                    });
                } else {
                    let value = Number(
                        document.querySelector("#cal__focus__chargeDate").value
                    );
                    if (value > 29 || value < 1) {
                        this.chargeDate = 1;
                    }
                }
            } else {
                this.chargeDate = focus;
            }
        },

        goBlur__chargeDate: function(e) {
            if (e.keyCode === 13) {
                this.$nextTick(() => {
                    document.querySelector("#cal__focus__chargeDate").blur();
                });
            }
        },

        limitLength__chargeDate: function(type) {
            return `if(value.length>${this.inputLimit__chargeDate})value=Number(value.slice(0,${this.inputLimit__chargeDate}))`;
        },
        switchTab: function(isBalanceAmt) {
            let SavingAmt = this.DataToRequestAPI__reCale.SavingAmt;
            let BalanceAmt = this.DataToRequestAPI__reCale.BalanceAmt;
            this.isBalanceAmt = isBalanceAmt;
        },
        isPassMethod: function() {
            let pass_status = this.pass_status;
            if (this.isBalanceAmt) {
                if (pass_status.pass_BalanceAmt && pass_status.pass_InvYear) {
                    this.togglecanRegetRaw(true);
                } else {
                    this.togglecanRegetRaw(false);
                }
            } else {
                if (pass_status.pass_InvYear && pass_status.pass_SavingAmt) {
                    this.togglecanRegetRaw(true);
                } else {
                    this.togglecanRegetRaw(false);
                }
            }
        },
        isPassMethod__switch: function(isBalanceAmt) {
            if (isBalanceAmt) {
                if (
                    this.DataToRequestAPI__reCale.BalanceAmt <
                    this.LimitAmtParam.MinAllotAmt
                ) {
                    this.togglecanRegetRaw(false);
                } else {
                    this.togglecanRegetRaw(true);
                }
            } else {
                if (
                    this.DataToRequestAPI__reCale.SavingAmt <
                    this.LimitAmtParam.RSPMinAllotAmt
                ) {
                    this.togglecanRegetRaw(false);
                } else {
                    this.togglecanRegetRaw(true);
                    
                }
            }
        },
        switchInfo: function() {
            this.toggleExperienceInput();
        },
        ...mapActions(["toggleExperienceInput", "togglecanRegetRaw","togglecanRegetRaw__isInit"])
    },
    mounted: function() {
        let expDatas = JSON.parse(sessionStorage.getItem("expDatas"));
        this.isBalanceAmt = expDatas.way === 1 ? true : false;
        this.DataToRequestAPI__reCale = this.DataToRequestAPIInitialPage;
    },
    destroyed() {
        document.removeEventListener("click", this.close__openOptions__Date);
    }
};
</script>
<style lang="scss" src="../experience.scss">
</style>  
<style lang="scss" src="../dateOption.scss">
</style>  