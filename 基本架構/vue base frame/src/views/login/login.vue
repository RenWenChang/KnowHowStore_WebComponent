<template>
    <div id="login_wrap">
        <div id="login">
            <div id="login_nav">
                <div id="login_systemName">
                    <span>Systemweb Technology</span>
                </div>
                <div class="dropdown ddmenu">
                    <div class="dd_btn">
                        <div class="icon_text_group">
                            <span class="beforeIcon">
                                <img src="./svg/earth-3.svg" alt />
                            </span>
                            <span class="replace">繁體中文</span>
                        </div>
                        <span>
                            <img src="./svg/arrow-down.svg" alt />
                        </span>
                    </div>
                    <ul class>
                        <li class="dd_option">
                            <a>英文</a>
                        </li>
                        <li class="dd_option">
                            <a>簡體中文</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="login_oparetion_zone">
                <div id="login_oparetion_zone_title">
                    <div id="login_oparetion_zone_title_name">
                        <span>Web Forward Platform</span>
                    </div>
                    <div id="login_oparetion_zone_title_version">
                        <span>Version 1.3.0.1</span>
                    </div>
                </div>
                <div id="login_oparetion_zone_systemSwitch">
                    <ul>
                        <li
                            v-for="(item ,index) in tabItem"
                            :key="index"
                            :class="{active:item===navTab}"
                            @click="switchTab(item)"
                        >{{item}}</li>
                    </ul>
                </div>
                <div id="login_oparetion_zone_selection">
                    <div class="input_title">
                        <span>投信公司</span>
                    </div>
                    <div class="dropdown ddmenu dropdown_st2">
                        <div class="dd_btn">
                            <div class="icon_text_group">
                                <span class="replace">投信公司</span>
                            </div>
                            <span>
                                <img src="./svg/arrow-down.svg" alt />
                            </span>
                        </div>
                        <ul class>
                            <li class="dd_option">
                                <a>投信公司1</a>
                            </li>
                            <li class="dd_option">
                                <a>投信公司2</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="inputGroupWithTitle">
                    <div class="input_title">
                        <span>登入帳號</span>
                    </div>
                    <div class="baseInputWrapper" id="login_oparetion_zone_inputAcc">
                        <input placeholder="請輸入帳號" class="baseInput" type="text" />
                    </div>
                    <div class="inputErrorMsg">錯誤訊息</div>
                </div>

                <div class="inputGroupWithTitle">
                    <div class="input_title">
                        <span>登入密碼</span>
                        <a>忘記密碼</a>
                    </div>
                    <div class="baseInputWrapper" id="login_oparetion_zone_inputUserKey">
                        <div class="keyGroup">
                            <input
                                placeholder="請輸入密碼"
                                class="baseInput"
                                :type="inputType"
                                :ref="'ukbaseInput'"
                            />
                            <div @click="toggleUserkey" class="showKey">
                                <img v-if="inputType==='text'" class="view-1-width" src="./svg/view-1.svg" alt />
                                <img v-else class="view-1-width" src="./svg/View-off.svg" alt />
                            </div>
                        </div>
                    </div>
                    <div class="inputErrorMsg">錯誤訊息</div>
                </div>

                <div id="login_oparetion_zone_goButton">
                    <span>登入</span>
                </div>
                <div id="login_oparetion_zone_copyRightInfo">
                    <span>2019 © Designed by Systemweb Technology All rights reserved.</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    data: () => ({
        navTab: "TA",
        tabItem: ["TIPS", "TA", "ROBO"],
        inputType: "password"
    }),

    methods: {
        toggleUserkey: function () {
            if (this.inputType === "password") {
                this.inputType = "text";
            } else {
                this.inputType = "password";
            }
        },
        switchTab: function (item) {
            this.navTab = item;
        },
        ...mapMutations(["setPage", "setMenu"])

    },
    computed: {
        ...mapGetters(["menuState"])
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
img {
    width: 16px;
    height: 16px;
}
.inputGroupWithTitle {
    position: relative;
    padding: 2px 0;
}

.inputGroupWithTitle .inputErrorMsg {
    position: absolute;
    top: 70px;
    left: 0;
    font-size: 12px;
    font-weight: 500;
    color: red;
}

.input_title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.9px;
    color: #414042;
    margin-bottom: 5px;
}

.input_title a {
    text-decoration: underline;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    color: #0043ff;
    cursor: pointer;
}

.baseInputWrapper {
    margin-bottom: 30px;
    width: 100%;
    height: 40px;
    padding: 1px 10px;
    border-radius: 4px;
    border: solid 1px #d0d0d0;
    background-color: #ffffff;
}

.baseInput {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
}

.baseInput::-webkit-input-placeholder {
    opacity: 0.5;
}

.baseInput::-moz-placeholder {
    opacity: 0.5;
}

.baseInput:-ms-input-placeholder {
    opacity: 0.5;
}
/******************************************************* dropdown ******************************************************/

