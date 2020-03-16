<template>
    <div id="wrap">
        <section class="contents" :class="[sideMenuOpen?'':'contents_closed']">
            <FrameNavBar></FrameNavBar>
            <Main></Main>
        </section>
        <FrameSideBar class="sideBar" :class="[sideMenuOpen?'':'sideBar_closed']"></FrameSideBar>
    </div>
</template>
<script>
import FrameNavBar from "@/views/elementsPages/frame/FrameNavBar.vue";
import FrameSideBar from "@/views/elementsPages/frame/FrameSideBar.vue";
import Main from "@/views/elementsPages/frame/main.vue";
import { mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    components: {
        FrameNavBar,
        FrameSideBar,
        Main
    },
    methods: {},
    mounted: function() {},
    computed: {
        ...mapGetters(["sideMenuOpen"])
    }
};
</script>
<style lang="scss" scoped>
$asideWidth:290px;

#wrap {
    width: 100%;
    height: 100vh;
}
.sideBar {
    width: $asideWidth;
    height: 100%;
    background-color: #d8d8d8;
    color: rgb(0, 0, 0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all 0.3s ease-in-out;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
}
.sideBar_closed {
    width: 0;
}
.contents {
    -webkit-transition: all 0.3s ease-in-out;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    width: 100%;
    height: 100%;
    margin-left: $asideWidth;
    background-color: #000758;
    color: #ccc;
}
.contents_closed {
    margin-left: 0;
}
</style>