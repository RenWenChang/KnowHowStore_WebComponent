<template>
    <div id="dashboard" :class="{'dashboard--zindex':expLightBoxRes}">
        <!-- <lightBoxWrap></lightBoxWrap> -->
        <div v-show="!expLightBoxRes">
            <div class="notice" @click="openNotice" v-if="noticeShow == true">
                <div class="trumpIcon">
                    <img src="@/assets/img/icon/trump.png" />
                </div>
            </div>
            <div class="notice notice--active" v-if="noticeOpen">
                <img
                    class="closeIcon"
                    src="@/assets/img/icon/close-white.svg"
                    @click="noticeClose"
                    alt
                />
                <img class="trumpIcon" src="@/assets/img/icon/trump.png" />
                <ul
                    class="runLight"
                    :class="[isAnimate ?'runLightAinmate':'']"
                    :style="[{height:(trumpCount +1)*54 +'px'} ,{top:currentTrump * -54 +'px'}]"
                >
                    <li v-for="(trump,trumpIndex) in trumps" :key="trumpIndex">
                        <span>{{trump.NewsTitle}}</span>
                    </li>
                    <li v-if="trumps.length !==0">{{trumps[0].NewsTitle}}</li>
                </ul>
            </div>
        </div>
        <div class="mobileNoticeBoxWrap" v-if="trumpBox">
            <div class="mobileNoticeBox">
                <div class="closeIcon" @click="closeTrump">
                    <img src="@/assets/img/icon/close-green.svg" alt />
                </div>
                <ul>
                    <li v-for="(trump,trumpIndex) in trumps" :key="trumpIndex">{{trump.NewsTitle}}</li>
                </ul>
            </div>
        </div>

        <experienceNavBar
            v-if="isExperiencePage&&!photoShotting"
            :menuShow.sync="menuShow"
            @showMenu="showMenu"
            :windowwidth="windowwidth"
        ></experienceNavBar>
        <navBar
            v-if="!isExperiencePage"
            :menuShow.sync="menuShow"
            :trumpBox.sync="trumpBox"
            @showMenu="showMenu"
        ></navBar>
        <div
            v-if="!isExperiencePage&&!expLightBoxRes"
            id="present"
            class="present"
            :ref="'present'"
            :class="[menuShow?'presentHide':'']"
        >
            <img
                v-if="presentOpen == false"
                src="@/assets/img/logo/present.png"
                @click="openPresent"
            />
            <img v-if="presentOpen" src="@/assets/img/logo/presentOpen.png" @click="closePresent" />
            <a target="_blank" v-if="presentOpen" :href="presentHref"></a>
        </div>
        <div class="mask" :class="{'mask--show':expLightBoxRes && !menuShow}" :ref="`mask`"></div>
        <mobileMenu :menuShow.sync="menuShow"></mobileMenu>
        <div
            class="viewArea"
            :class="[menuShow?'viewArea--menuShow':'']"
            :menuShow.sync="menuShow"
            @click="menuClose"
        >
            <router-view :windowwidth="windowwidth" :isToSecond="isToSecond"></router-view>
        </div>
        <div class="touchMask" :class="[menuShow?'touchMask--menuShow':'']">
            <div class="maskBlock maskBlockTop"></div>
            <div class="maskBlock maskBlockBtn"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navBar from "@/components/navBar.vue";
import mobileMenu from "@/components/mobileMenu.vue";
import experienceNavBar from "@/components/experienceNavBar.vue";
// import lightBoxWrap from "@/components/lightBoxWrap.vue";

