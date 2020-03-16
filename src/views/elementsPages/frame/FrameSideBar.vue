<template>
    <aside>
        <TreeMenu v-for="(node, index) in TreeMenuLise" :node="node" :key="`${index}`"></TreeMenu>
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
</style>