<template>
    <header class="headerSpaceForMenu">
        <div id="headerTitle">
            <img
                src="./svg/menu.svg"
                @click="menuOpen"
                id="menuSwithcer"
                class="close headerIconWidth"
                alt
            />
            <span>Systemweb Technology</span>
        </div>
        <div id="userInfo">
            <span id="headerDate">{{ $d(new Date(), 'long') }}</span>
            <img src="./svg/USER.svg" class="headerIconWidth" alt />

        </div>
    </header>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    components: {
        // Navbar
    },
    methods: {
        selector: function (selector) {
            return document.querySelector(selector)
        },
        menuOpen: function () {
            let selector = this.selector;
            let menuSwithcer = selector("#menuSwithcer");
            let navMenu = selector("#navMenu");
            let header = this.selector("header");
            let frameRight = selector("#frameRight");
            if (navMenu.classList.contains("close")) {
                navMenu.classList.remove("close");
                menuSwithcer.classList.add("close");
                header.classList.add("headerSpaceForMenu");
                frameRight.classList.add("spaceForMenu");
            }
            this.setMenu(true);
        },
        ...mapMutations(["setPage", "setMenu"])
    },
    computed: {
        ...mapGetters(["menuState"])
    }
}
</script>
<style lang="scss" scoped>
header {
    position: relative;
    height: 55px;
    width: 100%;
    background-color: #1f2532;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition-property: width, margin-left;
    transition: ease 0.3s;
}

.headerSpaceForMenu {
    width: 100%;
    transition-property: margin-left, width;
    transition: ease 0.3s;
}
@media screen and (min-width: 1920px) {
    .headerSpaceForMenu {
        width: calc(100% - 320px);
        margin-left: 0;
    }
}
#menuSwithcer {
    margin-right: 10px;
    fill: #ffffff;
    cursor: pointer;
    transition: width ease 0.3s;
}
.headerIconWidth {
    width: 32px;
    height: 32px;
}
#headerTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
#headerTitle span {
    display: inline-block;
}
.st1 {
    fill: none;
}
.d-none {
    display: none;
}
.close {
    width: 0;
}
</style>