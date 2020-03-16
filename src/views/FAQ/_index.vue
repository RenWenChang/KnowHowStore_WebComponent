<template>
    <div id="FAQ">
        <div class="bigImgBoxWrap" v-if="imgBoxOpen">
            <div class="bigImgBox">
                <div class="closeIcon" @click="closeImgBox()">
                    <img src="@/assets/img/svg/FAQ/close.svg" />
                </div>
                <img :src="bigImg" />
            </div>
        </div>
        <div class="FAQ--banner">
            <div ref="baseSelect" class="searchPart" :class="[searchOpen?'searchPart--active':'']">
                <div class="searchBox">
                    <input class="searchInput" type="text" v-model="searchInp" placeholder="請輸入關鍵字" />
                    <div class="searchIcon"></div>
                    <ul class="searchOption" v-if="searchOpen">
                        <li
                            v-for="(options,optionIndex) in searchOption"
                            :key="optionIndex"
                            @click="selectOption(options.FaqID)"
                        >{{options.FaqTitle}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="reminder">
            <!-- <img src="@/assets/img/icon/info-black.svg" alt=""> -->
            請點選
            <img src="@/assets/img/svg/FAQ/plus4.svg" alt="">
            看詳細說明</div>
        <div class="containerSection" :class="imgBoxOpen?'controlStop':''">
            <container
                v-for="(item,itemIndex) in  FAQ"
                :key="itemIndex"
                :backgroundColor="item.backgroundColor"
                :color="item.color"
            >
                <!-- <span class="FQA__index" slot="FQA__index">{{'0'+ (itemIndex+1)}}</span> -->
                <span slot="FQA__title">{{item.title}}</span>
                <li v-for="(ques,qIndex) in item.questions" :key="qIndex" slot="FQA__question">
                    <div
                        class="questionRow"
                        :style="[!ques.isActive?{'border-bottom':'1px solid '+ item.color}:'']"
                        @click="openCard(itemIndex ,ques.answerID)"
                    >
                        <div class="text">
                            <span>{{qIndex+1}}.</span>
                            <p>{{ques.question}}</p>
                        </div>

                        <span class="setId" :id="'scroll'+ques.answerID"></span>
                        <div
                            class="toggleIcon"
                            :style="[ !ques.isActive?{backgroundImage :'url('+ item.plus +')' }:{backgroundImage :'url('+ item.minus +')' }]"
                        ></div>
                    </div>
                    <div
                        v-if="ques.isActive"
                        class="answerRow"
                        :class="ques.isActive?'answerRow--active':''"
                    >
                        <div v-html="ques.answer"></div>
                        <div
                            v-if="ques.isActive"
                            class="asviceLine"
                            :style="{'background-color': item.backgroundColor}"
                        ></div>
                    </div>
                </li>
            </container>
        </div>

        <eFirstfooter></eFirstfooter>
    </div>
</template>
<script>

import container from '@/views/FAQ/container.vue'
import eFirstfooter from '@/views/eFirstfooter.vue'
import { mapActions } from "vuex"

export default {
    name: 'FAQ',
    components: {
        container,
        eFirstfooter
    },
    data() {
        return {
            FAQ: [
                {
                    title: '新手上路',
                    questions: [
                        // { question: 'e-First 投資跟一般投資 理財 有何不同？' },
                        // { question: '要如何進入 e-First?' }
                    ],
                    backgroundColor: '#f2f9f7',
                    color: '#333333',
                    isActive: false,
                    plus: require('@/assets/img/svg/FAQ/plus2.svg'),
                    minus: require('@/assets/img/svg/FAQ/minus2.svg'),
                },
                {
                    title: '關於e-First',
                    questions: [
                        // { question: 'e-First 與其他智能理財有什麼差別?' },
                        // { question: 'e-First 如何挑選投資配置?' },
                        // { question: 'e-First 什麼時候開放下單？' }
                    ],
                    backgroundColor: '#faf7f1',
                    color: '#333333',
                    isActive: false,
                    plus: require('@/assets/img/svg/FAQ/plus2.svg'),
                    minus: require('@/assets/img/svg/FAQ/minus2.svg'),
                },
                {
                    title: '使用說明',
                    questions: [
                        // { question: '我要如何使用 e-First 投資試算?' },
                        // { question: 'e-First 投資報酬試算模擬結果該怎麼看?' },
                        // { question: '可以修改投資期間、金額或方式嗎？' }
                    ],
                    backgroundColor: '#f6f7e9',
                    color: '#333333',
                    isActive: false,
                    plus: require('@/assets/img/svg/FAQ/plus2.svg'),
                    minus: require('@/assets/img/svg/FAQ/minus2.svg'),
                },
                {
                    title: '其他說明',
                    questions: [
                        // { question: '留下聯絡資料可以獲得優惠嗎?' },
                        // { question: '從哪裡可以看到目前的市場投資訊息?' }
                    ],
                    backgroundColor: '#f5f5f5',
                    color: '#333333',
                    isActive: false,
                    plus: require('@/assets/img/svg/FAQ/plus2.svg'),
                    minus: require('@/assets/img/svg/FAQ/minus2.svg'),
                },
            ],
            FAQList: '',
            searchInp: '',
            searchOption: [],
            searchOpen: false,
            bigImg: '',
            imgBoxOpen: false

        }
    },
    watch: {
        searchInp: function(newValue) {
            if (newValue !== '') {
                this.searchOpen = true;
                this.searchOption = [];
                this.FAQList.forEach((item) => {
                    if (item.FaqTitle.indexOf(newValue) > -1) {
                        this.searchOption.push(item);
                    }
                })
            }
            else {
                this.searchOpen = false;
            }
        },
        imgBoxOpen: function(newValue) {
            if (newValue) {
                document.body.style.overflowY = 'hidden';
            }
            else {
                document.body.style.overflowY = 'auto';
            }
        }
    },
    methods: {
        openCard: async function(i, q) {
            let cardID = q;
            const answer = await this.getFAQsAnswer({ data: {}, id: cardID });
            // if (answer.ResultCode !== '01') {
            //     this.$msgBox.showMsgBox({
            //         content: answer.Message,
            //         isNormalBox: true,
            //         isShowBtn1: true,
            //         BtnText1: '確認',
            //         title: '親愛的投資人，您好：',

            //         fn1: () => {
            //             this.$router.push({ path: "/dashboard/landingPage" });
            //             window.location.reload();
            //         }
            //     });
            //     return

            // }
            let imgClass;

            this.FAQ.forEach((item) => {
                item.questions.forEach((ques) => {
                    if (ques.answerID == q) {
                        let reString;
                        ques.answer = answer.Datas.AnsContent;
                        ques.isActive = !ques.isActive
                        this.$nextTick(() => {
                            reString = ques.answer.replace(/<img/ig, '<img class="imgSelecter"');
                            ques.answer = reString;

                            imgClass = document.getElementsByClassName('imgSelecter');

                            this.$nextTick(() => {
                                imgClass.forEach((item) => {
                                    item.addEventListener('click', this.getImg, false);
                                })
                            })

                        })

                    }
                })
            })

        },
        closeImgBox: function() {
            this.imgBoxOpen = false;
        },
        getImg: function(e) {
            this.imgBoxOpen = true;
            this.bigImg = e.target.src;
        },
        getFAQ: async function() {
            const response = await this.getFAQs({});
            // if (response.ResultCode !== '01') {
            //     this.$msgBox.showMsgBox({
            //         content: response.Message,
            //         isNormalBox: true,
            //         isShowBtn1: true,
            //         BtnText1: '確認',
            //         title: '親愛的投資人，您好：',
            //         fn1: () => {
            //             this.$router.push({ path: "/dashboard/landingPage" });
            //             window.location.reload();
            //         }
            //     });
            //     return

            // }
            this.FAQList = response.Datas.FaqTitleList;

            this.FAQList.forEach((item) => {
                let itemType = item.FaqType;
                let FAQIndex = itemType - 1;
                this.FAQ[FAQIndex].questions.push({ question: item.FaqTitle, answerID: item.FaqID, answer: '', isActive: false });
            })
            this.FAQ.forEach((item) => {
                item.questions.forEach((ques, quesID) => {
                    ques.uid = quesID;
                })
            })

        },
        //點擊外面關閉
        handleSelectClick: function(event) {
            const baseSelect = this.$refs["baseSelect"];
            if (baseSelect == undefined) {
                return;
            }
            if (!baseSelect.contains(event.target)) {
                this.searchOpen = false;
                this.searchInp = '';
            }
        },
        selectOption: function(optionID) {
            // -----------------自動scroll功能------------------------
            setTimeout(() => {
                this.$nextTick(() => {
                    this.scrollTo('#scroll' + optionID);
                })
            }, 500);

            // ------------------------------------------
            this.searchOpen = false;
            this.searchInp = "";
            let faType = optionID[0] - 1;
            this.openCard(faType, optionID)
        },
        scrollTo: function(id) {
            document.querySelector(id).scrollIntoView(true);
        },
        ...mapActions([
            "getFAQs",
            "getFAQsAnswer"
        ]),
    },
    mounted: function() {
        //綁定 DOM 之後
        this.$nextTick(() => {
            document
                .querySelector("body")
                .addEventListener("click", this.handleSelectClick);
        });
        this.getFAQ();

    },
    destroyed() {
        document.querySelector('#app').removeEventListener("click", this.handleSelectClick);
    }
}
</script>
<style lang="scss" >
.imgSelecter {
    cursor: zoom-in;
}
.controlStop {
    pointer-events: none;
}
.reminder{
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    color: #31A043;
    img{
        margin: 0 4px;
        width: 16px;
        height: 16px;
    }
}
.bigImgBoxWrap {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 12;
    overflow: auto;
    padding: 8px;
    text-align: center;
}
.bigImgBox {
    width: 90%;
    height: 80vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    z-index: 10;
    overflow: auto;
    padding: 8px;
    text-align: center;
    img {
        width: auto;
        height: calc(100% - 16px);
        margin: auto;
        text-align: center;
    }
    .closeIcon {
        width: 40px;
        height: 40px;
        position: fixed;
        top: 12%;
        right: 6%;
        z-index: 10;
        cursor: pointer;
    }
}
.bigImgBox::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    background-color: #ccc;
}
.bigImgBox::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #414042;
}
#FAQ {
    background-color: #fff;
}
.questionRow {
    .setId {
        position: relative;
        top: -120px;
        display: block;
    }
}
.FAQ--banner {
    width: 100%;
    height: 350px;
    background-image: url("../../assets/img/svg/FAQ/QAtopBg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 60% center;
    position: relative;
    .searchPart {
        width: 300px;
        height: 54px;
        padding-top: 10px;
        text-align: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        line-height: 1.5;
        p {
            color: #fff;
            font-size: 14px;
            text-shadow: 0 2px 4px rgba(0, 87, 61, 0.3);
        }
        .searchBox {
            width: 100%;
            height: 54px;
            position: relative;
            margin: auto;
            z-index: 3;
            .searchIcon {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 16px;
                right: 8px;
                background-image: url("../../assets/img/icon/search.svg");
            }
        }
        .searchOption {
            width: 100%;
            margin: auto;
            background-color: #fff;
            max-height: 220px;
            overflow-y: auto;
            position: absolute;
            top: 54px;
            left: 0;
            li {
                display: flex;
                align-items: center;
                height: 44px;
                padding-left: 8px;
                text-align: start;
                font-size: 14px;
                color: #808080;
                position: relative;
                a {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    padding-left: 8px;
                }
            }
            li:hover {
                color: #fff;
                background-color: #c1cd00;
                cursor: pointer;
            }
            li:hover a {
                color: #fff;
            }
        }
        .dropHideBoxShow {
            height: auto;
            border: solid 1px rgba(110, 127, 243, 0.4);
            max-height: 247px;
            width: calc(100% + 2px);
            border-radius: 4px;
            left: -1px;
        }
        .searchOption::-webkit-scrollbar {
            width: 4px;
            background-color: #fff;
        }
        .searchOption::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #414042;
        }
        .searchOption {
            scrollbar-face-color: #b46868;
        }
        .searchInput {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 5px;
            position: absolute;
            top: 0;
            left: 0;
            padding-right: 54px;
            padding-left: 8px;
        }
        .searchInput::placeholder {
            color: #aaa;
        }
        .searchInput:focus {
            outline: none;
            border-top: 4px solid #c1cd00;
        }
    }
    .searchPart--active {
        .searchBox {
            .searchInput {
                border-radius: 5px 5px 0px 0px;
                border-bottom: 1px solid rgba(220, 230, 240, 0.51);
            }
            .searchIcon {
                background-image: url("../../assets/img/icon/searchActive.svg");
            }
        }
    }
}
.containerSection {
    display: flex;
    flex-wrap: wrap;
    max-width: 1750px;
    margin: auto;
    .FQA__index {
        margin-right: 8px;
    }
}
.answerRow {
    div {
        padding: 0 20px;
        p {
            margin-top: 0;
        }
    }
    .asviceLine {
        width: 100%;
        height: 1px;
        background-color: #000;
        position: relative;
        top: -8px;
    }
}
@media screen and (min-width: 768px) {
    .FAQ--banner {
        .searchPart {
            p {
                font-size: 18px;
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .reminder{
        margin: auto;
        padding: 20px 30px;
        padding-bottom: 0;
        max-width: 1750px;
    }
    .FAQ--banner {
        background-position: 60% 0%;
    }
    .answerRow {
        margin: -1px -16px 0px;
        background-color: #fff;
        height: 0;
        overflow: hidden;
        color: #000;
    }
    .answerRow--active {
        height: auto;
        overflow: inherit;
        background-color: #fff;
        color: #333;
        margin: 0 -16px;
        padding-top: 12px;
    }
}
</style>