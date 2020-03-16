<template>
    <div id="landingPage" ref="landingPage">
        <div id="title">圖片預覽</div>
        <div class="succeedMsg">
            <span>試算結果圖片已成功寄送至信箱 :</span>
            <span class="MailAddr">{{MailAddr}}</span>
            <span>&nbsp;請查收 !</span>
        </div>
        <div class="img_item">
            <img ref="img" id="img" src alt="圖片預覽" />
        </div>

        <div class="footer">
            <button @click="download">下載圖片</button>
        </div>

        <div class="notPCshow">
            <span>長按圖片可下載 !</span>
        </div>
    </div>
</template>
<script>
// import * as html2canvas from 'html2canvas'
import { mapActions } from "vuex";
export default {
    components: {},
    data() {
        return {
            imgback: "",
            MailAddr: "",
            CusName: ""
        };
    },
    methods: {
        GetApiCusInfo: async function() {
            //before request mapping data
            let WFEImage = sessionStorage.getItem("base64").substring(22);
            let DataToRequestAPI__InitialPage = JSON.parse(
                sessionStorage.getItem("DataToRequestAPI__InitialPage")
            );
            let info = JSON.parse(sessionStorage.getItem("info"));
            let LineUID = "";
            let bind = {
                MailAddr: info.MailAddr,
                CusName: info.CusName,
                PhoneNo: String(info.PhoneNo),
                InvTarget: info.InvTarget,
                CusAge: DataToRequestAPI__InitialPage.CusAge,
                BalanceAmt: DataToRequestAPI__InitialPage.BalanceAmt,
                SavingAmt: DataToRequestAPI__InitialPage.SavingAmt,
                InvYear: DataToRequestAPI__InitialPage.InvYear,
                RiskQuestion: DataToRequestAPI__InitialPage.RiskQuestion,
                InvestableAmt: DataToRequestAPI__InitialPage.InvestableAmt,
                TargetAmt: DataToRequestAPI__InitialPage.TargetAmt,
                WdrawAmt: DataToRequestAPI__InitialPage.WdrawAmt,
                WdrawYM: DataToRequestAPI__InitialPage.WdrawYM,
                WdrawYear: DataToRequestAPI__InitialPage.WdrawYear,
                WFEImage: WFEImage,
                LineUID: LineUID
            };
            this.CusName = info.CusName;
            this.MailAddr = info.MailAddr;
            const response = await this.postCusInfo(bind); //傳送使用者資訊
            const responseIMG_URL = await this.getCusInfo(
                response.Datas.WFEImageURL
            ); //取得圖片網址
            // console.log(response, responseIMG_URL);
            this.toggleLoading(false);
            let imgback =
                "data:image/png;base64," + responseIMG_URL.Datas.WFEImage; //base64轉回圖片
            this.$refs.img.setAttribute("src", `${imgback}`);
            this.imgback = imgback;
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
        ...mapActions(["getCusInfo", "postCusInfo", "toggleLoading"])
    },
    mounted: function() {
        this.toggleLoading(true);
        this.GetApiCusInfo();
    }
};
</script>
<style lang="scss" scoped>
#landingPage {
    width: 100%;
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
    justify-content: center;
    .img_item{
        overflow: auto;
    }
    .footer {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    #title {
        width: 100%;
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
        width: 100%;
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