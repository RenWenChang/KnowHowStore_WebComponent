<template>
    <div class="checkboxSingle" :ref="`checkboxSingle${this.name}`">
        <span
            class="checkboxSingle__name"
            :class="{'checkboxSingle__name--required': required}"
        >{{name}}</span>
        <ul class="checkboxSingle__list">
            <li v-for="(option,index) in options" :key="index">
                <label>
                    <input type="checkbox" />
                    {{option.name}}
                </label>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data: () => ({
        widths: ['80px', '184px', '392px', '600px', '1224px']
    }),
    props: {
        name: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '1' // 1~14
        },
        required: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '公募',
                        value: ''
                    },
                    {
                        name: '私募',
                        value: ''
                    }
                ]
            }
        }
    },
    mounted() {
        const targetWidth = this.widths[this.width]
        const checkboxSingle = this.$refs[`checkboxSingle${this.name}`]
        checkboxSingle.style.minWidth = targetWidth
    }
}
</script>
<style lang="scss" scoped>
.checkboxSingle {
    font-weight: bold;
    .checkboxSingle__name--required {
        color: #2f3bf5;
    }
    .checkboxSingle__list {
        display: flex;
    }
}
</style>