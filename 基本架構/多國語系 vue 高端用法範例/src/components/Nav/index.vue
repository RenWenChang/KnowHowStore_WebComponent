<template>
    <ul class="nav">
        <li v-for="(buttonName, index) in buttons" :key="index" class="nav__item">
            <button
                class="nav__item__btn"
                :data-navId="id"
                :class="[`nav__item__btn${id}`,{'nav__item__btn--active': value===buttonName}]"
                @keydown="handleArrowDown($event)"
                @click="$emit('input', buttonName)"
                :ref="`nav__item__btn${id}`"
            >{{buttonName}}</button>
        </li>
    </ul>
</template>
<script>
/**
 * 注意class名稱不可輕易改動，若是改動了，工具內的判斷也要跟著變動
 */
const { uuid } = require('uuidv4');
import { handleArrowMixin } from '@/components/Nav/arrowUp.js'
export default {
    mixins: [handleArrowMixin],
    props: {
        buttons: {
            type: Array,
            default: () => {
                return []
            }
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        id() {
            return uuid()
        }
    },
    methods: {
        handleArrowDown(event) {
            if (event.keyCode === 38) {
                this.focusLastTab()
                event.preventDefault()
            }
            if (event.keyCode === 40) {
                this.focusNextTab()
                event.preventDefault()
            }
        },
        focusLastTab() {
            const navButtons = this.$refs[`nav__item__btn${this.id}`]
            const firstButton = navButtons[0]
            const focusable = this.getFocusable()
            focusable.forEach((tabbableNode, index) => {
                if (tabbableNode.isSameNode(firstButton)) {
                    const lastTabbable = focusable[index - 1]
                    lastTabbable.focus()
                }
            })
        },
        focusNextTab() {
            const navButtons = this.$refs[`nav__item__btn${this.id}`]
            const lastButton = navButtons[navButtons.length - 1]
            const focusable = this.getFocusable()
            focusable.forEach((tabbableNode, index) => {
                if (tabbableNode.isSameNode(lastButton)) {
                    const nextTabbable = focusable[index + 1]
                    nextTabbable.focus()
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.nav {
    display: flex;
    .nav__item__btn {
        text-align: center;
        font-size: 16px;
        border-radius: 16px;
        background-color: #d0d0d0;
        padding: 0 14px;
        height: 32px;
        margin-right: 16px;
        transition: all 0.3s;
        border: solid 1px rgba(0, 0, 0, 0);
        cursor: pointer;
    }
    .nav__item__btn--active {
        color: #00b85a;
        border: solid 1px #00b85a;
        background-color: #e6fff2;
    }
}

@media screen and (min-width: 1440px) {
    .nav {
        .nav__item__btn {
            // font-size: 14px;
        }
    }
}
</style>