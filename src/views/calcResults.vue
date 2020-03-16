<template>
    <div id="landingPage" ref="landingPage">
        <div id="title">圖片預覽</div>
        <!-- <div class="succeedMsg">
            <span>試算結果圖片已成功寄送至信箱 :</span>
            <span class="MailAddr">{{MailAddr}}</span>
            <span>&nbsp;請查收 !</span>
        </div> -->
        <div id="imgItem">
            <img ref="img" id="img" :src="imgback" alt="圖片預覽" />
        </div>
        <div id="btnItem">
            <button @click="download">下載圖片</button>
            <div class="notPCshow">
                <span>長按圖片可下載 !</span>
            </div>
        </div>
    </div>
</template>
<script>
// import * as html2canvas from 'html2canvas'
import { mapGetters, mapActions } from "vuex";
export default {
    components: {},
    data() {
        return {
            imgback: "",
            MailAddr: "",
            CusName:"",
        };
    },
    computed: {
        ...mapGetters([
            "sysLoginRes"
        ])
    },
    watch: {
        sysLoginRes: async function() {
            if (this.checkToken()) {
                this.GetApiCusInfo();
            }
            else {
                setTimeout(()=>{
                    this.checkToken();
                },500);
            }
        }
    },
    methods: {
        GetApiCusInfo: async function() {
            const responseIMG_URL = await this.getCusInfo2(
                this.$route.params.id
            ); //取得圖片網址
            const imgback = "data:image/png;base64," + responseIMG_URL.Datas.WFEImage; //base64轉回圖片
            // this.$refs.img.setAttribute("src", `${imgback}`);
            // this.imgSrc = imgback;
            this.imgback = imgback;
            this.toggleLoading(false);
        },
        download: function() {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // for IE
                let bstr = atob(this.imgback.split(",")[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let blob = new Blob([u8arr]);
                window.navigator.msSaveOrOpenBlob(
                    blob,
                    "msSaveBlob_testFile.png"
                );
            } else {
                const link = document.createElement("a");
                link.href = this.imgback;
                link.download = "「e-First智能理財」試算結果";
                link.click();
            }
        },
        checkToken() {
            let token = sessionStorage.getItem('AuthToken');
            return token;
        },
        ...mapActions(["getCusInfo2", "postCusInfo", "toggleLoading"])
    },
    // mounted: function() {
    //     // this.toggleLoading(true);
    //     // this.GetApiCusInfo();
    // },

    // destroyed: function() {
    //       sessionStorage.clear();
    // }
};
</script>
<style lang="scss" scoped>
#landingPage {
    width: 100%;
    #imgItem,#btnItem{
        text-align: center;
    }
    #imgItem{
        overflow: auto;
    }
    #title {
        display: block;
        font-size: 24px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 2px;
        text-align: center;
        color: #31a043;
    }
    button {
        display: none;
    }
    .notPCshow {
        height: 80px;
        width: 100%;
        color: #31a043;
        display: flex;
        align-items: center;
                padding: 20px;
    }
    .succeedMsg {
        height: 80px;
        color: #31a043;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px;
    }
    .MailAddr {
        color: rgb(255, 0, 0);
    }
    @media screen and (min-width: 1024px) {
        // #imgItem{
        //     width: 80%;
        //     max-width: 1920px;
        //     margin: auto;
        //     // #img {
                
        //     // }
        // }
        button {
            display: inline-block;
            width: 200px;
            height: 53px;
            border-radius: 10px;
            background-color: #f5ffec;
            border: none;
            font-size: 18px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #31a043;
            cursor: pointer;
            outline: none;
            margin: 15px;
        }
        .notPCshow {
            display: none;
        }
    }
}
</style>