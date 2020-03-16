<template>
    <div id="mobileMenu" @click="$emit('update:menuShow', false)">
        <div class="mobileMenu" :style="{right :rowRight +'%' }">
            <ul class="menuRows">
                <span class="closeArrow">
                    <img src="@/assets/img/svg/menu/arrow-left.svg" />
                </span>
                <li class="row" :ref="`menuRow`" @click="moveArrow(0)">
                    <div class="titleBox">
                        <div class="rowPic">
                            <img src="@/assets/img/svg/menu/首頁.svg" alt />
                        </div>首頁
                        <div class="swipeItem" :style="{top :rowTop +'px' }"></div>
                    </div>
                </li>
                <li class="row" @click="moveArrow(1)">
                    <div class="titleBox">
                        <div class="rowPic">
                            <img src="@/assets/img/svg/menu/常見問題.svg" alt />
                        </div>常見問題
                    </div>
                </li>
                <li class="row" @click="moveArrow(2)">
                    <div class="titleBox">
                        <div class="rowPic">
                            <img src="@/assets/img/svg/menu/理財訊息.svg" alt />
                        </div>理財訊息
                    </div>
                </li>
                <li class="row" @click="lightBoxToggle">
                    <div class="titleBox">
                        <div class="rowPic">
                            <img src="@/assets/img/svg/menu/登出.svg" alt />
                        </div>立即體驗
                    </div>
                </li>
                <!-- <li class="row">
                    <div class="titleBox">
                        <div class="rowPic">
                            <img src="@/assets/img/svg/menu/登出.svg" alt />
                        </div>登入
                    </div>
                </li>
                <li class="row">
                    <div class="titleBox">
                        <div class="rowPic">
                            <img src="@/assets/img/svg/menu/我要開戶.svg" alt />
                        </div>我要開戶
                    </div>
                    <div class="hiddenBox">123</div>
                </li>-->
            </ul>
            <div class="hiIllus">
                <img src="@/assets/img/svg/menu/小粉絲.svg" alt />
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    components: {},
    props: {
        menuShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            rowRight: -100,
            rowTop: 0,
            whichUserAgent: "",
            ieVarison: ""
        };
    },
    computed: {
        ...mapGetters(["expLightBoxRes"])
    },
    watch: {
        menuShow: function(newValue) {
            if (newValue) {
                this.rowRight = 0;

                if (this.whichUserAgent === "Firefox")
                    window.addEventListener(
                        "DOMMouseScroll",
                        this.disabledTouchWheel,
                        false
                    );
                else
                    window.addEventListener(
                        "mousewheel",
                        this.disabledTouchWheel,
                        { passive: false }
                    );
                window.addEventListener("touchmove", this.onTouchMove, {
                    passive: false
                });
                document.body.style.overflow = "hidden";
            } else {
                this.rowRight = -300;
                window.removeEventListener(
                    "DOMMouseScroll",
                    this.disabledTouchWheel,
                    false
                );
                window.removeEventListener(
                    "mousewheel",
                    this.disabledTouchWheel,
                    false
                );
                window.removeEventListener("touchmove", this.onTouchMove, {
                    passive: false
                });
                document.body.style.overflow = "inherit";
            }
        }
    },
    methods: {
        lightBoxToggle() {
            if (this.expLightBoxRes === true) {
                this.$msgBox.showMsgBox({
                    content: "您確認是否離開，您設定過的資訊即將被清除！",
                    isNormalBox: true,
                    isShowBtn2: true,
                    BtnText1: "取消",
                    BtnText2: "確認",
                    title: "親愛的投資人，您好：",
                    fn2: () => {
                        this.toggleExpLightBox(false);
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                        this.$nextTick(() => {
                            let backTop = document.querySelector(
                                "#back-to-top"
                            );
                            if (backTop) {
                                backTop.removeAttribute("style", `bottom`);
                            }
                        });
                    }
                });
            } else {
                this.toggleExpLightBox(true);
            }
        },
        onTouchMove(e) {
            e.preventDefault();
        },
        moveArrow: function(i) {
            const name = this.$route.name;
            let rowHeight = this.$refs["menuRow"].clientHeight;
            this.rowTop = i * rowHeight + 20 * i;
            if (name === "experience") {
                const globalVue = new Vue({});
                globalVue.$msgBox.showMsgBox({
                    content: "您確認是否離開，您設定過的資訊即將被清除！",
                    BtnText1: "取消",
                    BtnText2: "確認",
                    isShowBtn2: true,
                    isNormalBox: true,
                    title: "親愛的投資人，您好：",
                    fn1: () => {
                        this.$msgBox.closeBox;
                    },
                    fn2: () => {
                        switch (i) {
                            case 0:
                                if (name !== "landingPage") {
                                    this.$router.push({
                                        path: "/dashboard/landingPage"
                                    });
                                }
                                setTimeout(() => {
                                    this.$nextTick(() => {
                                        this.changeScreenAction(0);
                                    });
                                }, 300);
                                break;
                            case 1:
                                if (name !== "FAQ") {
                                    this.$router.push({
                                        path: "/dashboard/FAQ"
                                    });
                                }
                                break;
                            case 2:
                                if (name !== "classroom") {
                                    setTimeout(() => {
                                        this.$router.push({
                                            path: "/dashboard/classroom"
                                        });
                                    }, 100);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                });
            } else {
                switch (i) {
                    case 0:
                        if (name !== "landingPage") {
                            this.$router.push({
                                path: "/dashboard/landingPage"
                            });
                        }
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.changeScreenAction(0);
                            });
                        }, 300);
                        break;
                    case 1:
                        if (name !== "FAQ") {
                            this.$router.push({ path: "/dashboard/FAQ" });
                        }
                        break;
                    case 2:
                        if (name !== "classroom") {
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/dashboard/classroom"
                                });
                            }, 100);
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        disabledTouchWheel: function(e) {
            e.preventDefault();
        },
        checkUserAgent() {
            const userAgent = navigator.userAgent; //取得瀏覽器的userAgent字符串
            const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera瀏覽器
            const isIE =
                userAgent.indexOf("compatible") > -1 &&
                userAgent.indexOf("MSIE") > -1 &&
                !isOpera; //判断是否IE瀏覽器
            // const isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge瀏覽器
            const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge瀏覽器
            const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox瀏覽器
            const isSafari =
                userAgent.indexOf("Safari") > -1 &&
                userAgent.indexOf("Chrome") == -1; //判断是否Safari瀏覽器
            const isChrome =
                userAgent.indexOf("Chrome") > -1 &&
                userAgent.indexOf("Safari") > -1 &&
                !isEdge; //判断Chrome瀏覽器
            const isNetscape = userAgent.indexOf("Netscape") > -1;

            if (isIE) this.whichUserAgent = "ie";
            else if (isFF) this.whichUserAgent = "Firefox";
            else if (isChrome) this.whichUserAgent = "Chrome";
            else if (isOpera) this.whichUserAgent = "Opera";
            else if (isSafari) this.whichUserAgent = "Safari";
            else if (isNetscape) this.whichUserAgent = "Netscape";

            // ----------------------------------判斷IE版本----------------------------------------
            this.ieVarison = "0";
            if (isIE) {
                const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                const fIEVersion = parseFloat(RegExp["$1"]);
                if (userAgent.indexOf("MSIE 6.0") != -1) {
                    return "IE6";
                } else if (fIEVersion == 7) {
                    this.ieVarison = "IE7";
                } else if (fIEVersion == 8) {
                    this.ieVarison = "IE8";
                } else if (fIEVersion == 9) {
                    this.ieVarison = "IE9";
                } else if (fIEVersion == 10) {
                    this.ieVarison = "IE10";
                } else if (
                    userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)
                ) {
                    this.ieVarison = "IE11";
                } else {
                    this.ieVarison = "0";
                } //IE版本过低
            }
        },
        ...mapActions(["toggleExpLightBox", "changeScreenAction"]),
        ...mapMutations(["setCurrentPage"])
    },
    mounted: function() {
        this.checkUserAgent();
        //綁定 DOM 之後
    }
};
</script>
<style lang="scss">
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.mobileMenu {
    width: 84vw;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 3;
    background-color: #c1cd00;
    transition: 0.5s;
}
.menuRows {
    position: absolute;
    top: 2.8vh;
    left: 0;
    right: 0;
    padding-bottom: 5%;
    color: #fff;
    width: 100%;
    padding: 20px 0;
    .closeArrow {
        position: absolute;
        top: 16px;
        right: 10px;
        z-index: 2;
        img {
            width: 24px;
            height: 24px;
        }
    }
    .row {
        width: 100%;
        height: 46px;
        margin-left: 16px;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        .titleBox {
            display: flex;
            align-items: center;
            height: 54px;
        }
        .hiddenBox {
            width: 100%;
        }
        .rowPic {
            display: inline-block;
            margin-right: 20px;
            width: 22px;
            height: 22px;
            img {
                width: 100%;
            }
        }
    }
    .row--active {
        height: auto;
    }
    .btnType {
        width: 80%;
        padding: 25px 30px;
        background-color: rgba(0, 87, 61, 0.05);
        border-radius: 25.5px;
        text-align: center;
        margin-left: 50%;
        transform: translateX(-50%);
    }
}
.swipeItem {
    width: 24px;
    // background-color: #00F;
    height: 100%;
    position: absolute;
    left: -18px;
    transition: 0.5s;
    img {
        height: 100%;
    }
}
.shareIcons {
    position: absolute;
    bottom: 5%;
    width: 100%;
}
.hiIllus {
    position: absolute;
    bottom: 5%;
    right: 0;
    width: 100px;
    img {
        width: 100%;
    }
}
</style>