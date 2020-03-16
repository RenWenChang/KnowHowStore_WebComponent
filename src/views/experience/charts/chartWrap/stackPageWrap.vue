<template>
    <div>
        <div class="chartTitle__group">
            <div>
                <span class="chartTitle chartTitle__target">{{targetWording}}</span>
                <span class="chartTitle chartTitle__stackTtile">投資報酬試算</span>
            </div>

            <span
                class="chartSubtTitle"
                :style="{
            display:windowwidth<1024?'none':'block',
        }"
            >
                <slot></slot>
            </span>
        </div>

        <div class="chart">
            <stack
                ref="stack"
                :data="data_ordered"
                :padding="windowwidth<768?padding_mobile:padding"
                :tooltips="tooltips"
                :tooltipsMobile="tooltipsMobile"
                :colorMainArea="colorMainArea"
                :colorMainLine="colorMainLine"
                :colorCost="colorCost"
                :colorFocus="colorFocus"
                :windowwidth="windowwidth"
                :target="target"
                :investType="investType"
                :colorUnit="colorUnit"
                :colorTarget="colorTarget"
                :WdrawYM="WdrawYM"
            ></stack>
        </div>
        <div
            class="stackInfoGroup"
            :class="[(!ExperienceInput)&&(windowwidth<1024)&&!photoShotting?'stackInfoGroup__closed':'']"
        >
            <div
                style="margin-top:15px"
                :style="{
                display:windowwidth<1024?'inline-block':'none',
                    }"
            >
                <span class="chartSubtTitle">
                    <slot></slot>
                </span>
            </div>
            <div id="stackLabel">
                <div>
                    <div>
                        <span :style="{'color':'#b4883c'}">財富價值：</span>
                        <span>累積投資金額的模擬投資結果</span>
                    </div>
                    <div>
                        <span :style="{'color':colorFocus}">投資期間：</span>
                        <span>為您設定的投資年期</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span class="circleLabel" :style="{'background-color':colorMainLine[2]}"></span>
                        <span>預測投資組合較佳表現的模擬投資結果</span>
                    </div>
                    <div>
                        <span class="circleLabel" :style="{'background-color':colorMainLine[1]}"></span>
                        <span>預測投資組合正常表現的模擬投資結果</span>
                    </div>
                    <div>
                        <span class="circleLabel" :style="{'background-color':colorMainLine[0]}"></span>
                        <span>預測投資組合較差表現的模擬投資結果</span>
                    </div>
                </div>
                <img
                    v-if="photoShotting"
                    class="illus"
                    src="@/views/experience/img/for_IE_screenShot/小粉絲.png"
                    alt
                />
                <img v-else class="illus" src="@/assets/img/svg/menu/小粉絲.svg" alt />
            </div>
        </div>
    </div>
</template>
<script>
// 本元件控制做圖表組件數據對接 mapping /排版和樣式

