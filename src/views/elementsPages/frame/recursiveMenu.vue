<template>
    <div
        class="recursiveCell"
        :style="{
            'left':`${node.layer!==1?(290):0}px`,
            'top':`${node.layer!==1?(-60)*(index):0}px`,
            'position':`${node.layer===1?'relative':'absolute'}px`,
            }"
    >
        <div class="label" @click="selectThis($event,node)">{{node.label}}-第{{node.layer}}層</div>
        <template v-if="open">
            <template v-for="(childNode,index) of node.nodes">
                <treeMenu :key="index" :node="childNode"></treeMenu>
            </template>
        </template>
    </div>
</template>
<script>
export default {
    name: "TreeMenu",
    data() {
        return {
            open: false
        };
    },
    components: {},
    props: {
        node: {
            type: Object,
            default: () => {
                return {
                    layer: 1,
                    label: ""
                };
            }
        },
        index: {
            type: Number,
            default: 1
        }
    },
    methods: {
        selectThis: function(e, node) {
            this.open=!this.open;
        }
    },
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
$asideWidth: 290px;
$asidecellHeight: 60px;
.recursiveCell {
    position: relative;
    height: 60px;
}
.label {
    width: $asideWidth;
    height: $asidecellHeight;
    line-height: $asidecellHeight;
    text-align: center;
    background-color: chartreuse;
}
</style>