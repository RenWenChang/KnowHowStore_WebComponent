<template>
    <div>
        <FrameNavBar></FrameNavBar>
        <FrameSideBar></FrameSideBar>
        <Main></Main>
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
<style >
</style>