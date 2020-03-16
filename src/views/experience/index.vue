<template>
    <div class="experience">
        <div class="banner" :class="[(photoShotting)?'tabMobileHide':'']"></div>
        <div class="character">
            <img src="../../assets/img/svg/illus/小粉獅太空人.png" />
        </div>

        <tabBar :newActiveIndex.sync="newActiveIndex"></tabBar>
        <section class="featureSection">
            <div id="dashboad__forShot" v-if="(photoShotting)&&(windowwidth<1024)">
                <span class="icon__number__forShot">
                    {{target }} &nbsp; :&nbsp;，
                    {{target__step2}}
                </span>
            </div>
            <div class="headInfo w-100" :class="[(windowwidth<1024)?'d-none':'']">
                <div class="headTitle">
                    <div class="step1__forShot" @click="back(true)">
                        <iconRightArrow></iconRightArrow>
                        <span>返回</span>
                    </div>
                    <div class="step2">
                        <span>{{target__step2}}</span>
                    </div>
                </div>
                <!-- <div class="mation">
                    <img
                        class
                        style="width:24px;height:24px; margin-right:15px;"
                        src="@/views/experience/img/for_IE_screenShot/info.png"
                        alt
                    />
                    <span>晨星WFE財富預測引擎（Wealth Forecasting Engine）：是一套精密、動態模擬的財務預測應用軟體，因應不同人生階段之財務規劃，提供客製化資產配置，模擬財務目標的實現機率。</span>
                </div>-->
            </div>

            <stackpageWrap
                ref="stack"
                class="experience__spreadsheet"
                :class="[(newActiveIndex!==0)&&(windowwidth<1024)&&!photoShotting?'tabMobileHide':'']"
                :data="data.stack"
                :windowwidth="windowwidth"
                :expectationRevenue="data.expectationRevenue"
                :target="DataToRequestAPI__reCale.TargetAmt||0"
                :targetWording="target"
                :WdrawYM="DataToRequestAPI__reCale.WdrawYM"
                :photoShotting="photoShotting"
                :investType="investType"
            >不同投資目標在不同情境下，會有不同的投資表現，模擬僅可作為參考，基金投資具有投資風險，可能使本金發生虧損。</stackpageWrap>
            <PieBarPageWrap
                ref="pieBar"
                :pieData="data.pie"
                :barData="data.bar"
                class="experience__type"
                :class="[(newActiveIndex!==1)&&(windowwidth<1024)&&!photoShotting?'tabMobileHide':'',blockInvestmentInfo?'tabMobileHide':'']"
                :photoShotting="photoShotting"
                :windowwidth="windowwidth"
            ></PieBarPageWrap>
            <LinePageWrap
                ref="line"
                class="experience__performance"
                :class="[(newActiveIndex!==1)&&windowwidth<1024&&!photoShotting?'tabMobileHide':'',(windowwidth>1023&&!LinePageWrapOpen?'experience__performanceClose':''),blockInvestmentInfo?'tabMobileHide':'']"
                :data="data.line"
                :windowwidth="windowwidth"
                @click="switchLinePageWrap"
            ></LinePageWrap>
            <div
                class="experience__amount"
                :class="[(newActiveIndex!==0)&&(windowwidth<1024)&&!photoShotting?'tabMobileHide':'']"
            >
                <valueColume
                    :raw="raw"
                    :change.sync="DataToRequestAPI__reCale"
                    :DataToRequestAPIInitialPage="DataToRequestAPI__InitialPage"
                    :riskSlider="data.riskSlider"
                    :LimitAmtParam="data.LimitAmtParam"
                    :photoShotting="photoShotting"
                    :newActiveIndex="newActiveIndex"
                    :windowwidth="windowwidth"
                    :investType="investType"
                    :expectationRevenue="data.expectationRevenue"
                    :Data__Suggest="raw.Data__Suggest"
                ></valueColume>
                <div
                    class="experience__risk"
                    @click="reGetRaw"
                    v-if="canRegetRaw&&!canRegetRaw__isInit"
                >
                    <div
                        class="Notifybubble"
                        :class="[canRegetRaw__isInit?'Notifybubble__Hide':'']"
                    >
                        <div class="arrow"></div>
                        <div class="arrowInt"></div>
                        <span>請記得按「重新試算」，取得最新資料、圖表！</span>
                    </div>
                    <button v-if="windowwidth>1023" class="doCal">按我重新試算</button>
                    <button
                        v-else
                        :class="[photoShotting?'tabMobileHide':'']"
                        class="doCal doCal__mobile"
                    >重新試算</button>
                </div>
                <div class="experience__risk" v-else>
                    <div
                        class="Notifybubble"
                        :class="[canRegetRaw__isInit?'Notifybubble__Hide':'']"
                    >
                        <div class="arrow"></div>
                        <div class="arrowInt"></div>
                        <span>請記得按「重新試算」，取得最新資料、圖表！</span>
                    </div>
                    <button v-if="windowwidth>1023" class="doCal doCal__disable">按我重新試算</button>
                    <button
                        v-else
                        :class="[photoShotting?'tabMobileHide':'']"
                        class="doCal doCal__disable doCal__mobile"
                    >重新試算</button>
                </div>
            </div>
            <div
                class="experience__save"
                :class="[((newActiveIndex!==0)&&(windowwidth<1024))||photoShotting?'tabMobileHide':'']"
            >
                <div class="saveOrRedo__btn">
                    <button class="disable" v-if="false">儲存試算結果 {{countDown}}</button>
                    <button v-else @click.prevent="takescreenshot($event)">儲存試算結果</button>
                    <button @click="back(true)">重新規劃</button>
                </div>
            </div>
        </section>

        <showBox
            v-if="showtheBox"
            :click.sync="showtheBox"
            :DataToRequestAPI__reCale="DataToRequestAPI__reCale"
            :raw="raw"
        ></showBox>
        <LINELoginPage v-if="isLINELogin" :click.sync="isLINELogin"></LINELoginPage>
        <eFirstfooter :class="[photoShotting?'tabMobileHide':'']"></eFirstfooter>
    </div>
