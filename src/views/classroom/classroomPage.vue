<template>
    <div class="classroomPage" :ref="`classroomView`">
        <div class="classroomPage__banner">
            <div class="classroomPage__tittle">
                <h1>小學堂</h1>
            </div>
        </div>
        <div class="classroomPage__content">
            <div class="article">
                <div class="article__img">
                    <img :src="getImg">
                </div>
                <h1>{{getTitle}}</h1>
                <span class="article__time">小粉獅 / {{getTime}}</span>
                <div id="getText" v-html="getText"></div>
            </div>
            <div class="sidebar">
                <span class="sidebar__anotherTitle">最新文章</span>
                <hr>
                <ul>
                    <template v-for="(text, index) in sideText">
                        <li :key="`sideText${index}`"
                            :class="{'sidebar__anotherTitle--active': text.id === pageId}"
                            @click="toAnotherPage(text.id)"
                        ><span><img src="@/assets/img/icon/arrow-right.svg"></span> {{text.title}}</li>
                    </template>
                </ul>
            </div>
            <div class="pageFooter">
                <div class="pageFooter__share">
                    <a href="https://www.facebook.com/firsthaka">
                        <img src="@/assets/img/icon/FB-gary.svg">
                    </a>
                    <a href="https://line.me/R/ti/p/%40firstbank">
                        <img src="@/assets/img/icon/LINE-gary.svg">
                    </a>
                    <a href="https://www.instagram.com/firstbank.tw/">
                        <img src="@/assets/img/icon/ig-gary.svg">
                    </a>
                </div>
                <div class="pageFooter__next"
                    :class="{'pageFooter__next--start': preIndex !== null && nextIndex === null,
                        'pageFooter__next--end': preIndex === null && nextIndex !== null,}"
                >
                    <button @click="toAnotherPage(preText.id)"
                        v-if="preIndex !== null"
                    >
                        <img src="@/assets/img/icon/arrow-left.svg">
                        <span class="pageFooter__sideText pageFooter__sideText--left">{{preText.title}}</span>
                    </button>
                    <span class="pageFooter__centerText">點擊看上下篇文章</span>
                    <button @click="toAnotherPage(nextText.id)"
                        v-if="nextIndex !== null"
                    >
                        <span class="pageFooter__sideText">{{nextText.title}}</span>
                        <img src="@/assets/img/icon/arrow-right.svg">
                    </button>
                </div>
            </div>
        </div>
        <eFirstfooter></eFirstfooter>
    </div>
</template>
<script>
import eFirstfooter from '@/views/eFirstfooter.vue'
export default {
    components: {
        eFirstfooter
    },
    data() {
        return {
            classDatas: [],
            getImg: '',
            getTitle: '',
            getTime: '',
            getText: '',
            nowIndex: null,
            preIndex: null,
            nextIndex: null,
            preText: {},
            nextText: {},
            sideText: []
        }
    },
    watch:{
        $route(){
            this.getDatas();
        },
    },
    computed:{
        pageId(){
            return parseInt(this.$route.params.id);
        }
    },
    methods: {
        getDatas(){
            const i = Number(this.$route.params.id);
            const re = this.classDatas;

            let sideTextLimit;
            if(re.length <= 10){
                sideTextLimit = re.length;
            }else{
                sideTextLimit = 10
            }
            for (let x = 0; x < sideTextLimit; x++) {
                this.sideText.push(
                    {
                        id: re[x].id,
                        title: re[x].title
                    }
                )
            }

            const findIndex = re.map((item)=>{
                return item.id
            }).indexOf(i);

            this.nowIndex = findIndex;
            this.preIndex = (findIndex - 1) < 0 ? null : (findIndex - 1);
            this.nextIndex = (findIndex + 1) >= re.length ? null : (findIndex + 1);


            const {img, title, date, content} = re[findIndex];
            this.getImg = img;
            this.getTitle = title;
            this.getTime = date.replace(/T/ig, ' ');
            this.getText = content.replace(/style/ig, 'noColor').replace(/width/ig, 'width="100%" noWidth').replace(/height/ig, 'noHeight').replace(/size/ig, 'noSize');

            if(this.preIndex !== null){
                this.preText = {
                    id: re[this.preIndex].id,
                    title: re[this.preIndex].title
                }
            }
            if(this.nextIndex !== null){
                this.nextText = {
                    id: re[this.nextIndex].id,
                    title: re[this.nextIndex].title
                }
            }
            
        },
        scrollSmooth(howFar) {
            const view = this.$refs[`classroomView`];
            let now = view.scrollTop;


            if (!view.requestAnimationFrame) {
                view.requestAnimationFrame = function(callback) {
                    return setTimeout(callback, 17);
                };
            }
            const step = () => {
                let distance = howFar - now;
                now = now + distance / 5;
                if (Math.abs(distance) < 1) {
                    document.documentElement.scrollTop = howFar;
                    document.body.scrollTop = howFar;
                } else {
                    document.documentElement.scrollTop = now;
                    document.body.scrollTop = now;
                    requestAnimationFrame(step);
                }
            };
            step();
        },
        async toAnotherPage(pageId){
            const nowId = parseInt(this.$route.params.id);
            if(nowId !== pageId){
                this.sideText = [];
                this.$router.push({
                    path: `/dashboard/classroom/${pageId}`,
                });
                await this.delay(100);
                await this.scrollSmooth(200);
            }
        },
        delay(s){
            return new Promise(function(resolve){  // 回傳一個 promise
                setTimeout(resolve,s);               // 等待多少秒之後 resolve()
            });
        }
    },
    mounted: async function() {
        this.classDatas = JSON.parse(sessionStorage.getItem('classDatas'));
        if(!this.classDatas){
            this.$router.push({
                path: `/dashboard/classroom`,
            });
        }else{
            await this.getDatas();
            await this.delay(100);
            await this.scrollSmooth(200);
        }
    }
}
</script>

