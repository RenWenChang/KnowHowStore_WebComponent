<template>
    <nav id="navBar">
        <div class="sideMenuButton" :class="[sideMenuOpen?'active':'']" @click="toggleSlider">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    components: {},
    computed: {
        ...mapGetters(["sideMenuOpen"])
    },
    mounted: function() {},
    methods: {
        toggleSlider: function() {
            if (this.sideMenuOpen) {
                this.toggleSideMenuOpen(false);
            } else {
                this.toggleSideMenuOpen(true);
            }
        },
        ...mapActions(["toggleSideMenuOpen"])
    }
};
</script>
<style lang="scss" scoped>
$background-color:#3AB0FF;
$elements-color:#ffffff;
$transition-speed:300ms;
#navBar {
    nav {
        height: 60px;
        width: 100%;
        background-color: $background-color;
        color: $elements-color;
        position: relative;
        display: inline-block;
    }
    .sideMenuButton {
        cursor: pointer;
        position: relative;
        display: inline-block;
        width: 5rem;
        height: 100%;
        div {
            width: 3rem;
            height: 5px;
            background-color: $elements-color;
            margin-bottom: 0.4rem;
            -webkit-transition: all $transition-speed ease;
            -moz-transition: all $transition-speed ease;
            transition: all $transition-speed ease;
            position: absolute;
        }
        div:nth-child(1) {
            left: 1rem;
            top: 1rem;
        }
        div:nth-child(2) {
            left: 1rem;
            top: 1.8rem;
        }
        div:nth-child(2):after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 3rem;
            height: 5px;
            background-color: $elements-color;
            -webkit-transition: all $transition-speed ease;
            -moz-transition: all $transition-speed ease;
            transition: all $transition-speed ease;
        }
        div:nth-child(3) {
            right: 1rem;
            top: 2.6rem;
        }
    }
    .active {
        div {
            width: 3rem;
            height: 5px;
            background-color: $elements-color;
            margin-bottom: 0.3rem;
            -webkit-transition: all $transition-speed ease;
            -moz-transition: all $transition-speed ease;
            transition: all $transition-speed ease;
            position: absolute;
        }
        div:nth-child(1),
        div:nth-child(3) {
            width: 0rem;
            opacity: 0;
        }
        div:nth-child(2) {
            transform: rotate(-45deg);
        }
        div:nth-child(2):after {
            transform: rotate(90deg);
        }
    }
}
</style>