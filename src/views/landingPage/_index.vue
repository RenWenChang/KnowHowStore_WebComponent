<template>
    <div>
        <div class="pageController" :class="rememberPage === 0?'pageController--firstScreen':''" :ref="`pageController`" v-if="expLightBoxRes == false">
            <div class="pageController__touchRange" @click="scrollToPage('click', 0)">
                <span :class="{'pageController__span--active':rememberPage === 0}"></span>
            </div>
            <div class="pageController__touchRange" @click="scrollToPage('click', 1)">
                <span :class="{'pageController__span--active':rememberPage === 1}"></span>
            </div>

            <div class="pageController__touchRange" @click="scrollToPage('click', 2)">
                <span :class="{'pageController__span--active':rememberPage === 2}"></span>
            </div>
            <div class="pageController__touchRange" @click="scrollToPage('click', 3)">
                <span :class="{'pageController__span--active':rememberPage === 3}"></span>
            </div>
        </div>
        <!-- 第一層 呈現在裝置上的視窗寬高 避免瀏覽器上下部分瀏覽列自己移動 -->
        <div class="view" :ref="`view`">
            <!-- 第二層 取第一屏的高即可 因為全都是vh -->
            <div id="card1" class="view__fullpage" :ref="`fullpage`">
                <firstSection  :currentPage="rememberPage" :agent="whichUserAgent"></firstSection>
            </div>
            <div id="card2" class="view__fullpage">
                <secondSection v-if="rememberPage ==1"  :currentPage="rememberPage" :agent="whichUserAgent"></secondSection>
            </div>
            <div id="card3" class="view__fullpage">
                <thirdSection v-if="rememberPage ==2" :currentPage="rememberPage" :agent="whichUserAgent"></thirdSection>
            </div>
            <div id="card4" class="view__fullpage">
                <fourthSection v-if="rememberPage ==3" :currentPage="rememberPage"></fourthSection>
                <eFirstfooter v-if="rememberPage ==3"></eFirstfooter>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firstSection from '@/components/banner.vue'
import secondSection from '@/views/landingPage/secondSection.vue'
import thirdSection from '@/views/landingPage/thirdSection.vue'
import fourthSection from '@/views/landingPage/fourthSection/fourthSection.vue'
import eFirstfooter from '@/views/eFirstfooter.vue'

