<template>
    <div
        class="recursiveCell"
    >
        <div class="label" @click="selectThis($event,node)">{{node.layer}}</div>
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
$asideWidth: 100%;
$slidebar:20px;
$background-color:#24282C;
$elements-color:#DDD;

$asidecellHeight: 60px;
.label {
    width: $asideWidth;
    height: $asidecellHeight;
    line-height: $asidecellHeight;
    text-align: center;
    background-color: $background-color;
    color:$elements-color;
    overflow: hidden;
}
</style>