</template>
<script>
// mode config
const hasAPI = true;
const dontWantedQA = false;

// 本元件控制數據流 路由判斷/原始數據進出/蒐集，不做任何修改
import iconRightArrow from "@/assets/img/svg/arrow/right-arrow.vue";
import * as html2canvas from "html2canvas";
import canvg from "canvg";
import valueColume from "@/views/experience/ChangeValue/ChangeValue.vue";
import { mapActions, mapGetters } from "vuex";
import eFirstfooter from "@/views/eFirstfooter.vue";
import tabBar from "@/views/experience/charts/tabBar.vue";
import PieBarPageWrap from "@/views/experience/charts/chartWrap/PieBarPageWrap.vue";
import LinePageWrap from "@/views/experience/charts/chartWrap/LinePageWrap.vue";
import stackpageWrap from "@/views/experience/charts/chartWrap/stackPageWrap.vue";
import showBox from "@/views/experience/showBox.vue";
import Vue from "vue";
import LINELoginPage from "@/components/LINE_Login_Landing.vue";

//沒api資料源
import apiData__riskSlider from "@/views/experience/Data_NoAPI/apiData__riskSlider.js";
import apiData_LimitAmtParam from "@/views/experience/Data_NoAPI/apiData_LimitAmtParam.js";
import apiData_perform from "@/views/experience/Data_NoAPI/apiData_perform.js";
import apiData_piebar from "@/views/experience/Data_NoAPI/apiData_piebar.js";
import apiData_savingsolver from "@/views/experience/Data_NoAPI/apiData_savingsolver.js";

