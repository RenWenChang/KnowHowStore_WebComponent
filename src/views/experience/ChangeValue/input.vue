<template>
    <div class="inputWrap__wrap" @click="setfocus($event,true)">
        <div
            class="inputWrap"
            :style="{'border':(data>max||data<min)&&!ExperienceInput?'red 1px solid':''}"
            :class="[(ExperienceInput)&&(windowwidth<1024)&&!photoShotting&&ExperienceInputControl?'close___calInput':'']"
        >
            <span
                v-if="focus"
                style="margin-right:10px;:24px;height:24px"
                class="inputWrap__button"
                :class="[(data===min)?'disable':'']"
                @click="AddLess(false)"
            >
                <img
                    v-if="photoShotting"
                    style="width:24px;height:24px"
                    src="@/views/experience/img/for_IE_screenShot/less.png"
                    alt
                />
                <iconLess v-else></iconLess>
            </span>
            <div class="inputWrap__investYearGruop">
                <span class="inputWrap__text">
                    <slot name="title"></slot>
                </span>
                <input
                    class="inputWrap__value"
                    v-if="focus"
                    :id="id"
                    type="number"
                    v-model.number="data"
                    :oninput="limitLength()"
                    @blur="checkValue"
                    :placeholder="`請輸入至少 ${formatDot} 元`"
                    @keypress="goBlur"
                    @keyup="goKeyup"
                />
                <span class="inputWrap__value" v-else>{{data| filterDot}}</span>
                <span class="inputWrap__text">
                    <slot name="unit"></slot>
                </span>
                <span class="errMsg" v-if="(data<min)&&!ExperienceInput">
                    {{errMsg__overmin}} {{min| filterDot}}
                    <slot name="unit"></slot>
                </span>
                <span class="errMsg" v-if="(data>max)&&!ExperienceInput">
                    {{errMsg__overmax}} {{max| filterDot}}
                    <slot name="unit"></slot>
                </span>
            </div>
            <span
                v-if="focus"
                :class="[(data===max)?'disable':'']"
                style="margin-left:10px;:24px;height:24px"
                class="inputWrap__button"
                @click="AddLess(true)"
            >
                <img
                    v-if="photoShotting"
                    style="width:24px;height:24px"
                    src="@/views/experience/img/for_IE_screenShot/add.png"
                    alt
                />
                <iconAdd v-else></iconAdd>
            </span>
        </div>
    </div>
</template>

<script>
// import { isFloatAllowZeros } from "@/regex";
import { floorToPrecision } from "@/math";
import { mapActions, mapGetters } from "vuex";
import iconAdd from "@/views/experience/img/add.vue";
import iconLess from "@/views/experience/img/less.vue";
import * as d3 from "d3";
/* eslint-disable */

