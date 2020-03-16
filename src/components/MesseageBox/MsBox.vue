<template>
    <div
        id="msgBox"
        ref="msgBox"
        class="msBoxClass fade show"
        tabindex="-1"
        :class="[isShowMessageBox?'boxShow':'boxHide']"
        v-if="isShowMessageBox"
    >
        <!-- <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="cross-btn" @click="closewindow">x</div>
                    <div class="modal-title" :class="titleClass">{{title}}</div>
                    <div class="scr">
                        <div v-html="content"></div>
                    </div>
                    <div class="btnWrap">
                        <div class="text1style" :class="btnClass1" v-show="isShowBtn1">
                            <a @click="btnClick1()">{{BtnText1}}</a>
                        </div>
                        <div :class="btnClass2" v-show="isShowBtn2">
                            <a @click="btnClick1()">{{BtnText1}}</a>
                            <a v-if="onceClick == false" @click="btnClick2()">{{BtnText2}}</a>
                            <a v-else>{{BtnText2}}</a>
                        </div>
                        <div :class="btnClass3" v-show="isShowBtn3">
                            <a @click="btnClick1()">{{BtnText1}}</a>
                            <a @click="btnClick2()">{{BtnText2}}</a>
                            <a @click="btnClick3()">{{BtnText3}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
        <div class="lightBoxWrap">
            <div class="closeIcon" v-if="isShowClose" @click="closewindow">
                <img src="@/assets/img/icon/close-green.svg" alt />
            </div>
            <div class="lightContent" v-show="isNormalBox ==true">
                <div class="contentBox contentBox--normal">
                    <div :class="titleClass">{{title}}</div>
                    <div v-html="content"></div>
                </div>
                <div class="buttonStyle1" v-show="isShowBtn1">
                    <a @click="btnClick1()">{{BtnText1}}</a>
                </div>
                <div class="buttonStyle2" v-show="isShowBtn2">
                    <div>
                        <a @click="btnClick1()">{{BtnText1}}</a>
                        <a v-if="onceClick == false" @click="btnClick2()">{{BtnText2}}</a>
                        <a v-else>{{BtnText2}}</a>
                    </div>
                </div>
            </div>
            <div class="lightContent" v-show="isShowAgent ==true">
                <div class="illusBox">
                    <div class="illus">
                        <img src="@/assets/img/svg/msgBox/褪色.png" alt />
                    </div>
                </div>
                <div class="contentBox contentBox--agent">
                    <div :class="titleClass">親愛的投資人，您好：</div>
                    <p>您的瀏覽器版本過舊，造成智能理財系統功能無法完全呈現，建議您調整或升級瀏覽器版本</p>
                    <p>瀏覽器名稱版號、瀏覽器名稱版號、</p>
                </div>
            </div>
            <div class="lightContent content404" v-show="isShow404 ==true">
                <img src="@/assets/img/svg/msgBox/404.png" alt />
                <div class="content">Ooops，很抱歉！我們遇到了出一點問題，請點選首頁重新開始</div>
                <div class="buttonStyle1" v-show="isShowBtn1">
                    <a @click="btnClick1()">{{BtnText1}}</a>
                </div>
            </div>
            <div class="lightContent content500" v-show="isShow500 ==true">
                <img src="@/assets/img/svg/msgBox/500.png" alt />
                <p>Ooops，很抱歉！無法連線伺服器，請您來電諮詢</p>
                <p>24 小時客服專線：(02)2181-1111 / 0800-031-111(限市話)</p>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    props: {
        title: { type: String, default: "" }, //Alert 標題
        content: { type: String, default: "訊息內容" }, //Alert 內容
        isShowClose: { type: Boolean, default: false }, //關閉的叉叉是否顯示
        isShowBtn1: { type: Boolean, default: false }, //第1顆按鈕 是否顯示
        isShowBtn2: { type: Boolean, default: false }, //第2顆按鈕 是否顯示
        isShowBtn3: { type: Boolean, default: false }, //第3顆按鈕 是否顯示
        BtnText1: { type: String, default: "Cancel" }, //第1顆按鈕 內容
        BtnText2: { type: String, default: "Confirm" }, //第2顆按鈕 內容
        BtnText3: { type: String, default: "拆單" }, //第3顆按鈕 內容
        onceClick: { type: Boolean, default: false },//控制不可連續點擊
        isShow404: { type: Boolean, default: false }, //404 是否顯示
        isShow500: { type: Boolean, default: false }, //500 是否顯示
        isShowAgent: { type: Boolean, default: false }, //瀏覽器版本不佳 是否顯示
        isNormalBox: { type: Boolean, default: false }, //normalBox 是否顯示
        fn1: {
            type: Function,
            default: function() {
                this.isShowMessageBox = false;
            }
        }, //第1顆按鈕 事件
        fn2: {
            type: Function,
            default: function() {
                this.isShowMessageBox = false;
            }
        }, //第2顆按鈕 事件
        fn3: {
            type: Function,
            default: function() {
                this.isShowMessageBox = false;
            }
        }, //第3顆按鈕 事件
        timeOut: { type: Number, default: 0 }, //自動關閉時間設置
        titleClass: { type: String, default: "btntitle" }, //Alert 標題Class
        btnClass1: { type: String, default: "btnGroup1" }, //Alert 標題Class
        btnClass2: { type: String, default: "btnGroup2" }, //Alert 標題Class
        btnClass3: { type: String, default: "btnGroup3" } //Alert 標題Class
    },
    data() {
        return {
            isShowMessageBox: false,
            resolve: "",
            reject: "",
            promise: "", // 保存promise对象
            testShow: true
        };
    },
    created() {
        document.addEventListener("keydown", event => {
            const key = event.key;
            if (key === "Escape" || key === "Enter") {
                this.isShowMessageBox = false;
            }
        });
    },
    methods: {
        //第一科按鈕事件
        btnClick1: function() {
            this.isShowMessageBox = false;
            this.fn1();

        },
        //第二科按鈕事件
        btnClick2: function() {
            // 順序很重要onceclick要在上面, callback放在最後面
            this.onceClick = true;
            this.isShowMessageBox = false;
            this.fn2();

        },
        //第三科按鈕事件
        btnClick3: function() {
            this.isShowMessageBox = false;
            this.fn3();

        },
        //開啟彈跳視窗
        showMsgBox: function() {
            this.isShowMessageBox = true;
            // var msgBox = document.getElementById("msgBox");
            // msgBox.classList.remove("boxHide");

            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
            // 返回promise对象
            return this.promise;
        },
        //自動時間關閉視窗
        timeClose: function(fn) {
            var vm = this;
            setTimeout(function tm() {
                vm.timeOut--;
                if (vm.timeOut > 0) {
                    setTimeout(tm, 1000);
                } else {
                    vm.isShowMessageBox = false;

                    if (typeof fn == "function") {
                        fn();
                    }
                }
            }, 1000);
        },
        //關閉視窗
        closewindow: function() {
            this.isShowMessageBox = false;
        },
        destroy: function() {
            this.$destroy();
            var msgBox = document.getElementById("msgBox");
            msgBox.removeChild(this.$el);
        }
    },
};
// this.$msgBox.showMsgBox({
//     title: 'Change Account Type',
//     content: 'All previously entered details will be erased. Are you sure you want to change account type?',
//     BtnText1: "Cancel",
//     BtnText2: "Yes",
//     isShowBtn2: true,
//     fn2: () => {
//         this.itemActiveControl.forEach(function(item) {
//             item.isActive = false;
//         });
//         this.itemActiveControl[i].isActive = true;
//         this._updateSelect = itemName;
//         this.$emit("update:updateSelect", itemName);
//         this.$emit("fromSon", itemName, i);
//         this.isSureSwitch = false;
//     },
// });
</script>


