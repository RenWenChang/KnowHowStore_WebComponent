<template>
    <div id="secondSection">
        <div v-if="isPar" class="particle particles-js" id="particles-js"></div>
        <div class="wrap">
            <div class="introducePart">
                <div class="introduceMes">
                    <h2>第一銀行攜手晨星投研團隊</h2>
                    <h1>e-First能做什麼?</h1>
                    <p>可協助投資人在不同的人生財務階段，模擬包羅萬象的儲蓄與投資策略，能夠充分理解投資風險與達到財務目標的可能機率，並可以根據客戶的需求提供客製化服務</p>
                </div>
                <div
                    class="fanLionPic"
                    :class="[isAnimate?'fanLionPic--action':'']"
                    @click="waveActive"
                >
                    <img src="@/assets/img/svg/secondScreen/d2-illus-BG.svg" />
                    <div class="wave">
                        <img src="@/assets/img/svg/secondScreen/d2-illus-line.svg" />
                        <div class="lineBox">
                            <span class="hideBlock"></span>
                            <span
                                v-for="(line,index) in waveLine"
                                :key="index"
                                :style="{ height:line.isActive?`${line.height}%`: '0%'}"
                            ></span>
                        </div>
                    </div>
                    <div class="pig">
                        <img src="@/assets/img/svg/secondScreen/d2-illus-pig.svg" />
                    </div>
                    <div class="illus">
                        <img src="@/assets/img/svg/illus/小粉獅太空人.png" />
                    </div>
                    <div class="board">
                        <img src="@/assets/img/svg/secondScreen/d2-illus-chat.svg" />
                    </div>
                    <div class="coinBox">
                        <img
                            class="coin"
                            src="@/assets/img/svg/secondScreen/d2-illus-copper.svg"
                            alt
                        />
                    </div>
                    <div class="hideArea"></div>
                </div>
            </div>

            <ul class="featureIntro">
                <li>
                    <div class="pic">
                        <img src="@/assets/img/svg/secondScreen/d2-icon1.svg" />
                    </div>
                    <h3>量身打造</h3>
                    <p>人生階段不同需求</p>
                </li>
                <li>
                    <div class="pic">
                        <img src="@/assets/img/svg/secondScreen/d2-icon2.svg" />
                    </div>
                    <h3>全年無休</h3>
                    <p>即時解析市場</p>
                </li>
                <li>
                    <div class="pic">
                        <img src="@/assets/img/svg/secondScreen/d2-icon3.svg" />
                    </div>
                    <h3>簡單投資</h3>
                    <p>讓您更輕鬆</p>
                </li>
                <li>
                    <div class="pic">
                        <img src="@/assets/img/svg/secondScreen/d2-icon4.svg" />
                    </div>
                    <h3>自動調整</h3>
                    <p>更契合理財目標</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: 'secondSection',
    components: {
    },
    data: () => ({
        ani: '',
        isPar: false,
        parColor: '#d7d7d9',
        isAnimate: false,
        waveLine: [{ height: 10, isActive: false }, { height: 20, isActive: false }, { height: 30, isActive: false }, { height: 40, isActive: false }, { height: 50, isActive: false }, { height: 60, isActive: false }, { height: 70, isActive: false }, { height: 80, isActive: false }, { height: 90, isActive: false }, { height: 80, isActive: false }, { height: 70, isActive: false }, { height: 60, isActive: false }, { height: 50, isActive: false }, { height: 40, isActive: false }],


    }),
    props: {
        currentPage: {
            type: Number,
            default: 0
        },
        agent: {
            type: String,
        }
    },
    computed: {
        ...mapGetters([
            "expLightBoxRes"
        ])
    },
    watch: {
        // currentPage: function(newValue) {

        //     if (newValue == 1) {
        //         this.isAnimate = true;
        //         this.isPar = true;
        //         setTimeout(() => {
        //             this.waveActive();
        //         }, 2000);

        //     }
        //     else {
        //         this.isPar = false;
        //         this.closePS();
        //         this.isAnimate = false;
        //         this.waveLine.forEach((item) => {
        //             item.isActive = false;
        //         })
        //     }
        // },
        expLightBoxRes: function(newValue) {
            if (newValue) {
                this.isPar = false;
                this.closePS();
            }
            else if (this.currentPage == 1) {
                this.isPar = true;
            }
        },
        isPar: function(newValue) {
            if (newValue == true) {
                this.$nextTick(() => {
                    this.runPar();
                })

            }
        }
    },
    methods: {
        waveActive: function() {
            let i = 0;
            this.ani = window.setInterval(() => {
                if (this.isAnimate == false) {
                    window.clearInterval(this.ani);
                    setTimeout(() => {
                        this.waveLine.forEach((item) => {
                            item.isActive = false;
                        })
                    }, 200);

                }
                if (i >= 14) {
                    window.clearInterval(this.ani);
                    return
                }
                this.waveLine[i].isActive = true;
                i++
            }, 200);
        },
        runPar: function() {
            // window.particlesJS("particles-js", { "particles": { "number": { "value": 70, "density": { "enable": true, "value_area": 962 } }, "color": { "value": "#CCC" }, "shape": { "type": "edge", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 7 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 17.053621458328248, "size_min": 0.8120772123013452, "sync": true } }, "line_linked": { "enable": true, "distance": 150, "color": "#CCC", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "top-left", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
        },
        closePS: function() {
            // if (window.pJSDom && window.pJSDom.length > 0) {
            //     if (this.agent !== 'ie') {
            //         window.pJSDom[0].pJS.fn.vendors.destroypJS();
            //     }
            //     window.pJSDom = []
            // }
        },

    },
    mounted() {
        this.isAnimate = true;
        // this.isPar = true;
        setTimeout(() => {
            this.waveActive();
        }, 2000);
    }
}
</script>
<style lang="scss" scoped src="@/scss/landingWrap.scss">
</style>
<style lang="scss" scoped>
#secondSection {
    height: 100%;
}
.particle {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // justify-content: flex-end;
}
.introduceMes {
    margin-bottom: 8px;
    h2 {
        font-size: 16px;
        // margin-top: 32px;
        text-align: center;
        color: #808080;
        font-weight: 400;
    }
    h1 {
        font-size: 28px;
        margin-top: 8px;
        margin-bottom: 8px;
        text-align: center;
        font-weight: 700;
        color: #b4883c;
    }
    p {
        font-size: 18px;
        margin-top: 8px;
        line-height: 1.5;
    }
}
.fanLionPic {
    display: none;
}
.featureIntro {
    display: flex;
    flex-wrap: wrap;
    li {
        width: 50%;
        height: 132px;
        // margin-top: 8px;
        .pic {
            width: 100%;
            display: flex;
            justify-content: center;
            img {
                width: 50px;
                height: 50px;
            }
        }
        h3 {
            font-size: 18px;
            font-weight: 500;
            margin-top: 16px;
            text-align: center;
            color: #c1cd00;
            margin: 8px 0;
        }
        p {
            font-size: 14px;
            margin-top: 10px;
            text-align: center;
            color: #808080;
            margin: 8px 0;
        }
    }
}
.introducePart {
    margin-top: 4vh;
}
@media screen and (min-width: 768px) {
    .introduceMes {
        margin-bottom: 8px;
        position: relative;
        z-index: 1;
        h2 {
            font-size: 18px;
        }
        h1 {
            margin-top: 20px;
            font-size: 36px;
        }
        p {
            margin-top: 30px;
        }
    }
    .fanLionPic {
        display: flex;
        width: 480px;
        margin: auto;
        height: 360px;
        justify-content: center;
        margin-top: -60px;
        margin-bottom: 60px;
        position: relative;
        z-index: 0;
        img {
            width: 100%;
            height: 420px;
        }
        .wave {
            position: absolute;
            width: 200px;
            height: 100px;
            top: 58%;
            left: 40%;
            transform: scaleX(0);
            transition: 1s 1s;

            img {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 2;
            }
            .lineBox {
                width: 100%;
                height: 100px;
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 1;
                span {
                    display: inline-block;
                    width: 7px;
                    background-color: #c1cd00;
                    transition: 0.5s;
                    // vertical-align: top;
                }
                span + span {
                    margin-left: 7px;
                }
                .hideBlock {
                    display: inline-block;
                    width: 1px;
                    background-color: #fff;
                    height: 100%;
                }
            }
        }
        .wave::after {
            content: "";
            display: block;
            width: 100%;
            height: 90%;
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0%;
            z-index: 2;
        }
        .illus {
            position: absolute;
            width: 140px;
            opacity: 0;
            img {
                width: 100%;
                height: 100%;
            }
            top: 56%;
            left: 72%;
        }
        .pig {
            opacity: 0;
            position: absolute;
            width: 110px;
            img {
                width: 100%;
            }
            top: 35%;
            left: 16%;
        }
        .board {
            opacity: 0;
            position: absolute;
            width: 200px;
            img {
                width: 100%;
            }
            top: -4%;
            left: 14%;
            z-index: 3;
        }
        .coinBox {
            width: 38px;
            height: 38px;
            position: absolute;
            top: 50%;
            left: 24%;
            img {
                width: 100%;
                height: 100%;
            }
            z-index: 1;
        }
        .hideArea {
            width: 38px;
            height: 38px;
            background-color: #ffeed4;
            border-top: 2px solid #ffdba5;
            border-radius: 50%;
            position: absolute;
            top: 83%;
            left: 23.8%;
            z-index: 3;
            opacity: 0;
        }
    }
    .fanLionPic--action {
        .wave {
            transform: scaleX(1);
            transform-origin: 0%;
            overflow: hidden;
        }
        .wave::after {
            content: "";
            display: block;
            width: 100%;
            height: 90%;
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0%;
            transition: 1s 1s;
            animation: wave 1s 1s forwards;
        }
        .board {
            opacity: 0;
            // transition: opacity 1s 4s;
            animation: openOpacity 1s 4s forwards;
        }
        .illus {
            opacity: 0;
            // transition: opacity 1s;
            animation: openOpacity 1s forwards;
        }
        .pig {
            opacity: 0;
            // transition: opacity 1s 5s;
            animation: openOpacity 1s 5s  forwards;
        }
        .hideArea {
            opacity: 0;
            // transition: opacity 1s 5s;
            animation: openOpacity 1s 5s  forwards;
        }
        .coinBox {
            animation: coinDrop 1s 6s forwards;
        }
    }
    .featureIntro {
        margin-top: 40px;
        li {
            width: 25%;
        }
    }
}
@media screen and (min-width: 1024px) {
    .introduceMes {
        margin-bottom: 8px;
        h2 {
            text-align: start;
            font-size: 20px;
        }
        h1 {
            text-align: start;
            font-size: 40px;
        }
        p {
            font-size: 18px;
            margin-top: 40px;
        }
    }
    .introducePart {
        display: flex;
        margin-top: 0;
        .introduceMes {
            width: 50%;
        }
        .fanLionPic {
            display: block;
            width: 570px;
            img {
                width: 500px;
                height: 420px;
            }
            .wave {
                top: 59%;
                left: 205px;

                img {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    z-index: 2;
                }
            }
            .illus {
                position: absolute;
                width: 150px;
                img {
                    width: 100%;
                    height: 100%;
                }
                top: 56%;
                left: 72%;
            }
            .pig {
                position: absolute;
                width: 130px;
                img {
                    width: 100%;
                }
                top: 41%;
                left: 16%;
            }
            .board {
                position: absolute;
                width: 180px;
                img {
                    width: 100%;
                }
                top: -0%;
                left: 14%;
                z-index: 3;
            }
            .coinBox {
                width: 38px;
                height: 38px;
                position: absolute;
                top: 50%;
                left: 24%;
                img {
                    width: 100%;
                    height: 100%;
                }
                z-index: 1;
            }
            .hideArea {
                width: 38px;
                height: 38px;
                background-color: #ffeed4;
                border-top: 2px solid #ffdba5;
                border-radius: 50%;
                position: absolute;
                top: 88.2%;
                left: 23.8%;
                z-index: 3;
            }
        }
    }
    .fanLionPic--action {
        .coinBox {
            animation: coinDrop2 1s 6s forwards infinite;
        }
    }
    .featureIntro {
        margin-top: 10px;
        li {
            width: 25%;
        }
    }
}

