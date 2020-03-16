<template>
    <div class="lightBox" :class="{'lightBox--mobTargetOpen':mobTarget}">
        <div class="firstPrompt" :class="{'firstPrompt--show':calcFirstPrompt}" v-show="touchMode">
            <img src="@/assets/img/svg/experience/group-17-3x.png">
            <button @click="iKnow">我知道了</button>
        </div>
        <div class="content" :ref="`content`"
            :class="{'content--overAuto':isIE,
            'content--iosAuto':_OS === 'ios' && nowQuestion === 2,
            'content--mobTarget100':mobTarget
            }"
        >

<!-- ==================== 第一題組手機板 ==================== -->
            <div class="content__target content__target--mob"
                v-if="mobTarget === true"
            >
                <p class="content__title">請回答幾個問題，e-First將建立專屬於您的投資組合。</p>
                <div class="content__block firstQ">請選擇您的投資目標：</div>
                <div class="content__block" v-if="nowQuestion >= 1">
                    <div class="answer__target">
                        <button
                            :class="{'answer__btn--active': myAns.target === 101}"
                            @click="qAns('q-target', 101)"
                        >
                            <img v-if="myAns.target === 101" src="@/assets/img/svg/experience/Q-icon1-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon1.svg" />
                            <span>子女教育基金</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 102}"
                            @click="qAns('q-target', 102)"
                        >
                            <img v-if="myAns.target === 102" src="@/assets/img/svg/experience/Q-icon2-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon2.svg" />
                            <span>購屋頭期款</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 103}"
                            @click="qAns('q-target', 103)"
                        >
                            <img
                                v-if="myAns.target === 103"
                                src="@/assets/img/svg/experience/Q-icon3-active.svg"
                                class="A-q1__svg3"
                            />
                            <img v-else src="@/assets/img/svg/experience/Q-icon3.svg" class="A-q1__svg3" />
                            <span>旅遊基金</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 104}"
                            @click="qAns('q-target', 104)"
                        >
                            <img v-if="myAns.target === 104" src="@/assets/img/svg/experience/Q-icon4-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon4.svg" />
                            <span>樂活退休規劃</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 201}"
                            @click="qAns('q-target', 201)"
                        >
                            <img v-if="myAns.target === 201" src="@/assets/img/svg/experience/Q-icon5-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon5.svg" />
                            <span>樂齡退休月月領</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 301}"
                            @click="qAns('q-target', 301)"
                        >
                            <img v-if="myAns.target === 301" src="@/assets/img/svg/experience/Q-icon6-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon6.svg" />
                            <span>就是想存一筆錢</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 手機板關閉狀態 -->
            <div class="content__target--mobClose"
                v-else-if="mobTarget === false"
            >
                <div v-if="!touchMode" class="firstQ">您目前選擇的投資目標為：</div>
                <div class="answer__item">
                    <button v-if="myAns.target === 101"
                        :class="{'answer__btn--active': myAns.target === 101}"
                    >
                        <img src="@/assets/img/svg/experience/Q-icon1-active.svg" />
                        <span>子女教育基金</span>
                    </button>
                    <button v-else-if="myAns.target === 102"
                        :class="{'answer__btn--active': myAns.target === 102}"
                    >
                        <img src="@/assets/img/svg/experience/Q-icon2-active.svg" />
                        <span>購屋頭期款</span>
                    </button>
                    <button v-else-if="myAns.target === 103"
                        :class="{'answer__btn--active': myAns.target === 103}"
                    >
                        <img src="@/assets/img/svg/experience/Q-icon3-active.svg"/>
                        <span>旅遊基金</span>
                    </button>
                    <button v-else-if="myAns.target === 104"
                        :class="{'answer__btn--active': myAns.target === 104}"
                    >
                        <img src="@/assets/img/svg/experience/Q-icon4-active.svg" />
                        <span>樂活退休規劃</span>
                    </button>
                    <button v-else-if="myAns.target === 201"
                        :class="{'answer__btn--active': myAns.target === 201}"
                    >
                        <img src="@/assets/img/svg/experience/Q-icon5-active.svg" />
                        <span>樂齡退休月月領</span>
                    </button>
                    <button v-else-if="myAns.target === 301"
                        :class="{'answer__btn--active': myAns.target === 301}"
                    >
                        <img src="@/assets/img/svg/experience/Q-icon6-active.svg" />
                        <span>就是想存一筆錢</span>
                    </button>
                    <button class="answer__changeTarget"
                        @click="mobchangeTarget(true)"
                    >
                        <span>更換目標</span>
                        <img src="@/assets/img/svg/experience/normal.svg" />
                    </button>
                </div>
            </div>

