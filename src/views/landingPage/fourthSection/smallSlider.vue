<template>
    <div id="slider">
        <ul
            class="container"
            :style="{  transform: 'translateX('+ containerDistance +'%)' , width: containerWidth +'%' , transition: transitionControl}"
        >
            <li :style="{   width: itemPercent +'%'}">
                <div class="pic">
                    <img src="@/assets/img/svg/fourthScreen/d4-illus3-bg.svg" alt />
                    <img class="illus illusC" src="@/assets/img/svg/fourthScreen/小粉獅特務.png" alt />
                </div>
                <div class="msg">Step 3. 觀看為您量身打造的投資組合</div>
                <div class="msg-small">還可以隨您意願修改喔</div>
            </li>
            <li :style="{   width: itemPercent +'%'}">
                <div class="pic">
                    <img src="@/assets/img/svg/fourthScreen/d4-illus1-bg.svg" alt />
                    <img class="illus illusA" src="@/assets/img/svg/illus/d3illu小粉獅-1.png" alt />
                </div>
                <div class="msg">Step 1. 選擇您的投資目標</div>
            </li>
            <li :style="{   width: itemPercent +'%'}">
                <div class="pic">
                    <img src="@/assets/img/svg/fourthScreen/d4-illus2-bg.svg" alt />
                    <img class="illus illusB" src="@/assets/img/svg/illus/d3illu小粉獅-1.png" alt />
                </div>
                <div class="msg">Step 2. 選擇您的投資年期和金額</div>
            </li>
            <li :style="{   width: itemPercent +'%'}">
                <div class="pic">
                    <img src="@/assets/img/svg/fourthScreen/d4-illus3-bg.svg" alt />
                    <img class="illus illusC" src="@/assets/img/svg/fourthScreen/小粉獅特務.png" alt />
                </div>
                <div class="msg">Step 3. 觀看為您量身打造的投資組合</div>
                <div class="msg-small">還可以隨您意願修改喔</div>
            </li>
            <li :style="{   width: itemPercent +'%'}">
                <div class="pic">
                    <img src="@/assets/img/svg/fourthScreen/d4-illus1-bg.svg" alt />
                    <img class="illus illusA" src="@/assets/img/svg/illus/d3illu小粉獅-1.png" alt />
                </div>
                <div class="msg">Step 1. 選擇您的投資目標</div>
            </li>
        </ul>
        <button class="controlBtn controlBtn__prev" @click="slideMove(-1)">
            <img src="@/assets/img/icon/arrow-left.svg" />
        </button>
        <button class="controlBtn controlBtn__next" @click="slideMove(1)">
            <img src="@/assets/img/icon/arrow-right.svg" />
        </button>
    </div>
</template>
<script>
export default {
    name: 'smallSlider',
    data() {
        return {
            items: [
                { isAct: true, img: require('@/assets/img/test/d4-illus1.svg') },
                { isAct: false, img: require('@/assets/img/test/d4-illus2.svg') },
                { isAct: false, img: require('@/assets/img/test/d4-illus3.svg') },
            ],
            currentIndex: 1,
            isRunning: false,
            speed: 0.5,
            timer: 0,
        }
    },
    watch: {
        // currentIndex: function(newValue) {
        //     let nextValue = newValue + 1;
        //     if (newValue == 3) {
        //         nextValue = 0;
        //     }
        //     if (this.timer !== 0) {
        //         window.clearTimeout(this.timer);
        //     }

        //     this.$nextTick(() => {
        //         this.timer = window.setTimeout(() => {
        //             this.clickDot(nextValue)
        //         }, 8000);
        //     })

        // },
    },
    computed: {
        itemPercent: function() {
            return 100 / (this.items.length + 2)
        },
        containerWidth: function() {
            return 100 * (this.items.length + 2)
        },
        containerDistance: function() {
            return -this.itemPercent * this.currentIndex;
        },
        transitionControl: function() {
            //控制速度和開關都寫在這
            if (this.speed !== 0) {
                return this.speed + 's'
            }
            else {
                return 'none'
            }
        },
    },
    methods: {
        slideMove: function(i) {
            if (this.isRunning == true) {
                // 阻止連續點擊
                return
            }
            window.clearTimeout(this.timer);
            this.isRunning = true;
            this.speed = 0.5;
            if (this.currentIndex == 1 && i == -1) {
                setTimeout(() => {
                    this.speed = 0;
                    this.currentIndex = 3;
                }, 500)
            }
            else if (this.currentIndex == 3 && i == 1) {
                setTimeout(() => {
                    this.speed = 0;
                    this.currentIndex = 1;
                }, 500)
            }
            this.currentIndex += i;
            setTimeout(() => {
                this.isRunning = false;
            }, 500);

            this.timer = window.setTimeout(() => {
                this.slideMove(1);
            }, 3000);
        },
    },
    mounted() {
        this.timer = window.setTimeout(() => {
            this.slideMove(1);
        }, 3000);
    },
    destroyed() {
        window.clearTimeout(this.timer);
    }
}
</script>
<style lang="scss" scoped src="./animation.scss">
</style>
<style lang="scss" scoped>
#slider {
    width: 100%;
    height: 350px;
    position: relative;
    overflow: hidden;
}

.container {
    height: 300px;
    transform: translateX(0%);
    li {
        display: inline-block;
        margin: auto;
    }
    .pic {
        // width: 50VW;
        height: 24vh;
        margin: auto;
        margin-bottom: 12px;
        position: relative;
        img {
            width: 100%;
            height: 95%;
        }
        .illus {
            width: auto;
            height: 75%;
            position: absolute;
        }
        .illusA {
            left: 50%;
            bottom: 26%;
        }
        .illusB {
            bottom: 0;
            left: 26%;
        }
        .illusC {
            height: 40%;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .msg-small {
        text-align: center;
        margin-top: 8px;
        font-size: 14px;
        color: #808080;
    }
    .msg {
        text-align: center;
        font-size: 18px;
        color: #808080;
    }
}

.controlBtn {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    z-index: 3;
    // width: 24px;
    height: 24px;
    background-color: unset;
    background-size: cover;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    > img {
        width: 24px;
        height: 24px;
    }
    &:focus {
        outline: none;
    }
}
.controlBtn__prev {
    left: 24px;
}
.controlBtn__next {
    right: 24px;
}
</style>