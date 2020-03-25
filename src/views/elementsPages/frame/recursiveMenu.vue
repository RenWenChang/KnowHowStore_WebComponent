<template>
    <div class="recursiveCell" :class="[open?'open_recursiveCell':'']">
        <div class="label" @click="selectThis($event,node)">
            <div :class="[node.children.length!==0?'imFolder':'imNotFolder',open?'label__icon':'']">
                <span unselectable="on">Y</span>
            </div>
            <span unselectable="on" class="label__text">{{node.name}}</span>
        </div>
        <div class="sub_forder">
            <template v-for="(childNode,index) of node.children">
                <treeMenu :key="index" :node="childNode"></treeMenu>
            </template>
        </div>
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
            const name = this.$route.name;
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
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
$asideWidth: 100%;
$slidebar: 20px;
$background-color: #24282c;
$elements-color: #ddd;
$transition-speed: 300ms;
$asidecellHeight: 60px;
.label {
    width: $asideWidth;
    height: $asidecellHeight;
    line-height: $asidecellHeight;
    text-align: left;
    background-color: $background-color;
    color: $elements-color;
    overflow: hidden;
    position: relative;
    span {
        -webkit-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        user-select: none;
    }
}
.sub_forder {
    width: 100%;
    min-height: 10px;
    .label {
        background-color: #1d1d1d;
    }
}
.label:hover {
    background-color: #000000;
    color: #ffffff;
    cursor: pointer;
}
.recursiveCell {
    -webkit-transition: all $transition-speed ease;
    -moz-transition: all $transition-speed ease;
    transition: all $transition-speed ease;
    max-height: $asidecellHeight;
    overflow: hidden;
}

.imFolder {
    -webkit-transition: all $transition-speed ease;
    -moz-transition: all $transition-speed ease;
    transition: all $transition-speed ease;
    position: absolute;
    top: 0;
    left: 15px;
    display: block;
    transform: rotate(-90deg);
}
.imNotFolder {
    display: none;
}

.open_recursiveCell {
    -webkit-transition: all $transition-speed ease;
    -moz-transition: all $transition-speed ease;
    transition: all $transition-speed ease;
    max-height: 300px;
}
.label__icon {
    -webkit-transition: all $transition-speed ease;
    -moz-transition: all $transition-speed ease;
    transition: all $transition-speed ease;
    transform: rotate(0deg);
}
.label__text{
    margin-left: 50px;
}
</style>