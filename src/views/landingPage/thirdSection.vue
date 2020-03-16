<template>
    <div id="thirdSection">
        <div class="leftBtn" :class="isTab?'':'btnHide'" @click="screenTab(false)"></div>
        <div class="rightBtn" :class="isTab?'btnHide':''" @click="screenTab(true)"></div>
        <kinesis-container class="compHeight" :active="true">
        <kinesis-element class="compHeight" :strength="knStrength" type="depth">
        <div class="wrap tilt" data-tilt>
            <div class="slider">
                <div class="swipeBox" :class="[isTab?'swipeBox--active':'']">
                    <div class="firstBank">
                        <div class="solgan">
                            <h4>顧客至上，服務第一</h4>
                            <h3>為客戶的財富與託付創造更多的價值</h3>
                        </div>
                        <div class="awards" :style="{  height: awardHeight  }">
                            <div class="awardsItem calcPart" :ref="`awardItem`"></div>
                            <ul
                                :style="{  transform: 'translateY('+ awardHeightRe +')' }"
                                :class="[istransition?'transition':'']"
                                :ref="`awardItemWrap`"
                            >
                                <li
                                    class="awardsItem"
                                    v-for="(award,awardIndex) in awards"
                                    :key="'row0'+award.no"
                                    :class="[awardIndex ==7 ||awardIndex ==8 || awardIndex ==9 ?'awardsItem--none':'','awardsItem'+ (awardIndex+1)]"
                                >
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">{{award.from}}</span>
                                        <h3>{{award.name}}</h3>
                                    </div>
                                </li>
                                <li
                                    class="awardsItem awardsItem--pcHide"
                                    v-for="(award,awardIndex) in awards"
                                    :key="'row1'+award.no"
                                    :class="[awardIndex ==7 ||awardIndex ==8 || awardIndex ==9 ?'awardsItem--none':'','awardsItem'+ (awardIndex+1)]"
                                >
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">{{award.from}}</span>
                                        <h3>{{award.name}}</h3>
                                    </div>
                                </li>
                                <li
                                    class="awardsItem awardsItem--pcHide"
                                    v-for="(award,awardIndex) in awards"
                                    :key="'row2'+award.no"
                                    :class="[awardIndex ==7 ||awardIndex ==8 || awardIndex ==9 ?'awardsItem--none':'','awardsItem'+ (awardIndex+1)]"
                                >
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">{{award.from}}</span>
                                        <h3>{{award.name}}</h3>
                                    </div>
                                </li>
                                <li
                                    class="awardsItem awardsItem--pcHide"
                                    v-for="(award,awardIndex) in awards"
                                    :key="'row3'+award.no"
                                    :class="[awardIndex ==7 ||awardIndex ==8 || awardIndex ==9 ?'awardsItem--none':'','awardsItem'+ (awardIndex+1)]"
                                >
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">{{award.from}}</span>
                                        <h3>{{award.name}}</h3>
                                    </div>
                                </li>
                            </ul>

                            <!-- ----------------三倍數複製  運行七次後回初始狀態 繼續輪播------------------- -->
                        </div>
                    </div>
                    <div class="morningStar">
                        <div class="solgan">
                            <img src="@/assets/img/logo/MSlogo.png" />
                            <h4>我們致力於提供高質量的數據</h4>
                            <h3>投資這件事，就是大數據＋專業分析</h3>
                            <p>晨星為全球最大的投資研究及數據公司之一，以最完善的金融數據庫搭配專業分析師團隊，產出最面面俱到的投資組合。</p>
                        </div>
                        <div class="awards morningStar--awards">
                            <ul>
                                <li class="awardsItem">
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">全球發展業務</span>
                                        <h3>27個國家</h3>
                                    </div>
                                </li>
                                <li class="awardsItem">
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">管理和建議的資產</span>
                                        <h3>超過2,100億美元</h3>
                                    </div>
                                </li>
                                <li class="awardsItem">
                                    <span class="ball ball1"></span>
                                    <span class="ball ball2"></span>
                                    <span class="ball ball3"></span>
                                    <span class="ball ball4"></span>
                                    <div class="awardsName">
                                        <span class="awardFrom">國際獨立研究機構權威</span>
                                        <h3>逾400位專家</h3>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </kinesis-element>
        </kinesis-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: 'thirdSection',
    components: {

    },
    computed: {
        knStrength:function(){
            if(this.windowwidth >768){
                return 5
            }
            else{
                return 0
            }
        },
        ...mapGetters([
            "expLightBoxRes"
        ])
    },
    props: {
        currentPage: {
            type: Number,
            default: 0
        },
        agent: {
            type: String,
        }
    },
    // watch: {
    //     currentPage: function(newValue) {

    //         if (newValue == 2) {
    //             this.isPar = true;
    //             if(this.agent !== 'ie'){
    //                     window.pJSDom[0].pJS.fn.vendors.destroypJS();
    //                 }
    //         }
    //         else {
    //             this.isPar = false;
    //             if (window.pJSDom && window.pJSDom.length > 0) {
    //                 if(this.agent !== 'ie'){
    //                     window.pJSDom[0].pJS.fn.vendors.destroypJS();
    //                 }
    //                 window.pJSDom = []
    //             }

    //         }
    //     },
    //     expLightBoxRes: function(newValue) {
    //         if (newValue) {
    //             this.isPar = false;
    //             if (window.pJSDom && window.pJSDom.length > 0) {
    //                 window.pJSDom = []
    //             }
    //         }
    //         else if (this.currentPage == 2) {
    //             this.isPar = true;
    //         }
    //     },
    // },
    data: () => ({
        awards: [
            { name: '台灣最佳數據分析大獎', from: 'The Asian Banker', no: '1' },
            { name: '台灣區最佳雲運用大獎', from: 'The Asian Banker', no: '2' },
            { name: '台灣公司治理100指數成分股', from: '連續10年獲選納入', no: '3' },
            { name: '財富管理評比楷模獎', from: '遠見雜誌', no: '4' },
            { name: '四度獲選台灣最佳銀行', from: 'The Banker', no: '5' },
            { name: 'DJSI世界指數成分股', from: '連續2年獲選納入', no: '6' },
            { name: 'ISO27001資訊安全管理系統認證', from: '連續10年榮獲', no: '7' },
            { name: '台灣最佳數據分析大獎', from: 'The Asian Banker', no: '8' },
            { name: '台灣區最佳雲運用大獎', from: 'The Asian Banker', no: '9' },
            { name: '台灣公司治理100指數成分股', from: '連續10年獲選納入', no: '10' },
        ],
        awardHeight: "auto",
        awardHeightRe: "auto",
        isTab: false,
        isPar: false,
        parColor: '#FFF',
        mobileTimer: 0,
        moveHeight:0,
        istransition:true,
        windowwidth: window.innerWidth,
    }),
    methods: {
        calcItemHeight: function() {
            let itemHeight = this.$refs['awardItem'].clientHeight;
            this.awardHeight = (itemHeight + 32) * 3 + 'px';
            this.awardHeightRe = '0px';
            let viewHeight = document.body.clientWidth;
            window.clearInterval(this.mobileTimer);
            if (viewHeight >= 1024) {
                this.awardHeight = "auto";
                this.awardHeightRe = "0";
            }
            else {
                let i = 0;
                this.mobileTimer = window.setInterval(() => {
                    i++
                    this.changeArr();
                    this.istransition = true
                    if (i == 8) {
                        i = 0;
                        this.awardHeightRe = 0;
                        this.moveHeight = 0;
                        this.istransition = false
                    }
                }, 5000);
            }
        },
        changeArr: function() {
            let oneItem = document.getElementsByClassName('awardsItem1');
            let oneItemHeight = oneItem[0].offsetHeight;
            let totalHeight = (oneItemHeight + 32) * 3;
            this.moveHeight = this.moveHeight - totalHeight;
            this.awardHeightRe = this.moveHeight + 'px';
        },
        screenTab: function(b) {
            this.isTab = b;
        }

    },
    mounted() {
        this.calcItemHeight();
        window.addEventListener("resize", this.calcItemHeight);
        /* eslint-disable */
        // VanillaTilt.init(document.querySelector(".tilt"), {
        //     max: 5,
        //     speed: 400
        // });

        //It also supports NodeList
        /* eslint-disable */
        // VanillaTilt.init(document.querySelectorAll(".tilt"));
    },
    destroyed() {
        window.removeEventListener('resize', this.calcItemHeight);
        window.clearInterval(this.mobileTimer);
    }
}
</script>
<style lang="scss" scoped src="@/scss/landingWrap.scss">
</style>
<style lang="scss" scoped>
#thirdSection {
    height: 100%;
    overflow: hidden;
    position: relative;
}
.wrap {
    margin-top: -24px;
}
// =============
.rightBtn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: absolute;
    bottom: calc((100% - 480px) / 2);
    right: 35%;
    z-index: 2;
    cursor: pointer;
}
.leftBtn {
    width: 36px;
    height: 36px;
    position: absolute;
    border-radius: 50%;
    bottom: calc((100% - 480px) / 2);
    left: 35%;
    margin: auto 0;
    z-index: 2;
    cursor: pointer;
}
.leftBtn::before {
    content: "";
    display: block;
    width: 36px;
    height: 36px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/img/svg/thirdScreen/slider-arrow.svg");
    background-size: cover;
    background-repeat: no-repeat;
    transform: rotate(180deg);
}
.rightBtn::before {
    content: "";
    display: block;
    width: 36px;
    height: 36px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/img/svg/thirdScreen/slider-arrow.svg");
    background-size: cover;
    background-repeat: no-repeat;
}
.btnHide {
    opacity: 0;
    transition: opacity 0.5s;
}
// ==============
.compHeight {
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
.awardsItem--none {
    opacity: 0;
    display: none;
}
.flip-list-move {
    transition: transform 1s linear;
}
.wrap {
    height: 90%;
    padding-bottom: 0;
    padding-top: 100px;
    position: relative;
    overflow: hidden;
    .slider {
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: 1s;
        position: relative;
        .rightBtn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto 0;
            z-index: 2;
            cursor: pointer;
        }
        .leftBtn {
            width: 36px;
            height: 36px;
            position: absolute;
            border-radius: 50%;
            top: 0;
            bottom: 0;
            left: 0px;
            margin: auto 0;
            z-index: 2;
            cursor: pointer;
        }
        .leftBtn::before {
            content: "";
            display: block;
            width: 36px;
            height: 36px;
            position: absolute;
            top: 0;
            left: 0;
            background-image: url("../../assets/img/svg/thirdScreen/slider-arrow.svg");
            background-size: cover;
            background-repeat: no-repeat;
            transform: rotate(180deg);
        }
        .rightBtn::before {
            content: "";
            display: block;
            width: 36px;
            height: 36px;
            position: absolute;
            top: 0;
            left: 0;
            background-image: url("../../assets/img/svg/thirdScreen/slider-arrow.svg");
            background-size: cover;
            background-repeat: no-repeat;
        }
        .btnHide {
            opacity: 0;
            transition: opacity 0.5s;
        }
    }
    .swipeBox {
        width: 200%;
        height: 100%;
        position: relative;
        display: flex;
        transition: 1s;
        right: 0%;
    }
    .swipeBox--active {
        right: 100%;
    }
    .firstBank {
        width: 50%;
        display: inline-block;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .morningStar {
        width: 50%;
        height: 100%;
        display: inline-block;
        transition: 1s;
        .awards {
            .awardsItem {
                padding-bottom: 25%;
            }
        }
    }
}
.solgan {
    img {
        width: 120px;
    }
    h4 {
        font-size: 16px;
        color: #808080;
        margin: 8px 0;
    }
    h3 {
        font-size: 24px;
        color: #1a1a1a;
        font-weight: 600;
        margin: 8px 0;
    }
}
.morningStar {
    img {
        margin-bottom: 0px;
    }
    h4 {
        margin-bottom: 0px;
        margin-top: 6px;
    }
    h3 {
        margin: 8px 0;
    }
    .solgan {
        p {
            margin: 8px 0;
            font-size: 12px;
            line-height: 1.5;
        }
    }
    .awards {
        .awardsItem {
            margin-bottom: 16px;
        }
    }
}

.awards--pc {
    display: none;
}
.awards {
    overflow: hidden;
    padding: 4px;
    position: relative;
    .transition {
        transition: 2s;
    }
    .awardsItem {
        width: 100%;
        max-width: 500px;
        padding-bottom: 28%;
        border: 3px solid #fff;
        position: relative;
        margin: auto;
        margin-bottom: 32px;
        .awardsName {
            width: 80%;
            height: 82%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex-wrap: wrap;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            text-align: center;
            .awardFrom {
                width: 100%;
                display: block;
                color: #666;
                font-size: 16px;
            }
            h3 {
                width: 100%;
                margin: 0;
                font-size: 21px;
                font-weight: 600;
                color: #333333;
            }
        }
        .ball {
            display: block;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
        }
        .ball1 {
            top: -6px;
            left: -6px;
        }
        .ball2 {
            top: -6px;
            right: -6px;
        }
        .ball3 {
            bottom: -6px;
            left: -6px;
        }
        .ball4 {
            bottom: -6px;
            right: -6px;
        }
    }
    .calcPart {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }
}

//調整框框大小RWD
@media screen and (min-width: 530px) {
    .solgan {
        margin-bottom: 32px;
    }
    .awards {
        .awardsItem {
            padding-bottom: 20%;
        }
    }
}
@media screen and (min-width: 700px) {
    .awards {
        .awardsItem {
            height: 19%;
        }
    }
}
@media screen and (min-width: 768px) {
    .wrap {
        margin-top: 0px;
        .morningStar {
            .solgan {
                margin-bottom: 30px;
                margin-top: 20px;
                p {
                    font-size: 16px;
                }
            }
            .awards {
                .awardsItem {
                    padding-bottom: 19%;
                }
            }
        }
    }
    .rightBtn {
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 5%;
    }
    .leftBtn {
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: 5%;
    }
    .solgan {
        margin-bottom: 30px;
        img {
            width: 216px;
        }
        h4 {
            font-size: 18px;
        }
        h3 {
            font-size: 36px;
        }
    }
}
@media screen and (min-width: 1024px) {
    .awardsItem--none {
        opacity: 1;
        display: block;
    }
    .awardsItem--pcHide {
        display: none;
    }
    .solgan {
        margin-bottom: 0px;
        img {
            width: 160px;
        }
        h4 {
            font-size: 18px;
            margin-top: 0px;
        }
        h3 {
            font-size: 20px;
        }
    }
    .awards {
        display: block;
        overflow: inherit;
        ul {
            height: 62vh;
            display: flex;
            flex-wrap: wrap;
            max-height: 500px;
        }
        .awardsItem {
            padding-bottom: 9%;
            width: 30%;
            margin: 1%;
            margin-bottom: 20px;
        }
        .awardsItem3 {
            opacity: 0;
        }
        .awardsItem7 {
            order: 2;
        }
        .awardsItem8 {
            order: 1;
            opacity: 0;
        }
        .awardsItem9 {
            display: none;
        }
        .awardsItem10 {
            order: 1;
        }
    }
    .morningStar--awards {
        height: 40vh;
        display: flex;
        align-items: center;
        ul {
            height: auto;
            flex-wrap: nowrap;
            width: 100%;
            .awardsItem {
                width: 33%;
                padding-bottom: 12%;
            }
        }
    }

}
@media screen and (min-width: 1024px) {
    .awards {
        .awardsItem {
            padding-bottom: 8.8%;
        }
    }
    .wrap {
        .morningStar {
            .awards {
                .awardsItem {
                    padding-bottom: 8.8%;
                }
            }
        }
    }
}
@media screen and (min-width: 1150px) {
    .awards {
        .awardsItem {
            padding-bottom: 7.8%;
        }
    }
    .wrap {
        .morningStar {
            .awards {
                .awardsItem {
                    padding-bottom: 7.8%;
                }
            }
        }
    }
}
@media screen and (max-height: 580px) and (min-width: 1024px) {
    .awards {
        .awardsItem {
            padding-bottom: 7%;
        }
    }
}
//調整框框大小RWD
@media screen and (min-width: 1440px) {
    .awardsItem--none {
        opacity: 1;
    }
    .solgan {
        margin-bottom: 16px;
        img {
            width: 180px;
            height: 100%;
        }
        h4 {
            font-size: 20px;
            margin-top: 20px;
            font-weight: 400;
        }
        h3 {
            font-size: 28px;
        }
        p {
            font-size: 16px;
        }
    }
    .awards {
        overflow: inherit;
        .awardsItem {
            padding-bottom: 0;
            height: 25%;
        }
    }
    .morningStar--awards {
        height: 62vh;
        display: flex;
        align-items: center;
        ul {
            height: 62vh;
            max-height: 500px;
            width: 100%;
            // height: auto;
            .awardsItem {
                width: 33%;
            }

        }
    }
    .wrap {
        .morningStar {
            .awards {
                .awardsItem {
                    padding-bottom:auto;
                    height: 25%;
                }
            }
        }
    }
}
</style>