<style lang="scss" scoped>
#getText{
    color: #000;
    line-height: 24px;
    font-size: 14px;
    img{
        width: 100%;
    }
}
#getText .attachment-large .size-large{
    width: 100%;
}
.classroomPage{
    background-color: #fff;
}
.classroomPage__banner{
    width: 100%;
    height: 300px;
    background-color: #ccc;
    position: relative;
    background-image: url('../../assets/img/svg/learnPage/LearnPagetopBg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    .classroomPage__tittle {
        width: 80%;
        height: 28px;
        padding-top: 28px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        color: #fff;
        h1 {
            
            font-size: 28px;
            font-weight: normal;
            margin: 0;
        }
    }
}
.classroomPage__content{
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    p{
        font-size: 14px;
        line-height: 24px;
    }
}
.article{
    width: 100%;
    height: auto;
    order: 2;
    &__img{
        img{
            width: 100%;
            height: auto;
        }
    }
    h1{
        font-size: 24px;
    }
    &__time{
        display: block;
        font-size: 12px;
        color: #808080;
        margin-bottom: 36PX;
    }
    h2{
        font-size: 21px;
    }
}
.sidebar{
    display: none;
    order: 1;
    width: 100%;
    button{
        cursor: pointer;
    }
    .sidebar__anotherTitle{
        font-size: 16px;
    }
    .sidebar__anotherTitle--active{
        color: #31a043;
    }
    hr{
        margin: 16px 0;
    }
    ul{
        li{
            padding-left: 16px;
            position: relative;
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 18px;
            cursor: pointer;
            span{
                position: absolute;
                top: 0;
                left: 0;
                font-size: 14px;
            }
        }
    }
}
.pageFooter{
    width: 100%;
    order: 3;
    margin-top: 52px;
    .pageFooter__share{
        img{
            width: 24px;
            height: 24px;
            margin-right: 14px;
            vertical-align: top;
            cursor: pointer;
        }
    }
    .pageFooter__next{
        text-align: center;
        margin-top: 28px;
        span{
            font-size: 16px;
            vertical-align: middle;
            margin: 0 12px;
        }
        button{
            background-color: #fff;
            border: none;
            vertical-align: middle;
            cursor: pointer;
        }
        button:focus{
            outline: none;
        }
        .pageFooter__sideText{
            display: none;
        }
    }
}
@media screen and (min-width: 730px){
    .classroomPage__banner{
        height: 350px;
        background-size: cover;
    }
}
@media screen and (min-width: 768px){
    .classroomPage__content{
        padding: 18px;
        min-height: calc(100vh - 350px - 229px);
    }
    .classroomPage__banner{
        .classroomPage__tittle{
            width: 90%;
            height: 34px;
            padding-top: 34px;
            h1 {
                font-size: 34px;
            }
        }
    }
}
@media screen and (min-width: 1024px){
    .classroomPage__content{
        max-width: 1440px;
        min-height: calc(100vh - 350px - 124px);
        justify-content: space-between;
        padding: 70px 84px;
        margin: auto;
    }
    .article{
        width: 60%;
        order: 1;
    }
    .sidebar{
        display: block;
        width: 40%;
        padding-left: 70px;
        order: 2;
        ul{
            li{
                margin-bottom: 32px;
            }
        }
    }
    .pageFooter{
        width: 60%;
        .pageFooter__next{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pageFooter__centerText{
                display: none;
            }
            .pageFooter__sideText{
                display: inline-block;
                width: 220px;
                margin: 0;
                padding-right: 4px;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: right;
            }
            .pageFooter__sideText--left{
                text-align: left;
            }
        }
        .pageFooter__next--start{
            justify-content: flex-start;
        }
        .pageFooter__next--end{
            justify-content: flex-end;
        }
    }
}
</style>