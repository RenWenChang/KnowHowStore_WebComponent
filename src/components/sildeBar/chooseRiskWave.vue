<template>
    <div class="slider-wrap" ref="sliderWrap">
        <div class="slider__colorBar" :style="{width:`${dataColorW}px`}" :ref="`bar`"></div>
        <div class="sliderBar" :style="{width:`${dataLimit}`}">
            <span
                class="thumb"
                :style="{left:`${thumbleft}px`,top:`${- (r / 4)}px`,width:`${r}px`,height:`${r}px`}"
            ></span>
            <span
                class="thumbTips"
                :style="{left:`${thumbTipsValue>max/2?thumbleft-100+r:thumbleft}px`,top:`${r}px`,height:`${r}px`}"
            >
                {{thumbTips.investGroup[0].AssetName}}{{`${thumbTips.investGroup[0].AssetWgt}%`}}
                {{thumbTips.investGroup[1].AssetName}}{{`${thumbTips.investGroup[1].AssetWgt}%`}}
            </span>

            <!-- 擴充 start -->
            <span
                class="thumb__fixed"
                :style="{left:`${bestPoint__px}px`,top:`-2.5px`,width:`14px`,height:`14px`}"
            ></span>
            <span
                class="thumbTips__fixed"
                :style="{left:`${bestPoint__px-10}px`,top:`-20px`,height:`${r}px`}"
            >{{'最適點'}}</span>

            <!-- 擴充 end -->
            <div class="slider-block"></div>
        </div>
        <!-- 擴充 start -->
        <span class="minTips tips">保守</span>
        <span class="maxTips tips">積極</span>
        <!-- 擴充 end -->
    </div>
