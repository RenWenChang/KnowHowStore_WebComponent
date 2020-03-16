<template>
    <div class="navBar" :class="[navShow?'':'navBar--hide',{'greenBtn--active':expLightBoxRes}]">
        <nav :ref="`menu`">
            <div class="IconPart" @click="toLandingPage">
                <img src="@/assets/img/logo/efirstlogo.svg" />
            </div>
            <div class="navBurgerGroup">
                <span
                    class="navBurger trumpIcon"
                    v-if="expLightBoxRes == false && noticeShow"
                    @click="openTrump()"
                >
                    <img src="@/assets/img/icon/trump.png" />
                </span>
                <span class="navBurger" @click="moveMenu">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </span>
                <span class="navBurger navBurger--close" @click="closeOnMob" v-if="expLightBoxRes">
                    <img src="@/assets/img/svg/experience/close.svg" />
                </span>
            </div>
            <ul class="navPart" :class="[expLightBoxRes?'navPart--active':'']">
                <router-link
                    :to="{path:`/dashboard/landingPage`}"
                    tag="li"
                    @click.native="toLandingPage"
                >
                    <!-- <span @click="toLandingPage">首頁</span> -->
                    首頁
                </router-link>
                <li @click="toLandingPage('toSecond')">e-First介紹</li>
                <router-link :to="{path:`/dashboard/FAQ`}" tag="li">常見問題</router-link>
                <!-- <li @click="toOtherPage()">
                    常見問題
                </li>-->
                <router-link :to="{path:`/dashboard/classroom`}" tag="li">理財訊息</router-link>
                <li class="greenBtn" @click="lightBoxToggle">
                    <span>
                        <img class="illusHead" src="@/assets/img/svg/illus/小粉獅太空人頭.png" /> 
                        <span v-if="!expLightBoxRes">立即體驗</span>
                        <span v-if="expLightBoxRes">結束體驗</span>
                    </span>
                    <img class="closeImg" src="@/assets/img/svg/experience/close.svg" />
                </li>
            </ul>
        </nav>
        <div
            :ref="`expLightBox`"
            class="expLightBox"
            :class="{'expLightBox--deskOpen':expLightBoxRes && OS === 'unCheck', // 桌機&平板,開啟問卷
                'expLightBox--mobOpenAndroid':expLightBoxRes && OS === 'android', // 安卓,開啟問卷
                'expLightBox--mobOpenIos':expLightBoxRes && OS === 'ios', // ios,開啟問卷
                'expLightBox--keyBoardOnPad':mobKeyBoard === 'pad--on', // 平板,開啟虛擬鍵盤
                'expLightBox--keyBoardOnAndroid': mobKeyBoard === 'android--on', // 安卓,開啟虛擬鍵盤
                'expLightBox--keyBoardOnIosFor2': mobKeyBoard === 'ios--on', // ios,開啟虛擬鍵盤
                'expLightBox--keyBoardOnIosFor3': mobKeyBoard === 'ios--on3' // ios,開啟虛擬鍵盤
                }"
        >
            <expStep1 :keyBoard.sync="mobKeyBoard" :OS.sync="OS"></expStep1>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import expStep1 from "@/views/landingPage/experienceStep1.vue";
export default {
    components: {
        expStep1
    },
    data() {
        return {
            lightBoxDisplay: false,
            navShow: true,
            noticeShow: true,
            OS: "unCheck",
            mobKeyBoard: "off",
            startY: null
        };
    },
    props: {
        menuShow: {
            type: Boolean,
            default: false
        },
        trumpBox: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        menuShow: function(newValue) {
            if (newValue == false) {
                this.navShow = true;
            }
        },
        $route(newValue) {
            if (newValue.name !== "landingPage") {
                this.noticeShow = false;
            } else {
                this.noticeShow = true;
            }
        }
    },
    computed: {
        ...mapGetters(["expLightBoxRes"])
    },
    methods: {
        closeOnMob() {
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
                        let backTop = document.querySelector("#back-to-top");
                        if (backTop) {
                            backTop.removeAttribute("style", `bottom`);
                        }
                    });
                }
            });
        },
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
        moveMenu: function() {
            this.navShow = false;
            this.$emit("update:menuShow", true);
        },
        openTrump: function() {
            this.$emit("update:trumpBox", true);
        },
        toLandingPage: function(i) {
            if (this.$route.name !== "landingPage") {
                this.$router.push({
                    path: `/dashboard/`
                });
                this.$nextTick(() => {
                    this.changeScreenAction(0);
                });
            }
            if (i == "toSecond") {
                if (this.expLightBoxRes) {
                    this.$msgBox.showMsgBox({
                        content: "您確認是否離開，您設定過的資訊即將被清除！",
                        isNormalBox: true,
                        isShowBtn2: true,
                        BtnText1: "取消",
                        BtnText2: "確認",
                        title: "親愛的投資人，您好：",
                        fn2: () => {
                            this.toggleExpLightBox(false);
                            setTimeout(() => {
                                this.$nextTick(() => {
                                    this.changeScreenAction(1);
                                });
                            }, 300);
                        }
                    });
                } else {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.changeScreenAction(1);
                        });
                    }, 300);
                }
            } else {
                this.$nextTick(() => {
                    this.changeScreenAction(0);
                });
            }
        },
        disabledTouch: function(e) {
            e.preventDefault();
        },
        ...mapActions(["toggleExpLightBox", "changeScreenAction"])
    },
    mounted: function() {
        const menu = this.$refs[`menu`];
        menu.addEventListener("touchmove", this.disabledTouch, {
            passive: false
        });
    },
    beforeDestroy: function() {
        const menu = this.$refs[`menu`];
        menu.removeEventListener("touchmove", this.disabledTouch, {
            passive: false
        });
    }
};
</script>
<style lang="scss" scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.IconPart {
    display: flex;
    align-items: center;
    height: 100%;
    img {
        margin-left: 12px;
        width: 240px;
        height: 60px;
        cursor: pointer;
    }
}

