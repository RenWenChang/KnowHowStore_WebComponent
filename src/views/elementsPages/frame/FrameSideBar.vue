<template>
    <aside>
        <div class="trademark">
            <span>UI Elements</span>
        </div>
        <div class="searchBox"></div>
        <div class="menu">
            <TreeMenu
                v-for="(node, index) in TreeMenuLise"
                :node="node"
                :index="index"
                :key="`${index}`"
            ></TreeMenu>
        </div>
    </aside>
</template>
<script>
import TreeMenu from "./recursiveMenu.vue";
export default {
    data() {
        return {
            TreeMenuLise: [
                {
                    label: "第一層",
                    layer: 1,
                    nodes: [
                        {
                            label: "選單1",
                            layer: 2,
                            nodes: [
                                {
                                    label: "選單1-1",
                                    layer: 3
                                }
                            ]
                        },
                        {
                            label: "選單2",
                            layer: 2,
                            nodes: [
                                {
                                    label: "選單2-1",
                                    layer: 3
                                }
                            ]
                        },
                        {
                            label: "選單3",
                            layer: 2,
                            nodes: [
                                {
                                    label: "選單3-1",
                                    layer: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "第二層",
                    layer: 1,
                    nodes: [
                        {
                            label: "選單1",
                            layer: 2,
                            nodes: [
                                {
                                    label: "選單1-1",
                                    layer: 3
                                }
                            ]
                        },
                        {
                            label: "選單2",
                            layer: 2,
                            nodes: [
                                {
                                    label: "選單2-1",
                                    layer: 3
                                }
                            ]
                        },
                        {
                            label: "選單3",
                            layer: 2,
                            nodes: [
                                {
                                    label: "選單3-1",
                                    layer: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    nodes: []
                }
            ]
        };
    },
    components: {
        TreeMenu
    },
    methods: {},
    mounted: function() {}
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
        height: 100%;
        overflow-y: auto;
    }
    .searchBox {
        background-color: $background-color-searchBox;
        width: $asideWidth;
        height: 60px;
    }
}
</style>