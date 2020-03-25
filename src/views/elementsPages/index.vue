<template>
    <div id="wrap">
        <FrameSideBar class="sideBar" :class="[sideMenuOpen?'':'sideBar_closed']"></FrameSideBar>
        <section class="contents" :class="[sideMenuOpen?'':'contents_closed']">
            <FrameNavBar></FrameNavBar>
            <Main></Main>
        </section>
    </div>
</template>
<script>
import FrameNavBar from "@/views/elementsPages/frame/FrameNavBar.vue";
import FrameSideBar from "@/views/elementsPages/frame/FrameSideBar.vue";
import Main from "@/views/elementsPages/frame/main.vue";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            windowwidth: window.innerWidth
        };
    },
    components: {
        FrameNavBar,
        FrameSideBar,
        Main
    },
    methods: {
        windowwidth_init: function() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.windowwidth = window.innerWidth;
                });
            });
        },
        isMobile: function() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },
        eventHandleByDevice(add, method) {
            const vm = this;
            let eventType = function() {
                return vm.isMobile() ? "orientationchange" : "resize";
            };
            let listenerType = function() {
                return add
                    ? window.addEventListener
                    : window.removeEventListener;
            };
            listenerType()(eventType(), method);
        }
    },
    mounted: function() {
        this.eventHandleByDevice(true, this.windowwidth_init);
    },
    destroyed() {
        this.eventHandleByDevice(false, this.windowwidth_init);
    },
    computed: {
        ...mapGetters(["sideMenuOpen"])
    }
};
</script>
<style lang="scss" scoped>
$asideWidth: 290px;
$contentWidth-mobile: calc(100%);
$contentWidth-pad: calc(100%);
$contentWidth: calc(100% - 290px);
$aslidebar: 15px;
$background-color-aside: #24282c;
$transition-speed: 300ms;

#wrap {
    width: 100%;
    height: 100vh;
    display: flex;
}
.sideBar {
    width: $asideWidth;
    height: 100%;
    background-color: $background-color-aside;
    color: rgb(0, 0, 0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all $transition-speed ease-in-out;
    -webkit-transition: $transition-speed;
    transition: $transition-speed;
    position: relative;
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 0;
    border-radius: 0;
}

.sideBar_closed {
    width: 0;
    border-radius:100% 0 0 100% ;
}
.contents {
    -webkit-transition: all $transition-speed ease-in-out;
    -webkit-transition: $transition-speed;
    transition: $transition-speed;
    width: $contentWidth-mobile;
    height: 100%;
    background-color: #ffffff;
    color: #ccc;
}
@media screen and (min-width: 768px) {
    .contents {
        width: $contentWidth-pad;
    }
}
@media screen and (min-width: 1024px) {
    .contents {
        width: $contentWidth;
    }
    .sideBar {
        position: relative;
    }
    .sideBar_closed {
        width: 0;
        border-radius: 0;
    }
}
.contents_closed {
    width: 100%;
}
</style>