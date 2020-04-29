<template>
    <aside>
        <div class="trademark">
            <span>UI Elements</span>
        </div>
        <div class="searchBox"></div>
        <div class="menu">
            <TreeMenu
                v-for="(children, index) in TreeMenuLise__FuzzySearch"
                :node="children"
                :index="index"
                :key="`${index}`"
            ></TreeMenu>
        </div>
    </aside>
</template>
<script>
import router from "@/router.js";
import TreeMenu from "./recursiveMenu.vue";
export default {
    data() {
        return {
            TreeMenuLise: [
                {
                    name: "第一層",
                    children: []
                }
            ],
            TreeMenuLise__FuzzySearch: [
                {
                    name: "第一層",
                    children: []
                }
            ]
        };
    },
    components: {
        TreeMenu
    },
    methods: {},
    mounted: function() {
        this.TreeMenuLise = router.router;
        this.TreeMenuLise__FuzzySearch = router.router;
    }
};
</script>
<style lang="scss" scoped>
$asideWidth: 290px;
$slidebar: 20px;
$background-color-trademark: #3ab0ff;
$background-color-searchBox: #373d41;
$elements-color: #ffffff;
aside {
    .trademark {
        height: 60px;
        line-height: 60px;
        width: $asideWidth;
        background-color: $background-color-trademark;
        color: $elements-color;
        font-size: 36px;
        font-weight: 600;
        text-align: center;
    }
    .menu {
        height: calc(100% - 120px);
        overflow-y: auto;
    }
    .searchBox {
        background-color: $background-color-searchBox;
        width: $asideWidth;
        height: 60px;
    }
}
</style>