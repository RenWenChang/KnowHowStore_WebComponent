<template>
    <div class="dropdown" :ref="`dropdown${name}`">
        <span class="dropdown__name">{{name}}</span>
        <select  @change="mapOption($event)"  @keydown="handleArrowUp($event)">
            <option v-if="placeholder">{{placeholder}}</option>
            <option
                v-for="(item,index) in options"
                :key="index"                
            >{{item.name}}</option>
        </select>
    </div>
</template>
<script>
import { handleArrowMixin } from '@/components/Nav/arrowUp.js'
export default {
    mixins: [handleArrowMixin],
    data: () => ({
        widths: ['80px', '184px', '392px', '600px', '1224px']
    }),
    methods:{
        mapOption:function(e){
            this.options[e.target.selectedIndex].click(e);
        }
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '1'
        },
        options: {
            type: Array,
            default: () => {
                return [
                    {
                        name: 'ex:選項1',
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:選項2',
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:選項3',
                        click: function (e) {
                            return e
                        }
                    },
                ]
            }
        }
    },
    mounted() {
        const targetWidth = this.widths[this.width]
        const dropdownElement = this.$refs[`dropdown${this.name}`]
        dropdownElement.style.minWidth = targetWidth
    }
}
</script>
<style lang="scss" scoped>
.dropdown {
    display: flex;
    flex-direction: column;
    color: #414042;
    .dropdown__name {
        font-weight: bold;
        font-size: 14px;
    }
    .dropdown__select {
        cursor: pointer;
        width: 100%;
        margin-top: 4px;
        height: 40px;
        border-radius: 4px;
        border: solid 1px #d0d0d0;
        background-color: #ffffff;
    }
}
</style>