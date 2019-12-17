<template>
    <div id="login_wrap">
        <div id="login">
            <div id="login_nav">
                <div id="login_systemName">
                    <span>{{ $t('title') }}</span>
                </div>
                <div class="dropdown ddmenu">
                    <langDropdown :width="'2'" :dataSourceArray="langList"></langDropdown>
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
                        <span>{{ $t('company')}}</span>
                    </div>
                    <loginMainDropdown :width="'100'" :dataSourceArray="companyList"></loginMainDropdown>
                </div>
                <div class="inputGroupWithTitle">
                    <div class="input_title">
                        <span>{{ $t('loginAccount')}}</span>
                    </div>
                    <div class="baseInputWrapper" id="login_oparetion_zone_inputAcc">
                        <input
                            :placeholder=" $t('PlaceHolderAccount')"
                            class="baseInput"
                            type="text"
                        />
                    </div>
                    <div class="inputErrorMsg">{{$t('errorMessage')}}</div>
                </div>
                <div class="inputGroupWithTitle">
                    <div class="input_title">
                        <span>{{$t('loginPassWord')}}</span>
                        <a>{{$t('forgotPassword')}}</a>
                    </div>
                    <div class="baseInputWrapper" id="login_oparetion_zone_inputUserKey">
                        <div class="keyGroup">
                            <input
                                :placeholder=" $t('PleaseHolderPassWord')"
                                class="baseInput"
                                :type="inputType"
                                :ref="'ukbaseInput'"
                            />
                            <div @click="toggleUserkey" class="showKey">
                                <img
                                    v-if="inputType==='text'"
                                    class="view-1-width"
                                    src="./svg/view-1.svg"
                                    alt
                                />
                                <img v-else class="view-1-width" src="./svg/View-off.svg" alt />
                            </div>
                        </div>
                    </div>
                    <div class="inputErrorMsg">{{$t('errorMessage')}}</div>
                </div>

                <button
                    id="login_oparetion_zone_goButton"
                    @click="getTokenThenSignIn()"
                >{{ $t('login_button') }}</button>
                <div id="login_oparetion_zone_copyRightInfo">
                    <span>2019 © Designed by Systemweb Technology All rights reserved.</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import language from './language.js'
import langDropdown from './langDropdown.vue'
import loginMainDropdown from './loginMainDropdown.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
        navTab: "TA",
        tabItem: ["TIPS", "TA", "ROBO"],
        inputType: "password",
        langList: [
            { text: '繁體中文', value: 'zh-Hant' },
            { text: '英文', value: 'en-US' }
        ],
        companyList: [
            { text: '投信公司1', value: '1' },
            { text: '投信公司2', value: '2' },
        ]
    }),
    components: {
        langDropdown,
        loginMainDropdown
    },
    methods: {
        async getTokenThenSignIn() {
            await this.getToken()
            await this.signIn()
        },
        getToken: async function () {
            const response = await this.postSysLogin();
            const apiToken = response.Datas.TokenId;
            if (response) {
                this.getFirstToken = true;
            }
            sessionStorage.setItem('AuthToken', apiToken);
        },
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
        signIn: async function () {
            let AuthToken = sessionStorage.getItem('AuthToken');
            const config = {
                "userCode": "IFA001",
                "userKey": "kpKqA0in14guTmXI3ny+Yl76uiAo0SlYb9JvxqLI0M/aLpFWLNyiEjWChNoLjydk2edVQ6M0qNJ9H9DbY4kg92CA/n0JgqHueORS1TH7HMa5rhG2e+aGeKED9jeCmVEdxRKRfxeb2G5+e2byFPfmxkNXHOOLGXMy09LJkGD7HaQzJ9kUsTE2XavCES2Yn2rnikuM8kAZCCZouW9v4qABjSmKZwqmZS5H4x49H73Z93jK9ErDyZ1JNAq/eJ/3WVZs5KOPB8PppNRHVZdK53jVIuXRr0xcAHKxYg9PAiMNRmz1EYrCkvLmQCf/3Hr8BuVjIi/TD0bZj10T4Ji5fhZjoA=="
            }
            if (!AuthToken) {
                alert('沒收到第一個TOKEN')
                return
            }
            const response = await this.postLogin({
                headers: {
                    'Content-Type': 'application/json',
                    'client_id': 'WFP_APIClient',
                    'client_secret': 'secret',
                    'grant_type': 'client_credentials',
                    'X-Origin-Time': '2019-05-21T09:35:58.881',
                    'Authorization': 'Bearer ' + AuthToken,
                },
                data: config
            });
            const userToken = response.Datas.TokenId;
            sessionStorage.setItem('userToken', userToken);
            this.$router.push({
                name: "dashboard"
            });
        },
        ...mapActions(["postSysLogin", "postLogin"]),
        ...mapMutations(["setPage", "setMenu"])
    },
    computed: {
        ...mapGetters(["menuState"])
    },
    mounted() {

    },
    beforeCreate() {
        let locale = this.$i18n.locale;
        this.$i18n.setLocaleMessage(locale, language[locale]);
    },
}
</script>
<style lang="scss">
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
    width: 300px;
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
    border: none;
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
.showKey .view-1-width {
    width: 24px;
    height: 24px;
}
</style>

