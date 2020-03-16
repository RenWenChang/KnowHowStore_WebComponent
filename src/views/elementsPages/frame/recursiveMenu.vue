<template>
    <div class="recursiveCell" >
        <div class="label">{{node.label}}-第{{node.layer}}層</div>
        <template v-for="(childNode,index) of node.nodes">
            <treeMenu :key="index" :node="childNode"></treeMenu>
        </template>
    </div>
</template>
<script>
export default {
    name: "TreeMenu",
    data() {
        return {};
    },
    components: {},
    props: {
        node: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    methods: {},
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
$asideWidth: 290px;
$asidecellHeight: 60px;
.recursiveCell {

}
.label {
    width: $asideWidth;
    height: $asidecellHeight;
    line-height: $asidecellHeight;
    text-align: center;
    background-color: chartreuse;
}

</style>