@media screen and (min-width: 1440px) {
    .introduceMes {
        p {
            width: 80%;
            line-height: 2;
        }
    }
    .introducePart {
        .fanLionPic {
            width: 570px;
            img {
                width: 570px;
                height: 420px;
            }
            .wave {
                top: 60%;
                left: 42%;
            }
            .illus {
                width: 160px;
                top: 56%;
                left: 72%;
            }
            .pig {
                width: 130px;
                top: 42%;
                left: 16%;
            }
            .board {
                width: 200px;
                top: -0%;
                left: 14%;
            }
            .coinBox {
                top: 50%;
                left: 24%;
            }
            .hideArea {
                top: 88.2%;
                left: 23.8%;
            }
        }
    }
    .featureIntro {
        margin-top: 60px;
        li {
            h3 {
                font-size: 30px;
            }
            p {
                font-size: 20px;
            }
        }
    }
}
@keyframes wave {
    0%{
        left: 0%;
    }
    100%{
        left: 100%;
    }
}
@keyframes openOpacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes coinDrop {
    0% {
        top: 53%;
    }
    100% {
        top: 82%;
    }
}
@keyframes coinDrop2 {
    0% {
        top: 53%;
    }
    100% {
        top: 88%;
    }
}

@keyframes waveShow {
    0% {
        transform: scaleX(0);
    }
    100% {
        transform: scaleX(1);
    }
}
</style>
