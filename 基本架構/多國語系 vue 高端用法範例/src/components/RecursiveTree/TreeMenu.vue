<template>
    <div class="tree-menu">
        <div v-if="nodes.length!==0" class="ab" @click.stop="toggle($event)">{{layer}}</div>
        <div v-else class="ab" @click.stop="clickRouterTo">{{layer}} {{'no child'}}</div>
        <tree-menu
            v-for="(node, index) of nodes"
            :key="index"
            :nodes="node.nodes"
            :label="node.label"
            :layer="node.layer"
            :class="{dNone:node.layer>1}"
        ></tree-menu>
    </div>
</template>

<script>
export default {
    name: "TreeMenu",
    //數據通過pros曏下伝遞,全跼唯一數據源
    props: {
        label: {
            type: String,
            default:'not set label'
        },
        nodes: {
            type: Array,
            default:() => {
                return  ['not set nodes']
            }
        },
        layer: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
        };
    },
    methods: {
        toggle: function (e) {
            let tNode = 'expend';
            let et = e.target;
            if (!et.classList.contains(tNode)) {
                let expends = e.target.parentNode.parentNode.childNodes;
                if (expends) {
                    expends.forEach((expend, i) => {
                        if (i !== 0) {
                            expend.querySelectorAll(`.${tNode}`).forEach((item) => {
                                item.classList.remove(tNode);
                            })
                        }
                    });
                }
                et.classList.add(tNode);
            } else {
                let expends = e.target.parentNode.querySelectorAll(`.${tNode}`);
                expends.forEach(expend => {
                    expend.classList.remove(tNode);
                });
            }
        },
        clickRouterTo: function (e) {
            e.stopPropagation();
            console.log('last layer');
        }
    }
};
</script>
<style lang="scss" scoped>

.tree-menu {
    position: relative;
    width: 200px;
    height: 50px;
    color: white;
    background-color: black;
    margin-left: 0;
    transition:ease 0.4s margin-left,ease 0.2s opacity,ease 0.1s width;
    z-index: 1;
}
.dNone {
    width:0;
    opacity: 0;
    margin-left:0;
}
.expend ~ div {
    width: 100%;
    margin-left: 200px;
    text-align: center;
    transition:ease 0.3s margin-left,ease 0.4s opacity,ease 0.1s width;
    opacity: 1;
}
.ab {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
}
</style>>