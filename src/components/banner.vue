<template>
    <div id="slider">
        
        <div class="dots">
            <span
                v-for="(itemDot,dotIndex) in items"
                :key="dotIndex"
                class="dot dot--active"
                :class="[itemDot.isAct?'dotAct':'']"
                @click="clickDot(dotIndex)"
                :style="{backgroundImage :'url('+ itemDot.headIcon +')' }"
            ></span>
        </div>
        <div v-if="isPar" class="particle particles-js" id="particles-js"></div>
        <ul class="container">
            <li
                v-for="(item,itemIndex) in items"
                :key="itemIndex"
                :class="'contain'+itemIndex"
                @click="selectBanner(itemIndex)"
            >
                <transition name="component-fade">
                    <div class="contain" v-if="item.isAct">
                        <div
                            class="contain__img img--normal"
                            :style="{backgroundImage :'url('+ item.img +')' }"
                        ></div>
                        <div
                            class="contain__img img--mobile"
                            :style="{backgroundImage :'url('+ item.imgM +')' }"
                        ></div>
                        <div class="c-body" :style="{backgroundImage :'url('+ item.imgP +')' }"></div>
                        <div class="c-body2" :style="{backgroundImage :'url('+ item.imgP +')' }"></div>
                        <div class="talkBox" :class="'talkBox'+itemIndex">
                            <img src="@/assets/img/svg/banner/d1-talk.svg" alt />
                            <div class="msg">
                                <p v-for="(row,rowIndex) in item.msgRow" :key="rowIndex">{{row.msg}}</p>
                            </div>
                        </div>
                        <div
                            class="efirstLogo"
                            :style="{backgroundImage :'url('+ item.efirstLogo +')' }"
                        >
                        </div>
                        <div class="rebalance">
                            <div class="title">
                                <div class="illusHead">
                                    <img src="@/assets/img/svg/banner/pokeball_PNG32.png" alt />
                                </div>
                                <h2 class="type">
                                    <textAnime
                                        :firstColor="'#c1cd00'"
                                        :text="item.englishTitle"
                                        :delay="4000"
                                    ></textAnime>
                                </h2>
                            </div>
                            <p class="rebalance--chs">
                                <textAnime
                                    :text="item.chineseTitle"
                                    :delay="item.englishTitle.length*200 +4000"
                                ></textAnime>
                            </p>
                            <button @click="openExpLightBox()">立即體驗</button>
                        </div>
                    </div>
                </transition>
            </li>
        </ul>
    </div>
</template>
<script>


