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
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
    },
    computed: {
        activeRouteId() {
            return this.$route.query.id
        },
        ...mapGetters(["tabs"])
    }
}
</script>
<style lang="scss" scoped>
.tabWFP__list {
    display: flex;
    .tabWFP__list__item {
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