export default {
    name: "experience",
    watch: {
        DataToRequestAPI__reCale: {
            immediate: true,
            handler: function(newValue) {
                sessionStorage.setItem(
                    "DataToRequestAPI__InitialPage",
                    JSON.stringify(newValue)
                );
            },
            deep: true
        },
        // canRegetRaw__isInit: {
        //     immediate: true,
        //     handler: function(newValue) {
        //         setTimeout(function() {
        //             if (!newValue
        //             ) {
        //                 document
        //                     .querySelector(".Notifybubble")
        //                     .classList.add("Notifybubble__Hide");
        //             }
        //         }, 5000);
        //     },
        //     deep: true
        // }
    },
    components: {
        tabBar,
        LinePageWrap,
        PieBarPageWrap,
        stackpageWrap,
        eFirstfooter,
        valueColume,
        iconRightArrow,
        showBox,
        LINELoginPage
    },
    data() {
        return {
            disable: true,
            countDown: 2,
            newActiveIndex: 0,
            showtheBox: false,
            investType: "",
            data: {
                stack: {
                    WFEResult: [
                        {
                            month: new Date(2014, 0, 1),
                            p875: 0,
                            p750: 0,
                            p625: 0,
                            p500: 0,
                            p375: 0,
                            p250: 0,
                            p125: 0,
                            accumulationCost: 500,
                            YM: "202001"
                        }
                    ],
                    expectation: 1600,
                    target: 1400
                },
                pie: [
                    {
                        type: "01",
                        name: "股票",
                        value: 30
                    }
                ],
                bar: [
                    {
                        type: "01",
                        name: "美國股票",
                        value: 10
                    }
                ],
                line: {
                    list: [
                        {
                            SQL_Value: 0.1,
                            SQL_DateTime: "2015-10-09T17:05:00"
                        }
                    ]
                },
                riskSlider: {
                    PortList: []
                },
                LimitAmtParam: {},
                expectationRevenue: 0
            },

            DataToRequestAPI__InitialPage: {
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
            DataToRequestAPI__reCale: {},
            LinePageWrapOpen: true,
            raw: {},
            isLINELogin: false,
            target: "------",
            target__step2: "------"
        };
    },
    props: {
        windowwidth: {
            type: Number,
            default: window.innerWidth
        }
    },
    methods: {
        processControl: function() {
            this.toggleisExperiencePage(true); //切換nav bar
            this.toggleExpLightBox(false); //關閉問券選單
            let QAhasDone = this.haveQA(); //判斷是否填問券

            if (!dontWantedQA) {
                this.getTarget();
                this.getInvestType(); //取得問券種類
            }
            if (QAhasDone) {
                let isIE__screenshotRedirection = this.isIE__screenshotRedirection();

                if (isIE__screenshotRedirection) {
                    //若為網頁重新導向不打api 由session取得
                    this.redirection_getRaw();
                } else {
                    this.getRaw();
                }
                this.setCountDown();
            }
        },
        haveQA: async function() {
            let questionAnswer = true;
            if (dontWantedQA) {
                questionAnswer = true;
            } else {
                questionAnswer = (await JSON.parse(
                    sessionStorage.getItem("expDatas")
                ))
                    ? true
                    : false;
            }

            if (!questionAnswer) {
                const globalVue = new Vue({});
                globalVue.$msgBox.showMsgBox({
                    content: "請填寫問券再進入此頁",
                    BtnText1: "確認",
                    isShowBtn1: true,
                    titleClass: "",
                    isNormalBox: true,
                    fn1: () => {
                        this.$router.push({
                            name: `landingPage`
                        });
                    }
                });
            } else {
                return true;
            }
        },
        getInvestType: function() {
            const questionAnswer = JSON.parse(
                sessionStorage.getItem("expDatas")
            );
            this.investType = String(questionAnswer.target)[0];
        },
        getRaw: async function() {
            const questionAnswer = JSON.parse(
                sessionStorage.getItem("expDatas")
            );
            if (dontWantedQA) {
                //dev__test
                this.investType = "2";
            }
            let QA__Mapping = {};
            switch (this.investType) {
                case "1":
                    if (dontWantedQA) {
                        QA__Mapping = {
                            //開發期間不填問券 dev__test
                            CusAge: 45,
                            RiskQuestion: "03",
                            InvestableAmt: "05",
                            TargetAmt: 10000,
                            BalanceAmt: 0,
                            SavingAmt: 0,
                            InvYear: 10,
                            WdrawAmt: 0,
                            WdrawYM: 0,
                            WdrawYear: 0
                        };
                    } else {
                        QA__Mapping = {
                            //base
                            CusAge: questionAnswer.age,
                            RiskQuestion: questionAnswer.risk,
                            InvestableAmt: questionAnswer.range,
                            //saving
                            TargetAmt: questionAnswer.money,
                            //projection
                            BalanceAmt: 0,
                            SavingAmt: 0,
                            //saving and projection
                            InvYear: questionAnswer.year,
                            //wealth
                            WdrawAmt: 0,
                            WdrawYM: 0,
                            WdrawYear: 0
                        };
                    }

                    this.DataToRequestAPI__InitialPage = QA__Mapping;
                    await sessionStorage.setItem(
                        "DataToRequestAPI__InitialPage",
                        JSON.stringify(this.DataToRequestAPI__InitialPage)
                    );
                    if (hasAPI) {
                        this.raw = await this.SavingSolver__init();
                    }

                    break;
                case "2":
                    if (dontWantedQA) {
                        QA__Mapping = {
                            //開發期間不填問券 dev__test
                            CusAge: 45,
                            RiskQuestion: "03",
                            InvestableAmt: "05",
                            TargetAmt: 0,
                            BalanceAmt: 0,
                            SavingAmt: 0,
                            InvYear: 0,
                            WdrawAmt: 7000,
                            WdrawYM: "202501",
                            WdrawYear: 10
                        };
                    } else {
                        QA__Mapping = {
                            // //base
                            CusAge: questionAnswer.age,
                            RiskQuestion: questionAnswer.risk,
                            InvestableAmt: questionAnswer.range,
                            //saving
                            TargetAmt: 0,
                            //projection
                            BalanceAmt: 0,
                            SavingAmt: 0,
                            //saving and projection
                            InvYear: 0,
                            //wealth
                            WdrawAmt: questionAnswer.money,
                            WdrawYM: `${String(
                                new Date().getFullYear() + questionAnswer.when
                            )}${
                                new Date().getMonth() + 1 < 10
                                    ? `0${new Date().getMonth() + 1}`
                                    : new Date().getMonth() + 1
                            }`,
                            WdrawYear: questionAnswer.year
                        };
                    }

                    this.DataToRequestAPI__InitialPage = QA__Mapping;
                    await sessionStorage.setItem(
                        "DataToRequestAPI__InitialPage",
                        JSON.stringify(this.DataToRequestAPI__InitialPage)
                    );
                    if (hasAPI) {
                        this.raw = await this.WealthSolver__init();
                    }

                    break;
                case "3":
                    if (dontWantedQA) {
                        QA__Mapping = {
                            //開發期間不填問券 dev__test
                            CusAge: 45,
                            RiskQuestion: "03",
                            InvestableAmt: "05",
                            TargetAmt: 0,
                            BalanceAmt: 0,
                            SavingAmt: 3000,
                            InvYear: 10,
                            WdrawAmt: 0,
                            WdrawYM: "",
                            WdrawYear: 0
                        };
                    } else {
                        QA__Mapping = {
                            // //base
                            CusAge: questionAnswer.age,
                            RiskQuestion: questionAnswer.risk,
                            InvestableAmt: questionAnswer.range,
                            //saving
                            TargetAmt: 0,
                            //projection
                            BalanceAmt:
                                questionAnswer.way === 1
                                    ? questionAnswer.money
                                    : 0,
                            SavingAmt:
                                questionAnswer.way === 2
                                    ? questionAnswer.money
                                    : 0,
                            //saving and projection
                            InvYear: questionAnswer.year,
                            //wealth
                            WdrawAmt: 0,
                            WdrawYM: "",
                            WdrawYear: 0
                        };
                    }

                    this.DataToRequestAPI__InitialPage = QA__Mapping;
                    await sessionStorage.setItem(
                        "DataToRequestAPI__InitialPage",
                        JSON.stringify(this.DataToRequestAPI__InitialPage)
                    );
                    if (hasAPI) {
                        this.raw = await this.Projection__init();
                    }

                    break;
            }

            if (hasAPI) {
                //     有api時
                this.data.stack = this.raw.Data__stack.Datas;
                this.data.pie = this.raw.Data__piebar.Datas.AssetAllocate;
                this.data.bar = this.raw.Data__piebar.Datas.CateAllocate;
                this.data.line = this.raw.Data__line.Datas;
                this.data.riskSlider = this.raw.Data__riskSlider.Datas;
                this.data.LimitAmtParam = this.raw.Data__LimitAmtParam.Datas;
                let arg = this.data.stack.WFEResult;
                this.data.expectationRevenue = arg[arg.length - 1]["Col4"];
                await sessionStorage.setItem("raw", JSON.stringify(this.raw));
            } else {
                // 無api時 dev__test
                this.data.stack = apiData_savingsolver.Datas;
                this.data.pie = apiData_piebar.Datas.AssetAllocate;
                this.data.bar = apiData_piebar.Datas.CateAllocate;
                this.data.line = apiData_perform.Datas;
                this.data.riskSlider = apiData__riskSlider.Datas;
                this.data.LimitAmtParam = apiData_LimitAmtParam.Datas;
                let arg = this.data.stack.WFEResult;
                this.data.expectationRevenue = arg[arg.length - 1]["Col4"];
            }
            this.togglecanRegetRaw__isInit(true);
            this.toggleBlockInvestmentInfo(false);
        },
        reGetRaw: async function() {
            //call api then
            this.DataToRequestAPI__InitialPage = this.DataToRequestAPI__reCale;
            await sessionStorage.setItem(
                "DataToRequestAPI__InitialPage",
                JSON.stringify(this.DataToRequestAPI__InitialPage)
            );
            if (this.investType === "2") {
                this.raw = await this.WealthSolver__ReGet();
            } else {
                this.raw = await this.Projection__ReGet();
            }
            window.scrollTo(0, 0);
            this.data.stack = await this.raw.Data__stack.Datas;
            this.data.pie = await this.raw.Data__piebar.Datas.AssetAllocate;
            this.data.bar = await this.raw.Data__piebar.Datas.CateAllocate;
            this.data.line = await this.raw.Data__line.Datas;
            this.data.riskSlider = await this.raw.Data__riskSlider.Datas;
            this.data.LimitAmtParam = await this.raw.Data__LimitAmtParam.Datas;
            let arg = this.data.stack.WFEResult;
            this.data.expectationRevenue = arg[arg.length - 1]["Col4"];
            this.togglecanRegetRaw__isInit(true);
            this.toggleBlockInvestmentInfo(false);
        },
        SavingSolver__init: async function() {
            this.toggleLoading(true);
            let url = await this.getSavingSolverAnswer();
            let {
                XMLString,
                ModelIDURL,
                RiskLevelURL,
                PortPerformURL
            } = await this.getSavingSolverXml__url(url.WFEURL);
            const Data__stack = await this.apiPutSavingSolver(XMLString);
            const Data__Suggest = Data__stack.Datas.AdvSavingAmt;
            const Data__line = await this.apiGetPortPerform(PortPerformURL);
            const Data__riskSlider = await this.apiGetRiskLevels(RiskLevelURL);
            const Data__piebar = await this.apiGetPortfolioAllocates(
                ModelIDURL
            );
            const Data__LimitAmtParam = await this.apiGetLimitAmtParam();

            await sessionStorage.setItem(
                "AdvSavingAmt",
                JSON.stringify(Data__Suggest)
            );
            sessionStorage.setItem(
                "Data__riskSlider",
                JSON.stringify(Data__riskSlider)
            );
            this.toggleLoading(false);
            return {
                Data__stack,
                Data__line,
                Data__riskSlider,
                Data__piebar,
                Data__LimitAmtParam,
                Data__Suggest
            };
        },
        WealthSolver__init: async function() {
            this.toggleLoading(true);
            let url = await this.getWealthSolverAnswer();
            let {
                XMLString,
                ModelIDURL,
                RiskLevelURL,
                PortPerformURL
            } = await this.getWealthSolverXML__url(url.WFEURL);
            const Data__stack = await this.apiPutWealthSolver(XMLString);
            const Data__Suggest = Data__stack.Datas.AdvInvAmt;
            const Data__line = await this.apiGetPortPerform(PortPerformURL);
            const Data__riskSlider = await this.apiGetRiskLevels(RiskLevelURL);
            const Data__piebar = await this.apiGetPortfolioAllocates(
                ModelIDURL
            );
            const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            sessionStorage.setItem(
                "Data__riskSlider",
                JSON.stringify(Data__riskSlider)
            );
            this.toggleLoading(false);
            return {
                Data__stack,
                Data__line,
                Data__riskSlider,
                Data__piebar,
                Data__LimitAmtParam,
                Data__Suggest
            };
        },
        Projection__init: async function() {
            this.toggleLoading(true);
            let url = await this.getProjectionAnswer();

            let {
                XMLString,
                ModelIDURL,
                RiskLevelURL,
                PortPerformURL
            } = await this.getProjectionSolverXML__url(url.WFEURL);
            const Data__stack = await this.apiPutProjection(XMLString);
            const Data__line = await this.apiGetPortPerform(PortPerformURL);
            const Data__riskSlider = await this.apiGetRiskLevels(RiskLevelURL);
            const Data__piebar = await this.apiGetPortfolioAllocates(
                ModelIDURL
            );
            const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            sessionStorage.setItem(
                "Data__riskSlider",
                JSON.stringify(Data__riskSlider)
            );
            this.toggleLoading(false);
            return {
                Data__stack,
                Data__line,
                Data__riskSlider,
                Data__piebar,
                Data__LimitAmtParam
            };
        },

        SavingSolver__ReGet: async function() {
            this.toggleLoading(true);
            const {
                XMLString,
                ModelIDURL,

                PortPerformURL
            } = await this.getSavingSolverXml();
            const Data__stack = await this.apiPutSavingSolver(XMLString);
            const Data__Suggest = await Data__stack.AdvSavingAmt;
            const Data__line = await this.apiGetPortPerform(PortPerformURL);
            const Data__riskSlider = await JSON.parse(
                sessionStorage.getItem("Data__riskSlider")
            );
            const Data__piebar = await this.apiGetPortfolioAllocates(
                ModelIDURL
            );
            const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            this.toggleLoading(false);

            return {
                Data__stack,
                Data__line,
                Data__riskSlider,
                Data__piebar,
                Data__LimitAmtParam,
                Data__Suggest
            };
        },

        WealthSolver__ReGet: async function() {
            this.toggleLoading(true);
            const {
                XMLString,
                ModelIDURL,

                PortPerformURL
            } = await this.getWealthSolverXML();
            const Data__stack = await this.apiPutWealthSolver(XMLString);
            const Data__Suggest = Data__stack.Datas.AdvInvAmt;
            const Data__line = await this.apiGetPortPerform(PortPerformURL);
            const Data__riskSlider = JSON.parse(
                sessionStorage.getItem("Data__riskSlider")
            );
            const Data__piebar = await this.apiGetPortfolioAllocates(
                ModelIDURL
            );
            const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            this.toggleLoading(false);
            return {
                Data__stack,
                Data__line,
                Data__riskSlider,
                Data__piebar,
                Data__LimitAmtParam,
                Data__Suggest
            };
        },
        Projection__ReGet: async function() {
            this.toggleLoading(true);
            const {
                XMLString,
                ModelIDURL,

                PortPerformURL
            } = await this.getProjectionSolverXML();
            const Data__stack = await this.apiPutProjection(XMLString);
            const Data__line = await this.apiGetPortPerform(PortPerformURL);
            const Data__riskSlider = JSON.parse(
                sessionStorage.getItem("Data__riskSlider")
            );
            const Data__piebar = await this.apiGetPortfolioAllocates(
                ModelIDURL
            );
            const Data__LimitAmtParam = await this.apiGetLimitAmtParam();
            let Data__Suggest;
            if (
                JSON.parse(sessionStorage.getItem("AdvSavingAmt")) ||
                JSON.parse(sessionStorage.getItem("AdvSavingAmt")) === 0
            ) {
                Data__Suggest = JSON.parse(
                    sessionStorage.getItem("AdvSavingAmt")
                );
            }
            this.toggleLoading(false);
            return {
                Data__stack,
                Data__line,
                Data__riskSlider,
                Data__piebar,
                Data__LimitAmtParam,
                Data__Suggest
            };
        },

        apiPutSavingSolver: async function(XMLString) {
            let QA = JSON.parse(
                sessionStorage.getItem("DataToRequestAPI__InitialPage")
            );
            const data = {
                XMLString: `${XMLString}`,
                InvYear: QA.InvYear,
                CusAge: QA.CusAge
            };
            const response = await this.putSavingSolver(data);
            return response;
        },
        apiPutWealthSolver: async function(XMLString) {
            let QA = JSON.parse(
                sessionStorage.getItem("DataToRequestAPI__InitialPage")
            );
            const data = {
                XMLString: `${XMLString}`,
                CusAge: QA.CusAge
            };
            const response = await this.putWealthSolver(data);
            return response;
        },
        apiPutProjection: async function(XMLString) {
            let QA = JSON.parse(
                sessionStorage.getItem("DataToRequestAPI__InitialPage")
            );
            const data = {
                XMLString: `${XMLString}`,
                BalanceAmt: QA.BalanceAmt,
                SavingAmt: QA.SavingAmt,
                InvYear: QA.InvYear,
                CusAge: QA.CusAge
            };
            const response = await this.putProjection(data);
            return response;
        },
        apiGetPortPerform: async function(PortPerformURL) {
            const response = await this.getPortPerform(PortPerformURL);
            return response;
        },

        apiGetRiskLevels: async function(RiskLevelURL) {
            const response = await this.getRiskLevels(RiskLevelURL);
            return response;
        },
        apiGetPortfolioAllocates: async function(ModelIDURL) {
            const response = await this.getPortfolioAllocates(ModelIDURL);
            return response;
        },
        apiGetLimitAmtParam: async function() {
            const response = await this.getLimitAmtParam();
            return response;
        },

        back: async function(n) {
            const globalVue = new Vue({});
            globalVue.$msgBox.showMsgBox({
                content: "您確認是否離開，您設定過的資訊即將被清除！",
                BtnText1: "取消",
                BtnText2: "確認",
                isShowBtn2: true,
                isNormalBox: true,
                title: "親愛的投資人，您好：",
                fn1: () => {
                    this.$msgBox.closeBox;
                },
                fn2: () => {
                    this.$router.push({
                        name: `landingPage`
                    });
                    this.toggleExpLightBox(n);
                }
            });
        },
        switchLinePageWrap: function() {
            this.LinePageWrapOpen = !this.LinePageWrapOpen;
        },
        takescreenshot: function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.isIE()) {
                this.togglePhotoShotting(true);
                this.convertHtml2Canvas__IE();
            } else {
                this.convertHtml2Canvas();
            }
        },
        convertHtml2Canvas: function() {
            this.toggleLoading(true);
            let vm = this;
            vm.togglePhotoShotting(true);
            let element = document.querySelector(".featureSection");
            // let dashboard = document.querySelector("#dashboard");
            setTimeout(() => {
                this.$nextTick(async () => {
                    let vm = this;
                    window.scrollTo(0, 0);
                    await html2canvas(element, {
                        allowTaint: false,
                        taintTest: true,
                        windowWidth:
                            vm.windowwidth < 1024
                                ? element.scrollWidth
                                : vm.windowwidth,
                        width: element.scrollWidth,
                        height: element.scrollHeight
                    })
                        .then(async function(canvas) {
                            canvas.setAttribute("class", "canvas");
                            let base64 = new Image();
                            base64 = await canvas.toDataURL("image/png", 0.1);
                            sessionStorage.setItem("base64", base64);
                            // download things
                            // const link = document.createElement('a');
                            // link.href = base64;
                            // link.download = 'e-First智能理財';
                            // link.click();
                            // // Clear memory
                            window.URL.revokeObjectURL(base64);
                            vm.togglePhotoShotting(false);
                            window.scrollTo(
                                0,
                                document.body.scrollHeight ||
                                    document.documentElement.scrollHeight
                            );
                            vm.toggleLoading(false);
                            vm.showtheBox = true;
                        })
                        .catch(function(e) {
                            return e;
                        });
                });
            }, 1000);
        },
        convertHtml2Canvas__IE: async function() {
            this.toggleLoading(true);
            let vm = this;
            // 以下是對 svg 的處理
            let svgElem = document
                .querySelector(".featureSection")
                .querySelectorAll("svg");
            svgElem.forEach((node, i) => {
                let parentNode = node.parentNode;
                let svg = new XMLSerializer()
                    .serializeToString(node)
                    .replace('xmlns:NS1=""', "")
                    .replace('xmlns:NS2=""', "")
                    .replace(
                        'NS1:xmlns:xlink="http://www.w3.org/1999/xlink',
                        ""
                    )
                    .replace('NS2:xml:space="preserve"', "");
                let canvas = document.createElement("canvas");
                canvas.width = node.width;
                canvas.height = node.height;
                parentNode.appendChild(canvas);
                let canvasGetContext = canvas.getContext("2d");
                if (i === 1 || i === 2 || i === 3 || i === 4) {
                    let v = canvg.fromString(canvasGetContext, svg);
                    v.start();
                    parentNode.removeChild(node);
                    parentNode.appendChild(canvas);
                }
            });

            let bodytpclass = "";
            if (vm.windowwidth >= 1024) {
                bodytpclass = "ie_1024";
                document.querySelector("body").classList.add(bodytpclass);
            } else if (vm.windowwidth >= 1920) {
                bodytpclass = "ie_1920";
                document.querySelector("body").classList.add(bodytpclass);
            }
            this.$refs.stack.$refs.stack.init(false);
            this.$refs.pieBar.$refs.pie.init(false);
            this.$refs.pieBar.$refs.bar.init(false);
            this.$refs.line.$refs.line.init(false);
            // 截圖

            vm.togglePhotoShotting(true);
            let element = document.querySelector(".featureSection");
            // let dashboard = document.querySelector("#dashboard");
            vm.$nextTick(async () => {
                let vm = this;
                window.scrollTo(0, 0);
                await html2canvas(element, {
                    allowTaint: false,
                    taintTest: true,
                    windowWidth:
                        vm.windowwidth > 1439
                            ? vm.windowwidth
                            : element.scrollWidth,
                    width: element.scrollWidth,
                    height: element.scrollHeight
                })
                    .then(async function(canvas) {
                        canvas.setAttribute("class", "canvas");
                        let base64 = new Image();
                        base64 = await canvas.toDataURL("image/png", 0.1);
                        sessionStorage.setItem("base64", base64);
                        // // Clear memory
                        window.URL.revokeObjectURL(base64);
                        vm.togglePhotoShotting(false);
                        window.scrollTo(
                            0,
                            document.body.scrollHeight ||
                                document.documentElement.scrollHeight
                        );
                        document
                            .querySelector("body")
                            .classList.remove(bodytpclass);

                        sessionStorage.setItem(
                            "redirectBack__IEscreenshot",
                            true
                        );
                        vm.toggleLoading(false);
                        window.location.reload();
                    })
                    .catch(function(e) {
                        return e;
                    });
            });
        },
        redirection_getRaw: async function() {
            this.DataToRequestAPI__InitialPage = JSON.parse(
                sessionStorage.getItem("DataToRequestAPI__InitialPage")
            );
            this.raw = JSON.parse(sessionStorage.getItem("raw"));
            this.data.stack = this.raw.Data__stack.Datas;
            this.data.pie = this.raw.Data__piebar.Datas.AssetAllocate;
            this.data.bar = this.raw.Data__piebar.Datas.CateAllocate;
            this.data.line = this.raw.Data__line.Datas;
            this.data.riskSlider = this.raw.Data__riskSlider.Datas;
            this.data.LimitAmtParam = this.raw.Data__LimitAmtParam.Datas;
            let arg = this.data.stack.WFEResult;
            this.data.expectationRevenue = arg[arg.length - 1]["Col4"];
            sessionStorage.removeItem("redirectBack");
        },
        setCountDown: function() {
            let resetValaue = setInterval(() => {
                if (this.countDown > 1) {
                    this.countDown = this.countDown - 1;
                } else {
                    this.disable = false;
                    clearTimeout(resetValaue);
                }
            }, 1000);
        },
        isIE: function() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return true;
            } else {
                return false;
            }
        },
        isIE__screenshotRedirection: function() {
            let isIE = this.isIE();
            if (isIE) {
                const redirectBack__IEscreenshot = JSON.parse(
                    sessionStorage.getItem("redirectBack__IEscreenshot")
                );
                if (redirectBack__IEscreenshot) {
                    this.showtheBox = true;
                    sessionStorage.removeItem("redirectBack__IEscreenshot");
                }
            } else {
                return false;
            }
        },
        getTarget: function() {
            if (JSON.parse(sessionStorage.getItem("expDatas"))) {
                const target = JSON.parse(sessionStorage.getItem("expDatas"))
                    .target;
                switch (target) {
                    case 101:
                        this.target = "子女教育基金";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 102:
                        this.target = "購屋頭期款";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 103:
                        this.target = "旅遊基金";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 104:
                        this.target = "樂活退休規劃";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 201:
                        this.target = "樂齡退休月月領";
                        this.target__step2 =
                            "我現在該準備多少錢投資，才能達到提領目標呢？";
                        break;
                    case 301:
                        this.target = "就是想存一筆錢";
                        this.target__step2 = "我的資產會增值多少呢？";
                        break;
                }
            }
        },
        getFooterTop_doCal() {
            let doCal = document.querySelector(".doCal__mobile");
            let footer = document.querySelector("#efirstFooter");
            if (doCal && footer) {
                let footer__top = footer.getBoundingClientRect().top;
                if (window.innerHeight > footer__top) {
                    doCal.setAttribute(
                        "style",
                        `bottom:${window.innerHeight - footer__top + 70}px`
                    );
                }
            }
        },

        ...mapActions([
            //UI
            "toggleExpLightBox",
            "toggleisExperiencePage",
            "togglePhotoShotting",
            "toggleLoading",
            "togglecanRegetRaw__isInit",
            "toggleBlockInvestmentInfo",
            //reGet raw
            "getSavingSolverXml",
            "getWealthSolverXML",
            "getProjectionSolverXML",
            //init
            "getSavingSolverAnswer",
            "getWealthSolverAnswer",
            "getProjectionAnswer",
            "getSavingSolverXml__url",
            "getWealthSolverXML__url",
            "getProjectionSolverXML__url",
            //finrobo
            "putSavingSolver",
            "putWealthSolver",
            "putProjection",
            "getPortPerform",
            "getRiskLevels",
            "getPortfolioAllocates",
            "postCusInfo",
            "getCusInfo",
            "getLimitAmtParam"
        ])
    },
    computed: {
        ...mapGetters([
            "photoShotting",
            "canRegetRaw",
            "canRegetRaw__isInit",
            "blockInvestmentInfo"
        ])
    },
    created() {
        // 無api時
        if (!hasAPI) {
            setTimeout(this.getRaw, 1000);
        }
    },
    beforeRouteEnter(to, from, next) {
        next();
        //阻擋交易完成後回來此頁
        if (JSON.parse(sessionStorage.getItem("expDatas"))) {
            next();
        } else {
            next(false);
        }
    },
    beforeRouteLeave(to, from, next) {
        sessionStorage.removeItem("expDatas");
        next();
    },
    mounted: async function() {
        this.processControl();

        if (this.isMobile()) {
            window.addEventListener("scroll", this.getFooterTop_doCal);
        }
    },
    destroyed() {
        if (this.isMobile()) {
            window.removeEventListener("scroll", this.getFooterTop_doCal);
        }
    },
    beforeDestroy() {
        let redirectBack = JSON.parse(sessionStorage.getItem("redirectBack"));
        if (!redirectBack) {
            sessionStorage.removeItem("DataToRequestAPI__InitialPage");
            sessionStorage.removeItem("AdvSavingAmt");
            sessionStorage.removeItem("Data__riskSlider");
            sessionStorage.removeItem("base64");
            sessionStorage.removeItem("expDatas");
            sessionStorage.removeItem("thumbTips");
            sessionStorage.removeItem("ModelID");
        }
        this.toggleisExperiencePage(false);
    }
};
</script>
<style lang="scss" src="./experience.scss">
</style>
<style lang="scss" src="./experience__IE1024up.scss">
</style>
<style lang="scss" src="./experience__IE1920up.scss">
</style>
<style lang="scss" scoped>
#dashboad__forShot {
    height: 60px;
    background-color: #31a043;
    display: flex;
    margin: 0px;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px 0 14px;
    border: 1px solid #dce6f0;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.19px;
    color: #ffffff;
    width: 100%;
    border-radius: 5px;
    z-index: 20;
    transition: 0.5s ease height;
}
</style>