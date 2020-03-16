<template>
    <footer id="efirstFooter">
        <div class="footer__list">
            <div class="colorLine">
                <span class="color color1"></span>
                <span class="color color2"></span>
                <span class="color color3"></span>
            </div>
            <div class="phoneMsg">
                <p>銀行 24 小時客服專線：</p>
                <p>(02)2181-1111 /</p>
                <p>0800-031-111(限市話)</p>
            </div>
        </div>
        <!-- <div class="warning">投資警語</div> -->
        <div class="copyRight">© 版權所有 第一商業銀行股份有限公司</div>
        <div class="footerBottom">
            <ul class="shareLink">
                <a target="_blank" href="https://www.facebook.com/firsthaka">
                    <img src="@/assets/img/icon/FB.svg" />
                </a>
                <a target="_blank" href="https://line.me/R/ti/p/%40firstbank">
                    <img src="@/assets/img/icon/LINE.svg" />
                </a>
                <a target="_blank" href="https://www.instagram.com/firstbank.tw/">
                    <img src="@/assets/img/icon/ig.svg" />
                </a>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'eFirstfooter',
    components: {
    },
    data: () => ({
    }),
}
</script>
<style lang="scss" scoped>
#efirstFooter {
    height: 100%;
    background-color: #0f4a3c;
    color: #fff;
    padding: 16px 24px;
    position: relative;
    z-index: 10;
    .footer__info {
        margin-top: 8px;
        text-align: center;
        margin-bottom: 4px;
    }
}
.colorLine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    display: flex;
    .color {
        display: inline-block;
        height: 100%;
    }
    .color1 {
        width: 78%;
        background-color: #018864;
    }
    .color2 {
        width: 19%;
        background-color: #c1cd01;
    }
    .color3 {
        width: 3%;
        background-color: #018864;
    }
}

.phoneMsg {
    margin-bottom: 8px;
    text-align: center;
    p {
        font-size: 14px;
        margin: 4px;
    }
    p:nth-child(2){
        display: inline-block;
    }
    p:nth-child(3){
        display: inline-block;
    }
}
.warning {
    width: 64px;
    padding-bottom: 4px;
    border-bottom: 1px solid #fff;
    text-align: center;
    margin: auto;
    margin-bottom: 8px;
    font-size: 14px;
    
}
.copyRight {
    margin-bottom: 8px;
    text-align: center;
    font-size: 14px;
}
.shareLink {
    display: flex;
    justify-content: center;
    li {
        cursor: pointer;
    }
    a + a {
        margin-left: 8px;
    }
    img{
        width: 24px;
        height: 24px;
    }

}
@media screen and (min-width: 768px) {
    .phoneMsg {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    .warning{
        margin-bottom: 20px;
    }
    .footerBottom {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .copyRight {
        margin-bottom: 20px;
    }
    .shareLink{
        a + a{
            margin-left: 24px;
        }
    }
}

@media screen and (min-width: 1280px) {
    #efirstFooter {
        height: 18vh;
        display: flex;
        align-items: center;
        position: relative;
        padding: 30px 24px;
        justify-content: center;
        .footer__info {
            text-align: start;
            font-size: 14px;
            height: 18px;;
        }
        .phoneMsg {
            margin-bottom: 0;
            justify-content: flex-start;
            p{
                margin: 0;
            }
        
        }
        .warning {
            margin-top: 16px;
            font-size: 14px;
            width: 56px;
            height: 18px;
            margin: 0;
            margin-left: 40px;
        }
        .copyRight {
            margin-bottom: 0;
            text-align: center;
            font-size: 14px;
            height: 18px;
            margin-left: 40px;
        }
        div + div {
            margin-left: 8px;
        }
        .shareLink {
            display: flex;
            align-items: center;
            margin-left: 40px;
        }
        .footer__info{
            margin: 0;
            margin-left: 24px;
        }
    }
}
</style>