/* user menu settings */
.dropdown {
    box-sizing: border-box;
    display: block;
    padding: 0 10px;
    width: 200px;
    height: 24px;
    position: relative;
    cursor: pointer;
    background: transparent;
    font-size: 14px;
    color: #656565;
    font-weight: normal;
    -webkit-transition: all 0.15s linear;
    -moz-transition: all 0.15s linear;
    -ms-transition: all 0.15s linear;
    -o-transition: all 0.15s linear;
    transition: all 0.15s linear;
}

.dropdown > .dd_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*display block 增加pointer-events兼容性*/
    pointer-events: none;
    height: 100%;
    width: 100%;
}

.dropdown > .dd_btn > * {
    display: inline-block;
}

.dropdown > .dd_btn > .icon_text_group {
    display: flex;
    justify-content: flex-start;
    width: 100px;
}

.dropdown > .dd_btn > .icon_text_group > * {
    display: inline-block;
}

.dropdown:hover {
    color: #898989;
}

.dropdown.open {
    background: #5a90e0;
    color: #fff;
}

.dropdown ul {
    width: 100%;
    position: absolute;
    margin: 0;
    /* rest */
    top: 100%;
    left: 0;
    /* move content -4px because of container left border */
    max-height: 0px;
    padding: 0px 0px;
    background: #fff;
    -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    transition-property: max-height, padding;
    transition-duration: 0.3s;
    transition-delay: 0;
    overflow: hidden;
    z-index: 1;
}

.dropdown > .ul {
    width: 100%;
    transition-property: max-height, padding;
    transition-duration: 0.3s;
    transition-delay: 0;
    max-height: 200px;
    padding: 5px 0px;
}

.dropdown ul li {
    font-size: 0.9em;
}

.dropdown ul li a,
.dropdown ul li div {
    text-decoration: none;
    display: block;
    color: #447dd3;
    padding: 7px 16px;
    /* pointer-events: none; */
}

.dropdown ul li a:hover,
.dropdown ul li div:hover {
    color: #6fa0e9;
    background: #e7f0f7;
}
/******************************************************* login Layout ******************************************************/
#login_wrap {
    background-color: #f6f6f6;
    width: 100%;
    height: 100vh;
}

#login {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f6f6f6;
    width: 100%;
    padding: 24px;
}

#login > #login_nav {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
}

#login > #login_nav > #login_systemName {
    width: 200px;
    height: 18px;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.38px;
    color: #414042;
}

#login > #login_oparetion_zone {
    width: 420px;
}

#login_oparetion_zone > * {
    width: 100%;
}

#login_oparetion_zone #login_oparetion_zone_title {
    margin-bottom: 24px;
}

#login_oparetion_zone #login_oparetion_zone_title_name {
    font-size: 28px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.77px;
    color: #363940;
}

#login_oparetion_zone #login_oparetion_zone_title_version {
    font-size: 13px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #2f3bf5;
}

#login_oparetion_zone #login_oparetion_zone_systemSwitch {
    margin-bottom: 30px;
}

#login_oparetion_zone #login_oparetion_zone_systemSwitch > ul {
    display: flex;
    justify-content: space-between;
}

#login_oparetion_zone #login_oparetion_zone_systemSwitch > ul li {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #414042;
    width: 130px;
    border-radius: 4px;
    border: solid 1px #d0d0d0;
    background-color: #ffffff;
    padding: 20px;
    cursor: pointer;
}

#login_oparetion_zone #login_oparetion_zone_systemSwitch > ul .active {
    border-radius: 4px;
    box-shadow: 2px 2px 8px 0 rgba(55, 82, 199, 0.14);
    border: solid 1px #2f3bf5;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #2f3bf5;
}

#login_oparetion_zone #login_oparetion_zone_selection {
    margin-bottom: 30px;
}

#login_oparetion_zone #login_oparetion_zone_goButton {
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    box-shadow: 2px 2px 10px 0 rgba(55, 82, 199, 0.22);
    background-color: #2f3bf5;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin-bottom: 30px;
    cursor: pointer;
}

#login_oparetion_zone #login_oparetion_zone_copyRightInfo {
    height: 32px;
    opacity: 0.5;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #363940;
}

#login_oparetion_zone_inputUserKey .keyGroup {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}

#login_oparetion_zone_inputUserKey .keyGroup input {
    width: calc(100% - 50px);
}

#login_oparetion_zone_inputUserKey .keyGroup .showKey {
    display: flex;
    justify-content: center;
    align-items: center;
}
.showKey .view-1-width{
    width: 24px;
    height: 24px;
}

/******************************************************* dropdown_st2 ******************************************************/
.dropdown_st2 {
    width: 100%;
    box-sizing: border-box;
    height: 39px;
    border-radius: 4px;
    border: solid 1px #d0d0d0;
    background-color: #ffffff;
}

.dropdown_st2 > .dd_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown_st2 > .dd_btn > * {
    display: inline-block;
}

.dropdown_st2 > .dd_btn > .icon_text_group {
    display: flex;
    justify-content: space-between;
    width: 100px;
}

.dropdown_st2 > .dd_btn > .icon_text_group > * {
    display: inline-block;
}
.beforeIcon{
    margin-right:10px;
}
</style>