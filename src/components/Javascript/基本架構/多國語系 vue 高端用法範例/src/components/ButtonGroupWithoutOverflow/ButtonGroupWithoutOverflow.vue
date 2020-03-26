<template>
    <div class="ButtonGroupWithoutOverflow">
        <div
            class="button"
            v-for="(item,index) in buttons"
            :key="index"
            @click="item.click($event)"
        >
            <iconA v-if="item.icon===1"></iconA>
            <iconB v-if="item.icon===2"></iconB>
            <iconC v-if="item.icon===3"></iconC>
            <span>{{item.name}}</span>
        </div>
    </div>
</template>
<script>
import iconA from "./svg/saving-bank-international copy 2.vue"
import iconB from "./svg/saving-bank-international copy.vue"
import iconC from "./svg/saving-bank-international.vue"
export default {
    components: {
        iconA,
        iconB,
        iconC
    },

    props: {
        buttons: {
            type: Array,
            default: () => {
                return [
                    {
                        name: 'ex:境外基金上架',
                        hasName: true,
                        icon: 1,
                        hasIcon: true,
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:流程名稱 A',
                        hasName: true,
                        icon: 1,
                        hasIcon: true,
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:流程名稱 B',
                        hasName: true,
                        icon: 1,
                        hasIcon: true,
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:境外基金上架',
                        hasName: true,
                        icon: 1,
                        hasIcon: true,
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:流程名稱 A',
                        hasName: true,
                        icon: 1,
                        hasIcon: true,
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: 'ex:流程名稱 B',
                        hasName: true,
                        icon: '',
                        hasIcon: true,
                        click: function (e) {
                            return e
                        }
                    },
                ]
            }
        },
        clickTitle: {
            type: Function,
            default: (e) => {
                return e
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.ButtonGroupWithoutOverflow {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.button {
    width: 117px;
    height: 112px;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.04);
    background-color: #ffffff;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
}
.button svg {
    width: 56px;
    height: 56px;
}
.button span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1px;
    color: #414042;
}
</style>