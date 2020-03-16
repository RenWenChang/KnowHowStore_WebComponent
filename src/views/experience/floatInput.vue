<template>
    <input
        ref="input"
        v-model="localValue"
        type="number"
        :placeholder="placeholder"
        @keypress="checkIsNumber"
        @mousewheel.native.prevent 
        :id='"floatInput_" + itemKey'
    >
</template>
<script>
import { isFloatAllowZeros } from "@/regex";
import { getPrecision } from "@/math";
export default {
    data: () => ({
        messageTimeoutId: null,
    }),
    props: {
        id: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        precision: {
            type: Number,
            required: true
        },
        message: {
            required: true,
            default: ""
        },
        buttonSwitch: {
            required: true,
            type: Boolean
        },
        itemKey: {
            type: String,
            required: true
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(newValue) {
                this.$emit("update:value", newValue)
            }
        },
        _message: {
            get() {
                return this.message
            },
            set(newValue) {
                this.$emit("update:message", newValue)
            }
        },
        _buttonSwitch: {
            get() {
                return this.buttonSwitch;
            },
            set(newValue) {
                this.$emit("update:buttonSwitch", newValue)
            }
        }
    },
    watch: {
        localValue(newValue, oldValue) {
            // 輸入時，檢核並設定值
            if (isFloatAllowZeros(newValue)) {
                // 檢核通過
                const numPrecision = getPrecision(newValue);
                const integers = Number(newValue).toFixed();
                // 依據值處理資料
                const partRedeemNum = Number(this.localValue);
                const allowUnit = this.max;
                if (partRedeemNum > allowUnit) {
                    this.setMessageTimer("大於可買回單位數")
                    this.localValue = this.max;
                } else if (numPrecision > this.precision || integers.length > 16) {
                    // 小數超過限制 或是 整數超過限制 都不做事
                    this.localValue = oldValue
                    this.setMessageTimer("小數位數已大於位元限制")
                } else {
                    this.localValue = newValue
                }
            } else if (newValue === "") {
                // this.setMessageTimer("資料重設")
                this.localValue = newValue
            } else {
                // 正規檢核不通過
                this.localValue = oldValue
            }
            // Reset button state
            if (this.localValue === "") {
                this._buttonSwitch = true;
            } else {
                this._buttonSwitch = false;
            }
        }
    },
    methods: {
        checkIsNumber(event) {
            /**
             * 用event.prevent來阻擋input的"顯示內容"更新
             * https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number
             */
            const invalidChars = ["-", "e", "+", "E"];
            if (invalidChars.includes(event.key) || !this.validateNumber(event)) {
                this.setMessageTimer("此欄位請切換英數模式輸入")
                event.preventDefault();
            }
            if (event.key === "." && !String(event.target.value)) {
                event.target.value = "";
                this.setMessageTimer("格式有誤, 請重新輸入")
                event.preventDefault();
            }
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
        setMessageTimer(message) {
            if (this.messageTimeoutId) {
                clearTimeout(this.messageTimeoutId)
            }
            this._message = message;
            this.messageTimeoutId = setTimeout(() => {
                this._message = null
            }, 1300)
        },
    },
    mounted: function() {
        // 阻擋 瀏覽器輸入後，滾輪調整數字大小的事件(從外面傳進itemKey組成ID)
        const selfFloatInput = document.getElementById("floatInput_" + this.itemKey);
        selfFloatInput.addEventListener('DOMMouseScroll', function(event) {
            event = event || window.event;
            event.preventDefault();
        });
        selfFloatInput.addEventListener('mousewheel', function(event) {
            event = event || window.event;
            event.preventDefault();
        });
    }
}
</script>