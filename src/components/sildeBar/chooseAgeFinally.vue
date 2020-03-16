<template>
    <div class="slider-wrap" ref="sliderWrap">
        <div class="slider__colorBar" :style="{width:`${dataColorW}px`}" :ref="`bar`"></div>
        <span class="slider__text">成長期</span>
        <span class="slider__text">資產累積期</span>
        <span class="slider__text">銀髮期</span>
        <div class="sliderBar" :style="{width:`${dataLimit}`}">
            <span class="thumb" :style="{left:`${thumbleft}px`,top:`-10px`,width:`${r}px`,height:`${r}px`}">{{thumbTipsValue}}</span>
            <div class="slider-block"></div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    watch:{
        initValue(){
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
            default: 36
        },
        initValue: {
            type: Number,
            default: 1
        },
        ifBarChange:{
            type: Boolean,
            default: false
        },
        clearnBar:{
            type: Boolean,
            default: true
        },
        barCallScroll:{
            type: Boolean,
            default: true
        },
        change:{
            type: Number,
            default: 15
        }
    },
    data() {
        return {
            thumbTipsValue: 5,
            thumbleft: 0,
            dataColorW: 0
        }
    },
    computed: {
        _ifBarChange: {
            get() {
                return this.ifBarChange;
            },
            set(newValue) {
                this.$emit('update:ifBarChange', newValue);
            }
        },
        _clearnBar: {
            get() {
                return this.clearnBar;
            },
            set(newValue) {
                this.$emit('update:clearnBar', newValue);
            }
        },
        _barCallScroll: {
            get() {
                return this.barCallScroll;
            },
            set(newValue) {
                this.$emit('update:barCallScroll', newValue);
            }
        },
        _change:{
            get() {
                return this.change;
            },
            set(newValue) {
                this.$emit('update:change', newValue);
            }
        }
    },
    methods: {
        drawSlider: function (sliderWrap, e) {
            let r = this.r;
            let min = this.min;
            let max = this.max;
            let dataLimit = (this.dataLimit >= 100) ? 100 : (this.dataLimit < 0 ? 0 : this.dataLimit)
            let thumb = sliderWrap.querySelector('.thumb');
            let thumbTips = sliderWrap.querySelector('.thumbTips');
            let sliderBar = sliderWrap.querySelector('.sliderBar');
            let sliderBlock = sliderWrap.querySelector('.slider-block');
            let sliderWrapWidth = sliderWrap.offsetWidth;
            let sliderRange = (sliderWrapWidth - r) * dataLimit / 100;
            let blockWidth = (sliderWrapWidth - r) * (100 - dataLimit) / 100;
            sliderBlock.setAttribute("style", `width:${blockWidth}px;left:calc(100% - ${blockWidth}px)`);

            let minPoint = sliderBar.getBoundingClientRect().left;
            let maxPoint = blockWidth !== 0 ? sliderBlock.getBoundingClientRect().left : sliderBar.getBoundingClientRect().right;
            const getPositionByValue = (value) => {
                let scrolledWidthPercentage = ((value-min) / (max-min)) * 100;
                let styleLeft = ((value-min) / (max-min)) * ((sliderWrapWidth - r));
                
                return styleLeft;
            };
            if (typeof e !== "boolean") {
                //resizing
                this.thumbleft = getPositionByValue(this.thumbTipsValue);
                this.dataColorW = getPositionByValue(this.thumbTipsValue) + r / 2;
            } else {
                //initial
                this.thumbTipsValue = this.initValue;
                this.thumbleft = getPositionByValue(this.initValue);
                this.dataColorW = getPositionByValue(this.initValue) + r / 2;
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
                }

                /* 解绑事件*/
                const _removeHandler = (dom, type, handle) => {
                    if (typeof dom.removeEventListener === "function") {
                        dom.removeEventListener(type, handle, { passive: false });
                    } else if (typeof dom.detachEvent === "function") {
                        dom.detachEvent("on" + type, handle);
                    } else {
                        dom["on" + type] = null;
                    }
                }

                /* 阻止冒泡&阻止默認行為*/
                const _returnFalse = e => {
                    if (e && e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                    } else {
                        window.event.cancelBubble = true;
                        window.event.returnValue = false;
                    }
                }

                /* 拖拽开始*/
                const actBegin = e => {
                    e = e || window.event;//瀏覽器相容性
                    _addHandler(parentDom, "mousemove", actMove);
                    _addHandler(parentDom, "touchmove", actMove);
                    _addHandler(parentDom, "mouseup", cancel);
                    _returnFalse(e); //阻止冒泡、阻止默認行為
                    this._ifBarChange = true;
                    this._clearnBar = false;
                }

                /* 拖拽移動*/
                const actMove = e => {
                    e = e || window.event;
                    let x
                    if (e.clientX || e.clientX === 0) {
                        x = Number(e.clientX.toString());
                    } else {
                        x = e.changedTouches[0].clientX;
                    }
                    let styleLeft = 0;
                    const getValueByPosition = () => {
                        let setValue = (styleLeft / (sliderWrapWidth - r) * 100);
                        let calcShowAge = Math.floor((max - min) * setValue / 100) + min;
                        this.thumbTipsValue = calcShowAge;
                        if (calcShowAge < min) this.thumbTipsValue = min;
                        else if (calcShowAge > max) this.thumbTipsValue = max;
                        return this.thumbTipsValue;
                    };
                    if (x >= (maxPoint - r / 2)) {
                        styleLeft = blockWidth !== 0 ? (sliderWrapWidth - blockWidth - r) : (sliderWrapWidth - r);
                        this._change =  getValueByPosition();
                    } else if (x <= minPoint) {
                        styleLeft = 0;
                        this._change =  getValueByPosition();
                    } else {
                        styleLeft = x - minPoint - 0.5 * r;
                        this._change =  getValueByPosition();
                    }
                    this.thumbleft = (styleLeft);
                    this.dataColorW = styleLeft + r / 2;
                    _returnFalse(e);
                }
                const clickMoveTo = e => {
                    const getValueByPosition = () => {
                        let setValue = ((e.offsetX - r) / (sliderWrapWidth - r) * 100);
                        let calcShowAge = Math.floor((max - min) * setValue / 100) + min;
                        this.thumbTipsValue = calcShowAge;
                        if (calcShowAge < min) this.thumbTipsValue = min;
                        else if (calcShowAge > max) this.thumbTipsValue = max;
                        return this.thumbTipsValue;
                    };
                    if (e.target.classList.contains("sliderBar")) {
                        this.thumbleft = e.offsetX - r/2;
                        this.dataColorW = e.offsetX - r/2 + r / 2;
                        this.thumbTipsValue = getValueByPosition();
                        this._change =  getValueByPosition();
                        this._ifBarChange = true;
                        this._clearnBar = false;
                        this.$nextTick(()=>{
                            if(this.barCallScroll && this._ifBarChange) this._barCallScroll = false;
                        });
                    }
                    _returnFalse(e);
                }

                /* 拖拽取消*/
                const cancel = e => {
                    _removeHandler(parentDom, "mouseup", cancel);
                    _removeHandler(parentDom, "mousemove", actMove);
                    _removeHandler(parentDom, "touchmove", actMove);
                    _returnFalse(e); //阻止冒泡、阻止默認行為
                    if(this.barCallScroll && this._ifBarChange) this._barCallScroll = false;
                }

                /* 绑定事件*/
                    _addHandler(dom, "mousedown", actBegin);
                    _addHandler(dom, "touchstart", actBegin);
                    _addHandler(dom, "touchend", cancel);
                    _addHandler(sliderBar, "click", clickMoveTo);
            }

            /* 使用*/
            Drag(thumb, document, e);
        },
        initSlider: function (e) {
            let sliderWrap = this.$refs.sliderWrap;
            this.drawSlider(sliderWrap, e);
        }
    },
    mounted() {
        this.initSlider(true);
        
        if (this.isMobile()) {
            window.addEventListener('orientationchange', this.initSlider);
        } else {
            window.addEventListener('resize', this.initSlider);
        }
    },
    destroyed() {
        if (this.isMobile()) {
            window.removeEventListener('orientationchange', this.initSlider);
        } else {
            window.removeEventListener('resize', this.initSlider);
        }
    }

}

</script>
<style lang="scss" scoped>
.slider-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 24px;
    border-radius: 12px;
    background-color: #ccc;
    position: relative;
    .slider__text {
        display: inline-block;
        width: 33.3333%;
        font-size: 14px;
        line-height: 22px;
        color: #fff;
        text-align: center;
        position: relative;
    }
    .slider__colorBar {
        width: 0%;
        height: 24px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #31a043;
        border-radius: 12px;
    }
}

.sliderBar {
    position: relative;
    height: 24px;
    width: 100%;
    top: -22px;
    border-radius: 5px;
    cursor: pointer;
}

.slider-block {
    height: 5px;
    background-color: #bdc3c7;
    border-radius: 0 5px 5px 0;
    position: absolute;
    top: 0;
}

.thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #c1cd00;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    z-index: 1;
    color: #fff;
}

.thumb:hover {
    transform: scale(1.1);
}

.thumb:active {
    transform: scale(1.1);
}
</style>