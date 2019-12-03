<template>
    <div class="test">
        <nav class id="navMenu" :ref="'navMenu'">
            <div id="navMenuTitle" @click="menuClose">
                <span>系統名稱</span>
                <img src="./svg/Righ-Left.svg" id="icon-RighLeft" alt />
            </div>
            <div id="navTab">
                <ul>
                    <li
                        v-for="(item, index) in navTab"
                        :key="index"
                        :class="{ active: switchMenu===item}"
                        @click="switchMenuTab($event,item)"
                    >{{item}}</li>
                </ul>
            </div>
            <div id="navMenuSearchbar">
                <div class="inputWrap">
                    <input placeholder="請依功能名稱或功能代號搜尋" type="text" />
                    <img src="./svg/Magnifier - simple-line-icons Copy.svg" id="magnifier" alt />
                </div>
            </div>
            <div id="menuGroups">
                <ul v-if="switchMenu==='功能清單'" class="menuGroups__list">
                    <li
                        v-for="(route, index) in routes"
                        :key="index"
                        class="menuGroups__list__item"
                    >
                        <a @click="routeToPage(route)">{{route.label}}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    data: () => ({
        routes: [
            {
                name: 'singleRecord',
                label: 'Maintain: 單筆資料新增'
            },
            {
                name: 'recordComplex',
                label: 'Maintain: 基金主檔（複合資料）'
            },
            {
                name: 'review',
                label: 'Maintain: 查詢（覆核權限）'
            },
            {
                name: 'todo',
                label: 'To-do list: 待辦事項'
            },
            {
                name: 'dashboard',
                label: 'Dashboard'
            },
            {
                name: 'singleRecord',
                label: 'Maintain: 單筆資料新增'
            },
            {
                name: 'recordComplex',
                label: 'Maintain: 基金主檔（複合資料）'
            },
            {
                name: 'review',
                label: 'Maintain: 查詢（覆核權限）'
            },
            {
                name: 'todo',
                label: 'To-do list: 待辦事項'
            },
            {
                name: 'dashboard',
                label: 'Dashboard'
            },
            {
                name: 'singleRecord',
                label: 'Maintain: 單筆資料新增'
            },
            {
                name: 'recordComplex',
                label: 'Maintain: 基金主檔（複合資料）'
            },
            {
                name: 'review',
                label: 'Maintain: 查詢（覆核權限）'
            },
            {
                name: 'todo',
                label: 'To-do list: 待辦事項'
            },
            {
                name: 'dashboard',
                label: 'Dashboard'
            },
            {
                name: 'singleRecord',
                label: 'Maintain: 單筆資料新增'
            },
            {
                name: 'recordComplex',
                label: 'Maintain: 基金主檔（複合資料）'
            },
            {
                name: 'review',
                label: 'Maintain: 查詢（覆核權限）'
            },
            {
                name: 'todo',
                label: 'To-do list: 待辦事項'
            },
            {
                name: 'dashboard',
                label: 'Dashboard'
            },
            {
                name: 'singleRecord',
                label: 'Maintain: 單筆資料新增'
            },
            {
                name: 'recordComplex',
                label: 'Maintain: 基金主檔（複合資料）'
            },
            {
                name: 'review',
                label: 'Maintain: 查詢（覆核權限）'
            },
            {
                name: 'todo',
                label: 'To-do list: 待辦事項'
            },
            {
                name: 'dashboard',
                label: 'Dashboard'
            },
            {
                name: 'singleRecord',
                label: 'Maintain: 單筆資料新增'
            },
            {
                name: 'recordComplex',
                label: 'Maintain: 基金主檔（複合資料）'
            },
            {
                name: 'review',
                label: 'Maintain: 查詢（覆核權限）'
            },
            {
                name: 'todo',
                label: 'To-do list: 待辦事項'
            },
            {
                name: 'dashboard',
                label: 'Dashboard'
            }
        ],
        switchMenu: '功能清單',
        navTab: ["功能清單", "我的最愛", "流程精靈"],
    }),

    methods: {
        selector: function (selector) {
            return document.querySelector(selector);
        },
        menuClose: function () {
            let navMenu = this.$refs.navMenu;
            let frameRight = this.selector("#frameRight");
            let menuSwithcer = this.selector("#menuSwithcer");
            let header = this.selector("header");
            if (!navMenu.classList.contains("close")) {
                navMenu.classList.add("close");
                frameRight.classList.remove("frameRightSpaceForMenu");
                frameRight.classList.remove("spaceForMenu");
                header.classList.remove("headerSpaceForMenu");
                menuSwithcer.classList.remove("close");
            }
            this.setMenu(false);
        },
        switchMenuTab(e, item) {
            this.switchMenu = item;
        },
        routeToPage(route) {
            sessionStorage.setItem('route', JSON.stringify(route))
            const currentRouteName = this.$route.name
            const targetRouteName = `${route.name}`
            if (currentRouteName !== targetRouteName) {
                this.$router.push({
                    name: targetRouteName
                })
            }
        },
        ...mapMutations(["setPage", "setMenu"])

    },
    computed: {
        ...mapGetters(["menuState"])
    }
}
</script>
<style lang="scss" scoped>
nav {
    width: 320px;
    background-color: #1f2532;
    transition: width ease 0.3s;
    overflow: hidden;
    height: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    transition: width ease 0.3s;
}

#navMenuTitle {
    width: 320px;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    cursor: pointer;
}
#navMenuSearchbar {
    width: 320px;
    padding: 0px 24px 40px 24px;
    display: flex;
    justify-content: space-between;
}
#navMenuSearchbar .inputWrap {
    display: flex;
    width: 320px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.inputWrap input {
    outline: none;
    border: none;
    height: 40px;
    background-color: transparent;
    width: calc(100% - 38px);
    color: #ffffff;
}
#navTab {
    width: 320px;
    padding: 24px;
}
#navTab ul {
    display: flex;
    justify-content: space-between;
}
#navTab ul li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 89px;
    word-break: break-all;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1px;
    cursor: pointer;
}
#navTab ul > .active {
    font-family: NotoSansCJKtc;
    font-size: 16px;
    color: #1dd476;
    height: 40px;
    border-radius: 20px;
    background-color: #0a0c10;
}

#headerDate {
    margin-right: 10px;
}
#menuGroups {
    width: 320px;
    padding: 0;
    max-height: calc(100% - 100px);
    overflow-y: scroll;
    .menuGroups__list__item__link {
        color: white;
        text-decoration: none;
    }
}

@media screen and (min-width: 1920px) {
#menuGroups {
    max-height: calc(100% - 295px);
}
}


#menuGroups li {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 24px;
    border-bottom: 1px solid rgba(236, 237, 239, 0.15);
    cursor: pointer;
}
#menuGroups ul li:first-child {
    border-top: 1px solid rgba(236, 237, 239, 0.15);
}
#icon-RighLeft {
    width: 16px;
    height: 16px;
}
#magnifier {
    width: 24px;
    height: 24px;
    cursor: pointer;
}
.d-none {
    display: none;
}
.close {
    width: 0;
}
@media screen and (min-width: 1920px) {
    nav {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
    }
}
</style>