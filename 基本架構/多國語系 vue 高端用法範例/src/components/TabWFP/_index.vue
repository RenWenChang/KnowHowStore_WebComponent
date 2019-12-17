<template>
    <div class="tabWFP">
        <ul class="tabWFP__list">
            <li class="tabWFP__list__item" v-for="(route,index) in routes" :key="index">
                <router-link
                    class="item__tab"
                    :to="{path:route.path}"
                    active-class="item__tab--active"
                    tag="button"
                >
                    <span>{{route.label}}</span>
                    <span v-if="route.suffix" class="tab__suffix">{{route.suffix}}</span>
                </router-link>
            </li>
            <!-- 因為router link 沒有辦法偵測query故需要自定義一個元件進行導向 -->
            <!-- 資料維護頁籤 -->
            <li class="tabWFP__list__item" v-for="(route) in tabs" :key="`tab${route.id}`">
                <button
                    class="item__tab"
                    :class="{'item__tab--active': route.id===activeRouteId}"
                    @click="$router.push({
                        path:route.path,
                        query:{
                            id: route.id
                        }
                    })"
                >{{route.label}}</button>
                <div class="deleteBt" @click="deleteThisTab(route.id)">X</div>
            </li>
        </ul>
    </div>
</template>
<script>
/**
 * 因為這個元件的path主要為add query maintain, 所以使用path去進行導向
 */
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
        currentIndex: 0
    }),
    props: {
        routes: {
            type: Array,
            default: () => {
                return [
                    {
                        path: 'add',
                        label: '新增',
                    },
                    {
                        path: 'query',
                        label: '查詢',
                    },
                    // {
                    //     path: 'maintain',
                    //     label: '資料維護',
                    // }
                ]
            }
        },
        root: {
            type: String,
            default: 'query'
        }
    },
    destroyed() {
        this.clearTabs()
    },
    computed: {
        activeRouteId() {
            return this.$route.query.id
        },
        ...mapGetters(["tabs"])
    },
    methods: {
        deleteThisTab: function (id) {
            this.deleteTab(id);
            this.$router.push(this.root).catch(err => {
                // vue router 升級到3.1.x 後，重複點擊導航時（連續點擊相同路由鏈接）控制檯出現報錯 
                // {_name: "NavigationDuplicated", name: "NavigationDuplicated"}，
                // 雖然不影響功能使用，但也不能視而不見。
                return err
            });
        },
        ...mapActions(["clearTabs", "deleteTab"])
    }
}
</script>
<style lang="scss" scoped>
.tabWFP__list {
    display: flex;
    .tabWFP__list__item {
        position: relative;
        .item__tab {
            font-weight: bold;
            background-color: #1f2532;
            color: white;
            display: flex;
            margin-left: 38px;
            position: relative;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            padding: 0 20px;
            cursor: pointer;
            border: none;
            .tab__margin {
                position: absolute;
            }
            .tab__margin--left {
                left: 0;
                transform: translateX(-100%);
            }
            .tab__margin--right {
                right: 0;
                transform: translateX(100%);
            }
            &::before {
                content: url("./left-01.svg");
                position: absolute;
                left: 0px;
                width: 12px;
                height: 32px;
                transform: translateX(-100%);
            }
            &::after {
                content: url("./right-01.svg");
                position: absolute;
                right: 0px;
                width: 22px;
                height: 32px;
                transform: translateX(100%);
            }
            .tab__suffix {
                border-radius: 8.5px;
                background-color: rgba(255, 255, 255, 0.4);
                font-size: 13px;
                align-self: center;
                margin-left: 8px;
                padding: 0 7px;
                line-height: 16px;
            }
        }
        .item__tab--active {
            background-color: #f6f6f6;
            color: #2f3bf5;
            &::before {
                content: url("./left-01-white.svg");
                position: absolute;
                left: 0px;
                width: 12px;
                height: 32px;
                transform: translateX(-100%);
            }
            &::after {
                content: url("./right-01-white.svg");
                position: absolute;
                right: 0px;
                width: 23px;
                height: 32px;
                transform: translateX(100%);
            }
            .tab__suffix {
                background-color: #cbf1cf;
                color: #00b85a;
            }
        }
        .deleteBt {
            position: absolute;
            width: 16px;
            height: 16px;
            font-size: 13px;
            line-height: 16px;
            text-align: center;
            display: block;
            border-radius: 50%;
            background-color: #696969;
            color: #f6f6f6;
            top: 8px;
            right: -5px;
            z-index: 1;
            cursor: pointer;
            opacity: 0.3;
            transition: 0.1s opacity ease;
        }
        .deleteBt:hover {
            opacity: 1;
        }
    }
}

@media screen and (min-width: 1440px) {
    .tabWFP__list {
        .tabWFP__list__item {
            .item__tab {
                // font-size: 14px;
            }
        }
    }
}
</style>