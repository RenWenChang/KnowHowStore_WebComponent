<template>
    <div id="fourthSection">
        <div class="wrap">
            <div class="titles">
                <h4>滿足您人生各階段理財計畫</h4>
                <h3>e-First投資 只要3步驟</h3>
            </div>
            <smallSlider  class="smallSlider--hide"></smallSlider>
            <div class="stepIntroduce">
                <div class="illus">
                    <div class="pic pic1">
                        <!-- <img src="@/assets/img/svg/fourthScreen/d4-illus1-bg.svg" alt /> -->
                        <div class="target">
                            <img class="illusA" src="@/assets/img/svg/illus/d3illu小粉獅-1.png" alt />
                            <img src="@/assets/img/svg/fourthScreen/target.png" alt />
                            <div class="arrow">
                                <img src="@/assets/img/svg/fourthScreen/arrow.png" alt />
                            </div>
                        </div>
                        <div class="target target-half">
                            <img src="@/assets/img/svg/fourthScreen/target-half.png" alt />
                        </div>
                    </div>
                    <div class="msg">Step 1. 選擇您的投資目標</div>
                </div>

                <div class="illus">
                    <div class="pic pic2">
                        <div class="sandBoxWrap">
                            <div class="sandBox hourglass">
                                <img src="@/assets/img/svg/fourthScreen/hourglass.png" alt />
                            </div>
                            <div class="sandBox">
                                <div class="lightBox">
                                    <span
                                        v-for="(box,index) in lightItem"
                                        :key="index"
                                        :class="[box.isActive?'lighting':'']"
                                    ></span>
                                </div>
                                <!-- <div class="sandWrap">
                                    <sandLoad class="sandFlow"></sandLoad>
                                    <img class="sandImg" src="@/assets/img/svg/fourthScreen/d4-illus2-hourglass.svg" alt="">
                                </div> -->
                                
                                <img src="@/assets/img/svg/fourthScreen/sandBox.png" alt />
                                
                                
                                <img class="illusA" src="@/assets/img/svg/illus/小粉獅太空人.png" alt />
                            </div>
                            
                        </div>
                    </div>
                    <div class="msg">Step 2. 選擇您的投資年期和金額</div>
                </div>
                <div class="illus illus--mobileHide">
                    <div class="pic pic3">
                        <img src="@/assets/img/svg/fourthScreen/d4-illus3-bg.svg" alt />
                        <div class="shakeIllus">
                            <img src="@/assets/img/svg/fourthScreen/小粉獅特務.png" alt />
                        </div>
                    </div>
                    <div class="msg">Step 3. 觀看為您量身打造的投資組合</div>
                    <div class="msg-small">還可以隨您意願修改喔</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import smallSlider from './smallSlider'
export default {
    name: 'fourthSection',
    components: {
        smallSlider,
    },
    data: () => ({
        lightItem: [],
        mobileSliderShow:false,

    }),
    props: {
        currentPage: {
            type: Number,
            default: 0
        }
    },
    methods: {
        lightAnimate: function() {
            let i = 0
            setInterval(() => {
                i++
                this.lightItem.forEach((item) => {
                    item.isActive = false;
                })
                this.lightItem[i].isActive = true;
                if (i == 19) {
                    i = 0;
                }
            }, 1000);
        }
    },
    mounted() {
        for (let i = 0; i < 20; i++) {
            this.lightItem.push({
                isActive: false
            })

        }
        this.lightAnimate();
    },
}
</script>
<style lang="scss" scoped src="@/scss/landingWrap.scss">
</style>