export default {
    components: {
        navBar,
        experienceNavBar,
        mobileMenu
        // lightBoxWrap
    },
    data() {
        return {
            menuShow: false,
            windowwidth: window.innerWidth,
            noticeOpen: false,
            trumps: [],
            trumpCount: 0,
            currentTrump: 0,
            isAnimate: true,
            trumpBox: false,
            presentOpen: false,
            presentTimer: 0,
            noticeShow: true,
            isToSecond: false,
            position: { x: 0, y: 0 },
            cx: '', cy: '', x: '', y: '', l: '', t: '', r: '', b: '', w: '', h: '',
            presentHref: '',
        };
    },
    watch: {
        $route(newValue) {
            if (
                newValue.name !== "landingPage" &&
                newValue.name !== "experience"
            ) {
                this.noticeShow = false;
            } else {
                this.noticeShow = true;
            }
            if (newValue.name === "landingPage") {
                let present = document.querySelector("#present");
                let footer = document.querySelector("#efirstFooter");
                if (present && footer) {
                    present.setAttribute("style", `bottom:16%`);
                }
            } else {
                let present = document.querySelector("#present");
                if (present) {
                    present.removeAttribute("style", `bottom`);
                }
            }
        },
        trumpBox(newValue) {
            if (newValue) {
                this.openNotice();
            }
        }
        // sysLoginRes: async function() {
        //     // 公告每一頁都會接收NEWS 如果不需要需要偵測route
        //     let firstSession = sessionStorage.getItem('isFirstTime');
        //     if (this.checkToken()) {
        //         // console.log('檢查成功');
        //         let getNEWs = await this.getNEWs({});
        //         this.trumps = getNEWs.Datas.NEWsList;
        //         this.trumpCount = this.trumps.length;
        //         if (!firstSession) {
        //             this.$nextTick(async () => {

        //                 sessionStorage.setItem('isFirstTime', true);
        //                 this.noticeOpen = true;
        //                 this.trumpBox = true;
        //             })
        //         }
        //     }
        //     else {
        //         // console.log('檢查失敗');
        //         this.checkToken();
        //     }

        // }
    },
    methods: {
        checkToken() {
            let token = sessionStorage.getItem("AuthToken");
            return token;
        },
        checkRun: async function() {
            let firstSession = sessionStorage.getItem("isFirstTime");
            if (this.checkToken()) {
                // console.log('檢查成功');
                this.isSetNews = true;
                let getNEWs = await this.getNEWs({});
                this.trumps = getNEWs.Datas.NEWsList;
                this.trumpCount = this.trumps.length;
                if (!firstSession) {
                    this.$nextTick(async () => {
                        // console.log('OP')
                        sessionStorage.setItem("isFirstTime", true);
                        this.noticeOpen = true;
                        this.trumpBox = true;
                    });
                }
            } else {
                // console.log('檢查失敗');
                setTimeout(() => {
                    this.checkRun();
                }, 200);
            }
        },
        toSecondScreen: function() {
            // alert('改變數值')
            this.isToSecond = true;
            this.$nextTick(() => {
                this.isToSecond = false;
            });
        },
        showMenu: function() { },
        menuClose: function() {
            this.menuShow = false;
        },
        windowwidth_init: function() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.windowwidth = window.innerWidth;
                });
            });
        },
        disabledTouch(e) {
            e.preventDefault();
        },
        openNotice: function() {
            this.noticeOpen = true;
            this.currentTrump = 0;
            this.timer = window.setInterval(() => {
                this.currentTrump++;
                this.isAnimate = true;
                if (this.currentTrump == this.trumpCount + 1) {
                    this.isAnimate = false;
                    this.currentTrump = 0;
                }
            }, 3000);
        },
        closeTrump: function() {
            this.trumpBox = false;
        },
        noticeClose: function() {
            this.noticeOpen = false;
            window.clearTimeout(this.timer);
        },
        openPresent: function() {
            this.presentOpen = true;
            this.presentTimer = window.setTimeout(() => {
                this.presentOpen = false;
            }, 5000);
        },
        closePresent: function() {
            window.clearTimeout(this.presentTimer);
            this.presentOpen = false;
        },
        getFooterTop_present() {
            let present = document.querySelector("#present");
            let footer = document.querySelector("#efirstFooter");
            if (present && footer) {
                let footer__top = footer.getBoundingClientRect().top;
                if (window.innerHeight > footer__top) {
                    present.setAttribute(
                        "style",
                        `bottom: ${window.innerHeight - footer__top + 90}px`
                    );
                }
            }
        },
        down(event) {
            let moveDiv = document.querySelector("#present");
            this.position.x = moveDiv.offsetLeft;
            this.position.y = moveDiv.offsetTop;
            let touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            //手指起始位子
            this.cx = touch.clientX;
            this.cy = touch.clientY;
        },
        move(event) {
            let moveDiv = document.querySelector("#present");
            let touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            event.preventDefault(); //阻止body滾動
            //手指位移
            this.curx = touch.clientX - this.cx;
            this.cury = touch.clientY - this.cy;
            //邊界停止
            if (this.curx > 0) {//向右
                this.curx = Math.abs(this.curx) > this.r ? this.r : this.curx;
            } else { //向左
                this.curx = Math.abs(this.curx) > this.l ? -this.l : this.curx;
            }
            if (this.cury > 0) {//向下
                this.cury = Math.abs(this.cury) > this.b ? this.b : this.cury
            } else { //向上
                this.cury = Math.abs(this.cury) > this.t ? -this.t : this.cury
            }

            moveDiv.style.transform = `translate(${this.curx}px,${this.cury}px)`;
        },
        end() {
            let moveDiv = document.querySelector("#present");
            //光标松开,记录盒子的位移。
            if (moveDiv.style.transform !== '') {
                let aa = parseInt(moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[0]); //去除X移動值小數 方便下次計算
                let bb = parseInt(moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[1]); //去除Y移動值小數 方便下次計算
                let ax = parseInt(this.position.x) + aa;  //計算DOM的X新位置
                let by = parseInt(this.position.y) + bb;  //計算DOM的Y新位置
                //增加吸邊功能
                ax = ax > this.w / 2 ? this.w - this.x : 0;

                moveDiv.style.left = ax + 'px';
                moveDiv.style.top = by + 'px';
                moveDiv.style.transform = '';
                //新的邊界判斷
                this.l = ax;
                this.t = by;
                this.r = this.w - this.l - this.x;
                this.b = this.h - this.t - this.y;
            }

        },
        setPresent() {
            let moveDiv = document.querySelector("#present");
            this.w = document.documentElement.clientWidth || document.body.clientWidth;
            this.h = document.documentElement.clientHeight || document.body.clientHeight;
            this.x = moveDiv.offsetWidth;
            this.y = moveDiv.offsetHeight;
            moveDiv.addEventListener('touchstart', this.down, { passive: false })
            moveDiv.addEventListener('touchmove', this.move, { passive: false })
            moveDiv.addEventListener('touchend', this.end, { passive: false })
            this.l = moveDiv.offsetLeft;
            this.t = moveDiv.offsetTop;
            this.r = this.w - this.l - this.x;
            this.b = this.h - this.t - this.y;

        },
        setUrl() {
            let envs = window.__env__;

            const urlName = `${process.env.VUE_APP_URL_NAME}`;

            const baseURL = envs[urlName].PROMOTION_URL_1;

            this.presentHref = baseURL;
        },
        ...mapActions(["getNEWs", "toggleExpLightBox"])
    },
    mounted: async function() {
        this.setUrl();
        this.setPresent()
        this.checkRun();
        this.openPresent();
        const present = this.$refs[`present`];
        const mask = this.$refs[`mask`];
        present.addEventListener("touchmove", this.disabledTouch, {
            passive: false
        });
        mask.addEventListener("touchmove", this.disabledTouch, {
            passive: false
        });
        window.addEventListener("resize", this.windowwidth_init);
        window.addEventListener("scroll", this.getFooterTop_present);
        this.$nextTick(() => {
            if (this.$router.history.current.name === "landingPage") {
                let present = document
                    .querySelector("#present")
                    .setAttribute("style", `bottom:16%`);
                if (present) {
                    present.setAttribute("style", `bottom:16%`);
                }
            }
        });

        if (this.isMobile()) {
            window.addEventListener("orientationchange", this.windowwidth_init);
        } else {
            window.addEventListener("resize", this.windowwidth_init);
        }
        if (this.$route.name === "experience") this.noticeShow = false;
    },
    destroyed() {
        window.removeEventListener("scroll", this.getFooterTop_present);
        if (this.isMobile()) {
            window.removeEventListener(
                "orientationchange",
                this.windowwidth_init
            );
        } else {
            window.removeEventListener("resize", this.windowwidth_init);
        }
        window.clearTimeout(this.presentTimer);
    },
    beforeDestroy() {
        const present = this.$refs[`present`];
        if (present) {
            const mask = this.$refs[`mask`];
            present.removeEventListener("touchmove", this.disabledTouch, {
                passive: false
            });
            mask.removeEventListener("touchmove", this.disabledTouch, {
                passive: false
            });
        }
    },
    beforeRouteUpdate(to, from, next) {
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
                    next();
                }
            });
        } else {
            next();
        }
    },
    computed: {
        ...mapGetters([
            "isExperiencePage",
            "photoShotting",
            "expLightBoxRes",
            "ispt",
            "sysLoginRes"
        ])
    }
};
</script>
<style lang="scss">
#dashboard {
    overflow: hidden;
    position: relative;
}
.notice {
    width: 95px;
    height: 54px;
    background-color: #c1cd00;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    margin-left: 37px;
    cursor: pointer;
    display: none;
    .trumpIcon {
        width: 24px;
        height: 24px;
        img {
            width: 100%;
        }
    }
}
.notice--active {
    margin-left: 0;
    width: 100%;
    font-size: 14px;
    color: #fff;
    padding: 0 20px;
    overflow: hidden;
    .closeIcon {
        width: 24px;
        height: 24px;
        margin-right: 80px;
        position: absolute;
        top: 0;
        right: 80px;
        bottom: 0;
        margin: auto;
        z-index: 2;
    }
    .trumpIcon {
        width: 24px;
        height: 24px;
        margin-right: 80px;
        position: absolute;
        top: 0;
        left: 74px;
        bottom: 0;
        margin: auto;
    }
    .runLight {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        height: 100%;
        position: absolute;
        top: 0;
        left: 120px;
        z-index: 1;
        // transition: 2s;
        li {
            width: 100%;
            height: 54px;
            display: flex;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
        }
    }
    .runLightAinmate {
        transition: 2s;
    }
}
.mobileNoticeBoxWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 60;
}
.mobileNoticeBox {
    width: 80vw;
    height: fit-content;
    min-height: 220px;
    max-height: 420px;
    max-width: 450px;
    position: absolute;
    top: calc(50% - 40px);
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
    transform: translateY(-50%);
    z-index: 11;
    padding: 30px 24px;
    border: 1px solid #cccccc;
    border-top: 4px solid #c1cd00;
    .closeIcon {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
    }
    ul {
        margin-top: 20px;
        li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
    }
}
@media screen and (min-width: 768px) {
    .mobileNoticeBox {
        max-height: 220px;
    }
}
@media screen and (min-width: 1024px) {
    .mobileNoticeBoxWrap {
        display: none;
    }
    .mobileNoticeBox {
        display: none;
    }
    .notice {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.dashboard--zindex {
    position: relative;
    z-index: 11;
}
.viewArea {
    transition: 0.5s;
}
.touchMask {
    .maskBlock {
        height: 0;
    }
}
.present {
    width: 60px;
    position: fixed;
    z-index: 11;
    right: 10px;
    bottom: 16%;
    cursor: pointer;
    img {
        width: 100%;
    }
    a{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.presentHide {
    display: none;
}
@media screen and (min-width: 1024px) {
    .present {
        // bottom: calc((100% - 500px) / 2);
        width: 70px;
    }
}
.touchMask--menuShow {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    .maskBlock {
        display: block;
        width: 100%;
        height: calc(2vh + 20px);
        position: absolute;
        left: 0;
        background-color: #c1cd00;
        transition: 0.5s;
    }
    .maskBlockTop {
        top: 0;
    }
    .maskBlockBtn {
        bottom: 0;
    }
}
.viewArea--menuShow {
    transform-origin: 0 0%;
    transform: scale(0.9) translateX(-84%) translateY(0%);
}
.mask {
    display: none;
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 5;
}
.mask--show {
    display: block;
}
</style>