export default {
    components: {
        firstSection,
        secondSection,
        thirdSection,
        fourthSection,
        eFirstfooter
    },
    data() {
        return {
            /**
            *  full page data
            */
            viewWidth: null,
            touchStartX: null,
            touchStartY: null,
            whichUserAgent: '',
            howManyPages: 4,
            rememberPage: 0,
            allowScroll: true,
            ieVarison: null,

            prevTime: null,
            scrollings: [],
            rem: false

            /**
            *  首頁其他 data
            */
        }
    },
    props: {
        isToSecond: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        changeScreenRes(newVal) {
            if(newVal !== this.rememberPage){
                this.$nextTick(()=>{
                    this.scrollToPage('click', this.changeScreenRes, true);
                });
            }
        },
        rememberPage() {
            this.changeScreenAction(this.rememberPage);
        }
    },
    computed: {
        ...mapGetters([
            "changeScreenRes",
            "expLightBoxRes"
        ])
    },
    methods: {
        /**
        *  full page function
        */
        fixWindowResize() {
            const view = this.$refs[`view`];
            let itemHeight = this.$refs[`fullpage`].scrollHeight;
            view.scrollTop = itemHeight * this.rememberPage;
            this.viewWidth = document.body.clientWidth;
        },
        getAverage(elements, number) {
            let sum = 0;
            const lastElements = elements.slice(Math.max(elements.length - number, 1));
            for (let i = 0; i < lastElements.length; i++) {
                sum = sum + lastElements[i];
            }
            return Math.ceil(sum / number);
        },
        async disabledMouseWheel(e) {
            const scrollEvent = window.event || e;
            let direction, value;
            let curTime = new Date().getTime();

            if (this.whichUserAgent === 'Firefox') {
                direction = scrollEvent.detail > 0 ? 'down' : 'up';
                value = scrollEvent.detail;
            } else {
                direction = scrollEvent.wheelDelta > 0 ? 'up' : 'down';
                value = scrollEvent.wheelDelta;
            }

            e.preventDefault();

            if (this.scrollings.length > 149) this.scrollings.shift();
            this.scrollings.push(Math.abs(value));

            let timeDiff = curTime - this.prevTime;
            this.prevTime = curTime;
            if (timeDiff > 300) this.scrollings = [];

            let averageEnd = await this.getAverage(this.scrollings, 10);
            let averageMiddle = await this.getAverage(this.scrollings, 70);
            let isAccelerating = averageEnd >= averageMiddle;

            if (isAccelerating && timeDiff > 300) {
                await this.handelScroll(direction);
            } else if (isAccelerating && timeDiff <= 300 && this.rem === false) {
                await this.handelScroll(direction);
            }
            this.rem = isAccelerating;
        },
        disabledTouchWheel(e) {
            e.preventDefault();
        },
        onTouchStart(e) {
            const touch = e.changedTouches[0];
            const x = Number(touch.pageX);
            const y = Number(touch.pageY);
            this.touchStartX = x;
            this.touchStartY = y;
        },
        onTouchMove(e) {
            e.preventDefault();
        },
        onTouchEnd(e) {
            const touch = e.changedTouches[0];
            const y = Number(touch.pageY);

            const touchTirection = this.touchStartY - y > 0 ? 'down' : 'up';
            const moveRange = Math.abs(this.touchStartY - y);

            if (moveRange > 100 && moveRange < 800) this.handelScroll(touchTirection)
        },
        handelScroll(direction) {
            let remPage = this.rememberPage;
            let hwPages = this.howManyPages;

            remPage = direction === 'down' ? remPage + 1 : remPage - 1;
            if (remPage <= 0) {
                remPage = 0;
            } else if (remPage >= hwPages) {
                remPage = hwPages - 1;
            }
            this.rememberPage = remPage;
            this.scrollToPage('scroll');
        },
        scrollToPage(type, i) {
            if (type === 'click' ) this.rememberPage = i;

            const view = this.$refs[`view`];
            const oneCardHeight = this.$refs[`fullpage`].scrollHeight;
            let now = view.scrollTop;

            if (!view.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback) {
                    return setTimeout(callback, 17);
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }

            const step = () => {
                let distance = (oneCardHeight * this.rememberPage) - now;
                now = now + distance / 8;
                if (Math.abs(distance) < 1.5) {
                    view.scrollTop = oneCardHeight * this.rememberPage;
                } else {
                    view.scrollTop = now;
                    requestAnimationFrame(step);
                }
            };
            step();
        },
        checkUserAgent() {
            const userAgent = navigator.userAgent; //取得瀏覽器的userAgent字符串 
            const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera瀏覽器 
            const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE瀏覽器 
            const isIE11 = (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0); //判断是否IE11瀏覽器 
            // const isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge瀏覽器 
            const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge瀏覽器
            const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox瀏覽器 
            const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari瀏覽器 
            const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge; //判断Chrome瀏覽器 
            const isNetscape = userAgent.indexOf('Netscape') > -1;

            if (isIE || isIE11) this.whichUserAgent = 'ie';
            else if (isFF) this.whichUserAgent = 'Firefox';
            else if (isChrome) this.whichUserAgent = 'Chrome';
            else if (isOpera) this.whichUserAgent = 'Opera';
            else if (isSafari) this.whichUserAgent = 'Safari';
            else if (isNetscape) this.whichUserAgent = 'Netscape';

            // ----------------------------------判斷IE版本----------------------------------------
            this.ieVarison = '0'
            if (isIE || isIE11) {
                const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                const fIEVersion = parseFloat(RegExp["$1"]);
                if (userAgent.indexOf('MSIE 6.0') != -1) {
                    return "IE6";
                } else if (fIEVersion == 7) { this.ieVarison = "IE7"; }
                else if (fIEVersion == 8) { this.ieVarison = "IE8"; }
                else if (fIEVersion == 9) { this.ieVarison = "IE9"; }
                else if (fIEVersion == 10) { this.ieVarison = "IE10"; }
                else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
                    this.ieVarison = "IE11";
                }
                else {                this.ieVarison = '0'
                    this.$msgBox.showMsgBox({
                        content: "您確認是否離開，您設定過的資訊即將被清除！",
                        isShowAgent: true,
                        isShowBtn2: true,
                    
                    });
                }//IE版本过低
            }
        },
        afterMounted() {
            this.prevTime = new Date().getTime();
            this.viewWidth = document.body.clientWidth;
            const view = this.$refs[`view`];
            const pageController = this.$refs[`pageController`];
            this.checkUserAgent();

            const isTouchMode = () => {
                try { document.createEvent("TouchEvent"); return true; }
                catch (e) { return false; }
            }
            const touchListener = () => {
                view.addEventListener('touchstart', this.onTouchStart, { passive: false });
                view.addEventListener('touchmove', this.onTouchMove, { passive: false });
                view.addEventListener('touchend', this.onTouchEnd, { passive: false });
                pageController.addEventListener('touchstart', this.onTouchStart, { passive: false });
                pageController.addEventListener('touchmove', this.onTouchMove, { passive: false });
                pageController.addEventListener('touchend', this.onTouchEnd, { passive: false });
            }

            if (isTouchMode() && this.viewWidth <= 414) { //觸控且小於等於414 = 手機
                if (this.whichUserAgent === 'Firefox') view.addEventListener('DOMMouseScroll', this.disabledTouchWheel, false);
                else view.addEventListener('mousewheel', this.disabledTouchWheel, { passive: false });
                touchListener();

            } else if (isTouchMode() && this.viewWidth > 414) { //觸控且大於414 = 平板 + 可切換平板/桌機模式的平板
                if (this.whichUserAgent === 'Firefox') view.addEventListener('DOMMouseScroll', this.disabledMouseWheel, false);
                else view.addEventListener('mousewheel', this.disabledMouseWheel, { passive: false });
                touchListener();

            } else if (!isTouchMode()) { //非觸控 = 桌機
                if (this.whichUserAgent === 'Firefox') view.addEventListener('DOMMouseScroll', this.disabledMouseWheel, false);
                else view.addEventListener('mousewheel', this.disabledMouseWheel, { passive: false });

                window.addEventListener('resize', this.fixWindowResize, false);
            }
        },
        cleanAllListener() {
            const view = this.$refs[`view`];
            const pageController = this.$refs[`pageController`];
            window.removeEventListener('resize', this.fixWindowResize, false);
            view.removeEventListener('DOMMouseScroll', this.disabledMouseWheel, false);
            view.removeEventListener('mousewheel', this.disabledMouseWheel, { passive: false });
            view.removeEventListener('DOMMouseScroll', this.disabledTouchWheel, false);
            view.removeEventListener('mousewheel', this.disabledTouchWheel, { passive: false });
            view.removeEventListener('touchstart', this.onTouchStart, { passive: false });
            view.removeEventListener('touchmove', this.onTouchMove, { passive: false });
            view.removeEventListener('touchend', this.onTouchEnd, { passive: false });
            pageController.removeEventListener('touchstart', this.onTouchStart, { passive: false });
            pageController.removeEventListener('touchmove', this.onTouchMove, { passive: false });
            pageController.removeEventListener('touchend', this.onTouchEnd, { passive: false });
        },
        ...mapActions([
            "changeScreenAction"
        ])


        /**
        *  以下首頁其他 function
        */

    },
    mounted() {
        /**
        *  full page mounted
        */
        this.afterMounted();

        /**
        *  以下首頁其他 mounted
        */
    },

    beforeDestroy() {
        /**
        *  full page beforeDestroy
        */
        this.cleanAllListener();


        /**
        *  以下首頁其他 beforeDestroy
        */
    }
}
</script>