<style lang="scss" scoped>
#msgBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 60;
}
.modal-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 343px;
    max-height: 208px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    /* box-shadow: 2px 15px 2px rgba(0,0,0,0.4); */
}

.modal-title {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 700;
}
.modal-content {
    height: 100%;
    border-radius: 0;
}
.modal-body {
    height: 100%;
    display: flex;
    box-sizing: border-box;
    padding-top: 16px;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border-radius: 4px;
    /* padding: 32px 32px 24px 32px; */
    padding: 24px;
}
.cross-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    background-color: rgba(186, 202, 255, 0.35);
    color: #414042;
    border-radius: 50%;
    margin: 16px;
    cursor: pointer;
}
.btnWrap {
    margin-left: -24px;
    margin-right: -24px;
    padding: 0 16px;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    justify-content: flex-end;
}
/* .btnGroup1{
    justify-content: flex-end;
} */
.btnGroup1 a {
    font-size: 14px;
    font-weight: 600;
    transition: 0.5s;
    border-radius: 16px;
    padding: 6px 24px;
    cursor: pointer;
    color: #fff;
    background-color: #486bff;
}
.btnGroup1 a:nth-child(1):hover {
    background-color: #0039d8;
}
.btnGroup2 a {
    font-size: 14px;
    font-weight: 600;
    transition: 0.5s;
}
.btnGroup2 a:nth-child(2):hover {
    background-color: #0039d8;
}
.text1style {
    font-size: 14px;
    font-weight: 700;
}
.scr {
    flex-grow: 2;
    align-self: flex-start;
    /* min-height: 108px; */
    max-height: 300px;
    font-size: 15px;
    line-height: 20px;
    overflow-y: auto;
}

