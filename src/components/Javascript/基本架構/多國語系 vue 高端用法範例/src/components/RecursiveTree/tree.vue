<template>
    <div class="tree-alone" @click.stop="closeAll($event)">
        <tree-menu :label="tree.label" :nodes="tree.nodes" :layer="tree.layer"></tree-menu>
    </div>
</template>
<script>
import TreeMenu from './TreeMenu.vue'
export default {
    name: 'tree',
    data() {
        return {
            tree: {
                layer: 0,
                lable: "總層級",
                //link
                //id
                //type
                nodes: [
                    {
                        layer: 1,
                        label: "層級1",
                        nodes: [{
                            layer: 2,
                            label: '層級1-1',
                            nodes: [{
                                layer: 3,
                                label: '層級1-1-1',
                                nodes: []
                            }]
                        }, {
                            layer: 2,
                            label: '層級1-2',

                            nodes: [{
                                layer: 3,
                                label: '層級1-2-1',
                                nodes: []
                            }]
                        }]
                    },
                    {
                        layer: 1,
                        label: "層級1",
                        nodes: [{
                            layer: 2,
                            label: '層級1-1',
                            nodes: [{
                                layer: 3,
                                label: '層級1-1-1',
                                nodes: []
                            }]
                        }, {
                            layer: 2,
                            label: '層級1-2',
                            nodes: [{
                                layer: 3,
                                label: '層級1-2-1',
                                nodes: []

                            }]
                        }]
                    }
                    ,
                    {
                        layer: 1,
                        label: "層級1",
                        nodes: []
                    }
                    ,
                    {
                        layer: 1,
                        label: "層級1",
                        nodes: []
                    }
                    ,
                    {
                        layer: 1,
                        label: "層級1",
                        nodes: []
                    }
                    ,
                    {
                        layer: 1,
                        label: "層級1",
                        nodes: []
                    }
                ]
            }
        }
    },
    components: {
        TreeMenu
    },
    methods: {
        closeAll: function (e) {
            let tNode = 'expend';
            document.querySelectorAll(`.${tNode}`).forEach((item) => {
                if (item.classList.contains(tNode)) {
                    item.classList.remove(tNode);
                }
            })
            e.stopPropagation();
        }
    }
}


</script>
<style lang="scss" scoped>
.tree-alone {
    width: 100%;
    height: 100vh;
}
</style>