<template>
    <div id="navBar">
        <FrameNavBar></FrameNavBar>
        <!-- <FrameNavBarEfirst></FrameNavBarEfirst> -->
    </div>
</template>
<script>
import FrameNavBar from "@/views/elementsPages/nav/navBar.vue";
// import FrameNavBarEfirst from "@/views/elementsPages/nav/navBar_efirst.vue";
export default {
    data() {
        return {};
    },
    components: {
        FrameNavBar,
        // FrameNavBarEfirst
    },
    methods: {},
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
</style>