.btnGroup2 {
    display: flex;
    justify-content: space-between;
}
.btnGroup2 a {
    /* width: 100px; */
    /* height: 32px; */
    border-radius: 16px;
    padding: 6px 24px;
    cursor: pointer;
}
.btnGroup2 a:nth-child(1) {
    color: #414042;
    margin-right: 16px;
}
.btnGroup2 a:nth-child(2) {
    color: #fff;
    background-color: #486bff;
}

@media screen and (min-width: 768px) {
    .modal-body {
        padding: 32px 32px 24px 32px;
    }
    .btnGroup2 {
        display: flex;
        justify-content: flex-end;
    }
    .modal-dialog {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 576px;
        background-color: #fff;
    }
}
/* -------------------新版------------------------- */

.lightBoxWrap {
    width: 80vw;
    height: fit-content;
    min-height: 220px;
    max-height: 420px;
    max-width: 450px;
    top: calc(50% - 40px);
    left: 0;
    right: 0;
    transform: translateY(-50%);
    margin: auto;
    background-color: #fff;
    z-index: 11;
    padding: 30px 24px;
    border: 1px solid #cccccc;
    border-top: 4px solid #c1cd00;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    position: absolute;
    margin: auto;
    font-family: "PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
    .closeIcon {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
    }
}
.lightContent {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.content404 {
    .content {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 14px;
        font-size: 14px;
    }
}
.content500 {
    img {
        margin-bottom: 14px;
    }
    p {
        margin: 10px;
        font-size: 14px;
    }
}
.illusBox {
    width: 100%;
    .illus {
        width: 150px;
        height: 150px;
        margin: auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.contentBox {
    width: 100%;
    padding: 0 18px;
    p {
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
        color: #333;
    }
    div {
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
        color: #333;
    }
    .btntitle {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 16px;
        color: #000;
    }
}
.contentBox--agent {
    p {
        font-size: 14px;
        line-height: 1.6;
    }
    .btntitle {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 16px;
    }
}
.contentBox--normal {
    width: 100%;
}
.buttonStyle1 {
    margin: auto auto 0 auto;
    a {
        height: 44px;
        color: #fff;
        line-height: 44px;
        border-radius: 5px;
        background-color: #c1cd00;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 11px 44px;
    }
}
.buttonStyle2 {
    width: 100%;
    display: flex;
    margin: auto 0 0 auto;
    div{
        margin: auto;
        display: flex;
    }
    a {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 11px 32px;
        display: block;
        cursor: pointer;
        border-radius: 5px;
    }
    a:nth-child(1) {
        color: #ccc;
        border: 1px solid #ccc;
    }
    a:nth-child(2) {
        color: #fff;
        background-color: #c1cd00;
        margin-left: 30px;
    }
}
@media screen and (min-width: 768px) {
    .lightBoxWrap {
        max-height: 270px;
    }
    .illusBox {
        width: 150px;
        height: 150px;
    }
    .contentBox {
        p {
            margin: 0;
        }
    }
    .contentBox--agent {
        padding: 0 18px;
        width: calc(100% - 150px);
    }
    .contentBox--normal {
        width: 100%;
    }
}
</style>

<style>
</style>