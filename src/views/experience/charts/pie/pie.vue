
<template>
    <div id="pieWrap">
        <div id="pie"></div>
        <div class="pieLabelGroup"></div>
    </div>
</template>
<script>
/* eslint-disable */
import * as d3 from "d3";
export default {
    data: () => ({
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
                        type: "01",
                        name: "標籤1",
                        value: 0,
                        color: "#00a1e0"
                    }
                ];
            }
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        }
    },
    components: {},
    methods: {
        draw: function() {
            let vm = this;
            // parElemWidth = parElemWidth > 350 ? 350 : parElemWidth;//寬度大於350就用350否則按照外框比例縮
            let width = document.querySelector("#pie").offsetWidth;
            let height = document.querySelector("#pie").offsetHeight;
            let radius = width / 2; //半徑

            let arc = d3
                .arc() //圓弧初始
                .innerRadius(radius * 0.5) //小圈半徑
                .outerRadius(radius - 5); //大圈半徑
            let arcHover = d3
                .arc() //圓弧被觸發
                .innerRadius(radius * 0.5)
                .outerRadius(radius);
            let pie = d3
                .pie()
                .sort(null)
                .value(function(d) {
                    return d.value;
                })
                // .startAngle(0).endAngle(-360);//設定pie總弧度 逆時針
                .startAngle(0)
                .endAngle(360); //設定pie總弧度 順時針
            let svg = d3
                .select("#pie")
                .append("svg")
                .attr("class", "svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("class", "group")
                .attr(
                    "transform",
                    "translate(" + width / 2 + "," + height / 2 + ")"
                );
            let g = svg
                .selectAll(".arc")
                .data(pie(this.data))
                .enter()
                .append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return d.data.color;
                })
                .each(function() {
                    if (vm.initStatus) {
                        d3.select(this)
                            .transition()
                            .duration(1000)
                            .attrTween("d", function(d) {
                                let interpolate = d3.interpolate(
                                    { startAngle: 0, endAngle: 0 },
                                    d
                                );
                                return function(t) {
                                    return arc(interpolate(t));
                                };
                            });
                    }
                });
            //////////////////////////// *進場結束 事件掛載*////////////////////////////
            this.$nextTick(() => {
                d3.select("#pie")
                    .selectAll("path")
                    .on("mouseenter", function(d) {
                        var t = d3
                            .transition()
                            .duration(250)
                            .ease(d3.easeBounce);
                        d3.select(this)
                            .attr("d", arc)
                            .transition(t)
                            .attr("d", arcHover);
                        d3.select(this).attr(
                            "fill",
                            d3.select(this).style("opacity", "0.6")
                        );
                    });

                d3.select("#pie")
                    .selectAll("path")
                    .on("mouseleave", function() {
                        var t = d3
                            .transition()
                            .duration(0)
                            .ease(d3.easeLinear);
                        d3.select(this)
                            .attr("d", arcHover)
                            .transition(t)
                            .attr("d", arc);
                        d3.select(this).attr(
                            "fill",
                            d3.select(this).style("opacity", "1")
                        );
                    });
            });

            //////////////////////////// *Label 綁定 data*////////////////////////////
            if (vm.initStatus) {
                d3.select(".pieLabelGroup")
                    .selectAll("pieLabels")
                    .data(pie(this.data))
                    .enter()
                    .append("div")
                    .attr("class", "pieLabels")
                    .append("span")
                    .attr("class", "pie_label_colorBox")
                    .style("background-color", function(d) {
                        return d.data.color;
                    });
                d3.selectAll(".pieLabels")
                    .data(pie(this.data))
                    .append("span")
                    .attr("class", "pie_label_name")
                    .text(d => {
                        return `${d.data.name} ${d.data.value}%`;
                    });

                let dispatch = d3.dispatch("events");
                dispatch.on("events", (a, b) => {
                    let arc = document.querySelectorAll(".arc")[a];
                    d3.select(arc)
                        .style("opacity", "1")
                        .transition()
                        .duration(350)
                        .ease(d3.easeLinear)
                        .style("opacity", "0")
                        .transition()
                        .duration(350)
                        .ease(d3.easeLinear)
                        .style("opacity", "1");
                });
                d3.selectAll(".pieLabels").on("click", function(d) {
                    dispatch.apply("events", this, [d.index, d]);
                });
            }
        },
        init: function(animation) {
            if (!animation.type) {
                this.initStatus = animation;
                d3.selectAll(".pieLabels").remove();
            }

            if (this.isMobile()) {
                this.$nextTick(() => {
                    setTimeout(
                        () => {
                            d3.select("#pie")
                                .select(".svg")
                                .remove();
                            this.draw();
                            this.initStatus = false;
                        },
                        platform().android ? 300 : 300
                    );
                });
            } else {
                d3.select("#pie")
                    .select(".svg")
                    .remove();
                this.draw();
                this.initStatus = false;
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
#pie {
    width: 50%;
    min-width: 180px;
    max-width: 200px;
    height: 100%;
}

#pie path {
    stroke: #fefefe;
    /* 白邊 */
    stroke-width: 2px;
}
#pieWrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
}

.pieLabelGroup {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 0 0 0 40px;
}

.pieLabels {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
@media screen and (min-width: 768px) {
    .pieLabelGroup {
        padding: 10px 0 10px 10px;
    }
}
.pieLabels {
    margin-bottom: 18px;
}
.pieLabels * {
    display: inline-block;
}
.pie_label_colorBox {
    display: inline-block;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border-radius: 10px;
    margin-right: 10px;
}
@media screen and (min-width: 768px) {
    .pie_label_colorBox {
        margin-right: 2px;
    }
}
.pie_label_name {
    cursor: pointer;
    font-size: 14px;
    color: #808080;
}
</style>
