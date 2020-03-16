<template>
    <div id="bar"></div>
</template>

<script>

import * as d3 from "d3";
/* eslint-disable */
export default {
    data: () => ({
        padding: {
            top: 15,
            left: 200,
            bottom: 15,
            right: 60
        },
        initStatus: true

    }),
    watch: {
        data: function () {
            this.init(true)
        },
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return [{
                    type: "01",
                    name: "ex:美國股票",
                    value: 10,
                    color: "#00A1E0"
                }]
            }
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        }
    },
    methods: {
        draw: function () {
            let vm = this;
            let data = this.data;
            let bar = document.querySelector("#bar");
            let svg = d3.select("#bar").append("svg")
                .attr("class", "svg")
                .attr('width', bar.offsetWidth)
                .attr('height', (bar.offsetHeight));
            let padding = this.padding;

            let width = bar.offsetWidth - padding.left - padding.right;
            let height = bar.offsetHeight - padding.top - padding.bottom;




            /*x scale*/
            let Xscale = d3
                .scaleLinear()
                .domain([0, d3.max(data, function (d) { return d.value; })])
                .range([0, width]);
            /*y scale*/
            let Yscale = d3
                .scaleLinear()
                .domain(0, data.length)
                .range([height, 0]);
            let t =
                d3.transition()
                    .duration(vm.initStatus === true ? 1000 : 0)
                    .ease(d3.easeLinear);
            svg.selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "bar")
                .append("rect")
                .attr("width", 0)
                .attr("height", "15")
                .attr("y", function (d, i) {
                    return padding.top + i * (height / data.length);
                })
                .attr("x", padding.left)
                .attr("rx", 7)
                .attr("ry", 7)
                .style("fill", function (d, i) {
                    return d.color
                }).transition(t)
                .attr("width", function (d, i) {
                    return Xscale(d.value);
                })
            svg.selectAll(".bar")
                .append("text").attr("text-anchor", "end")
                .text(
                    function (d, i) {
                        return d.name;
                    })
                
                .attr("x", 190)
                .attr("y",
                    function (d, i) {
                        return padding.top * 1.9 + i * (height / data.length);
                    }
                )
                .style("fill", "#808080")
            svg.selectAll(".bar")
                .append("text")
                .attr("x", function (d, i) {
                    return padding.left;
                })
                .attr("y",
                    function (d, i) {
                        return padding.top * 1.9 + i * (height / data.length);
                    }
                ).style("fill", function (d, i) {
                    return d.color
                })
                .transition(t)
                .attrTween('text', function (d) {
                    var node = this, i = d3.interpolate(node.textContent, d.value), fixedDigits = 0;
                    return function (t) {
                        node.textContent = i(t).toFixed(fixedDigits) + '%';
                    }
                })
                .attr("x", function (d, i) {
                    return padding.left + Xscale(d.value) + 10;
                })




        },
        init: function (animation) {
            if (!animation.type) {
                this.initStatus = animation;
            }
            

            if (this.isMobile()) {
                this.$nextTick(
                    () => {
                        setTimeout(() => {
                            d3.select("#bar").select(".svg").remove();
                            this.draw();
                            this.initStatus = false;
                        }, platform().android ? 300 : 300)
                    }
                );
            } else {
                d3.select("#bar").select(".svg").remove();
                this.draw();
                this.initStatus = false;
            }

        }
    },
    mounted: function () {
        this.init(true);
        if (this.isMobile()) {
            window.addEventListener('orientationchange', this.init);
        } else {
            window.addEventListener('resize', this.init);
        }

    },
    destroyed() {
        if (this.isMobile()) {
            window.removeEventListener('orientationchange', this.init);
        } else {
            window.removeEventListener('resize', this.init);
        }
    }
}

</script>
<style lang="scss">
#bar {
    width: 100%;
    height: 100%;
}
</style>
