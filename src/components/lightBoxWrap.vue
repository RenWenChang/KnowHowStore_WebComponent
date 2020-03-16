<template>
    <div class="lightBoxWrap" v-if="isOpen">
        <div class="closeIcon" @click="closeTrump">
            <img src="@/assets/img/icon/close-green.svg" alt />
        </div>
        <div class="illusBox">
            <div class="illus">
                <slot name="img"></slot>
            </div>
        </div>
        <div class="contentBox">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: true
        };
    },
    props: {
        getOpen: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        getOpen(newValue) {
            if (newValue == true) {
                this.isOpen = true;
            }
        }
    },
    components: {},
    methods: {
        closeTrump: function() {
            this.isOpen = false;
        }
    },
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
.lightBoxWrap {
    width: 80vw;
    height: fit-content;
    min-height: 220px;
    max-height: 420px;
    max-width: 450px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    z-index: 11;
    padding: 30px 24px;
    border: 1px solid #cccccc;
    border-top: 4px solid #c1cd00;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .closeIcon {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
    }
}
.illusBox {
    width: 100%;
    background-color: #ccc;
    .illus {
        width: 150px;
        height: 150px;
        background-color: #c1cd00;
        margin: auto;
    }
}
.contentBox {
    width: 100%;
    padding: 0 18px;
    p {
        margin: 0;
    }
}
@media screen and (min-width: 768px) {
    .lightBoxWrap {
        max-height: 220px;
    }
    .illusBox {
        width: 150px;
        height: 150px;
        background-color: #ccc;
    }
    .contentBox {
        width: calc(100% - 150px);
        padding: 0 18px;
        p {
            margin: 0;
        }
    }
}
</style>
