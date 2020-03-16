<template>
    <div id="wrap">
        <section id="contents">
            <FrameNavBar></FrameNavBar>
            <Main></Main>
        </section>
        <FrameSideBar id="sideBar"></FrameSideBar>
    </div>
</template>
<script>
import FrameNavBar from "@/views/elementsPages/frame/FrameNavBar.vue";
import FrameSideBar from "@/views/elementsPages/frame/FrameSideBar.vue";
import Main from "@/views/elementsPages/frame/main.vue";

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
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
#wrap {
    width: 100%;
    height: 100vh;
}
#sideBar {
    width: 290px;
    height: 100%;
    background-color: #252636;
    color: #ccc;
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
#contents {
    width: 100%;
    height: 100%;
    margin-left: 290px;
    background-color: #000758;
    color: #ccc;
}
</style>