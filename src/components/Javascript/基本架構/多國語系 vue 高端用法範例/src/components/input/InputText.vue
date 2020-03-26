<template>
    <label :ref="`inputText${name}`" class="inputText">
        <span class="inputText__name" :class="{'inputText__name--required': required}">{{name}}</span>
        <input
            v-if="!disable"
            class="inputText__input"
            :value="value"
            @keydown="handleArrowUp($event)"
            @input="$emit('input', $event.target.value)"
        />
        <input
            v-else
            :class="{'inputText__input--disable': disable}"
            class="inputText__input"
            :value="value"
            :readonly="value"
        />
    </label>
</template>
<script>
import { handleArrowMixin } from '@/components/Nav/arrowUp.js'
export default {
    mixins: [handleArrowMixin],
    data: () => ({
        widths: ['80px', '184px', '392px', '600px', '1224px']
    }),
    props: {
        name: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: '1'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        disable: {
            type: Boolean,
            default: false
        },
        validate: {
            type: Function,
            default: function () {
                return ''
            }
        }
    },
    mounted() {
        const targetWidth = this.widths[this.width]
        const inputLabel = this.$refs[`inputText${this.name}`]
        inputLabel.style.minWidth = targetWidth
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped src="./input.scss">
</style>