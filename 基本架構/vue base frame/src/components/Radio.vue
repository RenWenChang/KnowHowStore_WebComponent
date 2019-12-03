<template>
    <div class="checkboxSingle" :ref="`checkboxSingle${this.name}`">
        <span>{{name}}</span>
        <ul class="checkboxSingle__list">
            <li v-for="(option,index) in options" :key="index">
                <label>
                    <input type="checkbox" />
                    {{option.name}}
                </label>
            </li>
        </ul>
        <!-- <div>
            <input type="checkbox" name="singleSelection" />
            <input type="checkbox" name="singleSelection" />
        </div>-->
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
        options: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '保本型',
                        value: ''
                    },
                    {
                        name: '組合型',
                        value: ''
                    },
                    {
                        name: '傘型',
                        value: ''
                    },
                    {
                        name: '高收益債券',
                        value: ''
                    },
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
.checkboxSingle__list {
    display: flex;
}
</style>