let initData = {
    data: [
        {
            month: new Date(0, 0, 1),
            p875: 0,
            p750: 0,
            p625: 0,
            p500: 0,
            p375: 0,
            p250: 0,
            p125: 0,
            accumulationCost: 0
        }
    ],
    expectation: 0,
    target: 0
};
const colorMainLine = ["#149072", "#55C595", "#3EF993"];
const colorMainArea = ["#1fab89", "#62d2a2", "#9df3c4"];
// const colorUnit = "#b4883c";
const colorUnit = "#6c7680";
const colorTarget = "#31a043";
const colorCost = "#000000";
const colorFocus = "#00573d";
import { mapActions, mapGetters } from "vuex";
import stack from "@/views/experience/charts/stack/stack.vue";
export default {
    data() {
        return {
            data_ordered: initData,
            colorMainLine: colorMainLine,
            colorMainArea: colorMainArea,
            colorUnit: colorUnit,
            colorTarget: colorTarget,
            colorFocus: colorFocus,
            colorCost: colorCost,
            padding: {
                top: 50,
                left: 30,
                bottom: 3,
                right: 80
            },
            padding_mobile: {
                top: 50,
                left: 20,
                bottom: 3,
                right: 60
            },
            tooltips: [
                {
                    key: "累計成本：NT",
                    fill: colorCost,
                    value: "accumulationCost",
                    sign: "$"
                },
                {
                    key: "較佳情況表現：NT",
                    fill: colorMainLine[2],
                    value: "p750",
                    sign: "$"
                },
                {
                    key: "正常情況表現：NT",
                    fill: colorMainLine[1],
                    value: "p500",
                    sign: "$"
                },

                {
                    key: "較差情況表現：NT",
                    fill: colorMainLine[0],
                    value: "p250",
                    sign: "$"
                }
            ],
            tooltipsMobile: [
                {
                    key: "較佳情況 :",
                    fill: colorMainLine[2],
                    value: "p750",
                    unit: "NT",
                    sign: "$"
                },
                {
                    key: "正常情況 :",
                    fill: colorMainLine[1],
                    value: "p500",
                    unit: "NT",
                    sign: "$"
                },

                {
                    key: "較差情況 :",
                    fill: colorMainLine[0],
                    value: "p250",
                    unit: "NT",
                    sign: "$"
                }
            ]
        };
    },

    components: {
        stack
    },
    props: {
        data: {
            type: Object,
            default: () => {
                return initData;
            }
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        },
        expectationRevenue: {
            type: Number,
            default: 0
        },
        target: {
            type: Number,
            default: 0
        },
        targetWording: {
            type: String,
            default: ""
        },
        photoShotting: {
            type: Boolean,
            default: false
        },
        investType: {
            type: String,
            default: "3"
        },
        WdrawYM: {
            default: ""
        }
    },
    watch: {
        expectationRevenue: {
            immediate: true,
            handler: function(newValue) {
                this.mappginForChartStructure();
                this.expectationRevenue = newValue;
                if (newValue < 1000000 && newValue >= 10000000) {
                    this.padding_mobile.right = 70;
                } else if (newValue >= 1000000 && newValue < 10000000) {
                    this.padding_mobile.right = 75;
                } else if (newValue >= 10000000 && newValue <= 100000000) {
                    this.padding_mobile.right = 85;
                } else if (newValue > 100000000 && newValue <= 1000000000) {
                    this.padding_mobile.right = 90;
                } else if (newValue > 1000000000 && newValue <= 10000000000) {
                    this.padding_mobile.right = 100;
                } else if (newValue > 10000000000 && newValue <= 100000000000) {
                    this.padding_mobile.right = 110;
                }
            },
            deep: true
        }
    },
    methods: {
        mappginForChartStructure: async function() {
            //do something mapping start....
            let data = [];
            this.data.WFEResult.forEach(item => {
                data.push(item);
            });
            if (this.data.WFEResult.length !== 1) {
                let itemMapping = await data.map((item, i) => {
                    return {
                        month: new Date(
                            item.YM.substring(0, 4),
                            Number(item.YM.substring(4, 6)) - 1,
                            1
                        ),
                        p125: item.Col7,
                        p250: item.Col6,
                        p375: item.Col5,
                        p500: item.Col4,
                        p625: item.Col3,
                        p750: item.Col2,
                        p875: item.Col1,
                        accumulationCost: item.Cost,
                        index: i
                    };
                });
                let mappingDone = {
                    data: itemMapping,
                    expectation: this.expectationRevenue
                };

                //do something mapping end
                this.data_ordered = mappingDone;
            }
        },
        switchInfo: function() {
            this.toggleExperienceInput(!this.ExperienceInput);
        },
        ...mapActions(["toggleExperienceInput"])
    },
    mounted() {},
    computed: {
        ...mapGetters(["ExperienceInput"])
    }
};
</script>

<style lang="scss" scoped>
.stackInfoGroup {
    max-height: 500px;
    transition: 0.3s ease max-height;
}
.stackInfoGroup__closed {
    max-height: 0;
    transition: 0.4s ease max-height;
}
@media screen and (min-width: 1024px) {
    .stackInfoGroup__closed {
        max-height: 2000px;
    }
}
#stackLabel {
    width: calc(100% + 20px);
    padding: 13px;
    margin: 21px -10px -13px -10px;
    background-color: #ffffff;
    position: relative;
}
#stackLabel span {
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #919ba4;
}
#stackLabel > div > div {
    margin: 0 0 15px 0;
}
#stackLabel .circleLabel {
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    margin-right: 10px;
}

.illus {
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    width: 55px;
    height: 130px;
    top: calc(50% - 65px);
    right: 0;
}

@media screen and (min-width: 1024px) {
    .illus {
        display: none;
    }
    #stackLabel {
        padding: 0;
        background-color: transparent;
    }
    #stackLabel > div {
        width: 100%;
        height: 28px;
        display: flex;
        justify-content: flex-end;
    }
    #stackLabel > div > div {
        margin-left: 28px;
        display: flex;
        align-items: center;
    }
}
</style>
