<template>
    <div
        style="cursor:pointer"
        :class="[(newActiveIndex!==0)&&(windowwidth<768)&&!photoShotting?'tabMobileHide':'']"
        class="inputWrap"
    >
        <div class="inputWrap" @click="open__WdrawMselection($event)">
            <span class="startWidraw__mark startWidraw__color">★</span>
            <div class="inputWrap__investYearGruop">
                <span class="inputWrap__text startWidraw__color">
                    <slot name="title"></slot>
                    {{value.WdrawYM}}
                </span>
                <span class="inputWrap__value">
                    {{WdrawY}}&nbsp;/&nbsp;{{WdrawM}}
                    <slot name="unit"></slot>
                </span>
                <span class="inputWrap__text">&nbsp;</span>
            </div>

            <div>
                <img
                    v-if="photoShotting"
                    style="width:24px;height:24px"
                    src="@/views/experience/img/for_IE_screenShot/calendar.png"
                    alt
                />
                <calendarSVG v-else :openOptionsDate="openMonthOptions"></calendarSVG>
            </div>
        </div>
        <div
            class="options__YM"
            v-if="!photoShotting"
            :class="[openMonthOptions?'':'options__closed']"
        >
            <div class="options_wrap">
                <div class="option_wrap">
                    <div @click="lessY">
                        <img src="@/assets/img/icon/dateButtonArrow_up.svg" />
                    </div>
                    <div
                        @click="lessY"
                        class="option"
                    >{{new Date(WdrawY__opt-1,WdrawM__opt-1,1).getFullYear()}}年</div>
                    <div
                        class="option active"
                    >{{new Date(WdrawY__opt,WdrawM__opt-1,1).getFullYear()}}年</div>
                    <div
                        @click="addY"
                        class="option"
                    >{{new Date(WdrawY__opt+1,WdrawM__opt-1,1).getFullYear()}}年</div>
                    <div @click="addY">
                        <img src="@/assets/img/icon/dateButtonArrow_down.svg" />
                    </div>
                </div>
                <div class="option_wrap">
                    <div @click="lessM">
                        <img src="@/assets/img/icon/dateButtonArrow_up.svg" />
                    </div>
                    <div
                        @click="lessM"
                        class="option"
                    >{{new Date(WdrawY__opt,WdrawM__opt-2,1).getMonth()+1}}月</div>
                    <div
                        class="option active"
                    >{{new Date(WdrawY__opt,WdrawM__opt-1,1).getMonth()+1}}月</div>
                    <div
                        @click="addM"
                        class="option"
                    >{{new Date(WdrawY__opt,WdrawM__opt,1).getMonth()+1}}月</div>
                    <div @click="addM">
                        <img src="@/assets/img/icon/dateButtonArrow_down.svg" />
                    </div>
                </div>
            </div>
            <div class="setYM">
                <button @click="close">取消</button>
                <button @click="setYM">確認</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import calendarSVG from "@/views/experience/img/calendarSVG.vue";
import * as d3 from "d3";
/* eslint-disable */