<!-- ==================== 第一題組桌機版 ==================== -->
            <div class="content__target content__target--web">
                <p class="content__title">請回答幾個問題，e-First將建立專屬於您的投資組合。</p>
                <div class="content__block firstQ" v-if="nowQuestion >= 1">
                    請選擇您的投資目標：
                </div>
                <div class="content__block" v-if="nowQuestion >= 1">
                    <div class="answer__target">
                        <button
                            :class="{'answer__btn--active': myAns.target === 101}"
                            @click="qAns('q-target', 101)"
                        >
                            <img v-if="myAns.target === 101" src="@/assets/img/svg/experience/Q-icon1-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon1.svg" />
                            <span>子女教育基金</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 102}"
                            @click="qAns('q-target', 102)"
                        >
                            <img v-if="myAns.target === 102" src="@/assets/img/svg/experience/Q-icon2-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon2.svg" />
                            <span>購屋頭期款</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 103}"
                            @click="qAns('q-target', 103)"
                        >
                            <img
                                v-if="myAns.target === 103"
                                src="@/assets/img/svg/experience/Q-icon3-active.svg"
                                class="A-q1__svg3"
                            />
                            <img v-else src="@/assets/img/svg/experience/Q-icon3.svg" class="A-q1__svg3" />
                            <span>旅遊基金</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 104}"
                            @click="qAns('q-target', 104)"
                        >
                            <img v-if="myAns.target === 104" src="@/assets/img/svg/experience/Q-icon4-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon4.svg" />
                            <span>樂活退休規劃</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 201}"
                            @click="qAns('q-target', 201)"
                        >
                            <img v-if="myAns.target === 201" src="@/assets/img/svg/experience/Q-icon5-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon5.svg" />
                            <span>樂齡退休月月領</span>
                        </button>
                        <button
                            :class="{'answer__btn--active': myAns.target === 301}"
                            @click="qAns('q-target', 301)"
                        >
                            <img v-if="myAns.target === 301" src="@/assets/img/svg/experience/Q-icon6-active.svg" />
                            <img v-else src="@/assets/img/svg/experience/Q-icon6.svg" />
                            <span>就是想存一筆錢</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="maxRange" v-show="!mobTarget">
            <!-- 第二題組 拉霸 -->
                <template v-if="nowQuestion >= 2">
                    <div class="content__block content__block--q content__block--defaultYear"
                        
                    >
                        <div class="question">
                            <div class="question__lion">
                                <img src="@/assets/img/svg/lion-head.svg" />
                            </div>
                            <p>
                                <textAnime :text="'請問您現在幾歲：'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                            </p>
                        </div>
                        <div class="prompt" v-if="myAns.age === 0">
                            <span>請拖拉</span>
                        </div>
                    </div>
                    <div class="content__block">
                        <div class="answer__slider" v-if="expLightBoxRes">
                            <slider
                                :min="15"
                                :max="82"
                                :initValue="initValue"
                                :r="42"
                                :change.sync="myAns.age"
                                :ifBarChange.sync="barChange"
                                :clearnBar.sync="clearnBar"
                                :barCallScroll.sync="barCallScroll"
                            ></slider>
                        </div>
                    </div>
                    <div class="content__block content__block--right">
                        <div class="answer--default" @click="clickToFocus" :class="{'answer--default--year':barChange}">
                            <p v-if="barChange && myAns.age !== 0 && nowQuestion >= 2">我現在 {{myAns.age}} 歲</p>
                            <p v-else-if="!barChange && inputVal !== '' && myAns.age === 0 && nowQuestion === 2">我現在 {{inputVal}} 歲</p>
                        </div>
                    </div>
                </template>

                <!-- 第三題 資金範圍 -->
                <template v-if="nowQuestion >= 3">
                    <div class="content__block content__block--q">
                        <div class="question question--op"
                            :class="{'waitForQus':Q3AfterScroll}"
                        >
                            <div class="question__lion">
                                <img src="@/assets/img/svg/lion-head.svg" />
                            </div>
                            <p>
                                <textAnime v-if="Q3AfterScroll" :text="'您每月可靈活運用金額為？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                            </p>
                        </div>
                        <div class="prompt prompt__btn" v-if="myAns.range === ''"
                            :class="{'waitForQus':waitForScroll}"
                        >
                            <span>請點擊按鈕</span>
                        </div>
                    </div>
                    <div class="content__block">
                        <div class="answer__range" :class="{'waitForQus':waitForScroll}">
                            <button
                                class="textBtn"
                                :class="{'textBtn--active': myAns.range === '01'}"
                                @click="qAns('q-range', '01')"
                            >5仟以下</button>
                            <button
                                class="textBtn"
                                :class="{'textBtn--active': myAns.range === '02'}"
                                @click="qAns('q-range', '02')"
                            >5仟~1萬</button>
                            <button
                                class="textBtn"
                                :class="{'textBtn--active': myAns.range === '03'}"
                                @click="qAns('q-range', '03')"
                            >1萬~3萬</button>
                            <button
                                class="textBtn"
                                :class="{'textBtn--active': myAns.range === '04'}"
                                @click="qAns('q-range', '04')"
                            >3萬~5萬</button>
                            <button
                                class="textBtn"
                                :class="{'textBtn--active': myAns.range === '05'}"
                                @click="qAns('q-range', '05')"
                            >5萬以上</button>
                        </div>
                    </div>
                    <div class="content__block content__block--right" v-if="myAns.range !== ''">
                        <div class="answer--clickBtn">
                            <p v-if="myAns.range === '01'">我的每月可靈活運用金額為5仟以下</p>
                            <p v-else-if="myAns.range === '02'">我的每月可靈活運用金額為5仟~1萬</p>
                            <p v-else-if="myAns.range === '03'">我的每月可靈活運用金額為1萬~3萬</p>
                            <p v-else-if="myAns.range === '04'">我的每月可靈活運用金額為3萬~5萬</p>
                            <p v-else-if="myAns.range === '05'">我的每月可靈活運用金額為5萬以上</p>
                        </div>
                    </div>
                </template>

    <!-- ============== 2和3系列為第四題組~第六題組, 1系列為第四題組~第五題組 ========================= -->
    <!-- 3系列 -->
                <template v-if="myAns.target === 301">
                    <!-- 投資方式 -->
                    <template v-if="nowQuestion >= 4">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請選擇您要投資的方式為何？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                </p>
                            </div>
                        </div>
                        <div class="content__block">
                            <div class="answer__way" :class="{'waitForQus':waitForQ4}">
                                <button
                                    class="textBtn"
                                    :class="{'textBtn--active': myAns.way === 1}"
                                    @click="qAns('q-way', 1)"
                                >單筆投資規劃</button>
                                <button
                                    class="textBtn"
                                    :class="{'textBtn--active': myAns.way === 2}"
                                    @click="qAns('q-way', 2)"
                                >每月投資規劃</button>
                            </div>
                        </div>
                        <div class="content__block content__block--right" v-if="myAns.way !== 0">
                            <div class="answer--clickBtn">
                                <p v-if="myAns.way === 1">我要單筆投資規劃</p>
                                <p v-else-if="myAns.way === 2">我要每月投資規劃</p>
                            </div>
                        </div>
                    </template>

                    <!-- 投資金額 -->
                    <template v-if="nowQuestion >= 5">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請填入您想要的投資金額為？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <span class="question__inputLimt"
                                        v-show="myAns.way === 1"
                                        :class="{'waitForQus':waitForQ5}"
                                    >(最低{{limitAmt.minProjectAllot | filterDot}})</span>
                                    <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ5}"
                                        v-show="myAns.way === 2"
                                    >(最低{{limitAmt.minProjectRSP | filterDot}})</span>
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editMoney">
                            <div class="answer--default"
                                :class="{'waitForQus':waitForQ5 && myAns.money !== 0, 'answer--onEdit' :ifEdit === 'money'}"
                                @click="clickToFocus"
                            >
                                <p v-if="inputVal === '' && ifEdit === 'money'">____元</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'money'">{{parseInt(inputVal) | filterDot}}元</p>
                                <p v-else-if="nowQuestion > 5 && myAns.money !== 0 && ifEdit !== 'money'">我想要的投資金額為 {{myAns.money | filterDot}} 元</p>
                            </div>
                            <div v-if="myAns.money !== 0" class="answer--edit" @click="editAns('money')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>

                    <!-- 投資年期 -->
                    <template v-if="nowQuestion >= 6">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請填入您想要投資的年期為？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ6}"
                                    >(最少3年)</span>
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editYear">
                            <div class="answer--default"
                                :class="{'waitForQus':waitForQ6 && myAns.year !== 0, 'answer--onEdit':ifEdit === 'year'}"
                                @click="clickToFocus"
                            >
                                <p v-if="inputVal === '' && ifEdit === 'year'">____年</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'year'">{{inputVal}}年</p>
                                <p v-else-if="nowQuestion > 6 && myAns.year !== 0 && ifEdit !== 'year'">我想要的投資年期為 {{myAns.year}} 年</p>
                            </div>
                            <div v-if="myAns.year !== 0" class="answer--edit" @click="editAns('year')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>
                </template>

    <!-- 2系列 -->
                <template v-else-if="myAns.target === 201">
                    <!-- 每月提領金額 -->
                    <template v-if="nowQuestion >= 4">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請填入您每月想提領的金額為？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ4}"
                                    >(最低{{limitAmt.minWealthWdraw | filterDot}})</span>
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editMoney">
                            <div class="answer--default"
                                :class="{'waitForQus':waitForQ4 && myAns.money !== 0, 'answer--onEdit':ifEdit === 'money'}"
                                @click="clickToFocus"
                            >
                                <p v-if="inputVal === '' && ifEdit === 'money'">____元</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'money'">{{parseInt(inputVal) | filterDot}}元</p>
                                <p v-else-if="nowQuestion > 4 && myAns.money !== 0 && ifEdit !== 'money'">我每月想提領的金額為 {{myAns.money | filterDot}} 元</p>
                            </div>
                            <div v-if="myAns.money !== 0" class="answer--edit" @click="editAns('money')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>

                    <!-- 提領年期(原投資年限) -->
                    <template v-if="nowQuestion >= 5">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請填入您想提領的年期為？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ5}"
                                    >(最少3年)</span>
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editYear">
                            <div class="answer--default"
                                :class="{'waitForQus':waitForQ5 && myAns.year !== 0, 'answer--onEdit':ifEdit === 'year'}"
                                @click="clickToFocus"
                            >
                                <p v-if="inputVal === '' && ifEdit === 'year'">____年</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'year'">{{inputVal}}年</p>
                                <p v-else-if="nowQuestion > 5 && myAns.year !== 0 && ifEdit !== 'year'">我想提領的年期為 {{myAns.year}} 年</p>
                            </div>
                            <div v-if="myAns.year !== 0" class="answer--edit" @click="editAns('year')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>

                    <!-- 幾年後開始提領(新增題目)(前端推算開始提領年月) -->
                    <template v-if="nowQuestion >= 6">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請填入您想在幾年後開始提領？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ5}"
                                    >({{whenLimit}})</span>
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editWhen">
                            <div class="answer--default"
                                :class="{'waitForQus':waitForQ5 && myAns.when !== null, 'answer--onEdit':ifEdit === 'when'}"
                                click="clickToFocus"
                            >
                                <p v-if="inputVal === '' && ifEdit === 'when'">____年後</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'when'">{{inputVal}}年後</p>
                                <p v-else-if="nowQuestion > 6 && myAns.when !== null && ifEdit !== 'when'">我想在 {{myAns.when}} 年後開始提領</p>
                            </div>
                            <div v-if="myAns.when !== null" class="answer--edit" @click="editAns('when')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>
                </template>

    <!-- 1系列 -->
                <template v-else>
                    <!-- 目標金額 -->
                    <template v-if="nowQuestion >= 4">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="`請填入您想要的目標金額為？`" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <!-- <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ4}"
                                    >(最低{{limitAmt.minSavingTarget | filterDot}})</span> -->
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editMoney">
                            <div class="answer--default "
                                :class="{'waitForQus':waitForQ4 && myAns.money !== 0, 'answer--onEdit':ifEdit === 'money'}"
                                @click="clickToFocus"
                            >
                                <p v-if="inputVal === '' && ifEdit === 'money'">____元</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'money'">{{parseInt(inputVal) | filterDot}}元</p>
                                <p v-else-if="nowQuestion > 4 && myAns.money !== 0">我想要的目標金額為 {{myAns.money | filterDot}} 元</p>
                            </div>
                            <div v-if="myAns.money !== 0" class="answer--edit" @click="editAns('money')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>

                    <!-- 投資年期 -->
                    <template v-if="nowQuestion >= 5">
                        <div class="content__block content__block--q">
                            <div class="question">
                                <div class="question__lion">
                                    <img src="@/assets/img/svg/lion-head.svg" />
                                </div>
                                <p>
                                    <textAnime :text="'請填入您想投資的年期為？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                                    <span class="question__inputLimt"
                                        :class="{'waitForQus':waitForQ5}"
                                    >(最少3年)</span>
                                </p>
                            </div>
                        </div>
                        <div class="content__block content__block--right" id="editYear">
                            <div class="answer--default"
                                :class="{'waitForQus':waitForQ5 && myAns.year !== 0, 'answer--onEdit': ifEdit === 'year'}"
                                @click="clickToFocus"
                            >
                                <!-- <p v-if="inputVal === '' && myAns.year === 0">____年</p> -->
                                <p v-if="inputVal === '' && ifEdit === 'year'">____年</p>
                                <p v-else-if="inputVal !== '' && ifEdit === 'year'">{{inputVal}}年</p>
                                <p v-else-if="nowQuestion > 5 && myAns.year !== 0 && ifEdit !== 'year'">我想投資的年期為 {{myAns.year}} 年</p>
                            </div>
                            <div v-if="myAns.year !== 0" class="answer--edit" @click="editAns('year')">
                                <img src="@/assets/img/svg/experience/pencil2.svg" />
                            </div>
                        </div>
                    </template>
                </template>
    <!-- ======================================================================================= -->
                
                <!-- 第七(六)題組 風險 -->
                <template v-if="nowQuestion >= 7">
                    <div class="content__block content__block--q">
                        <div class="question">
                            <div class="question__lion">
                                <img src="@/assets/img/svg/lion-head.svg" />
                            </div>
                            <p>
                                <textAnime :text="'假設過去一年以來，原本100萬元台幣的資金投入基金已經損失20%，這時您會？'" :speed="animeSpeed" :animateType="`letterAnimate2`" :firstColor="'#333'" :textColor="'#333'"></textAnime>
                            </p>
                        </div>
                    </div>
                    <div class="content__block">
                        <div class="answer__q6" :class="{'waitForQus':waitForQ7}">
                            <button class="textBtn"
                                :class="{'textBtn--active': myAns.risk === '01'}"
                                @click="qAns('q-risk', '01')"
                            >全部認賠，把所有的錢拿回來</button>
                            <button class="textBtn"
                                :class="{'textBtn--active': myAns.risk === '02'}"
                                @click="qAns('q-risk', '02')"
                            >不會立刻採取行動，再觀望一陣子</button>
                            <button class="textBtn"
                                :class="{'textBtn--active': myAns.risk === '03'}"
                                @click="qAns('q-risk', '03')"
                            >積極以較低的價格加碼進場</button>
                        </div>
                    </div>
                    <div class="content__block content__block--right" v-if="myAns.risk !== ''">
                        <div class="answer--clickBtn">
                            <p v-if="myAns.risk === '01'">我會全部認賠，把所有的錢拿回來</p>
                            <p v-else-if="myAns.risk === '02'">我不會立刻採取行動，再觀望一陣子</p>
                            <p v-else-if="myAns.risk === '03'">我會積極以較低的價格加碼進場</p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="bottomInput"
            v-show="!mobTarget"
        >
            <div class="maxRange"
                :class="{'bottomInput--error': bottomInputError,
                    'bottomInput--finallSend' : calcbottomInput
                }"
            >
                <div v-if="inputVal === '' && isIE" class="bottomInput__placeholder"
                    :class="{'bottomInput__placeholder--error' : bottomInputError}"
                >{{placeholder}}</div>
                <div class="prompt__keyin" v-if="myAns.money === 0"
                    :class="{'waitForQus__bottom':calcWaitForQusBottom}"
                >
                    <span>請用鍵盤輸入</span>
                </div>
                <input id="inp"
                    :ref="`inp`"
                    type="tel"
                    :placeholder="placeholder"
                    :disabled="inpDisable"
                    v-model="inputVal"
                    @keypress="checkIsNumber"
                    @keyup.enter="typeIn"
                />
                <button class="bottomInput__typeIn"
                    :class="{'bottomInput__typeIn--open':openTypeIn}"
                    @mouseover="typeInIsOn = true"
                    @mouseout="typeInIsOn = false"
                    @click="typeIn"
                >
                    <img src="@/assets/img/svg/experience/Q-send.svg" />
                    <span v-if="typeInIsOn && !touchMode" class="bottomInput__typeIn--hover">輸入</span>
                </button>
                <button class="bottomInput__send"
                    :class="{'bottomInput__send--open':openSend,
                        'bottomInput__send--disable':sendRange === 100 && !openSend}"
                    @click="expSend"
                >
                    <span class="bottomInput__send--range"
                        :style="{width: sendRange + '%'}"
                    ></span>
                    <span v-if="sendRange === 100" class="bottomInput__sendText">
                        <span>立即試算</span>
                        <img src="@/assets/img/svg/experience/hand.svg">
                    </span>
                    <span v-else class="bottomInput__sendText">完成{{sendRange}}%</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import slider from '@/components/sildeBar/chooseAgeFinally.vue'
