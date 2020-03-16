<template>
    <div>
        <div class="maintain">
            <div class="maintainBox">
                <div class="text">
                    <p class="title">系統服務維護中</p>
                    <p>造成您的不便，敬請見諒!</p>
                </div>
            </div>
        </div>
        <eFirstfooter></eFirstfooter>
    </div>
</template>

<script>
import eFirstfooter from '@/views/eFirstfooter.vue'
export default {
    name: "maintain",
    components: {
        eFirstfooter
    },
    data: () => ({}),
    methods: {
    }
};
</script>
<style lang="scss" scoped>
.maintain {
    width: 100%;
    margin: auto;
    background-color: #fff;
    height: calc(100vh - 189px);
    .maintainBox {
        width: 100vw;
        max-width: 1440px;
        min-width: 300px;
        height: 100%;
        // background-color: #fff;
        margin: auto;
        background-image: url("../assets/img/svg/msgBox/fixTime-mobile.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        img {
            width: 100%;
        }
        .text{
            width: 400px;
            height: 85px;
            width: fit-content;
            height: fit-content;
            position: absolute;
            text-align: center;
            top: 50%;
            left: 0;
            right: 0;
            bottom: 0%;
            margin: auto;
            font-size: 18px;
            color: #40b356;
            letter-spacing: 3px;
            font-family: "GenSenMaruGothicTW-Heavy","PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
            .title{
                font-size: 36px;
                letter-spacing: 6px;
            }
            p{
                margin: 8px;
            }
        }
        
    }
}

@media screen and (min-width: 768px) {
    .maintain {
        height: 81vh;
        .maintainBox{
            background-image: url("../assets/img/svg/msgBox/fixTime.png");
        }
    }
}
@media screen and (min-width: 1024px) {
    .maintain {
        height: calc(100vh - 201px);
    }
}
@media screen and (min-width: 1280px) {
    .maintain {
        height: 82vh;
        .maintainBox{
            min-width: 1280px;
            .text{
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
@media screen and (min-width: 1440px) {
    .maintain {
        height: 82vh;
        .maintainBox {
            width: 1440px;
        }
    }
}
</style>