import { mapActions, mapGetters } from "vuex"
import textAnime from "@/components/textAnime.vue"
export default {
    components: {
        textAnime
    },
    data() {
        return {
            items: [
                {
                    isAct: true, img: require('@/assets/img/svg/banner/Lightning-Over-Road-777x518.jpg'), imgM: require('@/assets/img/svg/banner/Lightning-Over-Road-777x518.jpg'),
                    imgP: require('@/assets/img/svg/banner/pokemon_PNG40.png'),
                    headIcon: require('@/assets/img/svg/banner/headIcon0.png'),
                    efirstLogo: require('@/assets/img/svg/banner/efirstLogo1.png'),
                    msgRow: [
                        { msg: '最近好想出去玩 ! ' },
                        { msg: '我想要累積一筆旅遊資金' },
                    ],
                    englishTitle: 'FREE',
                    chineseTitle: '免申購手續費',                },
                {
                    isAct: false, img: require('@/assets/img/svg/banner/IMG_5814_.jpg'), imgM: require('@/assets/img/svg/banner/IMG_5814_.jpg'),
                    imgP: require('@/assets/img/svg/banner/6503357_preview.png'),
                    headIcon: require('@/assets/img/svg/banner/headIcon1.png'),
                    efirstLogo: require('@/assets/img/svg/banner/efirstLogo2.png'),
                    msgRow: [
                        { msg: '好想有一個自己的空間 ! ' },
                        { msg: '準備存一筆購屋頭款' }
                    ],
                    englishTitle: 'INTELLIGENT',
                    chineseTitle: '智能資產配置',
                },
                {
                    isAct: false, img: require('@/assets/img/svg/banner/slider3.jpg'), imgM: require('@/assets/img/svg/banner/slider3M.jpg'),
                    imgP: require('@/assets/img/svg/banner/slider3-people.png'),
                    headIcon: require('@/assets/img/svg/banner/headIcon2.png'),
                    efirstLogo: require('@/assets/img/svg/banner/efirstLogo3.png'),
                    msgRow: [
                        { msg: '我們有寶寶了 ! ' },
                        { msg: '親愛的，我們會努力準備教育基金' },
                        // { msg: '我們會努力準備教育基金' }
                    ],
                    englishTitle: 'REBALANCE',
                    chineseTitle: '定期平衡您的投資目標',
                },
                {
                    isAct: false, img: require('@/assets/img/svg/banner/slider4.jpg'), imgM: require('@/assets/img/svg/banner/slider4M.jpg'),
                    imgP: require('@/assets/img/svg/banner/slider4-people.png'),
                    headIcon: require('@/assets/img/svg/banner/headIcon3.png'),
                    efirstLogo: require('@/assets/img/svg/banner/efirstLogo4.png'),
                    msgRow: [
                        { msg: '努力工作快20年 ! ' },
                        { msg: '我希望之後有個穩定安心退休生活' },
                        // { msg: '有個穩定安心退休生活' }
                    ],
                    englishTitle: 'SIMPLE',
                    chineseTitle: '簡單的投資流程',
                },
                {
                    isAct: false, img: require('@/assets/img/svg/banner/slider5.jpg'), imgM: require('@/assets/img/svg/banner/slider5M.jpg'),
                    imgP: require('@/assets/img/svg/banner/slider5-people.png'),
                    headIcon: require('@/assets/img/svg/banner/headIcon4.png'),
                    efirstLogo: require('@/assets/img/svg/banner/efirstLogo5.png'),
                    msgRow: [
                        { msg: '我們退休了 ! ' },
                        { msg: '正要開始享受之後生活' },
                        { msg: '想存一筆樂活基金' }
                    ],
                    englishTitle: 'TRUST',
                    chineseTitle: '您信賴的投資夥伴',
                },
            ],
            currentIndex: 1,
            speed: 0.5,
            isShowReb: false,
            rebalanceText: 'Rebalance',
            isPar: true,
            parColor: '#FFF',
            currentBanner: null,
            timer: 0,
        }
    },
    computed: {
        ...mapGetters([
            "expLightBoxRes"
        ])
    },
    props: {
        //偵測目前頁數
        currentPage: {
            type: Number,
            default: 0
        },
        //偵測瀏覽器
        agent: {
            type: String,
        }
    },
    watch: {
        currentPage: function(newValue) {
            if (newValue == 0) {
                this.isPar = true;
            }
            else {
                this.isPar = false;
                this.closePS();

            }
        },
        //偵測banner在第幾屏 並且輪播
        currentBanner: function(newValue) {
            let nextValue = newValue + 1;
            if (newValue == 4) {
                nextValue = 0;
            }
            if (this.timer !== 0) {
                window.clearTimeout(this.timer);
            }

            this.$nextTick(() => {
                this.timer = window.setTimeout(() => {
                    this.clickDot(nextValue)
                }, 8000);
            })

        },
        //偵測exp盒子是否打開
        expLightBoxRes: function(newValue) {
            if (newValue) {
                this.isPar = false;
                this.closePS();
            }
            else if (this.currentPage == 0) {
                this.isPar = true;
            }
        },
        // 偵測粒子特效
        isPar: function(newValue) {
            if (newValue == true) {
                this.$nextTick(() => {
                    this.runPar();
                })

            }
        }
    },
    methods: {
        // 點擊原點切換banner
        clickDot: function(i) {
            this.currentBanner = i;
            this.items.map((item, itemIndex) => {
                if (i == itemIndex) {
                    return item.isAct = true
                }
                else {
                    return item.isAct = false
                }

            })
            this.isShowReb = false;
            setTimeout(() => {
                this.isShowReb = true;
            }, 1500);
        },
        //打開exp盒子
        openExpLightBox() {
            this.toggleExpLightBox(true);
        },
        runPar: function() {
            // window.particlesJS("particles-js", { "particles": { "number": { "value": 70, "density": { "enable": true, "value_area": 962 } }, "color": { "value": "#ffffff" }, "shape": { "type": "edge", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 7 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 17.053621458328248, "size_min": 0.8120772123013452, "sync": true } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "top-left", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
        },
        closePS: function() {
            // if (window.pJSDom && window.pJSDom.length > 0) {
            //     if (this.agent !== 'ie') {
            //         window.pJSDom[0].pJS.fn.vendors.destroypJS();
            //     }
            //     window.pJSDom = []
            // }
        },
        selectBanner: function(i) {
            //電腦版 點擊banner 儲存相對於exp盒子的選項
            const width = document.body.clientWidth;
            if (width >= 1024) {
                sessionStorage.setItem('selectType', i);
            }
        },
        ...mapActions([
            "toggleExpLightBox"
        ]),
    },
    mounted() {
        this.runPar();
        this.currentBanner = 0;
    },
    destroyed() {
        window.clearTimeout(this.timer);
    }
}
</script>
<style lang="scss" scoped>
#slider {
    width: 100%;
    height: 100vh;
    background-color: #ccc;
    position: relative;
}
.dots {
    position: absolute;
    bottom:calc((100% - 460px) / 2);
    right: 0px;
    left: 0;
    margin: auto;
    z-index: 4;
    text-align: center;
    // display: none;
}
.dot {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.dot + .dot {
    margin-left: 16px;
}
.dotAct {
    border: 2px solid #c1ce02;
}
.dot + .dot {
    margin-top: 4px;
}
.container {
    list-style: none;
    height: 100%;
    position: relative;
    .contain0 {
        .contain__img {
            background-position: 55% center;
        }
    }
    .contain1 {
        .contain__img {
            background-position: 26% center;
        }
    }
    .contain2 {
        .contain__img {
            background-position: 30% center;
        }
    }
    .contain3 {
        .contain__img {
            background-position: 56% center;
        }
    }
    .contain__img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
}
.efirstLogo {
    display: none;
    pointer-events: none;
}
@media screen and (min-width: 768px) {
    .dots{
        display: block;
    }
    .container {
        .contain2 {
            .contain__img {
                background-position: 20% center;
            }
        }
        .contain4 {
            .contain__img {
                background-position: 50% bottom;
            }
        }
    }
}
.container li {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}
.container img {
    height: 1200px;
}

.contain {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .talkBox {
        pointer-events: none;
        position: absolute;
        width: 65%;
        max-width: 240px;
        max-height: 300px;
        z-index: 2;
        img {
            width: 100%;
            height: 100%;
        }
        .msg {
            font-size: 18px;
            line-height: 22px;
            position: absolute;
            color: #f1ff00;
            text-align: start;
            top: 20%;
            left: 0;
            right: 0;
            margin: auto;
            width: 64%;
            margin-top: 4%;
            p {
                text-align: start;
                line-height: normal;
                margin: 0;
            }
        }
    }
    .talkBox0 {
        top: 14%;
        left: 38%;
        width: 60%;
        transform: rotateY(180deg) scale(0);
        animation: talkAnimationFont 1s 1.5s ease-out forwards;
        .msg {
            width: 64%;
            transform: rotateY(180deg);
        }
    }
    .talkBox1 {
        top: 10%;
        left: 1%;
        transform: scale(0);
        animation: talkAnimationBack 1s 1.5s ease-out forwards;
        .msg {
            margin-top: 8%;
            p {
                display: inline;
            }
        }
    }
    .talkBox2 {
        top: 4%;
        left: 40%;
        transform: rotateY(180deg) scale(0);
        animation: talkAnimationFont 1s 1.5s ease-out forwards;
        .msg {
            line-height: 10px;
            transform: rotateY(180deg);
            p {
                display: block;
            }
        }
    }
    .talkBox3 {
        width: 63%;
        top: 11%;
        left: 0%;
        transform: scale(0);
        animation: talkAnimationBack 1s 1.5s ease-out forwards;
        .msg {
            margin-top: 7%;
            line-height: 10px;
        }
    }
    .talkBox4 {
        top: 8%;
        left: 34%;
        transform: rotateY(180deg) scale(0);
        animation: talkAnimationFont 1s 1.5s ease-out forwards;
        .msg {
            width: 77%;
            line-height: 10px;
            transform: rotateY(180deg);
        }
    }
    .rebalance {
        width: 100%;
        height: 220px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 26%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: #fff;
        z-index: 2;
        font-family: "GenSenMaruGothicTW-Heavy","PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
        .illusHead {
            width: 50px;
            height: 50px;
            margin-right: 8px;
            transform: scale(0) rotate(0deg);
            animation: roIllusHead 1s 3s forwards;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            pointer-events: none;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            height: 38px;
            font-size: 24px;
        }
        .rebalance--chs {
            width: 100%;
            font-size: 30px;
            font-weight: 600;
            margin: 0 0 20px 0;
        }
        button {
            width: 120px;
            height: 44px;
            background-color: #c1cd00;
            border: none;
            border-radius: 5px;
            color: #fff;
            font-family: "PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
            font-weight: 700;
        }
    }
}

@media screen and (min-width: 480px) {
    .contain {
        .talkBox0 {
            top: 20%;
            left: 40%;
        }
    }
}
@media screen and (min-width: 768px) {
    .contain {
        .talkBox {
            position: absolute;
            width: 60%;
            max-width: 280px;
            max-height: 300px;
            .msg {
                font-size: 20px;
                line-height: 20px;
                width: 80%;
                p {
                    text-align: start;
                    display: block;
                }
            }
        }
        .talkBox0 {
            top: 24%;
            left: 52%;
            .msg {
                margin-top: 10%;
                width: 80%;
                line-height: 32px;
            }
        }
        .talkBox1 {
            top: 10%;
            left: 4%;
            .msg {
                line-height: 32px;
                margin-top: 12%;
                margin-left: 15%;
            }
        }
        .talkBox2 {
            top: 10%;
            left: 60%;
            .msg {
                margin-top: 7%;
                margin-left: 23%;
                width: 60%;
                p {
                    text-align: center;
                }
            }
        }
        .talkBox3 {
            top: 14%;
            left: 18%;
            .msg {
                margin-top: 8%;
                margin-left: 16%;
            }
        }
        .talkBox4 {
            top: 10%;
            left: 65%;
            .msg {
                p {
                    text-align: center;
                }
                margin-top: 8%;
                margin-left: 12%;
            }
        }
        .rebalance {
            .illusHead {
                width: 67px;
                height: 70px;
            }
            .title {
                font-size: 42px;
            }
            .rebalance--chs {
                font-size: 50px;
            }
            button {
                width: 180px;
                height: 60px;
                font-size: 24px;
            }
        }
    }
}
@media screen and (min-height: 767px) {
    .contain {
        .talkBox0 {
            top: 18%;
        }
    }
    .contain {
        .talkBox4 {
            left: 60%;
        }
    }
}
@media screen and (min-width: 1024px) {
    .dots {
        bottom: 10%;
    }
    .efirstLogo {
        display: block;
        width: 48%;
        min-width: 600px;
        padding-bottom: 14%;
        position: absolute;
        z-index: 0;
        opacity: 0.9;
        background-size: 90%;
        background-repeat: no-repeat;
        background-position: center;
    }
    .contain {
        .talkBox {
            width: 60%;
            .msg {
                font-size: 20px;
                line-height: 18px;
            }
        }
        .talkBox0 {
            top: 16%;
            left: 60%;
            .msg {
                line-height: 32px;
            }
        }
        .talkBox1 {
            top: 16%;
            left: 6%;
            .msg {
                line-height: 32px;
            }
        }
        .talkBox2 {
            top: 10%;
            left: 44%;
        }
        .talkBox3 {
            top: 12%;
            left: 26%;
        }
        .talkBox4 {
            top: 15%;
            left: 72%;
        }
        .rebalance {
            width: 620px;
            height: 160px;
            font-weight: 900;
            -webkit-text-stroke: 1px rgba(0, 0, 0, .25);
            text-shadow: 1px 1px rgba(0, 0, 0, .25);
            .illusHead {
                width: 64px;
                height: 64px;
            }
            button {
                display: none;
            }
        }
    }
    .contain0 {
        .contain {
            .efirstLogo {
                top: 40%;
                left: 40%;
                transform: scale(1);
                animation: jumpFromRight 1.2s;
            }
            .rebalance {
                left: 30%;
                top: 54%;
                flex-wrap: nowrap;
                flex-direction: row;
                .title {
                    width: auto;
                    margin-bottom: 0;
                    font-size: 40px;
                    margin-right: 8px;
                }
                .rebalance--chs {
                    width: auto;
                    margin: 0;
                    font-size: 50px;
                }
            }
        }
    }
    .contain1 {
        .contain {
            .efirstLogo {
                top: 30%;
                left: 48%;
                animation: jumpFromRight 1.2s;
            }
            .rebalance {
                left: 48%;
                top: 60%;
                align-items: flex-start;
                .title {
                    width: auto;
                    margin-bottom: 20px;
                    font-size: 40px;
                }
                .rebalance--chs {
                    width: auto;
                    margin: 0;
                    font-size: 50px;
                }
            }
        }
    }
    .contain2 {
        .contain {
            .efirstLogo {
                top: 34%;
                left: 50%;
                animation: jumpFromRight 1.2s;
            }
            .rebalance {
                left: 50%;
                top: 65%;
                align-items: flex-start;
                .title {
                    width: auto;
                    margin-bottom: 20px;
                    font-size: 40px;
                }
                .rebalance--chs {
                    width: auto;
                    margin: 0;
                    font-size: 50px;
                }
            }
        }
    }
    .contain3 {
        .contain {
            .efirstLogo {
                top: 40%;
                left: 10%;
                animation: jumpFromRight 1.2s;
            }
            .rebalance {
                left: -20%;
                top: 55%;
                width: 800px;
                align-items: flex-start;
                flex-direction: row;
                align-items: center;
                .title {
                    height: 57px;
                    width: auto;
                    margin-bottom: 0px;
                    font-size: 40px;
                }
                .rebalance--chs {
                    width: auto;
                    margin: 0;
                    font-size: 50px;
                    margin-left: 8px;
                }
            }
        }
    }
    .contain4 {
        .contain {
            .efirstLogo {
                top: 12%;
                left: 20%;
                animation: jumpFromLeft 1.2s;
            }
            .rebalance {
                width: 800px;
                left: 0;
                right: 0;
                top: 36%;
                align-items: flex-start;
                flex-direction: row;
                .title {
                    height: 57px;
                    width: auto;
                    margin-bottom: 0px;
                    font-size: 40px;
                }
                .rebalance--chs {
                    width: auto;
                    margin: 0;
                    font-size: 50px;
                    margin-left: 8px;
                }
            }
        }
    }
}
@media screen and (min-width: 1280px) {
    .contain {
        .talkBox3 {
            left: 32%;
        }
    }
}
@media screen and (min-width: 1440px) {
    .contain {
        .talkBox1 {
            left: 12%;
        }
        .talkBox3 {
            top: 16%;
            left: 36%;
        }
        .talkBox4 {
            top: 32%;
            left: 70%;
        }
    }
    .contain4 {
        .contain {
            .efirstLogo {
                top: 6%;
                left: 26%;
                animation: jumpFromLeft 1.2s;
            }
            .rebalance {
                align-items: flex-start;
                .title {
                    width: auto;
                    margin-bottom: 20px;
                    font-size: 40px;
                }
                .rebalance--chs {
                    width: auto;
                    margin-left: 8px;
                    font-size: 50px;
                }
            }
        }
    }
}
// 文字彈跳特效

@keyframes jumpFromRight {
    from {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    to {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    }
    0% {
        margin-left: 100%;
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
    25% {
        transform: scaleX(1.2) scaleY(0.9) translateY(0px);
    }
    50% {
        transform: scaleX(1) scaleY(1.1) translateY(10px);
    }
    75% {
        transform: scaleX(1.2) scaleY(0.9) translateY(0px);
    }
    100% {
        margin-left: 0%;
        transform: scaleX(1) scaleY(1) translateY(0px);
    }
}
@keyframes jumpFromLeft {
    from {
        margin-left: -50%;
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    to {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        margin-left: 0%;
    }
    0% {
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
    25% {
        transform: scaleX(1.2) scaleY(0.9) translateY(0px);
    }
    50% {
        transform: scaleX(1) scaleY(1.1) translateY(10px);
    }
    75% {
        transform: scaleX(1.2) scaleY(0.9) translateY(0px);
    }
    100% {
        transform: scaleX(1) scaleY(1) translateY(0px);
    }
}
// e-first 大文字特效

//對話框特效
@keyframes talkAnimationFont {
    0% {
        transform: rotateY(180deg) rotateZ(0deg) scale(0);
    }
    20% {
        transform: rotateY(180deg) rotateZ(30deg);
    }
    40% {
        transform: rotateY(180deg) rotateZ(10deg);
    }
    60% {
        transform: rotateY(180deg) rotateZ(30deg);
    }
    80% {
        transform: rotateY(180deg) rotateZ(10deg);
    }
    100% {
        transform: rotateY(180deg) rotateZ(0deg) scale(1);
    }
}
@keyframes talkAnimationBack {
    0% {
        transform: rotateZ(0deg) scale(0);
    }
    20% {
        transform: rotateZ(-10deg);
    }
    40% {
        transform: rotateZ(10deg);
    }
    60% {
        transform: rotateZ(-10deg);
    }
    80% {
        transform: rotateZ(10deg);
    }
    100% {
        transform: rotateZ(0deg) scale(1);
    }
}
//對話框特效

.c-body {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: bodyAnimation 7s forwards;
    display: none;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 2;
}
.contain1 {
    .c-body {
        transform: scale(1) translateX(-20px);
        animation: bodyAnimation1 7s forwards;
    }
}
.contain2 {
    .c-body {
        transform: scale(1.2) translateX(40px);
        animation: bodyAnimation2 7s forwards;
    }
}
.contain3 {
    .c-body {
        animation: bodyAnimation3 7s forwards;
    }
}
.contain4 {
    .c-body {
        animation: bodyAnimation4 7s forwards;
    }
}
// .c-body2{
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     animation: bodyAnimation2 1.5s forwards;
//     display: none;
//     opacity: 0;
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
//     z-index: 2;
// }
// .contain4 {
//     .c-body {
//         background-position: 50% bottom;
//     }
// }
//旋轉獅子頭
@keyframes roIllusHead {
    0% {
        transform: scale(0) rotate(0deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
}
//旋轉獅子頭

//切換banner 淡入 淡出
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 1s ease;
}
.component-fade-enter,
.component-fade-leave-to {
    opacity: 0;
}


.img--normal {
    display: none;
}
@media screen and (min-width: 768px) {
    .contain0 {
        .container {
            img {
                min-width: 1920px;
            }
        }
    }
}

@media screen and (min-width: 1024px) {
    .img--mobile {
        display: none;
    }
    .img--normal {
        display: block;
    }
    .c-body {
        display: block;
    }
    .c-body2 {
        display: block;
    }
    .contain1 {
        .c-body,
        .c-body2 {
            background-position: 20% center;
        }
    }
    .contain2 {
        .c-body,
        .c-body2 {
            background-position: 20% center;
        }
    }
    .contain4 {
        .c-body,
        .c-body2 {
            background-position: 50% bottom;
        }
    }
}
// 文字特效CSS
.contain .isShowReb {
    transition: 1s;
    opacity: 1;
}
.contain .isHideReb {
    opacity: 0;
}
.particle {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

// 背景特效人物小位移
@keyframes bodyAnimation {
    0% {
        display: none;
        opacity: 0;
        transform: scale(1.2) translateX(40px);
    }
    40% {
        opacity: 1;
        transform: scale(1.2) translateX(40px);
    }
    100% {
        opacity: 1;
        transform: scale(1.2) translateX(0px);
    }
}
@keyframes bodyAnimation1 {
    0% {
        display: none;
        opacity: 0;
        transform: scale(1) translateX(0px);
    }
    40% {
        opacity: 1;
        transform: scale(1) translateX(0px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateX(-10px);
    }
}
@keyframes bodyAnimation2 {
    0% {
        display: none;
        opacity: 0;
        transform: scale(1.2) translateX(0px);
    }
    40% {
        opacity: 1;
        transform: scale(1.2) translateX(0px);
    }
    100% {
        opacity: 1;
        transform: scale(1.2) translateX(-20px);
    }
}
@keyframes bodyAnimation3 {
    0% {
        display: none;
        opacity: 0;
        transform: scale(1) translateX(0px);
    }
    40% {
        opacity: 1;
        transform: scale(1) translateX(0px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateX(-20px);
    }
}
@keyframes bodyAnimation4 {
    0% {
        display: none;
        opacity: 0;
        transform: scale(1) translateX(0px);
    }
    40% {
        opacity: 1;
        transform: scale(1) translateX(0px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateX(10px);
    }
}
// 背景特效

// 廣播


</style>