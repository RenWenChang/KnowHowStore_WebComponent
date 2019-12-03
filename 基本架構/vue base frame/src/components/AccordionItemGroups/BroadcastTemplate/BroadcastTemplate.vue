
<template>
    <div class="contentWrap">
        <div
            class="accordionItem"
            v-for="(item,index) in itemGroup"
            :key="index"
            :ref="'getAccordionItem'"
        >
            <div class="broadcastDate" @click="toggle(index)">
                <div class="dateInfo">
                    <span class="dateTitle">公告日期：</span>
                    <span class="date">{{'2019/10/31'}}</span>
                    <span class="length">{{'2'}}</span>
                </div>
                <Expand ></Expand>
            </div>
            <div class="content" v-for="(content,i) in item.content" :key="i">
                <div class="subject">
                    <span class="title">{{content.subject}}</span>
                    <div class="download">
                        <span>icon</span>
                        <a :href="content.href">相關檔案下載</a>
                    </div>
                </div>
                <p>{{content.p}}</p>
                <div class="broadcastTimeSec">
                    <span class="timeTitle">發佈日期：</span>
                    <span class="time">{{content.time}}</span>
                    <span class="editorTitle">發佈人員：</span>
                    <span class="editor">{{content.editor}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Expand from "./Expand_svg.vue"
export default {
    components: {
        Expand
    },
    data: () => ({
 
    }),
    props: {
        itemGroup: {
            type: Array,
            default: () => {
                return [
                    {
                        date: '2019/10/31',
                        length: "2",
                        content: [
                            {
                                subject: '我是公告標題DEF',
                                time: '2019/10/31 13:12:01',
                                editor: 'Mary',
                                href: '#',
                                p: '上畫命國日人來辦品辦為在中竟的的明問生想了農林公麼廠然入今示的吃細來頭到事件，小且象來經多造電象北趣好過傷言大件任我，一等生單她：我進上是有：黨計。',
                            },
                            {
                                subject: '我是公告標題DEF',
                                time: '2019/10/31 13:12:01',
                                editor: 'Mary',
                                href: '#',
                                p: '上畫命國日人來辦品辦為在中竟的的明問生想了農林公麼廠然入今示的吃細來頭到事件，小且象來經多造電象北趣好過傷言大件任我，一等生單她：我進上是有：黨計。',
                            }
                        ]
                    }
                ]
            }
        },
    },
    methods: {
        toggle: function (index) {
            let i = this.$refs.getAccordionItem[index].classList;
            let expand = document.querySelectorAll('.accordionItem_expand')[index].classList;
            if (i.contains("open")) {
                i.remove("open");
                expand.remove("accordionItem_collapse");
            } else {
                i.add("open");
                expand.add("accordionItem_collapse");
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.contentWrap {
    width: 100%;
    height: calc(100% - 60px);
    overflow-x: auto;
    .accordionItem {
        padding: 0 16px 16px 16px;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.04);
        max-height: 400px;
        overflow: hidden;
        transition: max-height 0.3s ease;
        max-height: 47px;
        margin-bottom: 8px;
    }
    .accordionItem:last-child {
        margin-bottom: 0px;
    }
    .open {
        max-height: 400px;
        overflow: auto;
        transition: max-height 0.3s ease;
    }
    .broadcastDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        border-bottom: #ecedef 1px solid;
        cursor: pointer;
        .dateInfo {
            .dateTitle {
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: 1px;
                color: #414042;
                margin-right: 8px;
            }
            .date {
                font-size: 13px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: normal;
                text-align: center;
                color: #00b85a;
                margin-right: 8px;
            }
            .length {
                width: 32px;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
                background-color: #e5f5e7;
                font-weight: 600;
                font-size: 13px;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: normal;
                text-align: center;
                color: #00b85a;
            }
        }
    }
    .content {
        padding-bottom: 16px;
        border-bottom: #ecedef 1px solid;
        .subject {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            .title {
                font-size: 14px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: 0.9px;
                color: #00b85a;
            }
            .download {
                a {
                    font-size: 13px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.54;
                    letter-spacing: normal;
                    color: #0043ff;
                }
                span {
                    font-size: 13px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.54;
                    letter-spacing: normal;
                    color: #0043ff;
                }
            }
        }
        p {
            min-height: 60px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #414042;
        }
        .broadcastTimeSec {
            display: flex;
            align-items: center;
            .timeTitle {
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: center;
                color: #414042;
                margin-right: 8px;
            }
            .time {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: normal;
                text-align: center;
                color: #363940;
                margin-right: 8px;
            }
            .editorTitle {
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: center;
                color: #414042;
                margin-right: 8px;
            }
            .editor {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.21;
                letter-spacing: normal;
                text-align: center;
                color: #363940;
            }
        }
    }
    .content:last-child {
        padding-bottom: 0;
        border: none;
    }
}
.contentWrap span {
    display: inline-block;
}
</style>