<template>
    <div>
        <div id="PieBarPageWrap">
            <div class="pieWrap">
                <span class="chartTitle">資產類別比例</span>
                <div class="chart">
                    <div id="pieWrap">
                        <pie ref="pie" :windowwidth="windowwidth" :data="pieData_ordered"></pie>
                    </div>
                </div>
                <div class="pieLabelGroup__forshot" v-if="isIE()&&photoShotting">
                    <!-- <div class="pieLabelGroup__forshot"> -->
                    <div class="pieLabels__forshot" v-for="(item,i) in pieData_ordered" :key="i">
                        <span
                            class="pie_label_colorBox__forshot"
                            :style="{'background-color':item.color}"
                        ></span>
                        <span class="pie_label_name__forshot">{{item.name}} {{item.value}}%</span>
                    </div>
                </div>
            </div>
            <!-- <div
                class="barWrap"
                :class="[(!ExperienceInput)&&(windowwidth<768)&&!photoShotting?'hiddenBar':'']"
            >-->
            <div class="barWrap">
                <span class="chartTitle">投資市場比例</span>
                <div class="chart">
                    <bar ref="bar" :windowwidth="windowwidth" :data="barData_ordered"></bar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 本元件控制做圖表組件數據對接 mapping /排版和樣式
let initData = [
    {
        type: "01",
        name: "標籤1",
        value: 0,
        color: "#00A1E0"
    }
];
import { mapGetters } from "vuex";
import pie from "@/views/experience/charts/pie/pie.vue";
import bar from "@/views/experience/charts/bar/bar.vue";
export default {
    data() {
        return {
            pieData_ordered: initData,
            piecolors_type01: "#00a1e0",
            piecolors_type02: "#8e169b",
            piecolors_type03: "#ffd75c",
            piecolors_type04: "#008864",

            barData_ordered: initData,
            barcolors_type01: [
                "#00A1E0",
                "#00B7FF",
                "#22C1FF",
                "#3ED8FF",
                "#8EE8FF",
                "#B2FCFF",
                "#B2FCFF",
                "#B2FCFF"
            ],
            barcolors_type02: [
                "#8E169B",
                "#A61AB5",
                "#CE20E0",
                "#EA28FF",
                "#EA28FF",
                "#EA28FF"
            ],
            barcolors_type03: [
                "#FFD75C",
                "#FFD75C",
                "#FFD75C",
                "#FFD75C",
                "#FFD75C",
                "#FFD75C",
                "#FFD75C"
            ],
            barcolors_type04: [
                "#008864",
                "#008864",
                "#008864",
                "#008864",
                "#008864",
                "#008864",
                "#008864"
            ]
        };
    },
    components: {
        pie,
        bar
    },
    props: {
        pieData: {
            type: Array,
            default: () => {
                return initData;
            }
        },
        barData: {
            type: Array,
            default: () => {
                return initData;
            }
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        },
        photoShotting: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        pieData: function() {
            this.mappginForChartStructure__pie();
        },
        barData: function() {
            this.mappginForChartStructure__bar();
        }
    },
    computed: {
        ...mapGetters(["ExperienceInput"])
    },
    methods: {
        mappginForChartStructure__pie: async function() {
            let pieData = this.pieData;
            //do something mapping start....
            let data = [];
            pieData.forEach(item => {
                data.push(item);
            });
            let itemMapping = await data.map(item => {
                return {
                    type: item.AssetID,
                    name: item.AssetName,
                    value: item.AssetWgt,
                    color: item.color
                };
            });
            //排序
            let type_01 = itemMapping.filter(item => item.type === "01");
            let type_02 = itemMapping.filter(item => item.type === "02");
            let type_03 = itemMapping.filter(item => item.type === "03");
            let type_04 = itemMapping.filter(item => item.type === "04");
            //上色
            type_01.forEach(item => (item.color = this.piecolors_type01));
            type_02.forEach(item => (item.color = this.piecolors_type02));
            type_03.forEach(item => (item.color = this.piecolors_type03));
            type_04.forEach(item => (item.color = this.piecolors_type04));
            //控制要揭露哪幾類資訊
            itemMapping = type_01.concat(type_02);
            // .concat(type_03).concat(type_04);

            //do something mapping end
            this.pieData_ordered = itemMapping;
        },
        mappginForChartStructure__bar: async function() {
            let barData = this.barData;

            //do something start....
            let data = [];
            barData.forEach(item => {
                data.push(item);
            });
            let itemMapping = await data.map(item => {
                return {
                    type: item.AssetID,
                    name: item.CategoryName,
                    value: item.CategoryWgt,
                    color: item.color
                };
            });

            //排序
            let type_01 = itemMapping
                .filter(item => item.type === "01")
                .sort(function(a, b) {
                    return b.value - a.value;
                });
            let type_02 = itemMapping
                .filter(item => item.type === "02")
                .sort(function(a, b) {
                    return b.value - a.value;
                });
            let type_03 = itemMapping
                .filter(item => item.type === "03")
                .sort(function(a, b) {
                    return b.value - a.value;
                });
            let type_04 = itemMapping
                .filter(item => item.type === "04")
                .sort(function(a, b) {
                    return b.value - a.value;
                });

            //上色
            type_01.forEach(
                (item, i) => (item.color = this.barcolors_type01[i])
            );
            type_02.forEach(
                (item, i) => (item.color = this.barcolors_type02[i])
            );
            type_03.forEach(
                (item, i) => (item.color = this.barcolors_type03[i])
            );
            type_04.forEach(
                (item, i) => (item.color = this.barcolors_type04[i])
            );

            //控制要揭露哪幾類資訊
            itemMapping = type_01.concat(type_02);
            // .concat(type_03).concat(type_04);
            //do something end
            this.barData_ordered = itemMapping;
        },
        isIE: function() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
#PieBarPageWrap {
    display: flex;
    flex-wrap: wrap;
    .pieWrap {
        position: relative;
        width: 100%;
    }
    .barWrap {
        width: 100%;
        max-height: 1000px;
        transition: 0.3s ease max-height;
    }
    .hiddenBar {
        max-height: 1px;
        overflow: hidden;
        transition: 0.3s ease max-height;
    }
    @media screen and (min-width: 768px) {
        .pieWrap {
            width: 40%;
        }
        .barWrap {
            width: 60%;
        }
    }
}
#PieBarPageWrap > div {
    width: 100%;
}
#pieWrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
}
.pieLabelGroup__forshot {
    position: absolute;
    top: 45%;
    width: 20%;
    left: 48%;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 0 0 0 40px;
}

.pieLabels__forshot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
@media screen and (min-width: 768px) {
    .pieLabelGroup__forshot {
        top: 42%;
        left: 55%;
        padding: 10px 0 10px 10px;
    }
}
@media screen and (min-width: 1024px) {
    .pieLabelGroup__forshot {
        left: 46%;
    }
}
.pieLabels__forshot {
    margin-bottom: 18px;
}
.pieLabels__forshot * {
    display: inline-block;
}
.pie_label_colorBox__forshot {
    display: inline-block;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border-radius: 10px;
    margin-right: 10px;
}
@media screen and (min-width: 768px) {
    .pie_label_colorBox__forshot {
        margin-right: 2px;
    }
}
.pie_label_name__forshot {
    font-size: 14px;
    color: #808080;
}
</style>