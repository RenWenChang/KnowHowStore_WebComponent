<template>
    <div
        id="back-to-top"
        class="noshow"
        @click="backTop"
        :class="{'show':btnFlag && !expLightBoxRes}"
    >
        <img class="toparrow" src="@/assets/img/svg/arrow/backtop.svg" />
        <div class="getTop">TOP</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            btnFlag: false
        };
    },
    components: {},
    computed: {
        ...mapGetters(["expLightBoxRes"])
    },
    methods: {
        backTop: function() {
            const vm = this;
            let backTop = document.querySelector("#back-to-top");
            let doCal = document.querySelector(".doCal__mobile");
            let present = document.querySelector("#present");
            if (backTop) {
                backTop.removeAttribute("style", `bottom`);
            }
            if (doCal) {
                doCal.removeAttribute("style", `bottom`);
            }
            if (present) {
                present.removeAttribute("style", `bottom`);
            }

            let timer = setInterval(() => {
                let ispeed = Math.floor(-vm.scrollTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop =
                    vm.scrollTop + ispeed;
                this.getFooterTop_backToTop();
                this.getFooterTop_doCal();
                this.getFooterTop_present();
                if (vm.scrollTop === 0) {
                    clearInterval(timer);
                }
            }, 16);
        },
        scrollToTop: function() {
            this.getFooterTop_backToTop();
            this.getFooterTop_doCal();
            this.getFooterTop_present();
            const vm = this;
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            vm.scrollTop = scrollTop;
            if (vm.scrollTop > 200) {
                vm.btnFlag = true;
            } else {
                vm.btnFlag = false;
            }
        },
        getFooterTop_backToTop() {
            let backTop = document.querySelector("#back-to-top");
            let footer = document.querySelector("#efirstFooter");
            if (backTop && footer) {
                let footer__top = footer.getBoundingClientRect().top;
                if (window.innerHeight > footer__top) {
                    backTop.setAttribute(
                        "style",
                        `bottom:${window.innerHeight - footer__top + 20}px`
                    );
                }
            }
        },
        getFooterTop_doCal() {
            let doCal = document.querySelector(".doCal__mobile");
            let footer = document.querySelector("#efirstFooter");
            if (doCal && footer) {
                let footer__top = footer.getBoundingClientRect().top;
                if (window.innerHeight > footer__top) {
                    doCal.setAttribute(
                        "style",
                        `bottom:${window.innerHeight - footer__top + 70}px`
                    );
                }
            }
        },
        getFooterTop_present() {
            let present = document.querySelector("#present");
            let footer = document.querySelector("#efirstFooter");
            if (present && footer) {
                let footer__top = footer.getBoundingClientRect().top;
                if (window.innerHeight > footer__top) {
                    present.setAttribute(
                        "style",
                        `bottom: ${ window.innerHeight - footer__top + 90}px`
                    );
                }
            }
        },
        removeStatusOfFixButton: function() {
            let backTop = document.querySelector("#back-to-top");
            let doCal = document.querySelector(".doCal__mobile");
            let present = document.querySelector("#present");
            if (backTop) {
                backTop.removeAttribute("style", `bottom`);
            }
            if (doCal) {
                doCal.removeAttribute("style", `bottom`);
            }
            if (present) {
                present.removeAttribute("style", `bottom`);
            }
        }
    },
    watch: {
        $route() {
            this.removeStatusOfFixButton();
        }
    },
    mounted() {
        window.addEventListener("scroll", this.scrollToTop);
    },
    destroyed() {
        window.removeEventListener("scroll", this.scrollToTop);
    }
};
</script>
<style lang="scss" scoped>
#back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 44px;
    background-color: #c1cd00;
    border-radius: 6px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    z-index: 11;
    transition: 0.3s ease opacity;
}
.noshow {
    overflow: hidden;
    height: 0px;
    opacity: 0;
}
.show {
    opacity: 0.5;
    height: 44px;
}
.getTop {
    position: absolute;
    bottom: 5px;
    left: 0px;
    width: 100%;
    height: 12px;
    line-height: 12px;
}
.toparrow {
    position: absolute;
    width: 100%;
    left: 0;
    top: -5px;
}
</style>