.navBar {
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    position: fixed;
    width: calc(100% - 20px);
    border-radius: 5px;
    z-index: 12;
    border-bottom: 1px solid #dce6f0;
    nav {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .navBurgerGroup {
        display: flex;
    }
    .navBurger {
        display: block;
        width: 35px;
        height: 35px;
        background-color: #c1cd00;
        margin-right: 8px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        .line {
            width: 20px;
            height: 3px;
            border-radius: 20px;
            display: block;
            margin: 0 auto;
            background-color: #fff;
            margin-top: 6px;
        }
        img {
            width: 20px;
            margin-top: 7.5px;
        }
    }
    .navBurger--close {
        background-color: #31a043;
    }
    .navPart {
        display: none;
    }
    .expLightBox {
        width: 100%;
        height: 0vh;
        overflow: hidden;
        position: absolute;
        top: 55px;
        left: 0;
        transition: 0.5s;
    }
    .expLightBox--deskOpen {
        height: calc(100vh - 80px);
    }
    .expLightBox--mobOpenAndroid {
        height: calc(100vh - 130px);
    }
    .expLightBox--mobOpenIos {
        height: calc(100vh - 190px);
    }
    .expLightBox--keyBoardOnPad {
        height: calc(100vh - 465px);
    }
    .expLightBox--keyBoardOnAndroid {
        height: calc(100vh - 130px);
    }
    .expLightBox--keyBoardOnIosFor2 {
        height: calc(100vh - 265px);
        // height: calc(100vh - 195px);
    }
    .expLightBox--keyBoardOnIosFor3 {
        // height: calc(100vh - 265px);
        height: calc(100vh - 190px);
    }
}
.navBar--hide {
    display: none;
}
.greenBtn {
    z-index: 1;
    .illusHead {
        display: none;
    }
}

@media screen and (min-width: 1024px) {
    .IconPart {
        img {
            margin-left: 12px;
            width: 340px;
            height: 100px;
            cursor: pointer;
        }
        .trumpIcon {
            display: none;
        }
    }
    .navBurgerGroup{
        display: none;
    }
}
@media screen and (min-width: 1024px) {
    .navBar {
        // margin: 12px 37px;
        max-width: 1750px;
        margin: 12px auto;
        right: 0;
        left: 0;
        width: calc(100% - 74px);
        padding: 0 28px 0 0px;
        box-sizing: border-box;
        height: 80px;
        .navBurger {
            display: none;
        }
        .navPart {
            display: flex;
            font-weight: 600;
            cursor: pointer;
            li {
                display: flex;
                align-items: center;
                padding: 10px 12px;
                margin: 0 8px;
                color: #808080;
                font-size: 16px;
            }
            .greenBtn {
                font-size: 18px;
                background-color: #c1cd00;
                border-radius: 5px;
                color: #fff;
                margin-right: 0;
                .closeImg {
                    display: none;
                }
                span {
                    display: flex;
                    align-items: center;
                }
                .illusHead {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    margin-right: 8px;
                }
            }
        }
        .navPart--active {
            .activeClass::after {
                bottom: 20px;
            }
        }
        .expLightBox {
            // height: 0vh;
            top: 80px;
        }
        .expLightBox--deskOpen {
            height: calc(100vh - 115px);
            border-top: 1px solid #31a043;
        }
    }
    .greenBtn--active {
        padding: 0 0 0 0px;
        .navPart {
            height: 100%;
            height: 80px;
            .greenBtn {
                background-color: #31a043;
                border-radius: 5px 5px 0 5px;
                .closeImg {
                    display: block;
                    width: 16px;
                    margin-left: 12px;
                }
            }
        }
    }
}
.activeClass {
    position: relative;
}
.activeClass::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #c1cd00;
}
@media screen and (min-width: 1440px) {
    .greenBtn {
        span {
            display: flex;
            align-items: center;
        }
        .illusHead {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }
    }
}
</style>