</template>
<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
export default {
    watch: {
        data: function() {
            this.initSlider(true);
        },
        bestPoint: function(newvalue) {
            this.initSlider(true);
        }
    },
    props: {
        dataLimit: {
            type: Number,
            default: 100
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        r: {
            type: Number,
            default: 20
        },
        initValue: {
            type: Number,
            default: 1
        },
        length: {
            type: Number,
            default: 0
        },
        //extention start
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        bestPoint: {
            type: Number,
            default: 1
        }
        //extention end
    },
    data() {
        return {
            thumbTipsValue: 5,
            thumbleft: 0,
            dataColorW: 0,
            bestPoint__px: 0
        };
    },
    methods: {
        drawSlider: function(sliderWrap, e) {
            let r = this.r;
            let min = this.min;
            let max = this.max;
            let dataLimit =
                this.dataLimit >= 100
                    ? 100
                    : this.dataLimit < 0
                    ? 0
                    : this.dataLimit;
            let thumb = sliderWrap.querySelector(".thumb");
            let thumbTips = sliderWrap.querySelector(".thumbTips");
            let sliderBar = sliderWrap.querySelector(".sliderBar");
            let sliderBlock = sliderWrap.querySelector(".slider-block");
            let sliderWrapWidth = sliderWrap.offsetWidth;
            let sliderRange = ((sliderWrapWidth - r) * dataLimit) / 100;
            const getEveryPositionByValue = () => {
                let everyPointPosition = [];
                for (let i = 0; i < this.length; i++) {
                    everyPointPosition.push(
                        (sliderWrapWidth / this.length) * (i + 1)
                    );
                }
                return everyPointPosition;
            };

            let blockWidth = ((sliderWrapWidth - r) * (100 - dataLimit)) / 100;
            if (this.length > 0) {
                blockWidth = getEveryPositionByValue()[
                    this.length * ((100 - dataLimit) / 100) - 1
                ];
            }
            sliderBlock.setAttribute(
                "style",
                `width:${blockWidth}px;left:calc(100% - ${blockWidth}px)`
            );

            let minPoint = sliderBar.getBoundingClientRect().left;
            let maxPoint =
                blockWidth !== 0
                    ? sliderBlock.getBoundingClientRect().left
                    : sliderBar.getBoundingClientRect().right;
            const getPositionByValue = value => {
                let scrolledWidthPercentage =
                    ((value - min) / (max - min)) * 100;
                let styleLeft =
                    ((value - min) / (max - min)) * (sliderWrapWidth - r);
                return styleLeft;
            };

            if (typeof e !== "boolean") {
                //resizing
                if (this.length > 0) {
                    //格子模式
                    let newPosition =
                        getEveryPositionByValue()[this.bestPoint - 1] - r;
                    this.bestPoint__px = newPosition;
                    this.thumbleft = newPosition;
                    this.dataColorW = newPosition + r / 2;
                } else {
                    //滑順模式
                    let newPosition = getPositionByValue(this.thumbTipsValue);
                    this.bestPoint__px = getPositionByValue(this.bestPoint);
                    this.thumbleft = newPosition;
                    this.dataColorW = newPosition + r / 2;
                }
            } else {
                //initial
                if (this.length > 0) {
                    //格子模式

                    let newPosition =
                        getEveryPositionByValue()[this.initValue - 1] - r;

                    let newPosition__bst =
                        getEveryPositionByValue()[this.bestPoint - 1] - r;
                    this.bestPoint__px = newPosition__bst;
                    this.thumbleft = newPosition;
                    this.dataColorW = newPosition + r / 2;
                    this.thumbTipsValue = this.initValue;
                } else {
                    //滑順模式
                    let newPosition = getPositionByValue(this.initValue);
                    this.bestPoint__px = getPositionByValue(this.bestPoint);
                    this.thumbTipsValue = this.initValue;
                    this.thumbleft = newPosition;
                    this.dataColorW = newPosition + r / 2;
                }
            }
            const Drag = (dom, parentDom) => {
                /* 绑定事件*/
                const _addHandler = (dom, type, handle) => {
                    if (typeof dom.addEventListener === "function") {
                        dom.addEventListener(type, handle, { passive: false });
                    } else if (typeof dom.attachEvent === "function") {
                        dom.attachEvent("on" + type, handle);
                    } else {
                        dom["on" + type] = handle;
                    }
                };

                /* 解绑事件*/
                const _removeHandler = (dom, type, handle) => {
                    if (typeof dom.removeEventListener === "function") {
                        dom.removeEventListener(type, handle, {
                            passive: false
                        });
                    } else if (typeof dom.detachEvent === "function") {
                        dom.detachEvent("on" + type, handle);
                    } else {
                        dom["on" + type] = null;
                    }
                };

                /* 阻止冒泡&阻止默認行為*/
                const _returnFalse = e => {
                    if (e && e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                    } else {
                        window.event.cancelBubble = true;
                        window.event.returnValue = false;
                    }
                };

                /* 拖拽开始*/
                const actBegin = e => {
                    e = e || window.event; //瀏覽器相容性
                    _addHandler(parentDom, "mousemove", actMove);
                    _addHandler(parentDom, "touchmove", actMove);
                    _addHandler(parentDom, "mouseup", cancel);
                    _returnFalse(e); //阻止冒泡、阻止默認行為
                };

                /* 拖拽移動*/
                const actMove = e => {
                    e = e || window.event;
                    let x;
                    if (e.clientX || e.clientX === 0) {
                        x = Number(e.clientX.toString());
                    } else {
                        x = e.changedTouches[0].clientX;
                    }
                    let styleLeft = 0;

                    const getValueByPosition = () => {
                        let setValue =
                            (styleLeft / (sliderWrapWidth - r)) * 100;

                        let calcShowAge =
                            Math.floor(((max - min) * setValue) / 100) + min;
                        this.thumbTipsValue = calcShowAge;
                        if (calcShowAge < min) this.thumbTipsValue = min;
                        else if (calcShowAge > max) this.thumbTipsValue = max;
                        return this.thumbTipsValue;
                    };

                    const getEveryPositionByValueWithX = () => {
                        let everyPointPosition = [];
                        for (let i = 0; i < this.length; i++) {
                            everyPointPosition.push(
                                (sliderWrapWidth / this.length) * (i + 1) +
                                    minPoint
                            );
                        }
                        return everyPointPosition;
                    };
                    const getTheMostClose = () => {
                        return getEveryPositionByValueWithX().map(y =>
                            Number(Math.abs(y - x).toFixed(2))
                        );
                    };

                    if (this.length > 0) {
                        //格子模式
                        let arr = getTheMostClose();
                        let min = Math.min(...arr);
                        let index = getTheMostClose().indexOf(min);
                        let closedPosition =
                            getEveryPositionByValue()[index] - r;
                        let blockPosition =
                            getEveryPositionByValue()[
                                this.length * (dataLimit / 100) - 1
                            ] - r;
                        if (closedPosition > blockPosition) {
                            styleLeft = blockPosition;
                            this.thumbleft = blockPosition;
                            this.dataColorW = blockPosition + r / 2;
                        } else {
                            styleLeft = closedPosition;
                            this.thumbleft = closedPosition;
                            this.dataColorW = closedPosition + r / 2;
                        }

                        this.$emit("change", getValueByPosition());
                        this.valueWasChanged();
                    } else {
                        //滑順模式
                        if (x >= maxPoint - r / 2) {
                            styleLeft =
                                blockWidth !== 0
                                    ? sliderWrapWidth - blockWidth - r
                                    : sliderWrapWidth - r;
                            this.$emit("change", getValueByPosition());
                            this.valueWasChanged();
                        } else if (x <= minPoint) {
                            styleLeft = 0;
                            this.$emit("change", getValueByPosition());
                            this.valueWasChanged();
                        } else {
                            styleLeft = x - minPoint - 0.5 * r;
                            this.$emit("change", getValueByPosition());
                            this.valueWasChanged();
                        }
                        this.thumbleft = styleLeft;
                        this.dataColorW = styleLeft + r / 2;
                    }

                    _returnFalse(e);
                };
                const clickMoveTo = e => {
                    const getValueByPosition = () => {
                        let setValue =
                            ((e.offsetX - r) / (sliderWrapWidth - r)) * 100;
                        let calcShowAge =
                            Math.floor(((max - min) * setValue) / 100) + min;
                        this.thumbTipsValue = calcShowAge;
                        if (calcShowAge < min) this.thumbTipsValue = min;
                        else if (calcShowAge > max) this.thumbTipsValue = max;
                        return this.thumbTipsValue;
                    };
                    if (e.target.classList.contains("sliderBar")) {
                        if (this.length > 0) {
                            //格子模式
                            const getEveryPositionByValue = () => {
                                let everyPointPosition = [];
                                for (let i = 0; i < this.length; i++) {
                                    everyPointPosition.push(
                                        (sliderWrapWidth / this.length) *
                                            (i + 1)
                                    );
                                }
                                return everyPointPosition;
                            };
                            const getEveryPositionByValueWithX = () => {
                                let everyPointPosition = [];
                                for (let i = 0; i < this.length; i++) {
                                    everyPointPosition.push(
                                        (sliderWrapWidth / this.length) *
                                            (i + 1) +
                                            minPoint
                                    );
                                }
                                return everyPointPosition;
                            };
                            const getTheMostClose__click = () => {
                                return getEveryPositionByValue().map(y =>
                                    Number(Math.abs(y - e.offsetX).toFixed(2))
                                );
                            };
                            let arr = getTheMostClose__click();
                            let min = Math.min(...arr);
                            let index = getTheMostClose__click().findIndex(
                                element => element === min
                            );
                            let closedPosition =
                                getEveryPositionByValue()[index] - r;

                            this.thumbleft = closedPosition;
                            this.dataColorW = closedPosition + r / 2;
                            this.thumbTipsValue = index + 1;
                            this.$emit("change", index + 1);
                            this.valueWasChanged();
                        } else {
                            //模式
                            this.thumbleft = e.offsetX - r / 2;
                            this.dataColorW = e.offsetX - r / 2 + r / 2;
                            this.thumbTipsValue = getValueByPosition();
                            this.$emit("change", getValueByPosition());
                            this.valueWasChanged();
                        }
                    }

                    _returnFalse(e);
                };

                /* 拖拽取消*/
                const cancel = e => {
                    _removeHandler(sliderBar, "click", clickMoveTo);
                    _removeHandler(parentDom, "mousemove", actMove);
                    _removeHandler(parentDom, "touchmove", actMove);
                    _removeHandler(parentDom, "mouseup", cancel);
                    setTimeout(() => {
                        _addHandler(sliderBar, "click", clickMoveTo);
                    }, 100);
                    _returnFalse(e); //阻止冒泡、阻止默認行為
                };

                /* 绑定事件*/

                _addHandler(dom, "mousedown", actBegin);
                _addHandler(dom, "touchstart", actBegin);
                _addHandler(dom, "touchend", cancel);
                _addHandler(sliderBar, "click", clickMoveTo);
            };

            /* 使用*/
            Drag(thumb, document, e);
        },
        initSlider: function(e) {
            this.$nextTick(() => {
                if (this.isMobile()) {
                    setTimeout(
                        () => {
                            let sliderWrap = this.$refs.sliderWrap;
                            this.drawSlider(sliderWrap, e);
                        },
                        platform().android ? 500 : 500
                    );
                } else {
                    let sliderWrap = this.$refs.sliderWrap;
                    this.drawSlider(sliderWrap, e);
                }
            });
        },
        valueWasChanged: function() {
            this.togglecanRegetRaw__isInit(false);
            this.toggleBlockInvestmentInfo(true);
            document
                .querySelector(".Notifybubble")
                .classList.remove("Notifybubble__Hide");
        },
        ...mapActions([
            "togglecanRegetRaw__isInit",
            "toggleBlockInvestmentInfo"
        ])
    },
    mounted() {
        this.initSlider(true);
        this.$emit("update:change", this.thumbTipsValue);
        if (this.isMobile()) {
            window.addEventListener("orientationchange", this.initSlider);
        } else {
            window.addEventListener("resize", this.initSlider);
        }
    },
    destroyed() {
        if (this.isMobile()) {
            window.removeEventListener("orientationchange", this.initSlider);
        } else {
            window.removeEventListener("resize", this.initSlider);
        }
    },
    computed: {
        thumbTips() {
            let obj;
            obj = this.data.PortList.filter(item => {
                return item.ModelOrder === this.thumbTipsValue;
            });
            if (obj.length === 0) {
                obj = [
                    {
                        investGroup: [
                            { AssetName: "-", AssetWgt: "-" },
                            { AssetName: "-", AssetWgt: "-" }
                        ]
                    }
                ];
            }
            sessionStorage.setItem("ModelID", JSON.stringify(obj[0].ModelID)); //重算時紀錄操作點
            sessionStorage.setItem("thumbTips", JSON.stringify(obj[0])); //假如曾經修改過 重算時紀錄操作點
            return obj[0];
        },

        ...mapGetters(["canRegetRaw__isInit"])
    }
};
</script>
<style lang="scss" scoped>
.slider-wrap {
    display: flex;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 50px);
    margin-left: 25px;
    height: 10px;
    border-radius: 5px;
    // background: linear-gradient(
    //     90deg,
    //     #ff0000,
    //     #ffa500,
    //     #ffff00,
    //     #008000,
    //     #0000ff,
    //     #4b0082,
    //     #9400d3
    // );
    background-color: #ccc;
    position: relative;

    .slider__text {
        display: inline-block;
        width: 33.3333%;
        font-size: 12px;
        color: #fff;
        text-align: center;
        position: relative;
    }
    .slider__colorBar {
        width: 0%;
        height: 10px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #31a043;
        // background: linear-gradient(90deg, #f6d365, #9f9100);
        border-radius: 5px;
    }
}

