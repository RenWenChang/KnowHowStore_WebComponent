<template>
    <div id="showbox" ref="showbox">
        <div class="showbox__close" @click="closed">
            <img src="@/assets/img/svg/experience/close.svg" />
        </div>
        <div class="boxWrap">
            <div id="boxTab">
                <div :class="[tabs?'active':'']" @click="tabsSwitch(true)">
                    <img id="icon__LINE" src="@/assets/img/icon/LINE.svg" alt />
                    <span>LINE</span>
                </div>
                <div :class="[!tabs?'active':'']" @click="tabsSwitch(false)">
                    <span>電子郵件</span>
                </div>
            </div>
            <div id="byLINE" v-if="tabs">
                <div>
                    <span>請依以下步驟加入第一銀行 LINE 官方帳號並綁定個人化服務，我們將傳送試算結果連結給您喔！</span>
                </div>
                <div>
                    <span class="lineStepWord">Step1:加入好友(若已加入且已綁定可省略此步驟)</span>
                    <button class="pc-none" @click="addFriend">加入好友</button>
                    <div class="group__img lineStepWord">
                        <img src="@/assets/img/QRcode/mobileToqrcode.svg" />
                        <img
                            class="QR-CODE"
                            :src="VUE_APP_LINE_ADD_FRIEND_QR_CODE"
                        />
                        <!-- <img src="@/assets/img/QRcode/firstbank.png" /> -->
                    </div>
                </div>
                <div>
                    <span class="lineStepWord">step 2: 按下面按鈕登入</span>
                    <button @click="LINE_Login">LINE 登入</button>
                </div>
                <div class="promotionMessage">
                    <span>★ 本行將傳送本次試算結果至您的line帳號！於行銷活動期間還可以參加「三重好禮大方送」之好康活動！活動詳情及個資蒐集告知事項請參閱：</span>
                    <span class="fakeA" @click="getIntoPromotion">{{PROMOTION_URL_1}}</span>
                </div>
                <div class="promotionMessage">
                    <span>★ 注意：獲得折扣碼之客戶本行將以line傳送訊息；若獲得一卡通贈品之客戶須至line填寫領取分行，本行將核對證件為本人方可領取。</span>
                </div>
            </div>
            <div v-else id="byEmail">
                <label :style="{'border-bottom':!nameOK?'#FF0000 2px solid':''}">
                    <span>*</span>
                    <span>您的姓名</span>
                    <input
                        maxlength="20"
                        ref="name"
                        v-model="info.CusName"
                        type="text"
                        @blur="nameCheck($event,true)"
                        @focus="nameOK=true"
                        @keypress="ifPressReturn($event)"
                    />
                    <span v-if="!nameOK&&(info.CusName==='')" class="errMsg">請輸入 姓名</span>
                    <span v-if="!nameOK&&(info.CusName!=='')" class="errMsg">姓名 格式錯誤</span>
                </label>
                <label :style="{'border-bottom':!emailOK?'#FF0000 2px solid':''}">
                    <span>*</span>
                    <span>電子郵件</span>
                    <input
                        maxlength="100"
                        type="email"
                        ref="email"
                        v-model="info.MailAddr"
                        @blur="emailCheck($event,true)"
                        @focus="emailOK=true"
                        @keypress="ifPressReturn($event)"
                    />
                    <span v-if="!emailOK&&(info.MailAddr==='')" class="errMsg">請輸入 Email</span>
                    <span v-if="!emailOK&&(info.MailAddr!=='')" class="errMsg">Email 格式錯誤</span>
                </label>
                <label
                    :style="{'border-bottom':!phoneOK&&info.PhoneNo!==''?'#FF0000 2px solid':''}"
                >
                    <span>*</span>
                    <span>手機電話</span>
                    <input
                        oninput="if(value.length>20)value=value.slice(0,20)"
                        ref="phone"
                        v-model="info.PhoneNo"
                        maxlength="20"
                        type="number"
                        @blur="phoneCheck($event,false)"
                        @focus="phoneOK=true"
                        @keypress="checkIsNumber"
                    />
                    <span v-if="!phoneOK&&(info.PhoneNo!=='')" class="errMsg">手機 格式錯誤</span>
                </label>
                <div class="buttonWrap">
                    <button v-if="couldSend" @click="send">傳送</button>
                    <button v-else class="disable">傳送</button>
                </div>

                <div class="promotionMessage">
                    <span>★ 請留下電子郵件，本行將寄送本次試算結果至您的信箱喔！於行銷活動期間還可以參加「三重好禮大方送」之好康活動！活動詳情及個資蒐集告知事項請參閱：</span>
                    <span class="fakeA" @click="getIntoPromotion">{{PROMOTION_URL_1}}</span>
                </div>
                <div class="promotionMessage">
                    <span>★ 注意：請提供正確姓名及電子郵件，本行將以此電子郵件寄送折扣碼、贈品等獲獎訊息；若獲得一卡通贈品之客戶須核對證件為本人方可領取。</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//本元件 更新session 使用者資訊後走 auth登入
