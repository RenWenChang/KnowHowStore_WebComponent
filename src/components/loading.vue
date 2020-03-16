<template>
    <div id="loading">
        <div class="animateBox">
            <div class="rocket">
                <img src="@/assets/img/svg/loading/spaceshuttle.svg" />
            </div>
            <div class="illus"></div>
            <div class="money">
                <img src="@/assets/img/svg/loading/parachuteiLeomoney.svg" />
            </div>
            <div class="text">
                loading
                <span class="text--dot1">.</span>
                <span class="text--dot2">.</span>
                <span class="text--dot3">.</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
    components: {
    },
    computed: {
        ...mapGetters([
            "loadingRes"
        ])
    },
    data() {
        return {
            transformStyle: 'rotate(40deg) translate(0, 150px)',
        }
    },
    watch: {
    },
    methods: {
        ...mapActions([
            "toggleLoading"
        ])

    },
    mounted: function() {

        //綁定 DOM 之後
    },


}
</script>
<style lang="scss" scoped>
#loading {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
}
.animateBox {
    width: 100vw;
    height: 100%;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.8);
    .rocket {
        width: 400px;
        height: 150px;
        transform: translateX(400%) translateY(50%);
        animation: rocketMove 16s infinite;
        position: absolute;
        top: 0;
        right: 0;
        left: 7%;
        margin: 0 auto;
    }
    .illus {
        width: 100%;
        height: 40vh;
        margin: auto;
        position: absolute;
        left: 0;
        right: 6%;
        top: -10%;
        background-image: url("../assets/img/svg/loading/parachuteiLeo2.svg");
        background-repeat: no-repeat;
        background-size: auto 100%;
        animation: parachute 16s ease-in-out infinite;
        z-index: 2;
        transform: translateX(50%);
    }
    .money {
        width: 300px;
        margin: auto;
        position: absolute;
        left: 0%;
        right: 0%;
        top: 61%;
    }
    .text {
        width: 300px;
        text-align: center;
        color: #fff;
        position: absolute;
        margin: auto;
        left: 0%;
        right: 0%;
        bottom: 18%;
        font-size: 30px;
        font-family: "GenSenMaruGothicTW-Heavy","PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
        .text--dot1 {
            animation: dotRun1 3s infinite;
        }
        .text--dot2 {
            animation: dotRun2 3s ease-in-out infinite;
        }
        .text--dot3 {
            animation: dotRun3 3s ease-in-out infinite;
        }
    }
}
@media screen and (min-width: 768px) {
    .animateBox {
        .illus {
            width: 400px;
            right: 6%;
        }
    }
}

@keyframes dotRun1 {
    0% {
        opacity: 0;
    }
    24% {
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}
@keyframes dotRun2 {
    0% {
        opacity: 0;
    }
    49% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}
@keyframes dotRun3 {
    0% {
        opacity: 0;
    }
    74% {
        opacity: 0;
    }
    75% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}
@keyframes rocketMove {
    0% {
        transform: translateX(400%) translateY(50%);
    }
    20% {
        transform: translateX(0%) translateY(10%);
    }
    40% {
        transform: translateX(-400%) translateY(-50%);
    }
    100% {
        transform: translateX(-400%) translateY(-50%);
    }
}
@keyframes parachute {
    0% {
        transform: rotate(40deg) translate(0, 0px) scale(0);
        background-image: url("../assets/img/svg/loading/parachuteiLeo1.svg");
    }
    15% {
        transform: rotate(40deg) translate(0, 0%) scale(0);
    }
    20% {
        transform: rotate(40deg) translate(0, 0%) scale(0.2);
    }
    30% {
        transform: rotate(-20deg) translate(50px, 70%) scale(0.4);
        background-image: url("../assets/img/svg/loading/parachuteiLeo1.svg");
    }
    40% {
        transform: rotate(20deg) translate(100px, 75%) scale(0.6);
        background-image: url("../assets/img/svg/loading/parachuteiLeo2.svg");
    }
    50% {
        transform: rotate(0deg) translate(155px, 80%) scale(0.8);
    }
    60% {
        transform: rotate(40deg) translate(100px, 80%) scale(0.9);
    }
    70% {
        transform: rotate(0deg) translate(100px, 100%) scale(0.9);

        opacity: 1;
    }
    90% {
        transform: rotate(0deg) translate(100px, 100%) scale(0.9);
        opacity: 1;
    }
    100% {
        transform: rotate(0deg) translate(100px, 100%) scale(0.9);
        opacity: 0;
    }
}
@keyframes parachuteDown {
    0% {
        transform: rotate(40deg) translate(0, 150px);
    }

    30% {
        transform: rotate(-20deg) translate(50px, 250px) scaleX(0.9);
    }
    60% {
        transform: rotate(20deg) translate(100px, 150px) scaleX(1);
    }

    70% {
        transform: rotate(-20deg) translate(155px, 150px);
    }
    100% {
        transform: rotate(0deg) translate(0, 450px);
    }
}
</style>