<template>
    <label :ref="`inputText${name}`" class="inputText">
        <span class="inputText__name" :class="{'inputText__name--required': required}">{{name}}</span>
        <input
            class="inputText__input"
            :value="value"
            @keydown="handleArrowUp($event)"
            @input="$emit('input', $event.target.value)"
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
<style lang="scss" scoped>
.inputText {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: bold;

    .inputText__name {
        color: #414042;
    }
    .inputText__name--required {
        color: #2f3bf5;
    }
    .inputText__input {
        margin-top: 4px;
        border-radius: 4px;
        border: solid 1px #d0d0d0;
        height: 40px;
        width: 100%;
    }
}
</style>