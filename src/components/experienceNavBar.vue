<template>
    <nav
        class="ExperiencePage__navBar greenBtn--active"
        :class="[navShow?'':'navBar--hide',{'greenBtn--active':expLightBoxRes}]"
    >
        <div class="IconPart" @click="back('landingPage',false)" v-if="windowwidth>1023">
            <img src="@/assets/img/logo/efirstlogo.svg" />
        </div>
        <div class="ExperiencePage__titleMobShow" @click="back('landingPage',true)">
            <iconRightArrow :color="'#ffffff'"></iconRightArrow>
            <div class="step1">
                <span class="icon__number">
                    {{target__step2}}
                </span>
            </div>
        </div>
        <span class="navBurger" @click="moveMenu">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </span>
        <ul class="navPart">
            <li @click="back('landingPage',false)" tag="li">首頁</li>
            <li @click="back('landingPage',false)">e-First介紹</li>
            <li @click="back('FAQ',false)" tag="li">常見問題</li>
            <li @click="back('classroom',false)" tag="li">理財訊息</li>
            <li @click="back('landingPage',false)" class="greenBtn">
                <span>
                    <img class="illusHead" src="@/assets/img/svg/illus/小粉獅太空人頭.png" />結束體驗
                </span>
                <img class="closeImg" src="@/assets/img/svg/experience/close.svg" />
            </li>
        </ul>
    </nav>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import iconRightArrow from "@/assets/img/svg/arrow/right-arrow.vue";
export default {
    components: {
        iconRightArrow
    },
    data() {
        return {
            lightBoxDisplay: false,
            navShow: true,
            target: "-----",
            target__step2: "------"
        };
    },
    props: {
        menuShow: {
            type: Boolean,
            default: false
        },
        windowwidth: {
            type: Number,
            default: window.innerWidth
        }
    },
    watch: {
        menuShow: function(newValue) {
            if (newValue == false) {
                this.navShow = true;
            }
        }
    },
    computed: {
        ...mapGetters(["expLightBoxRes"])
    },
    methods: {
        back: function(go, n) {
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
                    this.$router.push({
                        name: go
                    });
                    this.toggleExpLightBox(n);
                }
            });
        },
        moveMenu: function() {
            this.navShow = false;
            this.$emit("update:menuShow", true);
        },
        getTarget: function() {
            if (JSON.parse(sessionStorage.getItem("expDatas"))) {
                const target = JSON.parse(sessionStorage.getItem("expDatas"))
                    .target;
                switch (target) {
                    case 101:
                        this.target = "子女教育基金";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 102:
                        this.target = "購屋頭期款";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 103:
                        this.target = "旅遊基金";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 104:
                        this.target = "樂活退休規劃";
                        this.target__step2 =
                            "我該每個月投資多少錢，才能達到目標呢？";
                        break;
                    case 201:
                        this.target = "樂齡退休月月領";
                        this.target__step2 =
                            "我現在該準備多少錢投資，才能達到提領目標呢？";
                        break;
                    case 301:
                        this.target = "就是想存一筆錢";
                        this.target__step2 = "我的資產會增值多少呢？";
                        break;
                }
            }
        },
        ...mapActions(["toggleExpLightBox"])
    },
    mounted: function() {
        //綁定 DOM 之後
        document.documentElement.scrollTop = 0;
        this.getTarget();
    }
};
</script>
<style lang="scss" scoped>
.ExperiencePage__titleMobShow {
    width: calc(100% - 58px);
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.19px;
    color: #ffffff;
    margin-left: 15px;
    span:nth-child(3) {
        margin-right: 10px;
    }

}

.ExperiencePage__navBar {
    height: 60px;
    background-color: #31a043;
    display: flex;
    margin: 0px;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    border-radius: 5px;
    z-index: 20;
    transition: 0.5s ease height;
    .navBurger {
        display: block;
        width: 35px;
        height: 35px;
        background-color: #fff;
        margin-right: 8px;
        border-radius: 5px;
        cursor: pointer;
        .line {
            width: 20px;
            height: 3px;
            display: block;
            margin: 0 auto;
            background-color: #31a043;
            margin-top: 6px;
            border-radius: 40px;
        }
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
    .expLightBox--open {
        height: 88vh;
    }
}
.navBar--hide {
    opacity: 0;
    height: 10px;
    transition: 0.5s ease height;
}

@media screen and (min-width: 1024px) {
    .ExperiencePage__titleMobShow {
        display: none;
    }
    .ExperiencePage__navBar {
        margin: 12px 37px;
        background-color: #fff;
        width: calc(100% - 74px);
        padding: 0 28px 0 0px;
        border: 1px solid #dce6f0;
        position: fixed;
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
        .expLightBox {
            height: 0vh;
            top: 78px;
        }
        .expLightBox--open {
            height: 86vh;
            border-top: 1px solid #31a043;
        }
    }
    .greenBtn--active {
        padding: 0 0 0 20px;
        .navPart {
            height: 100%;
            .greenBtn {
                background-color: #31a043;
                .closeImg {
                    display: block;
                    width: 24px;
                    margin-left: 16px;
                }
            }
        }
    }
}
// @media screen and (min-width: 1440px) {
//     .navBar{
//         margin: 12px 80px;
//         width: calc(100% - 160px);
//     }
// }
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
    .ExperiencePage__navBar {
        .navPart {
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
    }
}
</style>