/* eslint-disable */
import { floorToPrecision } from "@/math";
import { isFloatAllowZeros } from "@/regex";
import { getPrecision } from "@/math";
import { mapActions } from "vuex";

export default {
    watch: {
        DataToRequestAPI__reCale: {
            handler: function(newValue) {},
            deep: true
        },
        info: {
            immediate: true,
            handler: function() {
                sessionStorage.setItem("info", JSON.stringify(this.info));
            },
            deep: true
        }
    },
    props: {
        DataToRequestAPI__reCale: {
            type: Object,
            default: () => {
                return {};
            }
        },
        raw: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            tabs: true,
            info: {
                MailAddr: "",
                CusName: "",
                PhoneNo: "",
                InvTarget: "",
                LineUID: "" //
            },
            nameOK: true,
            emailOK: true,
            phoneOK: true,
            couldSend: false,
            PROMOTION_URL_1: "",
            VUE_APP_LINE_ADD_FRIEND_URL:"",
            VUE_APP_LINE_ADD_FRIEND_QR_CODE:""

        };
    },
    computed: {},
    methods: {
        closed: function() {
            this.$emit("update:click", false);
        },
        tabsSwitch: function(boo) {
            this.tabs = boo;
        },
        isEmpty: function(targetValue) {
            if (targetValue === "") {
                return true;
            } else {
                return false;
            }
        },
        nameCheck: function(e, require) {
            const value = e.target.value;
            let rule = /^[\u4E00-\u9FA5]{1,6}$/;
            let isEmpty = this.isEmpty(value);
            let otherValid = require ? !isEmpty : true;
            if (otherValid) {
                // if ((rule.test(value) && otherValid)) {
                this.nameOK = true;
            } else {
                this.nameOK = false;
            }
            this.$nextTick(() => {
                this.ifCouldSend();
            });
        },
        emailCheck: function(e, require) {
            let value = e.target.value;
            let rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            let isEmpty = this.isEmpty(value);
            let otherValid = require ? !isEmpty : true;
            if (value.search(rule) != -1 && otherValid) {
                this.emailOK = true;
            } else {
                this.emailOK = false;
            }
            this.$nextTick(() => {
                this.ifCouldSend();
            });
        },

        phoneCheck: function(e) {
            let value = e.target.value;
            let rule = /^09\d{8}$/;
            let isEmpty = this.isEmpty(value);
            let otherValid = require ? !isEmpty : true;
            if (rule.test(value) && otherValid) {
                this.phoneOK = true;
            } else {
                this.phoneOK = false;
            }
            this.$nextTick(() => {
                this.ifCouldSend();
            });
        },
        validateNumber(event) {
            /**
             * iPad 的 按鈕沒有event.key可以用，所以需要這個替代方案
             * https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
             */
            var key = window.event ? event.keyCode : event.which;
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true;
            } else if (key < 48 || key > 57) {
                return false;
            } else {
                return true;
            }
        },
        ifPressReturn: function(e) {
            if (e.keyCode === 13) {
                this.$nextTick(() => {
                    e.target.blur();
                });
            }
        },

        checkIsNumber(event) {
            /**
             * 用event.prevent來阻擋input的"顯示內容"更新
             * https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number
             */
            const invalidChars = ["-", "e", "+", "E"];
            if (
                invalidChars.includes(event.key) ||
                !this.validateNumber(event)
            ) {
                event.preventDefault();
            }
            if (event.key === "." && !String(event.target.value)) {
                event.target.value = "";
                event.preventDefault();
            }
            this.ifPressReturn(event);
        },

        ifCouldSend: async function() {
            let emailNotEmpty = this.$refs.email.value !== "";
            let nameNotEmpty = this.$refs.name.value !== "";
            let phoneNotEmpty = this.$refs.phone.value !== "";
            let nameOK = this.nameOK;
            let emailOK = this.emailOK;
            let phoneOK = this.phoneOK;
            let norequire__phone = phoneNotEmpty ? phoneOK : true;
            if (
                emailNotEmpty &&
                nameNotEmpty &&
                nameOK &&
                emailOK &&
                norequire__phone
            ) {
                this.couldSend = true;
            } else {
                this.couldSend = false;
            }
        },
        LINE_Login: async function() {
            this.closed();
            let envs = window.__env__;
            const urlName = `${process.env.VUE_APP_URL_NAME}`;
            let client_id = envs[urlName].VUE_APP_LINE_CLIENT_ID;

            let URL = `https://access.line.me/oauth2/v2.1/authorize?`;
            URL += "response_type=code";
            URL += `&client_id=${client_id}`;
            URL += `&redirect_uri=${window.location.origin}/efirstWeb/LINE_Login_Landing`;
            URL += "&scope=openid%20profile";
            URL += "&state=abcde";
            window.open(`${URL}`, "_blank");
        },
        addFriend: function() {
            window.open(this.VUE_APP_LINE_ADD_FRIEND_URL, "_blank");
        },
        send: async function() {
            this.closed();
            let URL = `${window.location.origin}/efirstWeb/Email_Landing`;
            window.open(`${URL}`, "_blank");
        },
        getIntoPromotion: function() {
            window.open(`${this.PROMOTION_URL_1}`, "_blank");
        }
    },
    mounted() {
        let envs = window.__env__;
        const urlName = `${process.env.VUE_APP_URL_NAME}`;
        this.PROMOTION_URL_1 = envs[urlName].PROMOTION_URL_1;
        this.VUE_APP_LINE_ADD_FRIEND_URL =
            envs[urlName].VUE_APP_LINE_ADD_FRIEND_URL;
        this.VUE_APP_LINE_ADD_FRIEND_QR_CODE =
            envs[urlName].VUE_APP_LINE_ADD_FRIEND_QR_CODE;
        let InvTarget = JSON.parse(sessionStorage.getItem("expDatas")).target;
        this.info.InvTarget = String(InvTarget);
    },
    destroyed() {}
};
</script>
<style lang="scss" scoped>
#showbox {
    input[type="number"] {
        -moz-appearance: textfield;
    }
    input,
    textarea,
    select {
        appearance: none;
        -moz-appearance: none;
        outline: none;
        -moz-outline: none;
        box-shadow: none;
        -moz-box-shadow: none;
    }

    position: fixed;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 50;
    top: 0;
    left: 0;
    img {
        display: block;
        width: 28px;
        height: 28px;
    }
    .showbox__close {
        display: block;
        position: fixed;
        top: -510px;
        bottom: 0;
        left: 300px;
        right: 0;
        margin: auto;
        color: #ffffff;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    @media screen and (min-width: 768px) {
        .showbox__close {
            top: -510px;
            left: 530px;
        }
    }
    @media screen and (min-width: 1024px) {
        .showbox__close {
            top: -550px;
            left: 530px;
        }
    }
    .boxWrap {
        position: fixed;
        width: 300px;
        height: 470px;
        border-radius: 10px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.18);
        background-color: #ffffff;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;

        #byLINE {
            overflow-y: auto;
            padding: 8px 20px;
            height: 380px;
            .promotionMessage {
                width: 100%;
                span {
                    line-height: 2;
                    display: block;
                    width: 100%;
                    color: #808080;
                    font-weight: 500;
                }
                .fakeA {
                    width: 100%;
                    display: block;
                    cursor: pointer;
                    word-break: break-all;
                }
            }
        }
        #byEmail {
            padding: 32px 20px 0px 20px;
            overflow-y: auto;
            height: 380px;
            .promotionMessage {
                width: 100%;
                span {
                    line-height: 2;
                    display: block;
                    width: 100%;
                    color: #808080;
                }
                .fakeA {
                    width: 100%;
                    display: block;
                    cursor: pointer;
                    word-break: break-all;
                }
            }
        }
        #byEmail > label {
            position: relative;
            margin-bottom: 42px;
            display: flex;
            align-items: center;
            border-bottom: #dce6f0 2px solid;
            .errMsg {
                position: absolute;
                top: 50px;
                right: 0;
                color: #ff0000;
                font-size: 12px;
            }
        }
        #byEmail > label > *:nth-child(1) {
            text-align: center;
            height: 15px;
            width: 15px;
            line-height: 20px;
            display: inline-block;
            font-weight: 600;
            font-size: 14px;
            color: #00573d;
            margin-right: 10px;
        }
        #byEmail > label:nth-child(3) > *:nth-child(1) {
            color: transparent;
        }
        #byEmail > label > *:nth-child(2) {
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.29px;
            color: #808080;
            display: inline-block;
            width: 75px;
        }
        #byEmail > label > *:nth-child(3) {
            display: inline-block;
            width: calc(100% - 100px);
            height: 40px;
            outline: none;
            border: none;
        }
        #byEmail > .buttonWrap {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
        }
        #byEmail > .buttonWrap > button {
            width: 100px;
            height: 53px;
            border-radius: 10px;
            // background-color: #f5ffec;
            // color: #31a043;
            background-color: #00b902;
            color: #ffffff;
            border: none;
            font-size: 18px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            cursor: pointer;
            outline: none;
        }
        #byEmail > .buttonWrap > .disable {
            background-color: #eeeeee;
            color: #a1adb9;
            cursor: initial;
        }
        @media screen and (min-width: 1024px) {
            #byLINE {
                height: 400px;
                padding: 15px 25px 10px 25px;
            }
            #byEmail {
                height: 400px;
                padding: 25px 50px 20px 50px;
            }
        }
        #byLINE {
            .group__img {
                display: none;
            }
        }
        #byLINE > div {
            span {
                display: inline-block;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: 0.38px;
                color: #00b902;
                font-weight: 600;
            }
            .lineStepWord {
                margin-bottom: 20px;
            }
            button {
                width: 100%;
                height: 53px;
                border-radius: 5px;
                background-color: #00b902;
                color: #ffffff;
                border: none;
                outline: none;
                cursor: pointer;
                font-weight: 600;
                outline: none;
                margin-bottom: 20px;
            }
        }
        @media screen and (min-width: 1024px) {
            #byLINE {
                .group__img {
                    display: flex;
                    justify-content: space-around;
                    align-content: center;
                    img {
                        height: 120px;
                        width: 120px;
                    }
                    .QR-CODE {
                        height: 135px;
                        width: 135px;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 768px) {
        .boxWrap {
            width: 500px;
            height: 450px;
        }
    }
    @media screen and (min-width: 1024px) {
        .pc-none {
            display: none;
        }
        .boxWrap {
            height: 500px;
        }
    }
    #boxTab > div {
        width: 50%;
        text-align: center;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
    #boxTab > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        #icon__LINE {
            margin-right: 10px;
        }
    }
    #boxTab > .active {
        background-color: #00b902;
        color: #ffffff;
    }

    //     #boxTab > .active:nth-child(1) {
    //     background-color: #00b902;
    //     color: #ffffff;
    // }
    // #boxTab > .active:nth-child(2) {
    //     background-color: #ffffff;
    //     color: #808080;
    // }
    #boxTab {
        background-color: #eeeeee;
        height: 60px;
        display: flex;
        align-items: center;
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        color: #a1adb9;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
    }
}
</style>