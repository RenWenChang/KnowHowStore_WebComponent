<template>
    <div id="line"></div>
</template>
<script>
/* eslint-disable */
import * as d3 from "d3";
export default {
    data: () => ({
        colors: ["#b4883c"],
        padding: { top: 40, right: 110, bottom: 30, left: 30 },
        Padding_Mobile: { top: 40, right: 55, bottom: 40, left: 10 },
        tickPadding: 30,
        tickPadding_Mobile: 15,
        initStatus: true
    }),
    watch: {
        data: function() {
            this.init(true);
        }
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return [
                    {
                        SQL_Value: 0,
                        SQL_DateTime: "2015-10-09T17:05:00"
                    }
                ];
            }
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
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
        }
    },
    components: {},
    methods: {
        draw: function() {
            let vm = this;
            let f = d3.format(",");
            let tooltips = this.tooltips;
            //使svg大小與外部容器同寬高，可用css控制外部容器以調整大小
            let svg = d3
                .select("#line")
                .append("svg")
                .attr("class", "svg")
                .attr("width", document.querySelector("#line").offsetWidth)
                .attr("height", document.querySelector("#line").offsetHeight);
            //svg內部邊界 多半是預留給顯示座標軸空間使用
            let isSmallScreen = vm.windowwidth < 1024;
            let r = isSmallScreen ? 2 : 6;
            let YtickPadding = isSmallScreen
                ? this.tickPadding_Mobile
                : this.tickPadding;
            let padding = isSmallScreen ? this.Padding_Mobile : this.padding;
            //包含坐標軸和內部區塊的總長寬
            let width = +svg.attr("width") - padding.left - padding.right;
            let height = +svg.attr("height") - padding.top - padding.bottom;
            let data = this.data;
            /*x scale*/
            let x = d3
                .scaleTime()
                .domain(
                    d3.extent(data, function(d) {
                        return new Date(d.SQL_DateTime);
                    })
                )
                .range([0, width]);
            /*y scale*/

            let y = d3
                .scaleLinear()
                .domain([
                    d3.min(data, (d, i) => {
                        return d.SQL_Value;
                    }) * 0.9,
                    d3.max(data, (d, i) => {
                        return d.SQL_Value;
                    }) * 1.1
                ])
                .range([height, 0]);
            // let p = Math.max(0, d3.precisionFixed(0.01));
            let p = Math.max(0, d3.precisionFixed(0));
            let yAxis_fn = d3
                .axisRight(y)
                // .tickFormat(d3.format("." + p + "%"))
                .tickFormat(d3.format("." + p + "%"))
                .tickSize([0])
                .tickPadding([YtickPadding]);
            let yAxis = svg
                .append("g")
                .attr("class", "yaxis")
                .attr(
                    "transform",
                    "translate(" +
                        (padding.left + width) +
                        "," +
                        padding.top +
                        ")"
                )
                .call(yAxis_fn);
            svg.selectAll(".tick")
                .select("text")
                .attr("fill", "#6c7680");
            yAxis.select(".domain").attr("stroke", "none");
            let AllTick =document.querySelector('#line').querySelectorAll(".tick");


               
            if (isSmallScreen) {
                let yAxis_info = d3
                    .select("#line")
                    .select(".yaxis")
                    .append("g")
                    .attr(
                        "transform",
                        "translate(" +
                            YtickPadding +
                            "," +
                            (height + padding.bottom - 2 - 18) +
                            ")"
                    )
                    .append("text")
                    .text("(累積)")
                    .attr("stroke", "none")
                    .attr("fill", this.colors[0])
                    .attr("class", "yAxis_info")
                    .style("font-size", vm.windowwidth < 768 ? "13px" : "");
                d3.select("#line")
                    .select(".yaxis")
                    .append("g")
                    .attr(
                        "transform",
                        "translate(" +
                            YtickPadding +
                            "," +
                            (height + padding.bottom - 2) +
                            ")"
                    )
                    .append("text")
                    .text("報酬率")
                    .attr("stroke", "none")
                    .attr("fill", this.colors[0])
                    .attr("class", "yAxis_info")
                    .style("font-size", vm.windowwidth < 768 ? "13px" : "");
            } else {
                let yAxis_info = d3
                    .select("#line")
                    .select(".yaxis")
                    .append("g")
                    .attr(
                        "transform",
                        "translate(" +
                            YtickPadding +
                            "," +
                            (height + padding.bottom - 2) +
                            ")"
                    )
                    .append("text")
                    .text("累積報酬率")
                    .attr("stroke", "none")
                    .attr("fill", this.colors[0])
                    .attr("class", "yAxis_info");
            }

            let line = d3
                .line()
                .x(d => {
                    return x(new Date(d.SQL_DateTime));
                })
                .y(d => {
                    return y(d.SQL_Value);
                });

            function transition(path) {
                path.transition()
                    .duration(vm.initStatus ? 1500 : 0)
                    .attrTween("stroke-dasharray", tweenDash);
            }
            svg.append("g")
                .attr(
                    "transform",
                    "translate(" + padding.left + "," + padding.top + ")"
                )
                .append("path")
                .datum(data)
                .attr("d", line)
                .call(transition)
                .style("fill", "none")
                .style("stroke", "#b4883c")
                .style("stroke-width", "3px")
                .style("opacity", "1");
            function arcFunction(d, i) {
                d3.select(this)
                    .transition()
                    .duration(vm.initStatus ? 1500 : 0)
                    .attr("r", r);
            }
            let xAxis = svg
                .append("g")
                .attr("class", "xaxis")
                .attr(
                    "transform",
                    "translate(" + padding.left + "," + padding.top + ")"
                );
            d3.select("#line")
                .select(".xaxis")
                .selectAll(".dateLabel")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "dateLabel")
                .append("text")
                .attr("fill", "#6c7680")
                .text((d, i) => {
                    let Index_PreviousItem = i - 1;
                    let previousItem = data[Index_PreviousItem];
                    let isSameFirstMonth = function() {
                        return (
                            new Date(d.SQL_DateTime).getMonth() ===
                            new Date(data[0].SQL_DateTime).getMonth()
                        );
                    };
                    let XlabelYearMonth = function() {
                        return `${new Date(d.SQL_DateTime).getFullYear()}${
                            !isSmallScreen
                                ? new Date(d.SQL_DateTime).getMonth() + 1 < 10
                                    ? "/0"
                                    : ""
                                : ""
                        }${
                            !isSmallScreen
                                ? "" + (new Date(d.SQL_DateTime).getMonth() + 1)
                                : ""
                        }`;
                    };
                    if (Index_PreviousItem >= 0) {
                        if (isSameFirstMonth()) {
                            return XlabelYearMonth();
                        } else {
                            return "";
                        }
                    } else {
                        return XlabelYearMonth();
                    }
                })
                .attr("x", d => {
                    return x(new Date(d.SQL_DateTime))- (vm.windowwidth < 1024 ? 0 : 28);
                })
                .attr("y", 0);
            d3.select("#line")
                .selectAll(".dateLabel")
                .append("line")
                .attr("x1", d => {
                    return x(new Date(d.SQL_DateTime));
                })
                .attr("y1", 10)
                .attr("y2", height + padding.bottom + padding.top)
                .attr("x2", d => {
                    return x(new Date(d.SQL_DateTime));
                })
                .style("stroke", "#dce6f0")
                .style("stroke-width", 1)
                .style("opacity", 1);

            d3.select("#line")
                .selectAll(".dateLabel")
                .append("circle")
                .attr("cx", d => {
                    return x(new Date(d.SQL_DateTime));
                })
                .attr("cy", d => {
                    return y(d.SQL_Value);
                })
                .attr("r", 0)
                .attr("fill", "#ffffff")
                .attr("stroke", "#a1adb9")
                .attr("class", "point")
                .each(arcFunction);
            d3.select("#line")
                .selectAll(".dateLabel")
                .append("line")
                .attr("x1", d => {
                    return x(d["SQL_DateTime"]);
                })
                .attr("y1", 20)
                .attr("y2", height + padding.bottom + padding.top)
                .attr("x2", d => {
                    return x(d["SQL_DateTime"]);
                })
                .attr("stroke-width", vm.windowwidth < 768 ? "13px" : "30px")
                .style("stroke", "#dce6f0")
                .style("opacity", "0");
            function tweenDash() {
                let l = this.getTotalLength(),
                    i = d3.interpolateString("0," + l, l + "," + l);
                return function(t) {
                    return i(t);
                };
            }

            d3.select("#line")
                .selectAll(".dateLabel")
                .on("mouseenter", function(e) {
                    d3.select(this)
                        .select("line")
                        .style("stroke", "#000000")
                        .style("opacity", "1");
                    d3.select(this)
                        .select(".xaxis_text")
                        .style("stroke", "#000000");

                    let tooltipsPosition = function() {
                        let position =
                            x(new Date(new Date(e["SQL_DateTime"]))) /
                            x(
                                d3.max(data, d => {
                                    return d["SQL_DateTime"];
                                })
                            );
                        if (vm.windowwidth < 768) {
                            if (position <= 0.45) {
                                return (
                                    x(new Date(e["SQL_DateTime"])) +
                                    padding.left +
                                    10
                                );
                            } else if (position >= 0.75) {
                                return (
                                    x(new Date(e["SQL_DateTime"])) -
                                    190 -
                                    padding.left
                                );
                            } else {
                                return x(new Date(e["SQL_DateTime"])) - 90;
                            }
                        } else {
                            if (position <= 0.55) {
                                return (
                                    x(new Date(e["SQL_DateTime"])) +
                                    padding.left +
                                    10
                                );
                            } else if (position >= 0.56) {
                                return (
                                    x(new Date(e["SQL_DateTime"])) -
                                    150 -
                                    padding.left
                                );
                            } else {
                                return x(new Date(e["SQL_DateTime"])) - 90;
                            }
                        }
                    };

                    d3.select("#line")
                        .select("svg")
                        .append("g")
                        .attr("class", "tooltips")
                        .attr(
                            "transform",
                            `translate(${tooltipsPosition()},${
                                vm.windowwidth < 768
                                    ? padding.top + 100
                                    : padding.top + 140
                            })`
                        )
                        .append("rect")
                        .attr("width", "200px")
                        .attr("height", "70px")
                        .attr("rx", 10)
                        .attr("ry", 10);
                        // .attr("filter", "url(#f2)");
                    d3.select("#line")
                        .select("svg")
                        .select(".tooltips")
                        .append("rect")
                        .attr("width", "200px")
                        .attr("height", "70px")
                        .style("fill", "#fffbe5")
                        .style("stroke", "#dce6f0")
                        .attr("rx", 10)
                        .attr("ry", 10);
                    d3.select("#line")
                        .select("svg")
                        .select(".tooltips")
                        .append("text")
                        .attr("text-anchor", "middle")
                        .attr("width", 230)
                        .attr("x", 100)
                        .attr("y", 25)
                        .text(
                            `${e["SQL_DateTime"].getFullYear()} 年${e[
                                "SQL_DateTime"
                            ].getMonth() + 1}月 `
                        );

                    d3.select("#line")
                        .select("svg")
                        .select(".tooltips")
                        .selectAll(".tooltipsKey")
                        .data(tooltips)
                        .enter()
                        .append("text")
                        .attr("width", 200)
                        .attr("class", "tooltipsKey")
                        .attr("text-anchor", "end")
                        .attr("fill", "#000000")
                        .attr("x", 110)
                        .attr("y", (d, i) => {
                            return i * 30 + 55;
                        })
                        .text(d => {
                            return `${d.key}`;
                        });
                    d3.select("#line")
                        .select("svg")
                        .select(".tooltips")
                        .selectAll(".tooltipsValue")
                        .data(tooltips)
                        .enter()
                        .append("text")
                        .attr("class", "tooltipsValue")
                        .attr("fill", "#000000")
                        .attr("x", 130)
                        .attr("y", (d, i) => {
                            return i * 30 + 55;
                        })
                        .text(d => {
                            const p = d3.precisionFixed(0.01);
                            const f = d3.format("." + p + "%");
                            return `${f(e[d.value])}`;
                        });
                })
                .on("mouseleave", function() {
                    d3.select(this)
                        .select("line")
                        .style("stroke", "#dce6f0");
                    d3.select("#line")
                        .selectAll(".tooltips")
                        .remove();
                });
            d3.select("#line")
                .select("svg")
                .append("defs");
            let defsForTips = d3.select("#line").select("defs");
            defsForTips
                .append("filter")
                .attr("id", "f2")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", "200%")
                .attr("height", "200%");
            let defsForTips__filter = d3
                .select("#line")
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
        init: function(animation) {
            if (!animation.type) {
                this.initStatus = animation;
            }

            this.$nextTick(() => {
                if (this.isMobile()) {
                    setTimeout(
                        () => {
                            d3.select("#line")
                                .select(".svg")
                                .remove();
                            this.draw();
                            this.initStatus = false;
                        },
                        platform().android ? 300 : 300
                    );
                } else {
                    setTimeout(() => {
                        d3.select("#line")
                            .select(".svg")
                            .remove();
                        this.draw();
                        this.initStatus = false;
                    }, 0);
                }
            });
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
<style lang="scss">
#line {
    width: 100%;
    height: 100%;
}
.yaxis path {
    stroke: none;
}
#line .yaxis text,
#line .xaxis text {
    // fill: #6c7680;
    font-family: "PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei",
        sans-serif;
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: right;
}
#line .yaxis .yAxis_info {
    opacity: 0.8;
    font-family: "PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei",
        sans-serif;
    font-size: 14px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: right;
}
.point {
    stroke-width: 1px;
    z-index: 1;
}
#line .tooltips {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.29px;
}
#line .tooltips > div {
    width: 100%;
}
#line .tooltips span {
    display: inline-block;
    width: 50%;
}
</style>
