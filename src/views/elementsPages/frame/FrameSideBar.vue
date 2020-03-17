<template>
    <aside>
        <div class="trademark">
            <span>UI Elements</span>
        </div>
        <div class="searchBox"></div>
        <div class="menu">
            <TreeMenu
                v-for="(children, index) in TreeMenuLise"
                :node="children"
                :index="index"
                :key="`${index}`"
            ></TreeMenu>
        </div>
    </aside>
</template>
<script>
import router from '@/router.js'
import TreeMenu from "./recursiveMenu.vue";
export default {
    data() {
        return {
            TreeMenuLise: [
                {
                    label: "第一層",
                    layer: 1,
                    children: [
                        {
                            label: "選單1",
                            layer: 2,
                            children: [
                                {
                                    label: "aaa",
                                    layer: 3,
                                    children:[]
                                }
                            ]
                        },
                        {
                            label: "選單2",
                            layer: 2,
                            children: [
                                {
                                    label: "bbb",
                                    layer: 3,
                                    children:[]
                                    
                                }
                            ]
                        },
                        {
                            label: "選單3",
                            layer: 2,
                            children: [
                                {
                                    label: "ccc",
                                    layer: 3,
                                    children:[]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "第二層",
                    layer: 1,
                    children: [
                        {
                            label: "選單1",
                            layer: 2,
                            children: [
                                {
                                    label: "ddd",
                                    layer: 3,
                                    children:[]
                                }
                            ]
                        },
                        {
                            label: "選單2",
                            layer: 2,
                            children: [
                                {
                                    label: "eee",
                                    layer: 3,
                                    children:[]
                                }
                            ]
                        },
                        {
                            label: "選單3",
                            layer: 2,
                            children: [
                                {
                                    label: "eee",
                                    layer: 3,
                                    children:[]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "fff",
                    layer: 1,
                    children: []
                },
                {
                    label: "ggg",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
                    children: []
                },
                {
                    label: "第一層",
                    layer: 1,
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
        console.log(router.router)
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