export default {
    data: () => ({
        focus: false,
        data: 0
    }),
    computed: {
        formatDot: function() {
            let f = d3.format(",");
            return f(this.min);
        },
        ...mapGetters(["ExperienceInput"])
    },
    watch: {
        data: {
            immediate: true,
            handler: function(newValue, oldValue) {
                this.$nextTick(() => {
                    this.data = floorToPrecision(newValue, 0);
                });
                this.$emit("update:change", newValue);
                this.$emit(
                    "update:pass",
                    newValue >= this.min && newValue <= this.max
                );
                if(!((newValue >= this.min) && (newValue <= this.max))){
                    this.togglecanRegetRaw__isInit(false);
                }
            },
            deep: true
        },
        min: {
            immediate: true,
            handler: function(newValue, oldValue) {
                this.$emit(
                    "update:pass",
                    this.data >= newValue && this.data <= this.max
                );
            },
            deep: true
        },
        max: {
            immediate: true,
            handler: function(newValue, oldValue) {
                this.$emit(
                    "update:pass",
                    newValue >= this.min && this.data <= newValue
                );
            },
            deep: true
        },
        value: {
            immediate: true,
            handler: function(newValue) {
                this.data = newValue;
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
        isTabSelect: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 9999999
        },
        length: {
            type: Number,
            default: 10
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
            default: ""
        },
        value__tabAddLess: {
            type: Number,
            default: 1
        },
        errMsg__overmax: {
            type: String,
            default: "不可輸入 高於"
        },
        errMsg__overmin: {
            type: String,
            default: "不可輸入 低於"
        },
        ExperienceInputControl: {
            type: Boolean,
            default: true
        }
    },
    components: {
        iconAdd,
        iconLess
    },
    methods: {
        AddLess: function(add) {
            let min = this.min;
            let max = this.max;
            if (this.data === min && !add) {
                return;
            }
            if (this.data === max && add) {
                return;
            }
            if (add) {
                this.data =
                    this.data > max ? max : this.data + this.value__tabAddLess;
            } else {
                this.data =
                    this.data < min ? min : this.data - this.value__tabAddLess;
            }
            this.togglecanRegetRaw__isInit(false);
        },
        setfocus: function(e, focus) {
            e.stopPropagation();
            e.preventDefault();
            this.focus = focus;
            if (focus) {
                this.$nextTick(() => {
                    document.querySelector(`#${this.id}`).focus();
                });
            } else {
                let value = Number(document.querySelector(`#${this.id}`).value);
                if (value < this.min) {
                    this.data = this.min;
                }
                if (value > this.max) {
                    this.data = this.max;
                }
            }
        },
        checkValue: function() {
            if (this.data <= this.min) {
                this.data = this.min;
                this.togglecanRegetRaw__isInit(false);
            }
            if (this.data >= this.max) {
                this.data = this.max;
                this.togglecanRegetRaw__isInit(false);
            }
        },
        goKeyup: function(e) {
            if (e.target.value.length === 2 && e.target.value[0] === "0") {
                document.querySelector(`#${this.id}`).value = e.target.value[1];
            }
            this.togglecanRegetRaw__isInit(false);
        },
        goBlur: function(e) {
            if (e.keyCode === 13) {
                let value = Number(document.querySelector(`#${this.id}`).value);
                if (value <= this.min) {
                    this.data = this.min;
                }
                if (value >= this.max) {
                    this.data = this.max;
                }
                document.querySelector(`#${this.id}`).blur();

                this.$nextTick(() => {
                    this.focus = false;
                });
            }
            this.checkIsNumber(e);
        },
        validateNumber(event) {
            /**
             * iPad 的 按鈕沒有event.key可以用，所以需要這個替代方案
             * https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
             */
            var key = window.event ? event.keyCode : event.which;
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true;
            } else if (key < 48 || key > 57) {
                return false;
            } else {
                return true;
            }
        },
        checkIsNumber(event) {
            /**
             * 用event.prevent來阻擋input的"顯示內容"更新
             * https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number
             */
            const invalidChars = ["-", "e", "+", "E"];
            if (
                invalidChars.includes(event.key) ||
                !this.validateNumber(event)
            ) {
                event.preventDefault();
            }
            if (event.key === "." && !String(event.target.value)) {
                event.target.value = "";
                event.preventDefault();
            }
        },
        limitLength: function() {
            return `if(value.length>${this.length}){
        value=Number(value.slice(0,${this.length}))}`;
        },
        ...mapActions([
            "toggleExperienceInput",
            "togglecanRegetRaw",
            "togglecanRegetRaw__isInit"
        ])
    },
    mounted: function() {
        let vm = this;
        vm.data = vm.value;
        let cancelFocus = function(e) {
            if (e.target !== document.querySelector(`#${vm.id}`)) {
                vm.focus = false;
            }
        };
        document.addEventListener("click", cancelFocus, false);
    },
    destroyed() {
        document.removeEventListener("click", this.cancelFocus);
    }
};
</script>
<style lang="scss" src="../experience.scss">
</style>  
<style lang="scss" src="../dateOption.scss">
</style>  