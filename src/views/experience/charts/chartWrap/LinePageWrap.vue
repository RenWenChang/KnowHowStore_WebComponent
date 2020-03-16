<template>
    <div>
        <span class="chartTitle" @click="()=>{
            this.$emit('click')}">近三年歷史績效</span>
        <div class="chart">
            <lineChart
                ref="line"
                :data="data_ordered"
                :windowwidth="windowwidth"
                :tooltips="tooltips"
            ></lineChart>
        </div>
        <div id="lineChartTable">
            <div class="col_Wrap">
                <div class="title title_mobilewrap">
                    <span class="title">期間</span>
                    <span class="title">累積報酬率</span>
                </div>
                <div class="col_Wrap cell_Wrap">
                    <div class="cell" v-for="(item,i) in accumulationRemunerationData" :key="i">
                        <span>{{item.RM}}</span>
                        <span>{{item.ratio |filterDot(2)}}%</span>
                    </div>
                </div>
            </div>
            <div class="col_Wrap">
                <div class="title title_mobilewrap">
                    <span class="title">期間</span>
                    <span class="title">年化報酬</span>
                </div>
                <div class="col_Wrap cell_Wrap">
                    <div class="cell" v-for="(item,i) in YearsRemunerationData" :key="i">
                        <span>{{item.RY}}</span>
                        <span>{{item.ratio|filterDot(2)}}%</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="noteWrap">
            <span class="note">截至{{lastY}}年{{lastM}}月</span>
        </div>
    </div>
</template>
<script>
// 本元件控制做圖表組件數據對接 mapping /排版和樣式
let initData = [
    {
        SQL_Value: 0,
        SQL_DateTime: "2015-10-09T17:05:00"
    }
];

import lineChart from "@/views/experience/charts/line/line.vue";
export default {
    components: {
        lineChart
    },
    data() {
        return {
            data_ordered: initData,
            YearsRemunerationData: [
                {
                    RM: "近 1 月",
                    ratio: "-"
                },
                {
                    RM: "近 3 月",
                    ratio: "-"
                },
                {
                    RM: "近 6 月",
                    ratio: "-"
                }
            ],
            accumulationRemunerationData: [
                {
                    RY: "近 1 年",
                    ratio: "-"
                },
                {
                    RY: "近 2 年",
                    ratio: "-"
                },
                {
                    RY: "近 3 年",
                    ratio: "-"
                }
            ],
            tooltips: [
                {
                    key: "累積報酬率%:",
                    fill: "#000000",
                    value: "SQL_Value"
                }
            ],
            lastY: "",
            lastM: ""
        };
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
        }
    },
    watch: {
        data: function() {
            this.mappginForChartStructure__line();
            this.mappginForChartStructure__Y();
            this.mappginForChartStructure__M();
        }
    },
    methods: {
        mappginForChartStructure__line: async function() {
            let lineData = this.data;
            //do something start....
            let data = [];
            lineData.CumRList.forEach(item => {
                data.push(item);
            });
            let last = lineData.CumRList[lineData.CumRList.length - 1];
            this.lastY = last.DataYM.substring(0, 4);
            this.lastM = last.DataYM.substring(4, 6);

            let itemMapping = await data.map(item => {
                return {
                    SQL_DateTime: new Date(
                        item.DataYM.substring(0, 4),
                        Number(item.DataYM.substring(4, 6)) - 1,
                        1
                    ),
                    SQL_Value: item.CumR / 100
                };
            });
            //do something end
            this.data_ordered = itemMapping;
        },
        mappginForChartStructure__M: async function() {
            let lineData = this.data;
            //do something start....
            let data = [];
            let item1M = {
                RM: "近 1 月",
                ratio: lineData.R1M
            };
            let item3M = {
                RM: "近 3 月",
                ratio: lineData.R3M
            };
            let item6M = {
                RM: "近 6 月",
                ratio: lineData.R6M
            };
            data = [item1M, item3M, item6M];
            this.accumulationRemunerationData = data;
        },
        mappginForChartStructure__Y: async function() {
            let lineData = this.data;

            //do something start....
            let data = [];
            let item1Y = {
                RY: "近 1 年",
                ratio: lineData.R1Y
            };
            let item2Y = {
                RY: "近 2 年",
                ratio: lineData.R2Y
            };
            let item3Y = {
                RY: "近 3 年",
                ratio: lineData.R3Y
            };
            data = [item1Y, item2Y, item3Y];
            this.YearsRemunerationData = data;
        }
    }
};
</script>
<style lang="scss" scoped>
.noteWrap{
  text-align: right;
  width: 100%;
}
.note {
    color: #6c7680;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: right;
}
#lineChartTable {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    // border-bottom: 1px solid #e6e6e6;

    .col_Wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 47%;
        .title_mobilewrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;
            border-bottom: 1px solid #e6e6e6;
            .title {
                display: block;
                text-align: none;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.36;
                letter-spacing: normal;
            }
            .title:nth-child(1) {
                font-size: 12px;
                color: #808080;
            }
            .title:nth-child(2) {
                font-size: 12px;
                color: #333333;
            }
        }
        .cell_Wrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            min-height: 120px;
            padding: 10px 0;
            .cell {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e6e6e6;
                span {
                    font-size: 14px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: normal;
                    color: #333333;
                    display: block;
                }
                span:nth-child(1) {
                    border-bottom: none;
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    #lineChartTable {
        border-bottom: none;
        justify-content: flex-end;
        .col_Wrap {
            display: block;
            width: auto;
            min-width: 10%;
            .title_mobilewrap {
                width: auto;
                min-width: 10px;
                min-height: auto;
                display: flex;
                justify-content: center;
                border-bottom: none;
                .title {
                    display: block;
                    text-align: none;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.36;
                    letter-spacing: normal;
                }
                .title:nth-child(1) {
                    display: none;
                }
                .title:nth-child(2) {
                    font-size: 14px;
                    color: #b4883c;
                }
            }
            .cell_Wrap {
                width: auto;
                min-width: 10px;
                min-height: auto;
                display: inline-block;
                justify-content: space-between;
                flex-direction: row;
                .cell {
                    width: 120px;
                    display: inline-block;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    text-align: center;
                    span {
                        width: 100%;
                        font-size: 14px;
                        font-weight: 600;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: normal;
                        color: #333333;
                        display: block;
                    }
                    span:nth-child(1) {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-bottom: none;
                        background-color: #dddddd;
                        height: 53px;
                        border-radius: 0px;
                    }
                    span:nth-child(2) {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-bottom: none;
                        height: 53px;
                    }
                }
                .cell:first-child span:nth-child(1) {
                    border-radius: 5px 0 0 5px;
                }
                .cell:last-child span:nth-child(1) {
                    border-radius: 0 5px 5px 0;
                }
            }
        }
        .col_Wrap:nth-child(1) {
            margin-right: 15px;
        }
    }
}
</style>