<style lang="scss" scoped>
.sandWrap{
    width: 300px;
    height: 300px;
    position: relative;
    .sandFlow{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
    }
    .sandImg{
        position: absolute;
        top: 0;
        right: 0;
    }

}
#fourthSection {
    height: 60%;
}
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 0;
}
.titles {
    text-align: center;
    margin-top: 32px;
    h4 {
        font-size: 18px;
        color: #808080;
        margin: 0;
        margin-bottom: 8px;
        font-weight: 400;
    }
    h3 {
        font-size: 28px;
        color: #b4883c;
        margin: 10px 0;
    }
}
.stepIntroduce {
    display: none;
    .illus--mobileHide {
        display: none;
    }
    .pic {
        height: 200px;
        margin: 0 auto 10px;
        position: relative;
        .illusA {
            width: 100px;
            height: 128px;
        }
    }
    .pic1 {
        position: relative;
        .illusA {
            position: absolute;
            top: -10%;
            z-index: 1;
        }
        .target {
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: -30%;
            left: 30%;
            .illusA {
                width: 100px;
                height: 128px;
                position: absolute;
                top: -72px;
                left: 90px;
            }
            img {
                width: 180px;
                height: 100px;
            }
            .arrow {
                width: 30px;
                height: 145px;
                position: absolute;
                left: 76px;
                top: -43%;
                animation: arrowDrop 4s infinite ease-in-out;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .target-half {
            img {
                position: relative;
                top: 42px;
                width: 180px;
                height: 50px;
            }
        }
    }
    .pic3 {
        .shakeIllus {
            width: 100px;
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translateX(-50%) translateX(0px) translateY(0px)
                rotateZ(-0deg);
            animation: shake 2s ease-in-out infinite;
            z-index: 3;
        }
        // .shakeIllus::before{
        //     content: '';
        //     display: block;
        //     width: 2px;
        //     height: 30px;
        //     background-color: #000;
        //     left: 0;
        //     right: 0;
        //     top: -24px;
        //     margin: auto;
        //     position: absolute;
        //     z-index: 2;
        // }
    }
    .msg {
        text-align: center;
        font-size: 18px;
        color: #808080;
    }
    .msg-small {
        text-align: center;
        font-size: 14px;
        color: #808080;
    }
    img {
        width: 100%;
        height: 80%;
    }
}

@media screen and (min-width: 768px) {
    #fourthSection {
        height: 68%;
    }
}

@media screen and (min-width: 1024px) {
    .wrap {
        flex-wrap: wrap;
        flex-direction: row;
        // height: auto;;
    }
    .titles {
        padding-top: 0px;
        // margin-bottom: 8vh;
        margin-top: 0;
        h4 {
            margin-top: 0;
        }
    }
    .smallSlider--hide {
        display: none;
    }
    .stepIntroduce {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .illus--mobileHide {
            display: block;
        }
        .illus {
            width: 33%;
            // background-color: #CCC;
            .pic {
                // width: 300px;
                margin-bottom: 24px;
                position: relative;
                // background-color: #F00;
                // background-color: aqua;
                .sandBoxWrap {
                    width: 100%;
                    height: 100%;
                    .sandBox {
                        width: 200px;
                        height: 163px;
                        // overflow: hidden;
                        position: absolute;
                        top: -8px;
                        left: 36%;
                        // opacity: 0.4;
                        img {
                            height: 100%;
                        }
                        .illusA {
                            position: absolute;
                            bottom: -10px;
                            left: -56px;
                            height: 80%;
                        }
                        .lightBox {
                            width: 94px;
                            height: 50px;
                            // background-color: #F00;
                            position: absolute;
                            top: 82px;
                            left: 20px;
                            display: flex;
                            flex-wrap: wrap;
                            .light {
                                display: block;
                                width: 10px;
                                height: 7px;
                                position: absolute;
                                top: 0;
                                left: 0;
                            }
                            span {
                                display: block;
                                width: 10px;
                                height: 7px;
                                margin: 2px 4px;
                                background-color: #ccc;
                            }
                            .lighting {
                                background-color: #f1ff00;
                            }
                        }
                    }
                }
            }
            .msg {
                white-space: nowrap;
                font-size: 20px;
            }
            .msg-small {
                font-size: 14px;
                margin-top: 8px;
            }
        }
    }
    #fourthSection {
        height: 72vh;
    }
}
@media screen and (min-width: 1280px) {
    #fourthSection {
        height: 82vh;
    }
}
.hourglass{
    animation: rotateNormal 5s ease  infinite;
    transform:scale(1) rotate(-10deg) ;
}
// @keyframes heartAnimate{ 
//     0%,100%{transform:scale(1) rotate(0);} /*0%,100%時保持圖形的原大小且不旋轉*/
//     10%,30%{transform: scale(0.9) rotate(3deg);} /*10%,30%時圖形縮小成0.9倍，並且順時針旋轉3度*/
//     20%,40%,60%,80%{transform:scale(1.1) rotate(-3deg);} /*20%,40%,60%,80%時圖形擴大成1.1倍，並且逆時針旋轉3度*/
//     50%,70%{ transform:scale(1.1) rotate(3deg);} /*50%,70%時圖形擴大成1.1倍，並且順時針旋轉3度*/
// }

@keyframes rotateNormal{
    0%{
        transform:scale(1) rotate(-10deg);
    }
    25%{
        transform:scale(1) rotate(10deg);
    }
    50%{
        transform:scale(1) rotate(-10deg);
    }
    75%{
        transform:scale(1) rotate(10deg);
    }
    100%{
        transform:scale(1) rotate(-10deg);
    }
}
</style>
<style lang="scss" src="@/views/landingPage/fourthSection/animation.scss">
</style>