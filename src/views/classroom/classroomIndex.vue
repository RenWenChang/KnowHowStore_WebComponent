<template>
    <div id="classroomIndex">
        <div class="classroom__banner">
            <div class="classroom__tittle">
                <h1>小學堂</h1>
            </div>
        </div>
        <div id="classroom__waterfall">
            <template v-for="(item, index) in datas">
                <div class="item" :key="index" @click="callPage(item.id)">
                    <img class="item-img" :src="item.img" />
                    <div class="item-content">
                        <h3>{{item.title}}</h3>
                        <span class="item-date">小粉獅 / {{item.date}}</span>
                        <P v-html="item.P1"></P>
                        <div class="item-gotoPage">
                            <img src="@/assets/img/svg/learnPage/gotopage.svg" />
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <eFirstfooter></eFirstfooter>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import eFirstfooter from '@/views/eFirstfooter.vue'
import Macy from 'macy'
export default {
    components: {
        eFirstfooter
    },
    data() {
        return {
            datas: [],
            macyWaterfall: null
        }
    },
    methods: {
        async apiGetSchoolDatas() {
            const re = await this.getSchoolDatas();
            this.datas = re.map((item, index) => {
                let forP1;
                for (let i = 0; i < item.content.rendered.split('<p>').length; i++) {
                    forP1 = item.content.rendered.split('<p>')[i].split('</p>')[0];
                    if (forP1.indexOf('div') <= 0 && forP1.substr(0, 2) !== '文：' && forP1.indexOf('img') <= 0 && forP1.replace(/(^s*)|(s*$)/g, "").length > 2) {
                        break;
                    }
                }

                return {
                    i: index,
                    id: item.id,
                    title: item.title.rendered,
                    date: item.date.replace(/T/ig, ' '),
                    img: item.better_featured_image.source_url,
                    content: item.content.rendered,
                    P1: forP1.replace(/style/ig, 'noColor')
                }
            });

            const copyDatas = JSON.stringify(this.datas);
            sessionStorage.setItem('classDatas', copyDatas);
        },
        callPage(id) {
            this.$router.push({
                path: `/dashboard/classroom/${id}`,
            })
        },
        macy() {
            this.macyWaterfall = new Macy({
                container: '#classroom__waterfall',
                trueOrder: false,
                waitForImages: true,
                mobileFirst: true,

                margin: {
                    y: 30
                },

                columns: 1,

                breakAt: {
                    768: {
                        columns: 2,
                        margin: {
                            x: 30
                        }
                    },
                    1024: {
                        columns: 3,
                    },
                }
            });
        },
        removeStatusOfFixButton: function() {
            let backTop = document.querySelector("#back-to-top");
            let doCal = document.querySelector(".doCal__mobile");
            let present = document.querySelector("#present");
            if (backTop) {
                backTop.removeAttribute("style", `bottom`);
            }
            if (doCal) {
                doCal.removeAttribute("style", `bottom`);
            }
            if (present) {
                present.removeAttribute("style", `bottom`);
            }
        },
        waitForDatas(){
            if(this.datas.length !== 0) {
                this.$nextTick(() => {
                    this.macy();
                    this.$nextTick(() => {
                        this.removeStatusOfFixButton();
                    })
                })
            }
        },
        ...mapActions([
            "getSchoolDatas",
            "toggleLoading"
        ]),
    },
    mounted: async function() {
        await this.toggleLoading(true);
        await this.apiGetSchoolDatas();
        await this.waitForDatas();
        await this.toggleLoading(false);
    },
    destroyed() {
        if(this.datas.length !== 0){
            this.macyWaterfall.remove();
            this.macyWaterfall = null;
        }
    }
}
</script>

<style lang="scss" scoped>
#classroomIndex {
    background-color: #fff;
}
#classroom__waterfall {
    max-width: 1438px;
    width: 80%;
    margin: auto;
    margin-top: 40px;
}

.item {
    cursor: pointer;
    .item-img {
        width: 100%;
    }
    .item-content {
        padding: 16px;
        height: auto;
        h3 {
            font-size: 21px;
        }
        .item-date {
            color: #808080;
            font-size: 12px;
        }
        p {
            font-size: 15px;
            line-height: 24px;
        }
        .item-gotoPage {
            text-align: right;
            img {
                width: 24px;
            }
        }
    }
}
.itemShow {
    display: block;
}
.classroom__banner {
    width: 100%;
    height: 350px;
    background-color: #ccc;
    position: relative;
    background-image: url("../../assets/img/svg/learnPage/LearnPagetopBg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 65% center;
    .classroom__tittle {
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
.containerSection {
    display: flex;
    flex-wrap: wrap;
}
@media screen and (min-width: 768px) {
    .item {
        max-width: 440px;
        border: 1px solid #ccc;
    }
    .classroom__banner{
        .classroom__tittle{
            width: 90%;
            height: 34px;
            padding-top: 34px;
            h1 {
                font-size: 34px;
            }
        }
    }
}

@media screen and (min-width: 1024px) {
    .classroom__banner {
        background-position: center 25%;
    }
}
</style>