import textAnime from "@/components/textAnime.vue"
import { fillterDot } from "../../filters.js"
export default {
    components: {
        slider,
        textAnime
    },
    props: {
        keyBoard: {
            type: String,
            default: 'off'
        },
        OS: {
            type: String,
            default: 'unCheck'
        }
    },
    data() {
        return {
            nowQuestion: 1,
            mobTarget: null,
            isIE: false,
            touchMode: null,
            windowWidth: null,
            typeInIsOn: false,
            isFirstPrompt: true,
            keyDoing: false,
            startY: null,

            initValue: 15,
            barChange: false, //拉霸是否改變
            clearnBar: true, //是否清除bar
            barCallScroll: true, //首次觸發拉霸時呼叫scroll
            dataColorW: 0, //拉霸寬度

            myAns: {
                target: null,
                age: 0,
                way: 0,
                range: '',
                money: 0,
                year: 0,
                risk: '',
                when: null //可以為0
            },

            limitAmt:{
                //101 102 103 104
                minSavingTarget: null, //理財目標最低
                maxSavingTarget: null, //理財目標最高
                //201
                minWealthWdraw: null, //每月提領最低
                maxWealthWdraw: null, //每月提領最高
                //301
                minProjectAllot: null, //單筆最低
                maxProjectAllot: null, //單筆最高
                minProjectRSP: null, //定期定額最低
                maxProjectRSP: null, //定期定額最高
            },

            questionScroll: false,

            inpDisable: true, //鎖定輸入框
            inputVal: '', //初始值
            placeholder: ' 請選擇投資目標',
            openSend: false, //允許送出
            openTypeIn: false, //允許輸入按鈕
            bottomInputError: false, //檢核警示框
            ifEdit: '', //是否修改答案
            
            animeSpeed: 40, //問句字體動畫時間
            textAnimeWait: 500, //回答延遲時間
            Q3AfterScroll: false, //控制Q3先產生dom再打開opacity
            waitForScroll: false, //控制回答opacity開關
            waitForQ4: false,
            waitForQ5: false,
            waitForQ6: false,
            waitForQ7: false
        }
    },
    watch: {
        inpDisable(newVal){
            const inp = this.$refs[`inp`];
            if(newVal === true) inp.blur();
        },
        inputVal(newValue) {
            if(newValue) this.inputVal = newValue.replace(/[^0-9]/g,'');
        },
        expLightBoxRes(val){
            const windowW = document.body.clientWidth;
            if (val === false) {
                setTimeout(() => {
                    this.myAns = {
                        target:null,
                        age: 0,
                        way: 0,
                        range: '',
                        money: 0,
                        year: 0,
                        risk: '',
                        when: null
                    };
                },500);
                this.nowQuestion = 1;
                this.initValue = 15;
                this.clearnBar = true;
                this.barChange = false;
                this.barCallScroll = true;
                this.$refs[`content`].scrollTop = 0;
                this.placeholder = ' 請選擇投資目標';
                this.openSend = false;
                this.openTypeIn = false;
                this.bottomInputError = false;
                this.ifEdit = '';
                this.inpDisable = true;
                this.inputVal = '';
                this.Q3AfterScroll = false; //控制Q3先產生dom再打開opacity
                this.waitForScroll = false; //控制回答opacity開關
                this.waitForQ4 = false;
                this.waitForQ5 = false;
                this.waitForQ6 = false;
                this.waitForQ7 = false;
                this.boxOpen = false;
                setTimeout(() => {
                    if(windowW < 1024) this.mobTarget = true;
                },500);
            }
        },
        barChange(val) { //touchmove時觸發
            if (val && this.nowQuestion === 2) {
                this.nowQuestion = 3;
                if(this.myAns.age === 0){
                    this.myAns.age = 15;
                }
            }
        },
        barCallScroll(val){ //touchend時觸發
            if(val === false && this.nowQuestion === 3){
                this.$nextTick(()=>{
                    this.setUiDatas('請點擊上方按鈕', true, false, null, false, null);
                    
                    setTimeout(() => {
                        this.scrollToBottom();
                    }, 50);
                });
                this.Q3AfterScroll = true;
                setTimeout(() => {
                    this.waitForScroll = true;
                }, this.textAnimeWait);
            }
        },
        'myAns.age'(){
            if(this.sendRange === 100 && this.openSend){
                const copyDatas =JSON.parse(JSON.stringify(this.myAns));
                const {target, year, age, when} = copyDatas;
                const calcYearAge = year + age + when;
                if(calcYearAge <= 85) this.bottomInputError = false;
                else{
                    if(target === 201) this.placeholder = ' 您的年齡,提領年期,幾年後提領,相加不得大於85';
                    else this.placeholder = ' 您的年齡加上投資年期不得大於85';
                    this.bottomInputError = true;
                }
            }
        }
    },
    computed:{
        _keyBoard:{
            get() {
                return this.keyBoard;
            },
            set(newValue) {
                this.$emit('update:keyBoard', newValue);
            }
        },
        _OS:{
            get() {
                return this.OS;
            },
            set(newValue) {
                this.$emit('update:OS', newValue);
            }
        },
        calcWaitForQusBottom(){
            if(this.myAns.target === 301){
                if(this.waitForQ5) return true;
                else return false;
            }else{
                if(this.waitForQ4) return true;
                else return false;
            }
        },
        calcbottomInput(){
            if(this.sendRange === 100 && !this.bottomInputError){
                if(this.ifEdit === '') return true;
                else return false;
            }else{
                return false;
            }
        },
        calcFirstPrompt(){
            if(this.expLightBoxRes && this.isFirstPrompt) return true;
            else return false;
        },
        whenLimit(){
            const calc =  85 - (this.myAns.age + this.myAns.year);
            if(calc < 0) return '您的年齡,提領年期,幾年後提領,相加不得大於85,請重新調整';
            else return `您目前條件最多${calc}年`;
        },
        whenLimitNum(){
            const calc =  85 - (this.myAns.age + this.myAns.year);
            if(calc < 0) return 0;
            else return calc;
        },
        sendRange(){
            let calc, specal;
            if(this.myAns.target === 301 || this.myAns.target === 201){
                calc = (100 / 8) * (this.nowQuestion);
            }else if(this.myAns.target === null){
                calc = 0;
            }else{
                specal = this.nowQuestion >= 7 ?  this.nowQuestion - 1 : this.nowQuestion;
                calc = (100 / 7) * specal;
            }
            return Math.round(calc);
        },
        ...mapGetters([
            "expLightBoxRes",
        ])
    },
    methods:{
        iKnow(){
            sessionStorage.setItem('isFirstPrompt', 'N');
            this.isFirstPrompt = false;
        },
        checkIsNumber(event) {
            const invalidChars = ["-", "e", "+", "E"];
            if (invalidChars.includes(event.key) || !this.validateNumber(event)) {
                event.preventDefault();
            }
            if (event.key === "." && !String(event.target.value)) {
                event.target.value = "";
                event.preventDefault();
            }
        },
        validateNumber(event) {
            const key = window.event ? event.keyCode : event.which;
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true;
            } else if (key < 48 || key > 57) {
                return false;
            } else {
                return true;
            }
        },
        setUiDatas(PH, IDA, OTI, IFC, BIE, IED){
            // (placeholder, inpDisable, openTypeIn, #inp focus(), bottomInputError, ifEdit)
            if(PH !== null) this.placeholder = ' '+PH;
            if(IDA !== null) this.inpDisable = IDA;
            if(OTI !== null) this.openTypeIn = OTI;
            if(IFC === true) {
                this.$nextTick(()=>{
                    document.getElementById("inp").focus();
                });
            }
            if(BIE !== null) this.bottomInputError = BIE;
            if(IED !== null) this.ifEdit = IED;
        },
        editAns(type){
            let fillterVal;
            this.setUiDatas(null, false, true, true, false, type);
            if(this.sendRange === 100) this.openSend = false;
            switch (this.myAns.target) {
                case 301:
                    if(type === 'money' && this.myAns.way === 1){
                        fillterVal = fillterDot(this.limitAmt.minProjectAllot);
                        this.placeholder = ` 請輸入單筆投資金額(最低${fillterVal})`;
                        this.inputVal = String(this.myAns.money);
                    }else if(type === 'money' && this.myAns.way === 2){
                        fillterVal = fillterDot(this.limitAmt.minProjectRSP);
                        this.placeholder = ` 請輸入每月投資金額(最低${fillterVal})`;
                        this.inputVal = String(this.myAns.money);
                    }else if(type === 'year'){
                        this.placeholder = ' 請輸入投資年期(最少3年)';
                        this.inputVal = String(this.myAns.year);
                    }
                    break;
                case 201:
                    if(type === 'money'){
                        fillterVal = fillterDot(this.limitAmt.minWealthWdraw);
                        this.placeholder = ` 請輸入每月提領金額(最低${fillterVal})`;
                        this.inputVal = String(this.myAns.money);
                    }else if(type === 'year'){
                        this.placeholder = ' 請輸入投資年期(最少3年)';
                        this.inputVal = String(this.myAns.year);
                    }else if(type === 'when'){
                        this.placeholder = ' 請輸入幾年後開始提領';
                        this.inputVal = String(this.myAns.when);
                    }
                    break;
                default:
                    if(type === 'money'){
                        fillterVal = fillterDot(this.limitAmt.minSavingTarget);
                        this.placeholder = ` 請輸入目標金額`;
                        this.inputVal = String(this.myAns.money);
                    }else if(type === 'year'){
                        this.placeholder = ' 請輸入投資年期(最少3年)';
                        this.inputVal = String(this.myAns.year);
                    }
                    break;
            }
        },
        keyBoardOn(){
            if(this.touchMode === true && this.ifEdit === ''){ //非修改狀態
                if(this._OS === 'android'){
                    this._keyBoard = 'android--on';
                    setTimeout(()=>{
                        this.scrollToBottom();
                    }, 800);
                }else if(this._OS === 'ios' && this.nowQuestion === 2){
                    if(this.windowWidth < 768){
                        this._keyBoard = 'ios--on';
                        if(this.windowWidth <= 375){
                            setTimeout(()=>{
                                document.documentElement.scrollTop = 185; //注意!!!平板跟手機不同，這是手機
                                document.body.scrollTop = 185; //注意!!!平板跟手機不同，這是手機 185;
                            }, 50);
                        }else{
                            setTimeout(()=>{
                                document.documentElement.scrollTop = 150; //注意!!!平板跟手機不同，這是手機
                            }, 50);
                        }
                        
                        
                    }else{
                        this._keyBoard = 'pad--on';
                        setTimeout(()=>{
                            document.body.scrollTop = 0; //注意!!!平板跟手機不同，這是平板
                        }, 50);
                    }
                    setTimeout(()=>{
                        this.scrollToBottom();
                    }, 500);
                }else if(this._OS === 'ios' && this.nowQuestion > 2){
                    const vm = this;
                    let oneByOne = function(){ //連續開虛擬鍵盤
                        if(vm.windowWidth < 768){
                            vm._keyBoard = 'ios--on3';
                            let all;
                            if(vm.windowWidth <= 375){
                                setTimeout(()=>{
                                    all = document.body.scrollHeight;
                                    document.body.scrollTop  = all - 400; //注意!!!平板跟手機不同，這是手機
                                }, 50);
                            }else{
                                setTimeout(()=>{
                                    all = document.documentElement.scrollHeight;
                                    document.documentElement.scrollTop = all - 400; //注意!!!平板跟手機不同，這是手機
                                }, 50);
                            }
                        }else{
                            vm._keyBoard = 'pad--on';
                            setTimeout(()=>{
                                document.body.scrollTop = 100; //注意!!!平板跟手機不同，這是平板
                            }, 50);
                        }
                    }

                    let oneToNext = function(){
                        if(vm.windowWidth < 768){
                            vm._keyBoard = 'ios--on3';
                        }else{
                            vm._keyBoard = 'pad--on';
                            setTimeout(()=>{
                                document.body.scrollTop = 100; //注意!!!平板跟手機不同，這是平板
                            }, 50);
                        }
                    }
                    if(this.myAns.target === 201){
                        if(this.nowQuestion === 4 || this.nowQuestion === 5 || this.nowQuestion === 6){
                            oneByOne();
                        }else{
                            oneToNext();
                        }
                    }else if(this.myAns.target === 301){
                        if(this.nowQuestion === 5 || this.nowQuestion === 6){
                            oneByOne();
                        }else{
                            oneToNext();
                        }
                    }else{
                        if(this.nowQuestion === 4 || this.nowQuestion === 5){
                            oneByOne();
                        }else{
                            oneToNext();
                        }
                    }
                }
            }else if(this.touchMode === true && this.ifEdit !== ''){ //修改狀態
                let target;
                switch (this.ifEdit) {
                    case 'money':
                        target = document.getElementById("editMoney").offsetTop;
                        break;
                    case 'year':
                        target = document.getElementById("editYear").offsetTop;
                        break;
                    case 'when':
                        target = document.getElementById("editWhen").offsetTop;
                        break;
                }
                if(this._OS === 'ios'){
                        if(this.windowWidth < 768){
                            this._keyBoard = 'ios--on3';
                            let all;
                            if(this.windowWidth <= 375){
                                setTimeout(()=>{
                                    all = document.body.scrollHeight;
                                    document.body.scrollTop  = all - 400; //注意!!!平板跟手機不同，這是手機
                                    // document.body.scrollTop = 400;
                                }, 50);
                            }else{
                                setTimeout(()=>{
                                    all = document.documentElement.scrollHeight;
                                    document.documentElement.scrollTop = all - 400; //注意!!!平板跟手機不同，這是手機
                                }, 50);
                            }
                        }else{
                            this._keyBoard = 'pad--on';
                            setTimeout(()=>{
                                document.body.scrollTop = 100; //注意!!!平板跟手機不同，這是平板
                            }, 50);
                        }

                    target += 50;
                    setTimeout(()=>{
                        this.scrollToBottom(target, 'ios');
                    }, 500);
                    
                }else if(this._OS === 'android'){
                    target -= 190;
                    setTimeout(()=>{
                        this.scrollToBottom(target, 'android');
                    }, 500);
                }
            }
            
        },
        keyBoardOff(){
            if(this.touchMode === true){
                this._keyBoard = 'off';
                if(this._OS === 'ios'){
                    if(this.windowWidth <= 375){
                        setTimeout(()=>{
                            document.body.scrollTop = 0; //注意!!!平板跟手機不同
                        }, 50);
                    }else if(this.windowWidth < 768 && this.windowWidth > 375){
                        setTimeout(()=>{
                            document.documentElement.scrollTop = 0; //注意!!!平板跟手機不同
                        }, 50);
                    }else{
                        setTimeout(()=>{
                            document.body.scrollTop = 0;
                        }, 50);
                    }
                }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
        clickToFocus(){
            this.ifEdit = '';
            document.getElementById('inp').focus();
        },
        calcWindowW(){
            const windowW = document.body.clientWidth;
            if(this.windowWidth !== windowW){
                if(windowW < 1024){
                    if(this.nowQuestion === 1) this.mobTarget = true;
                    else this.mobTarget = false;
                }else{
                    this.mobTarget = null;
                }
                this.windowWidth = windowW;
            }
        },
        mobchangeTarget(type){
            this.mobTarget = type;
        },
        expSend(){
            const copyDatas =JSON.parse(JSON.stringify(this.myAns));
            const {target, way, money, year, age, when} = copyDatas;
            const calcYearAge = year + age + when;
            let fillterVal;
            let expDatas;

            const onlyFor301 = (limit, text) => {
                fillterVal = fillterDot(limit); //注意這裡條件都不同
                this.placeholder = ` ${text}${fillterVal}`;
                this.bottomInputError = true;
            }
            
            if(this.openSend && calcYearAge <= 85){
                if(target === 301){
                    if(way === 1 && money < this.limitAmt.minProjectAllot){
                        onlyFor301(this.limitAmt.minProjectAllot, '單筆投資金額不得小於'); //注意這裡內容都不同
                        
                    }else if(way === 1 && money > this.limitAmt.maxProjectAllot){
                        onlyFor301(this.limitAmt.maxProjectAllot, '單筆投資金額不得大於');
                        
                    }else if(way === 2 && money < this.limitAmt.minProjectRSP){
                        onlyFor301(this.limitAmt.minProjectRSP, '每月投資金額不得小於');
                        
                    }else if(way === 2 && money > this.limitAmt.maxProjectRSP){
                        onlyFor301(this.limitAmt.maxProjectRSP, '每月投資金額不得大於');
                        
                    }else{  //合格
                        this.bottomInputError = false;
                        expDatas = JSON.stringify(copyDatas);
                        sessionStorage.setItem('expDatas', expDatas);
                        this.toggleExpLightBox(false);
                        this.toggleLoading(true);
                        setTimeout(() => {
                            this.$router.push({path:'/dashboard/experience'});
                        }, 500);
                    }
                }else{ //合格
                    expDatas = JSON.stringify(copyDatas);
                    sessionStorage.setItem('expDatas', expDatas);
                    this.toggleExpLightBox(false);
                    this.toggleLoading(true);
                    setTimeout(() => {
                        this.$router.push({path:'/dashboard/experience'});
                    }, 500);
                }
            }else if(this.openSend && calcYearAge > 85){
                if(target === 201) this.placeholder = ' 您的年齡,提領年期,幾年後提領,相加不得大於85';
                else this.placeholder = ' 您的年齡加上投資年期不得大於85';
                this.bottomInputError = true;
            }
        },
        scrollToBottom(where, os) {
            const view = this.$refs[`content`];
            const {scrollHeight:newAll, clientHeight:clientH} = view;
            let finall;
            if(os === 'ios') finall = where - clientH;
            else if(os === 'android') finall = where;
            else finall = newAll - clientH; //全高 - 可見範圍高 = 卷軸可捲動範圍
            
            let now = view.scrollTop;
            if (!view.requestAnimationFrame) {
                view.requestAnimationFrame = function (callback) {
                    return setTimeout(callback, 17);
                };
            }
            const step = () => {
                let distance = finall - now;

                now = now + distance / 5;
                if (Math.abs(distance) < 1) {
                    view.scrollTop = finall;
                } else {
                    view.scrollTop = now;
                    requestAnimationFrame(step);
                }
            };
            step();
        },
        qAns(type, n) {
            const windowW = document.body.clientWidth;
            const nowQ = this.nowQuestion;
            let fillterVal;

            switch (type) {
                case 'q-target':{
                    const lastTarget = this.myAns.target;
                    this.myAns.target = n;
                    if(windowW < 1024) this.mobTarget = false;
                    else this.mobTarget = null;
                    
                    if(this.myAns.age === 0){
                        this.nowQuestion = 2;
                        this.setUiDatas('請輸入或拖拉年齡條', false, true, true, null, null);
                        if(this.touchMode === false){
                            setTimeout(() => {
                                this.scrollToBottom();
                            }, 50);   
                        }
                    }else if(this.myAns.age > 0 && this.myAns.range !== '' && lastTarget !== n){
                        this.myAns.way = 0;
                        // this.myAns.range = '';
                        this.myAns.money = 0;
                        this.myAns.year = 0;
                        this.myAns.risk = '';
                        this.myAns.when = null;
                        this.nowQuestion = 3;
                        // this.openSend = false;
                        // this.openTypeIn = false;
                        // this.bottomInputError = false;
                        // this.inpDisable = true;
                        this.inputVal = '';
                        // this.placeholder = ' 請點擊上方按鈕';
                        if(n === 301) this.setUiDatas(`請點擊上方按鈕`, true, false, false, null, null);
                        else this.setUiDatas(`請輸入目標金額`, false, true, true, null, null);
                        // this.Q3AfterScroll = false; //控制Q3先產生dom再打開opacity
                        // this.waitForScroll = false; //控制回答opacity開關
                        // this.waitForQ4 = false;
                        this.waitForQ5 = false;
                        this.waitForQ6 = false;
                        setTimeout(() => {
                            this.nowQuestion = 4;
                            this.Q3AfterScroll = true;
                            this.$nextTick(()=>{
                                this.scrollToBottom();
                            });
                        }, 50);
                        setTimeout(() => {
                            this.waitForScroll = true;
                        }, this.textAnimeWait);
                    }
                    break;}
                case 'q-range':{
                    this.myAns.range = n;
                    if(nowQ < 4){
                        this.nowQuestion = 4;
                        if(windowW <1024){
                            setTimeout(() => {
                                this.scrollToBottom();
                            }, 500);
                        }else{
                            setTimeout(() => {
                                this.scrollToBottom();
                            }, 50);
                        }
                        
                        setTimeout(() => {
                            this.waitForQ4 = true;
                        }, this.textAnimeWait);
                        if(this.myAns.target===301){
                            this.placeholder = ' 請選擇投資方式';
                        }else if(this.myAns.target===201){
                            fillterVal = fillterDot(this.limitAmt.minWealthWdraw);
                            this.setUiDatas(`請輸入每月提領金額(最低${fillterVal})`, false, true, true, null, null);
                        }else{
                            fillterVal = fillterDot(this.limitAmt.minSavingTarget);
                            // this.setUiDatas(`請輸入目標金額(最低${fillterVal})`, false, true, true, null, null);
                            this.setUiDatas(`請輸入目標金額`, false, true, true, null, null);
                        }
                    }
                }
                    break;
                case 'q-way':
                    this.myAns.way = n;
                    if(nowQ <= 5){
                        this.nowQuestion = 5;
                        if(windowW <1024){
                            setTimeout(() => {
                                this.scrollToBottom();
                            }, 500);
                        }else{
                            setTimeout(() => {
                                this.scrollToBottom();
                            }, 50);
                        }
                        setTimeout(() => {
                            this.waitForQ5 = true;
                        }, this.textAnimeWait);
                        
                        if(this.myAns.way === 1){
                            fillterVal = fillterDot(this.limitAmt.minProjectAllot);
                            this.setUiDatas(`請輸入單筆投資金額(最低${fillterVal})`, false, true, true, null, null);
                        }else{
                            fillterVal = fillterDot(this.limitAmt.minProjectRSP);
                            this.setUiDatas(`請輸入每月投資金額(最低${fillterVal})`, false, true, true, null, null);
                        }
                    }
                    break;
                case 'q-risk':
                    this.myAns.risk = n;
                    this.nowQuestion = 8;
                    this.setUiDatas('請點擊「立即試算」', true, false, null, null, null);
                    this.openSend = true;
                    setTimeout(() => {
                        this.scrollToBottom();
                    }, 50);
                    break;
            }

        },
        typeIn() {
            const numVal = Math.floor(Number(this.inputVal));
            const val = this.inputVal;
            const clacAgeYear = Number(this.myAns.age) + numVal;
            const editType = this.ifEdit;
            const nowQ = this.nowQuestion;
            const {minSavingTarget, maxSavingTarget, minWealthWdraw, maxWealthWdraw, minProjectAllot, maxProjectAllot, minProjectRSP, maxProjectRSP} = this.limitAmt;
            let fillterVal;
            
            if(this.ifEdit === '' && val !== ''){ //非修改狀態且有值
                if(nowQ === 2){
                    if(numVal <= 82 && numVal >=15){ //合格
                        this.myAns.age = numVal;
                        this.barChange = true;
                        this.barCallScroll = false;
                        this.initValue = numVal;
                        this.inputVal = '';
                        this.bottomInputError = false;
                    }else{
                        this.setUiDatas('年齡需介於15~82歲之間', false, true, true, true, null);
                    }
                    
                }
                switch (this.myAns.target) {
                    case 301:
                        switch (nowQ) {
                            case 5: //第五題
                                switch (this.myAns.way) {
                                    case 1: //單筆
                                        if(numVal >= minProjectAllot && numVal <= maxProjectAllot){ //單筆合格
                                            this.nowQuestion = 6;
                                            setTimeout(() => {
                                                this.scrollToBottom();
                                            }, 50);
                                            setTimeout(() => {
                                                this.waitForQ6 = true;
                                            }, this.textAnimeWait);
                                            this.myAns.money = numVal;
                                            this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, false, null);

                                        }else if(numVal < minProjectAllot){
                                            fillterVal = fillterDot(minProjectAllot);
                                            this.placeholder = ` 單筆投資金額不得小於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();

                                        }else if(numVal > maxProjectAllot){
                                            fillterVal = fillterDot(maxProjectAllot);
                                            this.placeholder = ` 單筆投資金額不得大於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();
                                        }
                                        break;
                                
                                    case 2: //定期
                                        if(numVal >= minProjectRSP && numVal <= maxProjectRSP){ //定期合格
                                            this.nowQuestion = 6;
                                            setTimeout(() => {
                                                this.scrollToBottom();
                                            }, 50);
                                            setTimeout(() => {
                                                this.waitForQ6 = true;
                                            }, this.textAnimeWait);
                                            this.myAns.money = numVal;
                                            this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, false, null);

                                        }else if(numVal < minProjectRSP){
                                            fillterVal = fillterDot(minProjectRSP);
                                            this.placeholder = ` 每月投資金額不得小於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();

                                        }else if(numVal > maxProjectRSP){
                                            fillterVal = fillterDot(maxProjectRSP);
                                            this.placeholder = ` 每月投資金額不得大於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();
                                        }
                                        break;
                                }
                                break;

                            case 6: //第六題
                                if(numVal < 3){
                                    this.inputVal = '';
                                    this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, true, null);

                                }else if(clacAgeYear > 85){
                                    this.inputVal = '';
                                    this.setUiDatas('您的年齡加上投資年期不得大於85', null, null, true, true, null);

                                }else if(numVal >= 3 && clacAgeYear <= 85){ //合格
                                    this.nowQuestion = 7;
                                    setTimeout(() => {
                                        this.scrollToBottom();
                                    }, 50);
                                    setTimeout(() => {
                                        this.waitForQ7 = true;
                                    }, this.textAnimeWait);
                                    this.myAns.year = numVal;
                                    this.setUiDatas('請點擊上方按鈕', true, false, null, false, null);
                                }
                                break;
                        }
                        break;
                    case 201:
                        switch (nowQ) {
                            case 4: //第四題
                                if(numVal >= minWealthWdraw && numVal <= maxWealthWdraw){ //合格
                                    this.nowQuestion = 5;
                                    setTimeout(() => {
                                        this.scrollToBottom();
                                    }, 50);
                                    setTimeout(() => {
                                        this.waitForQ5 = true;
                                    }, this.textAnimeWait);
                                    this.myAns.money = numVal;
                                    this.setUiDatas('請輸入提領年期(最少3年)', null, null, true, false, null);

                                }else if(numVal < minWealthWdraw){
                                    fillterVal = fillterDot(minWealthWdraw);
                                    this.setUiDatas(`輸入金額不得小於${fillterVal}`, null, null, true, true, null);

                                }else if(numVal > maxWealthWdraw){
                                    fillterVal = fillterDot(maxWealthWdraw);
                                    this.setUiDatas(`輸入金額不得大於${fillterVal}`, null, null, true, true, null);
                                }
                                break;
                        
                            case 5: //第五題
                                if(numVal >= 3 && clacAgeYear <= 85){ //合格
                                    this.nowQuestion = 6;
                                    setTimeout(() => {
                                        this.scrollToBottom();
                                    }, 50);
                                    setTimeout(() => {
                                        this.waitForQ6 = true;
                                    }, this.textAnimeWait);
                                    this.myAns.year = numVal;
                                    this.setUiDatas('請輸入幾年後開始提領', null, null, true, false, null);

                                }else if(numVal < 3){
                                    this.inputVal = '';
                                    this.setUiDatas('請輸入提領年期(最少3年)', null, null, true, true, null);

                                }else if(clacAgeYear > 85){
                                    this.inputVal = '';
                                    this.setUiDatas('您的年齡加上提領年期不得大於85', null, null, true, true, null);
                                    
                                }
                                break;

                            case 6: //第六題
                                if(numVal >= 0 && numVal <= this.whenLimitNum){ //合格
                                    this.nowQuestion = 7;
                                    setTimeout(() => {
                                        this.scrollToBottom();
                                    }, 50);
                                    setTimeout(() => {
                                        this.waitForQ7 = true;
                                    }, this.textAnimeWait);
                                    this.myAns.when = numVal;
                                    this.setUiDatas('請點擊上方按鈕', true, false, true, false, null);
                                }else{
                                    this.inputVal = '';
                                    this.setUiDatas(`${this.whenLimit}`, false, true, true, true, null);
                                }
                                break;
                        }
                        break;
                    default: //101 102 103 104
                        switch (nowQ) {
                            case 4: //第四題
                                if(numVal >= minSavingTarget && numVal <= maxSavingTarget){ //合格
                                    this.nowQuestion = 5;
                                    setTimeout(() => {
                                        this.scrollToBottom();
                                    }, 50);
                                    setTimeout(() => {
                                        this.waitForQ5 = true;
                                    }, this.textAnimeWait);
                                    this.myAns.money = numVal;
                                    this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, false, null);

                                }else if(numVal < minSavingTarget){
                                    fillterVal = fillterDot(minSavingTarget);
                                    this.setUiDatas(`輸入金額不得小於${fillterVal}`, null, null, true, true, null);

                                }else if(numVal > maxSavingTarget){
                                    fillterVal = fillterDot(maxSavingTarget);
                                    this.setUiDatas(`輸入金額不得大於${fillterVal}`, null, null, true, true, null);
                                }
                                break;
                        
                            case 5: //第五題
                                if(numVal >= 3 && clacAgeYear <= 85){ //合格
                                    this.nowQuestion = 7; //這裡沒有6 所以直接跳到7
                                    setTimeout(() => {
                                        this.scrollToBottom();
                                    }, 50);
                                    setTimeout(() => {
                                        this.waitForQ7 = true;
                                    }, this.textAnimeWait);
                                    this.myAns.year = numVal;
                                    this.setUiDatas('請點擊上方按鈕', true, false, null, false, null);

                                }else if(numVal < 3){
                                    this.inputVal = '';
                                    this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, true, null);

                                }else if(clacAgeYear > 85){
                                    this.inputVal = '';
                                    this.setUiDatas('您的年齡加上投資年期不得大於85', null, null, true, true, null);
                                }
                                break;
                        }
                        break;
                }
            }else{
                switch (this.myAns.target) {
                    case 301:
                        switch (editType) {
                            case 'money':
                                switch (this.myAns.way) {
                                    case 1:
                                        if(numVal >= minProjectAllot && numVal <= maxProjectAllot){ //合格
                                            this.myAns.money = numVal;
                                            switch (nowQ) {
                                                case 6:
                                                    this.setUiDatas('請輸入投資年期(最少3年)', false, true, true, false, '');
                                                    break;
                                                case 7:
                                                    this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                                    break;
                                                case 8:
                                                    this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                                    this.openSend = true;
                                                    break;
                                            }
                                            this.scrollToBottom();
                                        }else if(numVal < minProjectAllot){
                                            fillterVal = fillterDot(minProjectAllot);
                                            this.placeholder = ` 單筆投資金額不得小於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();

                                        }else if(numVal > maxProjectAllot){
                                            fillterVal = fillterDot(maxProjectAllot);
                                            this.placeholder = ` 單筆投資金額不得大於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();
                                        }
                                        break;
                                
                                    case 2:
                                        if(numVal >= minProjectRSP && numVal <= maxProjectRSP){ //合格
                                            this.myAns.money = numVal;
                                            switch (nowQ) {
                                                case 6:
                                                    this.setUiDatas('請輸入投資年期(最少3年)', false, true, true, false, '');
                                                    break;
                                                case 7:
                                                    this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                                    break;
                                                case 8:
                                                    this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                                    this.openSend = true;
                                                    break;
                                            }
                                            this.scrollToBottom();
                                        }else if(numVal < minProjectRSP){
                                            fillterVal = fillterDot(minProjectRSP);
                                            this.placeholder = ` 每月投資金額不得小於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();

                                        }else if(numVal > maxProjectRSP){
                                            fillterVal = fillterDot(maxProjectRSP);
                                            this.placeholder = ` 每月投資金額不得大於${fillterVal}`;
                                            this.bottomInputError = true;
                                            document.getElementById("inp").focus();
                                        }
                                        break;
                                }
                                break;
                            case 'year':
                                if(numVal >= 3 && clacAgeYear <= 85){ //合格
                                    this.myAns.year = numVal;
                                    if(nowQ === 7){
                                        this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                    }else if(nowQ === 8){
                                        this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                        this.openSend = true;
                                    }
                                    this.scrollToBottom();
                                }else if(clacAgeYear > 85){
                                    this.setUiDatas('您的年齡加上投資年期不得大於85', null, null, true, true, null);

                                }else if(numVal < 3){
                                    this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, true, null);
                                }
                                break;
                        }
                        break;
                    case 201:
                        switch (editType) {
                            case 'money':
                                if(numVal >= minWealthWdraw && numVal <= maxWealthWdraw){ //合格
                                    this.myAns.money = numVal;
                                    switch (nowQ) {
                                        case 5:
                                            this.setUiDatas('請輸入投資年期(最少3年)', false, true, true, false, '');
                                            break;
                                        case 6:
                                            this.setUiDatas('請輸入幾年後開始提領', false, true, true, false, '');
                                            break;
                                        case 7:
                                            this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                            break;
                                        case 8:
                                            this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                            this.openSend = true;
                                            break;
                                    }
                                    this.scrollToBottom();
                                }else if(numVal < minWealthWdraw){
                                    fillterVal = fillterDot(minWealthWdraw);
                                    this.placeholder = ` 金額不得小於${fillterVal}`;
                                    this.bottomInputError = true;
                                    document.getElementById("inp").focus();

                                }else if(numVal > maxWealthWdraw){
                                    fillterVal = fillterDot(maxWealthWdraw);
                                    this.placeholder = ` 金額不得大於${fillterVal}`;
                                    this.bottomInputError = true;
                                    document.getElementById("inp").focus();
                                }
                                break;
                            case 'year':
                                if(numVal >= 3 && clacAgeYear <= 85){ //合格
                                    this.myAns.year = numVal;
                                    switch (nowQ) {
                                        case 6:
                                            this.setUiDatas('請輸入幾年後開始提領', false, true, true, false, '');
                                            break;
                                        case 7:
                                            this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                            break;
                                        case 8:
                                            this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                            this.openSend = true;
                                            break;
                                    }
                                    this.scrollToBottom();
                                }else if(numVal < 3){
                                    this.setUiDatas('請輸入提領年期(最少3年)', null, null, true, true, null);

                                }else if(clacAgeYear > 85){
                                    this.setUiDatas('您的年齡加上提領年期不得大於85', null, null, true, true, null);
                                }
                                break;
                            case 'when':
                                if(numVal >= 0 && numVal <= this.whenLimitNum){ //合格
                                    this.myAns.when = numVal;
                                    if(nowQ === 7){
                                        this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                    }else if(nowQ === 8){
                                        this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                        this.openSend = true;
                                    }
                                    this.scrollToBottom();
                                }else{
                                    this.inputVal = '';
                                    this.setUiDatas(`${this.whenLimit}`, false, true, true, true, null);
                                }
                                break;
                        }
                        break;
                    default:
                        switch (editType) {
                            case 'money':
                                if(numVal >= minSavingTarget && numVal <= maxSavingTarget){ //合格
                                    this.myAns.money = numVal;
                                    switch (nowQ) {
                                        case 5:
                                            this.setUiDatas('請輸入投資年期(最少3年)', false, true, true, false, '');
                                            break;
                                        //saving沒有6
                                        case 7:
                                            this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                            break;
                                        case 8:
                                            this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                            this.openSend = true;
                                            break;
                                    }
                                    this.scrollToBottom();
                                }else if(numVal < minSavingTarget){
                                    fillterVal = fillterDot(minSavingTarget);
                                    this.placeholder = ` 金額不得小於${fillterVal}`;
                                    this.bottomInputError = true;
                                    document.getElementById("inp").focus();
                                }else if(numVal > maxSavingTarget){
                                    fillterVal = fillterDot(maxSavingTarget);
                                    this.placeholder = ` 金額不得大於${fillterVal}`;
                                    this.bottomInputError = true;
                                    document.getElementById("inp").focus();
                                }
                                break;
                            case 'year':
                                if(numVal >= 3 && clacAgeYear <= 85){ //合格
                                    this.myAns.year = numVal;
                                    if(nowQ === 7){
                                        this.setUiDatas('請點擊上方按鈕', true, false, null, false, '');
                                    }else if(nowQ === 8){
                                        this.setUiDatas('請點擊「立即試算」', true, false, null, false, '');
                                        this.openSend = true;
                                    }
                                    this.scrollToBottom();
                                }else if(numVal < 3){
                                    this.setUiDatas('請輸入投資年期(最少3年)', null, null, true, true, null);

                                }else if(clacAgeYear > 85){
                                    this.setUiDatas('您的年齡加上投資年期不得大於85', null, null, true, true, null);
                                }
                                break;
                        }
                        break;
                }
            }
            this.inputVal = '';
        },
        checkIsIE(){
            const userAgent = navigator.userAgent;
            const isOpera = userAgent.indexOf("Opera") > -1; 
            const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
            const isIE11 = (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0);
            if(isIE || isIE11) this.isIE = true;
        },
        checkOS(){
            const u = navigator.userAgent;
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android
            const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
            if(isAndroid) this._OS = 'android';
            else if(isiOS) this._OS = 'ios';
        },
        checkIsTouchMode(){
            try { document.createEvent("TouchEvent"); this.touchMode = true; }
            catch (e) { this.touchMode = false; }
        },
        getlimitAmt(){
            const limitAmt =JSON.parse(sessionStorage.getItem('limitAmt')) ;
            if(!limitAmt){
                setTimeout(()=>{
                    this.getlimitAmt()
                },500)
            }else{
                this.limitAmt = limitAmt;
            }
        },
        onTouchstart(e){
            this.startY = e.touches[0].pageY;
        },
        onTouchmove(e){
            if(this.$route.name === 'landingPage'){
                const scrollBox = this.$refs[`content`];
                const startY = this.startY;
                const moveY = e.touches[0].pageY;
                const top = scrollBox.scrollTop;
                const ch = scrollBox.clientHeight;
                const sh = scrollBox.scrollHeight;

                const isChildTarget = function(child, parent, justChild = false) { 
                    // justChild為true則只判斷是否為子元素，若為false則判斷是否為本身或者子元素 默認為false
                    let parentNode;
                    if (justChild) {
                        parentNode = child.parentNode;
                    } else {
                        parentNode = child;
                    }
                    
                    if (child && parent) {
                        while (parentNode) {
                        if (parent === parentNode) {
                            return true;
                        }
                        parentNode = parentNode.parentNode;
                        }
                    }
                    return false;
                }
                if(e.cancelable){
                    if (!isChildTarget(e.target, scrollBox)) {
                        e.preventDefault();
                    } else if ((top === 0 && moveY > startY) || (top + ch === sh && moveY < startY)) {
                        e.preventDefault();
                    }
                }
                
            }
        },
        ...mapActions([
            "toggleExpLightBox",
            "toggleLoading"
        ]),
    },
    async mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const inp = this.$refs[`inp`];
        const windowW = document.body.clientWidth;
        
        await this.checkIsIE();
        await this.checkOS();
        await this.checkIsTouchMode();
        await this.getlimitAmt();

        if(windowW >=1024 )this.mobTarget = null;
        else this.mobTarget = true;

        this.windowWidth = windowW;
        
        let firstPromptFormSession = sessionStorage.getItem('isFirstPrompt');
        if(!firstPromptFormSession) sessionStorage.setItem('isFirstPrompt', 'Y');
        else this.isFirstPrompt = false;

        window.addEventListener('resize',this.calcWindowW, false);
        inp.addEventListener('focusin', this.keyBoardOn, false);
        inp.addEventListener('focusout', this.keyBoardOff, false);

        document.body.addEventListener('touchstart', this.onTouchstart, { passive: false });
        document.body.addEventListener('touchmove', this.onTouchmove, { passive: false });
    },
    beforeDestroy() {
        const inp = this.$refs[`inp`];
        window.removeEventListener('resize', this.calcWindowW, false);
        inp.removeEventListener('focusin', this.keyBoardOn, false);
        inp.removeEventListener('focusout', this.keyBoardOff, false);

        document.body.removeEventListener('touchstart', this.onTouchstart, { passive: false });
        document.body.removeEventListener('touchmove', this.onTouchmove, { passive: false });
    }
}
</script>

<style lang="scss" scoped>
%buttonReset{
    background-color: unset;
    border: none;
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    background-color: #fff;
}
button:focus{
    outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
.inpError::placeholder {
    color: #f00;
}
    .lightBox{
        height: calc(100% - 56px);
        font-size: 14px;
    }
    .lightBox--mobTargetOpen{
        height: 100%;
    }
    .firstPrompt{
        display: none;
        width: 100vw;
        height: 100vh;
        padding: 20px 20px 100px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.8);
        img{
            width: 80%;
            height: auto;
        }
        button{
            width: 100%;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            line-height: 48px;
            color: #fff;
            background-color: #31a043;
        }
    }
    .firstPrompt--show{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .content{
        height: 100%;
        background-color: #f2f2f2;
        overflow: auto;
        position: relative;
        box-shadow: 0 5px 10px 0 rgba(0, 87, 61, 0.31) inset;
        &__title{
            color: #31a043;
            line-height: 1.75;
            font-size: 16px;
        }
        &__block{
            margin-top: 30px;
            padding: 0 14px;
            position: relative;
            .prompt{
                padding: 8px;
                position: absolute;
                bottom: -5px;
                left: 25px;
                border-radius: 2px;
                background-color: #ed8200;
                span{
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 1.33;
                    color: #fff;
                }
            }
            .prompt:after{content:'';position:absolute;top:97%;left:1px;width:0;height:0;border-width:10px;border-style:solid;border-color:transparent;border-top-width:12px;border-top-color:currentColor;color:#ed8200;}
            .prompt__btn{
                opacity: 0;
                bottom: -15px;
            }
        }
        &__block--q{
            margin-top: 55px;
        }
        &__block--right{
            text-align: right;
            padding-bottom: 14px;
        }
        &__block > div{
            display: inline-flex;
        }
        .content__block--defaultYear{
            margin-top: 30px;
        }
        .content__block--year{
            margin-top: 100px;
        }
        .content__target--web{
            display: none;
        }
        .content__target--mob{
            width: 100%;
            position: sticky;
            top: 0;
            left: 0;
            z-index: 2;
            padding: 20px 14px 50px;
            background: rgb(1,114,80); /* Old browsers */
            background: -moz-linear-gradient(top,  rgba(1,114,80,1) 0%, rgba(101,179,21,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top,  rgba(1,114,80,1) 0%,rgba(101,179,21,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom,  rgba(1,114,80,1) 0%,rgba(101,179,21,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#017250', endColorstr='#65b315',GradientType=0 ); /* IE6-9 */
            .content__block .answer__target{
                justify-content: center;
            }
            .content__title{
                color: #fff;
            }
            .firstQ{
                color: #fff;
            }
        }
        .content__target--mobClose{
            width: 100%;
            position: sticky;
            top: 0;
            padding: 14px 0px 14px 14px;
            z-index: 2;
            background: rgb(1,114,80); /* Old browsers */
            background: -moz-linear-gradient(top,  rgba(1,114,80,1) 0%, rgba(101,179,21,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top,  rgba(1,114,80,1) 0%,rgba(101,179,21,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom,  rgba(1,114,80,1) 0%,rgba(101,179,21,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#017250', endColorstr='#65b315',GradientType=0 ); /* IE6-9 */
            .firstQ{
                margin-bottom: 10px;
                color: #fff;
            }
            .answer__item{
                display: flex;
                button{
                    @extend %buttonReset;
                    width: 100%;
                    padding: 14px 12px;
                    display: inline-flex;
                    justify-content: center;
                    background-color: #fff;
                    color: #fff;
                    img{
                        width: 20px;
                        height: 20px;
                    }
                    span{
                        margin-left: 10px;
                        font-size: 14px;
                        line-height: 20px;
                    }
                }
                .answer__btn--active{
                    background-color: #d2ac5c;
                }
                .answer__changeTarget{
                    @extend %buttonReset;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    width: 75px;
                    font-size: 18px;
                    color: #fff;
                    background-color: rgba(255, 255, 255, 0);
                    span{
                        width: 30px;
                        margin-left: 0px;
                        display: inline-block;
                    }
                    img{
                        position: absolute;
                        top: 50px;
                    }
                }
                .answer__changeTarget::after{
                    content: '';
                    display: block;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    position: absolute;
                    top: 45px;
                    right: calc(50% - 15px);
                    z-index: -1;
                    background: -moz-linear-gradient(top, rgba(95,175,24,0) 0%, rgba(98,177,22,0) 53%, rgba(98,177,22,1) 57%, rgba(101,179,21,1) 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(top, rgba(95,175,24,0) 0%,rgba(98,177,22,0) 53%,rgba(98,177,22,1) 57%,rgba(101,179,21,1) 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(to bottom, rgba(95,175,24,0) 0%,rgba(98,177,22,0) 53%,rgba(98,177,22,1) 57%,rgba(101,179,21,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#005faf18', endColorstr='#65b315',GradientType=0 ); /* IE6-9 */                 // background: rgb(1,114,80); /* Old browsers */
                }
            }
        }
        .firstQ{
            font-size: 18px;
            font-weight: bold;
        }
    }
    .content--iosAuto{
        height: auto;
    }
    .content--mobTarget100{
        height: 100%;
    }
    .content--open{
        overflow: auto;
    }
    .content__block{
        width: 100%;
        .question{
            align-items: center;
            padding: 10px 20px;
            border: 1px solid #dce6f0;
            border-radius: 30px;
            background-color: #fff;
            .question__lion{
                width: 40px;
                height: 40px;
                background-color: #ccc;
                border-radius: 20px;
                margin-right: 6px;
            }
            p{
                display: flex;
                flex-wrap: wrap;
                margin: 0 0 0 10px;
                max-width: 200px;
                font-size: 18px;
                font-weight: bold;
                
            }
        }
        .question__inputLimt{
            opacity: 0;
            font-size: 14px;
            color: #666;
        }
        .question--op{
            opacity: 0;
        }
        .answer--default{
            align-items: center;
            flex-direction: column;
            padding: 10px 20px;
            border: 1px solid #dce6f0;
            background-color: #31a043;
            color: #fff;
            border-radius: 30px;
            opacity: 0;
            transition: 1s;
            img{
                width: 50px;
            }
            p{
                font-size: 16px;
                margin: 0;
            }
            &--year{
                opacity: 1;
            }
        }
        .answer--clickBtn{
            padding: 10px 20px;
            border: 1px solid #dce6f0;
            background-color: #31a043;
            color: #fff;
            border-radius: 30px;
            p{
                font-size: 16px;
                margin: 0;
            }
        }
        .answer--onEdit{
            border: 1px solid #31a043;
            background-color: #fff;
            color: #31a043;
        }
        .answer__target{
            width: 100%;
            flex-wrap: wrap;
            button{
                @extend %buttonReset;
                border: 1px solid #ccc;
                font-size: 14px;
                width: 135px;
                height: 135px;
                margin-left: -1px;
                margin-bottom: -1px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding: 30px 10px;
                background-color: #fff;
                img{
                    width: 60px;
                    height: 60px;
                }
                span{
                    margin-top: 10px;
                }
            }
            button:focus{
                outline: none;
            }
            .answer__btn--active{
                background-color: #d2ac5c;
                span{
                    color: #fff;
                }
            }
        }
        .answer--edit{
            position: relative;
            top: 6px;
            margin-left: 10px;
            cursor: pointer;
            img{
                width: 24px;
            }
        }
        .answer__slider{
            width: 100%;
        }
        .answer__way{
            display: block;
            opacity: 0;
            
            button{
                @extend %buttonReset;
                border-radius: 30px;
                padding: 10px 20px;
                margin-right: 10px;
                margin-bottom: 20px;
                border: 1px solid #dce6f0;
            }
            button:focus{
                outline: none;
            }
        }
        .answer__range{
            @extend .answer__way;
        }
        .answer__q6{
            @extend .answer__way;
            display: inline-flex;
            flex-direction: column;
            button{
                margin-bottom: 20px;
            }
        }
        .textBtn{
            color: #a1adb9;
        }
        .textBtn.textBtn--active{
            color: #fff;
            background-color: #c1cd00;
        }
        .waitForQus{
            opacity: 1;
            transition: 1s;
        }
    }
    .bottomInput{
        width: 100%;
        background-color: #fff;
        box-shadow: 0 -5px 10px 0 rgba(0, 87, 61, 0.08);
        border-radius: 0 0 5px 5px;
        .maxRange{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 56px;
            position: relative;
            .prompt__keyin,.prompt__send{
                padding: 8px;
                position: absolute;
                bottom: 60px;
                left: 25px;
                border-radius: 2px;
                background-color: #ed8200;
                opacity: 0;
                span{
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 1.33;
                    color: #fff;
                }
            }
            .prompt__send{
                left: 10px;
            }
            .prompt__keyin:after{content:'';position:absolute;top:97%;left:1px;width:0;height:0;border-width:10px;border-style:solid;border-color:transparent;border-top-width:12px;border-top-color:currentColor;color:#ed8200;}
            .prompt__send:after{content:'';position:absolute;top:97%;left:1px;width:0;height:0;border-width:10px;border-style:solid;border-color:transparent;border-top-width:12px;border-top-color:currentColor;color:#ed8200;}
            .waitForQus__bottom{
                opacity: 1;
                transition: 1s;
            }
            .bottomInput__placeholder{
                position: absolute;
                left: 24px;
                bottom: 21px;
                color: #555;
                background-color: #f2f2f2;
                user-select: none;
                pointer-events: none;
            }
            #inp:focus{
                border: 2px solid #31a043;
                outline: none;
            }
            input{
                margin: 10px;
                // width: calc(85% - 50px);
                width: 100%;
                border: none;
                border-radius: 5px;
                background-color: #f2f2f2;
                padding-left: 10px;
            }
            input::-webkit-input-placeholder {
                line-height: 22px;
            }
            button{
                @extend %buttonReset;
                margin: 10px 10px 10px 0;
                width: 15%;
                min-width: 60px;
                border-radius: 5px;
            }
            .bottomInput__typeIn{
                width: 50px;
                img{
                    margin-top: 4px;
                    width: 24px;
                }
                .bottomInput__typeIn--hover{
                    display: none;
                }
            }
            .bottomInput__typeIn,.bottomInput__send{
                background-color: #ccc;
                color: #fff;
                cursor: not-allowed;
            }
            .bottomInput__send{
                display: none;
                background-color: #31a04480;
                position: relative;
                .bottomInput__send--range{
                    width: 20%;
                    height: 100%;
                    display: block;
                    border-radius: 5px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: #31a043;
                    z-index: 0;
                }
                
                .bottomInput__sendText{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 8px;
                    font-size: 16px;
                    img{
                        display: none;
                    }
                }
            }
            .bottomInput__send--disable{
                .bottomInput__send--range{
                    background-color: #ffffff00;
                }
            }
            .bottomInput__send--open{
                cursor: pointer;
            }
            .bottomInput__typeIn--open{
                cursor: pointer;
                background-color: #31a043;
            }
        }
        .bottomInput--finallSend{
            .bottomInput__placeholder{
                display: none;
            }
            input{
                display: none;
            }
            .bottomInput__send{
                display: block;
                width: 100%;
                margin: 10px;
            }
            .bottomInput__typeIn{
                display: none;
            }
        }
        .bottomInput--error{
            .bottomInput__placeholder{
                color: #f00;
            }
            #inp::placeholder {
                color: #f00;
            }
            #inp:focus{
                border: 2px solid #fe5d61;
            }
        }
    }
    @media screen and (min-width: 414px){
        .content__block{
            .question{
                p{
                    max-width: 260px;
                }
            }
            .answer__target{
                max-width: 435px;
                button{
                    width: 142px;
                    height: 142px;
                }
            }
        }
    }
    @media screen and (min-width: 768px){
        .firstPrompt{
            padding: 20px 40px 50px;
            img{
                width: 60%;
                height: auto;
            }
        }
        .content{
            .content__block{
                padding-bottom: 10px;
                .question{
                    p{
                        max-width: none;
                    }
                }
                .answer__q6{
                    display: inline-block;
                }
            }
            .content__target--mob{
                height: 100%;
                padding-bottom: 40px;
            }
            .content__target--mobClose{
                .answer__item{
                    justify-content: space-between;
                    button{
                        width: 40%;
                    }
                    .answer__changeTarget{
                        width: 100px;
                        span{
                            width: 60px;
                            position: relative;
                            top: 10px;
                        }
                        img{
                            position: absolute;
                            top: 50px;
                        }
                    }
                    .answer__changeTarget::after{
                        width: 60px;
                        height: 60px;
                        border-radius: 30px;
                        top: 20px;
                        right: calc(50% - 30px);
                        background: -moz-linear-gradient(top, rgba(95,175,24,0) 0%, rgba(99,178,22,0) 63%, rgba(99,178,22,1) 68%, rgba(101,179,21,1) 100%); /* FF3.6-15 */
                        background: -webkit-linear-gradient(top, rgba(95,175,24,0) 0%,rgba(99,178,22,0) 63%,rgba(99,178,22,1) 68%,rgba(101,179,21,1) 100%); /* Chrome10-25,Safari5.1-6 */
                        background: linear-gradient(to bottom, rgba(95,175,24,0) 0%,rgba(99,178,22,0) 63%,rgba(99,178,22,1) 68%,rgba(101,179,21,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#005faf18', endColorstr='#65b315',GradientType=0 ); /* IE6-9 */
                    }
                }
            }
        }
        .bottomInput .maxRange{
            .bottomInput__typeIn{
                position: relative;
                .bottomInput__typeIn--hover{
                    display: block;
                    width: 72px;
                    text-align: center;
                    font-size: 14px;
                    line-height: 26px;
                    position: absolute;
                    top: -40px;
                    left: -6px;
                    border-radius: 4px;
                    color: #000;
                    background-color: #bbb;
                }
                .bottomInput__typeIn--hover:after{content:'';position:absolute;top:100%;left:26px;width:0;height:0;border-width:8px;border-style:solid;border-color:transparent;border-top-width:11px;border-top-color:currentColor;color:#bbb;}
            }
        }
    }
    @media screen and (min-width: 1024px){
        .firstPrompt{
            display: none;
        }
        .content{
            overflow: overlay;
            padding-bottom: 10px;
            .maxRange{
                max-width: 1200px;
                margin: auto;
            }
            .content__block{
                margin-top: 10px;
                .prompt{
                    left: 40px;
                    bottom: 10px;
                }
                .prompt__btn{
                    bottom: 5px;
                }
            }
            .content__block--defaultYear{
                margin-top: 55px;
            }
            .content__target--mob{
                display: none;
            }
            .content__target--web{
                display: block;
            }
            &__target{
                width: 100%;
                padding: 30px 40px 30px 30px;
                background: rgb(1,114,80); /* Old browsers */
                background: -moz-linear-gradient(top,  rgba(1,114,80,1) 0%, rgba(101,179,21,1) 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(top,  rgba(1,114,80,1) 0%,rgba(101,179,21,1) 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom,  rgba(1,114,80,1) 0%,rgba(101,179,21,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#017250', endColorstr='#65b315',GradientType=0 ); /* IE6-9 */
                .content__block--right{
                    padding-right: 0;
                    margin-top: 0;
                }
            }
            &__greenBack{
                width: 100%;
                height: 364px;
                
            }
            &__title{
                font-size: 18px;
                position: relative;
                color: #fff;
            }
            .firstQ{
                font-size: 21px;
                position: relative;
                padding: 0;
                margin-bottom: 30px;
                color: #fff;
            }
        }
        .content--overAuto{
            overflow: auto;
        }
        .content__target--web{
            text-align: center;
            .content__block{
                .answer__target{
                    position: relative;
                    button{
                        span{
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        .content__block{
            padding: 0 40px 0 30px;
            .question{
                p{
                    font-size: 16px;
                }
            }
            .answer--default{
                p{
                    font-size: 16px;
                }
            }
        }
        .content__block--right{
            padding-bottom: 30px;
        }
        .bottomInput{
            .maxRange{
                max-width: 1200px;
                margin: auto;
                input{
                    width: 100%;
                }
                button{
                    @extend %buttonReset;
                    width: 10%;
                    max-width: 110px;
                }
                .bottomInput__send{
                    display: block;
                }
                .prompt__send{
                    left: auto;
                    right: 40px;
                }
                .prompt__send:after{content:'';position:absolute;top:97%;left:68px;width:0;height:0;border-width:10px;border-style:solid;border-color:transparent;border-top-width:12px;border-top-color:currentColor;color:#ed8200;}
            }
            .bottomInput--finallSend{
                justify-content: flex-end;
                .bottomInput__send{
                    max-width: 250px;
                }
                .bottomInput__send{
                    .bottomInput__sendText{
                        top: 6px;
                        img{
                            display: inline-block;
                            width: 18px;
                            vertical-align: middle;
                        }
                        span{
                            vertical-align: middle;
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1040px){
        .content{
            .content__target--web{
                .content__block{
                    padding: 0;
                    .answer__target{
                        max-width: 900px;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1300px){
        .content{
                .content__block{
                    padding: 0 10px 10px;
                    .prompt{
                        left: 20px;
                    }
                }
        }
    }
</style>