export default {
    data: () => ({
        WdrawY: new Date().getFullYear() + 1,
        WdrawM: 1,
        WdrawY__opt: new Date().getFullYear() + 1,
        WdrawM__opt: 1,
        openMonthOptions: false,
        WdrawYM: ""
    }),
    computed: {
        formatDot: function() {
            let f = d3.format(",");
            return f(this.min);
        },
        ...mapGetters(["ExperienceInput"])
    },
    watch: {
        WdrawY: {
            immediate: true,
            handler: function(newValue) {
                this.WdrawYM = `${newValue}${
                    this.WdrawM < 10 ? `0${this.WdrawM}` : this.WdrawM
                }`;
            },
            deep: true
        },
        WdrawM: {
            immediate: true,
            handler: function(newValue) {
                this.WdrawYM = `${this.WdrawY}${
                    newValue < 10 ? `0${newValue}` : newValue
                }`;
            },
            deep: true
        },
        WdrawYM: {
            immediate: true,
            handler: function(newValue) {
                this.$emit("update:change", newValue);
            },
            deep: true
        }
    },
    props: {
        windowwidth: {
            type: Number,
            default: window.innerWidth
        },
        photoShotting: {
            type: Boolean,
            default: false
        },
        newActiveIndex: {
            type: Number,
            default: 0
        },

        id: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: "202001"
        },
        min: {
            type: Number,
            default: new Date().getFullYear()
        },
        max: {
            type: Number,
            default: new Date().getFullYear()
        }
    },
    components: {
        calendarSVG
    },
    methods: {
        close: function() {
            this.openMonthOptions = false;
        },
        open__WdrawMselection: function(e) {
            document
                .querySelector(".doCal")
                .classList.add("specialTreatment__z-index");
            document
                .querySelector(".Notifybubble")
                .classList.add("specialTreatment__z-index");
            this.openMonthOptions = true;
            e.stopPropagation();
            e.preventDefault();
            let WdrawY = Number(this.WdrawYM.substring(0, 4));
            let WdrawM = Number(this.WdrawYM.substring(4, 6));
            this.WdrawY__opt = WdrawY;
            this.WdrawM__opt = WdrawM;
            document.addEventListener(
                "click",
                this.closeopenMonthOptions,
                false
            );
        },
        closeopenMonthOptions: function(e) {
            e.stopPropagation();
            e.preventDefault();
            let vm = this;

            let findParent = function(cur) {
                if (
                    cur !== document.querySelector(".options__YM") &&
                    cur !== null
                ) {
                    findParent(cur.parentNode);
                } else if (cur === null) {
                    vm.openMonthOptions = false;
                    document
                        .querySelector(".doCal")
                        .classList.remove("specialTreatment__z-index");
                    document
                        .querySelector(".Notifybubble")
                        .classList.remove("specialTreatment__z-index");
                }
            };
            findParent(e.target);
        },
        addY: function(e) {
            let nextMonth = new Date().getMonth() + 2;
            this.WdrawY__opt = this.WdrawY__opt + 1;
            if (this.WdrawY__opt > this.max) {
                this.WdrawY__opt = this.max;
            }
            if (this.WdrawY__opt === this.min && this.WdrawM__opt < nextMonth) {
                this.WdrawM__opt = nextMonth;
            }
        },
        addM: function(e) {
            let nextMonth = new Date().getMonth() + 2;
            this.WdrawM__opt = this.WdrawM__opt + 1;
            if (this.WdrawM__opt > 12) {
                this.WdrawM__opt = 1;
            }
            if (this.WdrawY__opt === this.min && this.WdrawM__opt < nextMonth) {
                this.WdrawM__opt = nextMonth;
            }
        },
        lessY: function(e) {
            let nextMonth = new Date().getMonth() + 2;
            this.WdrawY__opt = this.WdrawY__opt - 1;
            if (this.WdrawY__opt < this.min) {
                this.WdrawY__opt = this.min;
            }
            if (this.WdrawY__opt === this.min && this.WdrawM__opt < nextMonth) {
                this.WdrawM__opt = nextMonth;
            }
        },
        lessM: function(e) {
            let nextMonth = new Date().getMonth() + 2;
            this.WdrawM__opt = this.WdrawM__opt - 1;
            if (this.WdrawM__opt < 1) {
                this.WdrawM__opt = 12;
            }
            if (this.WdrawY__opt === this.min && this.WdrawM__opt < nextMonth) {
                this.WdrawM__opt = 12;
            }
        },
        setYM: function(e) {
            this.WdrawY = this.WdrawY__opt;
            this.WdrawM = this.WdrawM__opt;
            this.togglecanRegetRaw__isInit(false);
            this.close();
        },
        ...mapActions([
            "toggleExperienceInput",
            "togglecanRegetRaw",
            "togglecanRegetRaw__isInit"
        ])
    },

    mounted: function() {
        let WdrawY = Number(this.value.substring(0, 4));
        let WdrawM = Number(this.value.substring(4, 6));
        this.WdrawY = WdrawY;
        this.WdrawM = WdrawM + 1;
        this.WdrawYM = this.value;
    },
    destroyed() {
        document.removeEventListener("click", this.closeopenMonthOptions);
    }
};
</script>
<style lang="scss" scoped>
.options__YM {
    width: 100%;
    height: 230px;
    display: inline-block;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: max-height 0.2s;
    max-height: 300px;
    background-color: #ffffff;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.18);
    border: none;
    border-radius: 10px;
    position: absolute;
    top: 40px;
    right: 0;
    margin-left: 0px;
    z-index: 41;
    overflow: visible;
    transition-property: max-height background-color color;
    transition: 0.3s ease;

    .options_wrap {
        width: 100%;
        .option_wrap {
            width: 50%;
        }
        overflow: hidden;
        display: flex;
        justify-content: center;
        text-align: center;
        margin-bottom: 10px;
        .option {
            font-size: 12px;
            width: 100%;
            color: #d2d2d2;
            height: 35px;
            line-height: 35px;
        }
        .active {
            font-size: 14px;
            color: #34aa49;
            background-color: #f5ffec;
        }
    }
    .setYM {
        display: flex;
        justify-content: space-around;
        width: 100%;
        button {
            font-size: 18px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            width: 120px;
            height: 45px;
            border-radius: 10px;
            outline: none;
            cursor: pointer;
        }
        button:nth-child(1) {
            color: #8b8b8b;
            border: solid 1px #dce6f0;
            background-color: #ffffff;
        }
        button:nth-child(2) {
            color: #34aa49;
            background-color: #f5ffec;
            border: none;
        }
    }
}
.options__closed {
    background-color: transparent;
    max-height: 0px;
    padding: 0;
    border: none;
    overflow: hidden;
    color: transparent;
    transition-property: max-height background-color color;
    transition: 0.3s ease;
}
</style>
<style lang="scss" src="../experience.scss">
</style>  
