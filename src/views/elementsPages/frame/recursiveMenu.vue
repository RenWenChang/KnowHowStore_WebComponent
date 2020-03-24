<template>
    <div class="recursiveCell">
        <div class="label" @click="selectThis($event,node)">{{node.name}}</div>
        <template v-if="open">
            <template v-for="(childNode,index) of node.children">
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
                    name: ""
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
            const name =this.$route.name;
            const hasNode = node.children.length === 0 ? false : true;
            if (hasNode) {
                this.open = !this.open;
            } else {
                if (name !== node.name) {
                    this.$router.push({
                        name: node.name
                    });
                }
            }
        }
    },
    mounted: function() {
        
    }
};
</script>
<style lang="scss" scoped>
$asideWidth: 100%;
$slidebar: 20px;
$background-color: #24282c;
$elements-color: #ddd;

$asidecellHeight: 60px;
.label {
    width: $asideWidth;
    height: $asidecellHeight;
    line-height: $asidecellHeight;
    text-align: center;
    background-color: $background-color;
    color: $elements-color;
    overflow: hidden;
}
</style>