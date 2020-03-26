<template>
    <label :ref="`inputText${name}`" class="inputText">
        <span class="inputText__name" :class="{'inputText__name--required': required}">{{name}}</span>
        <input class="inputText__input" v-model="_value" />
    </label>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            required: true,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _value: {
            get() {
                return this.value
            },
            set(newValue) {
                this.$emit("input", newValue)
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
    },
    watch: {
        _value(newValue, oldValue) {
            if (this.checkEnglishName(newValue)) {
                this._value = newValue
            } else if (newValue === "") {
                this._value = newValue
            } else {
                // 正規檢核不通過
                this._value = oldValue
            }
        }
    },
    methods: {
        checkEnglishName(string) {
            // console.log(string)
            const regex = /^[a-zA-Z \-',]+$/
            return regex.test(string)
        },
    }
}
</script>
<style lang="scss" scoped src="./input.scss">
</style>