<style lang="scss" scoped>
/**
*  full page css
*/
.pageController {
    display: flex;
    width: 50px;
    height: 125px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    right: 0;
    top: calc((100% - 125px) / 2);
    z-index: 3;
    &__touchRange {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        span {
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: #808080;
            transform: scale(0.5);
            cursor: pointer;
        }
        .pageController__span--active {
            transform: scale(1);
            background: rgb(242, 242, 242); /* Old browsers */
            background: -moz-radial-gradient(
                center,
                ellipse cover,
                rgba(242, 242, 242, 1) 0%,
                rgba(255, 255, 255, 1) 10%,
                rgba(255, 139, 0, 1) 30%,
                rgba(255, 198, 11, 1) 40%,
                rgba(254, 255, 219, 1) 70%,
                rgba(255, 255, 255, 1) 73%,
                rgba(255, 255, 255, 1) 100%
            ); /* FF3.6-15 */
            background: -webkit-radial-gradient(
                center,
                ellipse cover,
                rgba(242, 242, 242, 1) 0%,
                rgba(255, 255, 255, 1) 10%,
                rgba(255, 139, 0, 1) 30%,
                rgba(255, 198, 11, 1) 40%,
                rgba(254, 255, 219, 1) 70%,
                rgba(255, 255, 255, 1) 73%,
                rgba(255, 255, 255, 1) 100%
            ); /* Chrome10-25,Safari5.1-6 */
            background: radial-gradient(
                ellipse at center,
                rgba(242, 242, 242, 1) 0%,
                rgba(255, 255, 255, 1) 10%,
                rgba(255, 139, 0, 1) 30%,
                rgba(255, 198, 11, 1) 40%,
                rgba(254, 255, 219, 1) 70%,
                rgba(255, 255, 255, 1) 73%,
                rgba(255, 255, 255, 1) 100%
            ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f2f2', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        }
    }
}
.pageController--firstScreen{
    .pageController__touchRange{
        span{
            background-color: #f2f2f2;
        }
    }
}
.view {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.view__fullpage {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    // transform: scale(0.5);
}
#card1 {
    background-color: rgb(108, 255, 182);
}
#card2 {
    background-color: #fff;
}
#card3 {
    background-image: url("../../assets/img/svg/thirdScreen/d3-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
#card4 {
    background-color: #fff;
}

/**
*  頁面內容 css
*/
</style>