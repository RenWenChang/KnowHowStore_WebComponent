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
#navBar {
    nav {
        height: 60px;
        width: 100%;
        background-color: #252636;
        color: #ccc;
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
            background-color: #ccc;
            margin-bottom: 0.4rem;
            -webkit-transition: all 200ms ease;
            -moz-transition: all 200ms ease;
            transition: all 200ms ease;
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
            background-color: #ccc;
            -webkit-transition: all 200ms ease;
            -moz-transition: all 200ms ease;
            transition: all 200ms ease;
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
            background-color: #ccc;
            margin-bottom: 0.3rem;
            -webkit-transition: all 200ms ease;
            -moz-transition: all 200ms ease;
            transition: all 200ms ease;
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