.sliderBar {
    position: relative;
    height: 100%;
    width: 100%;
    /* background-color: #bdc3c7; */
    border-radius: 5px;
    cursor: pointer;
}

.slider-block {
    height: 100%;
    background-color: #b4c2cf;
    border-radius: 0 5px 5px 0;
    position: absolute;
    top: 0;
    z-index: 0;
}

.thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #31a043;
    // background: linear-gradient(90deg, #f6d365, #9f9100);
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    z-index: 2;
    color: #fff;
}

.thumbTips {
    display: inline-block;
    // color: #a29303;
    color: #31a043;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    text-align: left;
    background-color: #fff;
    pointer-events: none;
    font-size: 12px;
}

.thumb:hover {
    transform: scale(1.1);
}

.thumb:active {
    transform: scale(1.1);
}

/////////////////////////////////////*擴充 start*//////////////////////////////////////////
.tips {
    display: block;
    width: 10px;
    position: absolute;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    text-align: right;
    color: #9fa7b3;
    top: 20px;
}
.minTips {
    left: -25px;
    top: -13px;
}
.maxTips {
    right: -25px;
    top: -13px;
}
.thumb__fixed {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f5a900;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
}
.thumbTips__fixed {
    display: inline-block;
    color: #f5a900;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    text-align: center;
    pointer-events: none;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    color: #ed8200;
    z-index: 1;
    pointer-events: none;
}

.thumb__fixed:hover {
    transform: scale(1);
}
.thumb__fixed:active {
    transform: scale(1);
}

/////////////////////////////////////*擴充 end*//////////////////////////////////////////
</style>