<template>
    <div ref="child" id="stack"></div>
</template>
<script>
/* eslint-disable */
// import stackData from "./data.js"
import * as d3 from "d3";
export default {
    data: () => ({
        initStatus: true
    }),
    watch: {
        data: function() {
            this.init(true);
        },
        target: function() {
            this.init(false);
        }
    },
    props: {
        padding: {
            type: Object,
            default: () => {
                return {
                    top: 50,
                    left: 30,
                    bottom: 3,
                    right: 84
                };
            }
        },
        tooltips: {
            type: Array,
            default: () => {
                return [
                    {
                        key: "標題",
                        fill: "#ffffff",
                        value: "值"
                    }
                ];
            }
        },
        tooltipsMobile: {
            type: Array,
            default: () => {
                return [
                    {
                        key: "標題",
                        fill: "#ffffff",
                        value: "值"
                    }
                ];
            }
        },
        colorMainArea: {
            type: Array,
            default: () => {
                return ["#ffffff", "#ffffff", "#ffffff"];
            }
        },
        colorMainLine: {
            type: Array,
            default: () => {
                return ["#ffffff", "#ffffff", "#ffffff"];
            }
        },
        colorCost: {
            type: String,
            default: "#000000"
        },
        colorFocus: {
            type: String,
            default: "#000000"
        },
        colorUnit: {
            type: String,
            default: "#000000"
        },
        colorTarget: {
            type: String,
            default: "#000000"
        },
        WdrawYM: {
            default: ""
        },
        data: {
            type: Object,
            default: () => {
                return {
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
            }
        },
        target: {
            type: Number,
            default: 0
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        },
        investType: {
            type: String,
            default: "3"
        }
    },
    components: {},

    methods: {
        draw: function() {
            let tooltips = this.tooltips;
            let tooltipsMobile = this.tooltipsMobile;
            let f = d3.format(",");
            let vm = this;
            let WdrawYM =
                typeof this.WdrawYM === "string"
                    ? Number(this.WdrawYM.substring(0, 4))
                    : "";
            let theData = this.data.data;
            /////////////////////*堆疊數據整理*//////////////////////

            //使svg大小與外部容器同寬高，可用css控制外部容器以調整大小
            let svg = d3
                .select("#stack")
                .append("svg")
                .attr("class", "svg")
                .attr("width", document.querySelector("#stack").offsetWidth)
                .attr("height", document.querySelector("#stack").offsetHeight);
            //svg內部邊界 多半是預留給顯示座標軸空間使用
            let padding = this.padding;
            //包含坐標軸和內部區塊的總長寬
            let width = +svg.attr("width") - padding.left - padding.right;
            let height = +svg.attr("height") - padding.top - padding.bottom;
            //////////////////////*元素顏色*//////////////////////
            let colorScale_colorMainArea = d3
                .scaleOrdinal()
                .range(this.colorMainArea);
            let colorScale_colorMainLine = d3
                .scaleOrdinal()
                .range(this.colorMainLine);

            //////////////////////*座標比例尺*//////////////////////
            /*y scale*/
            let y = d3
                .scaleLinear()
                .domain([
                    0,
                    d3.max(theData, (d, i) => {
                        return d["p875"];
                    }) * 1.1
                ])
                .range([height, 0]);
            let yAxisTicks = [];
            let yMax =
                d3.max(theData, (d, i) => {
                    return d["p875"];
                }) * 1.01;
            /*x scale*/
            let x = d3
                .scaleTime()
                .domain(
                    d3.extent(theData, d => {
                        return Date.parse(d.month);
                    })
                )
                .range([0, width]);
            let getDigit = function() {
                let unit = yMax.toFixed(0).toString().length;
                let first = Number(yMax.toString()[0]);
                let needJoin = [];
                for (let i = 0; i < unit - 2; i++) {
                    needJoin.push("0");
                }
                return Number(`${1}${needJoin.join("")}`);
            };
            let tick = 8;
            let tickdomain =
                (Math.round(yMax / getDigit()) * getDigit()) / tick;
            for (let i = 1; i <= tick; i++) {
                yAxisTicks.push(tickdomain * i);
            }

            let setAxis = d3.select("#stack").select(".svg");
            /*append y axis*/
            setAxis
                .append("g")
                .attr("class", "yaxis")
                .attr(
                    "transform",
                    `translate(${width + padding.left + 10},${padding.top})`
                );

            for (let i = 0; i < yAxisTicks.length; i++) {
                d3.select("#stack")
                    .select(".yaxis")
                    .append("text")
                    .text(() => {
                        let base = vm.formatDot(
                            (yAxisTicks[i] / 10000).toFixed(2)
                        );
                        let index = base.indexOf(".") + 1;
                        let length = base.length;
                        let afterPoint = index !== 0 ? length - index : index;
                        let befFElement = "";
                        if (afterPoint === 0) {
                            befFElement = ".00";
                        } else if (afterPoint === 1) {
                            befFElement = "0";
                        } else if (afterPoint === 2) {
                            befFElement = "";
                        }

                        return base + befFElement + " 萬";
                    })
                    .attr("x", 0)
                    .attr("y", y(yAxisTicks[i]))
                    .style("fill", "#6c7680")
                    .style("font-size", "11px");

                d3.select("#stack")
                    .select(".yaxis")
                    .append("line")
                    .attr("x1", -10)
                    .attr("y1", y(yAxisTicks[i]) - 4)
                    .attr("y2", y(yAxisTicks[i]) - 4)
                    .attr("x2", -5)
                    .attr("stroke-width", "2px")
                    .style("stroke", "#dce6f0");
            }
            d3.select("#stack")
                .select(".yaxis")
                .append("text")
                .style("font-size", () => {
                    return vm.windowwidth < 769 ? "11px" : "";
                })
                .text(() => {
                    return vm.windowwidth < 769 ? "財富價值" : "財富價值";
                })
                .style("font-weight", "700")
                .attr("class", "yaxisStart")
                .attr("x", 0)
                .attr("y", y(0))
                .style("stroke", "none")
                .style("fill", vm.colorUnit);
            // d3.select("#stack")
            //   .select(".yaxis")
            //   .append("text")
            //   .text("NT$萬元")
            //   .attr("class", "yaxisStart")
            //   .attr("x", 0)
            //   .attr("y", y(0))
            //   .style("stroke", "none")
            //   .style("fill", vm.colorUnit)
            //   .style("font-size", vm.windowwidth < 769 ? "10px" : "");
            setAxis
                .select(".yaxis")
                .selectAll(".tick")
                .select("text")
                .attr("class", "yTickText");

            setAxis
                .append("line")
                .attr("x1", width + padding.left + 3)
                .attr("y1", padding.top + 20)
                .attr("y2", height + padding.bottom + padding.top)
                .attr("x2", width + padding.left + 3)
                .attr("stroke-width", "0px")
                .style("stroke", "#dce6f0");

            ////////////////////////////*append x axis 預設顯示 蓋在主圖後*////////////////////////////////
            svg.selectAll(".xline")
                .data(theData)
                .enter()
                .append("line")
                .attr("class", "xline")
                .attr("x1", d => {
                    return x(d["month"]) + padding.left;
                })
                .attr("y1", padding.top)
                .attr("y2", height + padding.bottom + padding.top)
                .attr("x2", d => {
                    return x(d["month"]) + padding.left;
                })
                .attr("stroke-width", "2px")
                .style("stroke", "#dce6f0")
                .style("opacity", "0.7");

            //////////////////////*數據繪圖工廠*//////////////////////
            /*area*/
            let area1 = d3
                .area()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y0((d, i) => {
                    return y(d["p125"]);
                })
                .y1((d, i) => {
                    return y(d["p375"]);
                });
            let area2 = d3
                .area()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y0((d, i) => {
                    return y(d["p375"]);
                })
                .y1((d, i) => {
                    return y(d["p625"]);
                });

            let area3 = d3
                .area()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y0((d, i) => {
                    return y(d["p625"]);
                })
                .y1((d, i) => {
                    return y(d["p875"]);
                });
            /*line*/
            let line = d3
                .line()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y((d, i) => {
                    return y(d["p375"]);
                });

            let line2 = d3
                .line()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y((d, i) => {
                    return y(d["p625"]);
                });
            let line3 = d3
                .line()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y((d, i) => {
                    return y(d["p875"]);
                });
            let costLine = d3
                .line()
                .curve(d3.curveCatmullRom.alpha(0.1))
                .x((d, i) => {
                    return x(Date.parse(d.month));
                })
                .y((d, i) => {
                    return y(d["accumulationCost"]);
                });
            //包含坐標軸和內部區塊，設置左上角為起點 height 值為底部邊界 width值為右側邊界
            let focus = svg
                .append("g")
                .attr(
                    "class",
                    `focus ${
                        vm.initStatus === true ? "" : "focus__NoAnimation"
                    }`
                )
                .attr("transform", `translate(${padding.left},${padding.top})`);
            let maxX = x(
                d3.max(theData, d => {
                    return new Date(d["month"]);
                })
            );
            let minX = x(
                d3.min(theData, d => {
                    return new Date(d["month"]);
                })
            );
            for (let i = 0; i < theData.length; i++) {
                let d = theData[i];
                focus
                    .append("line")
                    .attr("class", "nomalStatusLines")
                    .attr("x1", minX)
                    .attr("y1", y(d["p500"]))
                    .attr("y2", y(d["p500"]))
                    .attr("x2", maxX)
                    .attr("stroke-width", "0px")
                    .style("stroke-dasharray", "5,5")
                    .style("stroke", "#55C595");
            }

            /*append area*/
            focus
                .append("path")
                .datum(theData)
                .attr("class", "area")
                .attr("d", area1)
                .style("fill", function(d) {
                    return colorScale_colorMainArea(0);
                })
                .style("opacity", "0.7");
            focus
                .append("path")
                .datum(theData)
                .attr("class", "area")
                .attr("d", area2)
                .style("fill", function(d) {
                    return colorScale_colorMainArea(1);
                })
                .style("opacity", "0.6");
            focus
                .append("path")
                .datum(theData)
                .attr("class", "area")
                .attr("d", area3)
                .style("fill", function(d) {
                    return colorScale_colorMainArea(2);
                })
                .style("opacity", "0.5");

            /*append line*/
            focus
                .append("path")
                .datum(theData)
                .attr("class", "line")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", function(d) {
                    return colorScale_colorMainLine(0);
                })
                .style("stroke-width", "2px")
                .style("opacity", "1");
            focus
                .append("path")
                .datum(theData)
                .attr("class", "line")
                .attr("d", line2)
                .style("fill", "none")
                .style("stroke", function(d) {
                    return colorScale_colorMainLine(1);
                })
                .style("stroke-width", "2px")
                .style("opacity", "1");
            focus
                .append("path")
                .datum(theData)
                .attr("class", "line")
                .attr("d", line3)
                .style("fill", "none")
                .style("stroke", function(d) {
                    return colorScale_colorMainLine(2);
                })
                .style("stroke-width", "2px")
                .style("opacity", "1");

            let expectationY = y(vm.data.expectation);
            let targetY = y(vm.target);
            let minCostLineY = y(theData[0]["accumulationCost"]);
            let newPosition;
            let expectationY__text;
            let targetY__text;
            newPosition = vm.textDistantProcess(expectationY, targetY, 18);
            expectationY__text = newPosition[0];
            targetY__text = newPosition[1];
            if (vm.ifStaggered(expectationY, targetY, 18)) {
                newPosition = vm.textDistantProcess(expectationY, targetY, 18);
                expectationY__text = newPosition[0];
                targetY__text = newPosition[1];
            }
            if (vm.ifStaggered(minCostLineY, targetY, 18)) {
                newPosition = vm.textDistantProcess(expectationY, targetY, 18);
                expectationY__text = newPosition[0];
                targetY__text = newPosition[1];

                let newPosition_withcost = vm.textDistantProcess(
                    targetY,
                    minCostLineY,
                    18
                );
                targetY__text = newPosition_withcost[0] - 5;
            }
            if (
                !vm.ifStaggered(expectationY, targetY, 18) &&
                !vm.ifStaggered(minCostLineY, targetY, 18)
            ) {
                newPosition = vm.textDistantProcess(expectationY, targetY, 18);
                expectationY__text = newPosition[0];
                targetY__text = newPosition[1];
                //if far compare with cost
                if (vm.ifStaggered(expectationY, minCostLineY, 18)) {
                    let newPosition_withcost = vm.textDistantProcess(
                        expectationY,
                        minCostLineY,
                        18
                    );
                    expectationY__text = newPosition_withcost[0] + 5;
                }
            }

            //線交疊判斷演算法
            //誰上誰下
            //距離是否太近

            focus
                .append("g")
                .attr("class", "costLine")
                .append("path")
                .attr("class", "line")
                .datum(theData)
                .attr("d", costLine)
                .style("fill", "none")
                .style("stroke", vm.colorCost)
                .style("stroke-dasharray", "5,5")
                .style("stroke-width", "1px")
                .style("opacity", "1");
            d3.select("#stack")
                .select(".costLine")
                .append("text")
                .text("累計成本")
                .attr("x", minX)
                .attr("y", minCostLineY)
                .style("stroke", "none")
                .style("fill", vm.colorCost)
                .style("font-size", vm.windowwidth < 769 ? "11px" : "")
                .style("font-weight", "700");
            if (this.investType !== "2") {
                focus
                    .append("g")
                    .attr("class", "expectationLine")
                    .append("line")
                    .attr(
                        "x1",
                        minX + vm.ifStaggered(expectationY, targetY, 18)
                            ? 0
                            : vm.windowwidth < 769
                            ? 50
                            : 70
                    )
                    .attr("y1", expectationY)
                    .attr("y2", expectationY)
                    .attr("x2", maxX)
                    .style("stroke", "#ed8200")
                    .style("stroke-dasharray", "5,5");
                d3.select("#stack")
                    .select(".expectationLine")
                    .append("text")
                    .text("預期金額")
                    .attr("x", minX)
                    .attr("y", expectationY__text)
                    .style("stroke", "none")
                    .style("fill", "#ed8200")
                    .style("font-size", vm.windowwidth < 769 ? "11px" : "")
                    .style("font-weight", "700");
            }

            if (vm.target !== 0) {
                focus
                    .append("g")
                    .attr("class", "targetLine")
                    .append("line")
                    .attr(
                        "x1",
                        minX + vm.ifStaggered(expectationY, targetY, 18)
                            ? 0
                            : vm.windowwidth < 769
                            ? 50
                            : 70
                    )
                    .attr("y1", targetY < y(yMax) * 0.01 - 5 ? 1000 : targetY)
                    .attr("y2", targetY < y(yMax) * 0.01 - 5 ? 1000 : targetY)
                    .attr("x2", maxX)
                    .style("stroke", `${vm.colorTarget}`)
                    .style("stroke-dasharray", "5,5");

                d3.select(".targetLine")
                    .append("text")
                    .text("目標金額")
                    .attr("x", minX)
                    .attr(
                        "y",
                        targetY__text < y(yMax) * 0.01 ? 1000 : targetY__text
                    )
                    .style("stroke", "none")
                    .style("fill", `${vm.colorTarget}`)
                    .style("font-size", vm.windowwidth < 769 ? "11px" : "")
                    .style("font-weight", "700");
            }

            ////////////////////////////*append x axis hover顯示 蓋在主圖前*////////////////////////////////
            setAxis
                .append("g")
                .attr("class", "xaxis")
                .attr(
                    "transform",
                    `translate(${padding.left}, ${
                        vm.windowwidth < 769 ? padding.top - 5 : padding.top
                    } )`
                )
                .append("text")
                .text(`投資期間`)
                .attr("y", "-30")
                .attr("x", "-20")
                .style("stroke", "none")
                .style("fill", vm.colorFocus)
                .style("font-size", vm.windowwidth < 769 ? "12px" : "")
                .style("font-weight", "700");
            setAxis
                .select(".xaxis")
                .selectAll(".dateLabel")
                .data(theData)
                .enter()
                .append("g")
                .attr("transform", `translate(0,${0})`)
                .attr("class", "dateLabel")
                .append("text")
                .style("font-size", "11px")
                .attr("class", "xaxis_text")
                .text((d, i) => {
                    let interval = (theData.length / 5).toFixed(0);
                    if (vm.windowwidth < 1024 && theData.length > 10) {
                        if (
                            i % interval === 0 &&
                            WdrawYM !== d["month"].getFullYear() + 3 &&
                            WdrawYM !== d["month"].getFullYear() - 3 &&
                            WdrawYM !== d["month"].getFullYear() + 2 &&
                            WdrawYM !== d["month"].getFullYear() - 2 &&
                            WdrawYM !== d["month"].getFullYear() + 1 &&
                            WdrawYM !== d["month"].getFullYear() - 1
                        ) {
                            return WdrawYM === d["month"].getFullYear()
                                ? `★${WdrawYM}`
                                : d["month"].getFullYear();
                        } else if (WdrawYM === d["month"].getFullYear()) {
                            return `★${WdrawYM}`;
                        }
                    } else if (theData.length > 10) {
                        if (
                            i % interval === 0 &&
                            WdrawYM !== d["month"].getFullYear() + 3 &&
                            WdrawYM !== d["month"].getFullYear() - 3 &&
                            WdrawYM !== d["month"].getFullYear() + 2 &&
                            WdrawYM !== d["month"].getFullYear() - 2 &&
                            WdrawYM !== d["month"].getFullYear() + 1 &&
                            WdrawYM !== d["month"].getFullYear() - 1
                        ) {
                            return WdrawYM === d["month"].getFullYear()
                                ? `★${WdrawYM}`
                                : d["month"].getFullYear();
                        } else if (WdrawYM === d["month"].getFullYear()) {
                            return `★${WdrawYM}`;
                        }
                    } else {
                        return WdrawYM === d["month"].getFullYear()
                            ? `★${WdrawYM}`
                            : d["month"].getFullYear();
                    }
                })
                .attr("x", d => {
                    return WdrawYM === d["month"].getFullYear()
                        ? x(d["month"]) - 25
                        : x(d["month"]) - 20;
                })
                .attr("y", -5)
                .style("fill", d => {
                    return WdrawYM === d["month"].getFullYear()
                        ? "#0278ae"
                        : "#6c7680";
                });

            d3.select("#stack")
                .selectAll(".dateLabel")
                .append("line")
                .attr("x1", d => {
                    return x(d["month"]);
                })
                .attr("y1", 0)
                .attr("y2", height + padding.bottom + padding.top)
                .attr("x2", d => {
                    return x(d["month"]);
                })
                .attr("stroke-width", "2px");

            d3.select("#stack")
                .selectAll(".dateLabel")
                .append("line")
                .attr("x1", d => {
                    return x(d["month"]);
                })
                .attr("y1", 0)
                .attr("y2", height + padding.bottom + padding.top)
                .attr("x2", d => {
                    return x(d["month"]);
                })
                .attr("stroke-width", vm.windowwidth < 768 ? "13px" : "60px")
                .style("stroke", "#dce6f0")
                .style("opacity", "0");

            d3.select("#stack")
                .selectAll(".dateLabel")
                .on("mouseenter", function(e) {
                    document
                        .querySelectorAll(".nomalStatusLines")
                        [e.index].setAttribute("stroke-width", "1px");

                    d3.select(this)
                        .select("line")
                        .style("stroke", vm.colorFocus)
                        .style("opacity", "1");
                    d3.select(this)
                        .select(".xaxis_text")
                        .style("stroke", vm.colorFocus);
                    d3.select(this)
                        .append("circle")
                        .attr("cy", () => {
                            return y(e["p750"]);
                        })
                        .attr("cx", () => {
                            return x(e["month"]);
                        })
                        .attr("r", vm.windowwidth < 768 ? 4 : 8)
                        .style("fill", vm.colorMainLine[2])
                        .style("stroke", "#ffffff")
                        .style("stroke-width", "1px");
                    d3.select(this)
                        .append("circle")
                        .attr("cy", () => {
                            return y(e["p500"]);
                        })
                        .attr("cx", () => {
                            return x(e["month"]);
                        })
                        .attr("r", vm.windowwidth < 768 ? 4 : 8)
                        .style("fill", vm.colorMainLine[1])
                        .style("stroke", "#ffffff")
                        .style("stroke-width", "1px");
                    d3.select(this)
                        .append("circle")
                        .attr("cy", () => {
                            return y(e["p250"]);
                        })
                        .attr("cx", () => {
                            return x(e["month"]);
                        })
                        .attr("r", vm.windowwidth < 768 ? 4 : 8)
                        .style("fill", vm.colorMainLine[0])
                        .style("stroke", "#ffffff")
                        .style("stroke-width", "1px");

                    let tooltipsPosition__x = function() {
                        let position =
                            x(e["month"]) /
                            x(
                                d3.max(theData, d => {
                                    return d["month"];
                                })
                            );
                        if (vm.windowwidth < 768) {
                            if (position <= 0.6) {
                                return x(e["month"]) + padding.left - 10;
                            } else if (position <= 1 && position > 0.6) {
                                return x(e["month"]) - 150 - padding.left;
                            }
                        } else {
                            if (position <= 0.5) {
                                return x(e["month"]) + padding.left;
                            } else if (position > 0.5) {
                                return x(e["month"]) - 260 - padding.left;
                            } else {
                                return x(e["month"]) - 130;
                            }
                        }
                    };
                    let tooltipsPosition__y = function() {
                        if (y(e["p500"]) >= 190) {
                            return y(e["p500"]) - padding.bottom - 75;
                        } else if (y(e["p500"]) < 70) {
                            return y(e["p500"]) + padding.top;
                        } else {
                            return y(e["p500"]);
                        }
                    };
                    if (vm.windowwidth >= 768) {
                        d3.select(this)
                            .append("g")
                            .attr("class", "tooltips")
                            .attr(
                                "transform",
                                `translate(${tooltipsPosition__x()},${
                                    vm.windowwidth < 768
                                        ? padding.top
                                        : padding.top + 40
                                })`
                            )
                            .append("rect")
                            .attr("width", "260px")
                            .attr("height", "189px")
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .attr("filter", "url(#f1)");
                        d3.select(this)
                            .select(".tooltips")
                            .append("rect")
                            .attr("width", "260px")
                            .attr("height", "189px")
                            .style("fill", "#ffffff")
                            .style("stroke", "#dce6f0")
                            .attr("rx", 10)
                            .attr("ry", 10);

                        d3.select(this)
                            .select(".tooltips")
                            .append("text")
                            .attr("text-anchor", "middle")
                            .attr("x", 150)
                            .attr("y", 25)
                            .text(`${e["month"].getFullYear()} 年`);
                        d3.select(this)
                            .select(".tooltips")
                            .append("text")
                            .attr("width", 200)
                            .attr("text-anchor", "end")
                            .attr("x", 107)
                            .attr("y", 25)
                            .text(`年份 :`);
                        d3.select(this)
                            .select(".tooltips")
                            .selectAll(".tooltipsKey")
                            .data(tooltips)
                            .enter()
                            .append("text")
                            .attr("width", 200)
                            .attr("class", "tooltipsKey")
                            .attr("text-anchor", "end")
                            .attr("fill", d => {
                                return `${d.fill}`;
                            })
                            .attr("x", 140)
                            .attr("y", (d, i) => {
                                return i * 30 + 55;
                            })
                            .text(d => {
                                return `${d.key}`;
                            });
                        d3.select(this)
                            .select(".tooltips")
                            .selectAll(".tooltipssign")
                            .data(tooltips)
                            .enter()
                            .append("text")
                            .attr("class", "tooltipssign")
                            .attr("text-anchor", "end")
                            .attr("fill", d => {
                                return `${d.fill}`;
                            })
                            .attr("x", 150)
                            .attr("y", (d, i) => {
                                return i * 30 + 55;
                            })
                            .text(d => {
                                return `${d.sign}`;
                            })
                            .style("font-family", "arial");
                        d3.select(this)
                            .select(".tooltips")
                            .selectAll(".tooltipsValue")
                            .data(tooltips)
                            .enter()
                            .append("text")
                            .attr("class", "tooltipsValue")
                            .attr("fill", d => {
                                return `${d.fill}`;
                            })
                            .attr("x", 155)
                            .attr("y", (d, i) => {
                                return i * 30 + 55;
                            })
                            .text(d => {
                                return `${f(e[d.value].toFixed(0))}`;
                            });
                    } else {
                        d3.select(this)
                            .append("g")
                            .attr("class", "tooltips")
                            .attr(
                                "transform",
                                `translate(${tooltipsPosition__x()},${tooltipsPosition__y() -
                                    65})`
                            )
                            .append("rect")
                            .attr("width", "160px")
                            .attr("height", "130px")
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .attr("filter", "url(#f1)");
                        d3.select(this)
                            .select(".tooltips")
                            .append("rect")
                            .attr("width", "160px")
                            .attr("height", "130px")
                            .style("fill", "#ffffff")
                            .style("stroke", "#dce6f0")
                            .attr("rx", 10)
                            .attr("ry", 10);
                        d3.select(this)
                            .select(".tooltips")
                            .append("text")
                            .style("font-size", "11px")
                            .style("font-family", "arial")
                            .attr("x", 60)
                            .attr("y", 20)
                            .text(
                                `(${tooltipsMobile[0]["unit"] +
                                    tooltipsMobile[0]["sign"]})`
                            );
                        d3.select(this)
                            .select(".tooltips")
                            .append("text")
                            .style("font-size", "11px")
                            .attr("x", 60)
                            .attr("y", 45)
                            .text(`${e["month"].getFullYear()} 年`);
                        d3.select(this)
                            .select(".tooltips")
                            .append("text")
                            .style("font-size", "11px")
                            .attr("width", 180)
                            .attr("text-anchor", "end")
                            .attr("x", 55)
                            .attr("y", 45)
                            .text(`年份 :`);
                        d3.select(this)
                            .select(".tooltips")
                            .selectAll(".tooltipsKey")
                            .data(tooltipsMobile)
                            .enter()
                            .append("text")
                            .style("font-size", "11px")
                            .attr("width", 180)
                            .attr("class", "tooltipsKey")
                            .attr("text-anchor", "end")
                            .attr("fill", d => {
                                return `${d.fill}`;
                            })
                            .attr("x", 55)
                            .attr("y", (d, i) => {
                                return i * 25 + 70;
                            })
                            .text(d => {
                                return `${d.key}`;
                            });
                        d3.select(this)
                            .select(".tooltips")
                            .selectAll(".tooltipsValue")
                            .data(tooltipsMobile)
                            .enter()
                            .append("text")
                            .style("font-size", "11px")
                            .attr("class", "tooltipsValue")
                            .attr("fill", d => {
                                return `${d.fill}`;
                            })
                            .attr("x", 60)
                            .attr("y", (d, i) => {
                                return i * 25 + 70;
                            })
                            .text(d => {
                                return `${f(e[d.value].toFixed(0))}`;
                            });
                    }
                })
                .on("mouseleave", function(e) {
                    document
                        .querySelectorAll(".nomalStatusLines")
                        [e.index].setAttribute("stroke-width", "0px");
                    d3.select(this)
                        .select("line")
                        .style("opacity", "0");
                    d3.select(this)
                        .select("text")
                        .style("stroke", "none");
                    d3.select("#stack")
                        .selectAll("circle")
                        .remove();
                    d3.select("#stack")
                        .selectAll(".tooltips")
                        .remove();
                });
            d3.select("#stack")
                .select("svg")
                .append("defs");
            let defsForTips = d3.select("#stack").select("defs");
            defsForTips
                .append("filter")
                .attr("id", "f1")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", "200%")
                .attr("height", "200%");
            let defsForTips__filter = d3
                .select("#stack")
                .select("defs")
                .select("filter");
            defsForTips__filter
                .append("feOffset")
                .attr("result", "offOut")
                .attr("in", "SourceAlpha")
                .attr("dx", "1")
                .attr("dy", "1");
            defsForTips__filter
                .append("feGaussianBlur")
                .attr("result", "blurOut")
                .attr("in", "offOut")
                .attr("stdDeviation", "1");

            defsForTips__filter
                .append("feBlend")
                .attr("in", "SourceGraphic")
                .attr("in", "blurOut")
                .attr("mode", "normal");
        },
        WhoLarger: function(a, b, size) {
            //a預期金額 [0]
            //b目標金額 [1]
            if (a - b > 0) {
                //預期金額 低於 目標金額
                return [a + size, b - size / 2];
            } else {
                //預期金額 高於 目標金額
                return [a - size / 2, b + size];
            }
        },
        ifStaggered: function(a, b, size) {
            //是否距離過近
            if (Math.abs(a - b) < size) {
                return true;
            } else {
                return false;
            }
        },
        textDistantProcess: function(a, b, size) {
            let ifStaggered = this.ifStaggered(a, b, size);
            if (ifStaggered) {
                //太近了
                return this.WhoLarger(a, b, size);
            } else {
                return [a + 5, b + 5];
            }
        },
        isPositiveInteger: function(s) {
            //是否正整数
            let re = /^[0-9]+$/;
            return re.test(s);
        },
        formatDot: function(v) {
            let f = d3.format(",");
            return f(v);
        },
        init: function(animation) {
            if (typeof animation === "boolean") {
                this.initStatus = animation;
            }

            if (this.isMobile()) {
                this.$nextTick(() => {
                    setTimeout(
                        () => {
                            d3.select("#stack")
                                .select(".svg")
                                .remove();
                            this.draw();
                            this.initStatus = false;
                        },
                        platform().android ? 300 : 300
                    );
                });
            } else {
                setTimeout(() => {
                    d3.select("#stack")
                        .select(".svg")
                        .remove();
                    this.draw();
                    this.initStatus = false;
                }, 300);
            }
        }
    },
    mounted: function() {
        this.init(true);
        if (this.isMobile()) {
            window.addEventListener("orientationchange", this.init);
        } else {
            window.addEventListener("resize", this.init);
        }
    },
    destroyed() {
        if (this.isMobile()) {
            window.removeEventListener("orientationchange", this.init);
        } else {
            window.removeEventListener("resize", this.init);
        }
    }
};
</script>
<style lang="scss" >
#stack {
    width: 100%;
    height: 100%;
}

#stack .yTickText {
    fill: #6c7680;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: right;
}

#stack .line,
#stack .area {
    pointer-events: none;
}
.focus {
    animation: rect 1s ease 0s 1 alternate;
}
.focus__NoAnimation {
    animation: none 0s ease 0s 0 alternate;
    clip-path: url(#clip);
}
@keyframes rect {
    0% {
        clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
    }
    100% {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }
}
#stack .tooltips {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.29px;
}
#stack .tooltips > div {
    width: 100%;
}
#stack .tooltips span {
    display: inline-block;
    width: 50%;
}
</style>
