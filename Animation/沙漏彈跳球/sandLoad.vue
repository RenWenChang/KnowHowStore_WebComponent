<template>
<div>
    <div class="loader">
        <span class="top"></span>
        <span class="bottom"></span>
    </div>
    <div class="jumpBall"></div>
</div>

</template>

<script>


export default {
    components: {

    },
    methods: {


    },
    mounted: function() {

    },
}
</script>
<style lang="scss">
body {
    // margin: 0;
    // height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader {
    width: 4.3em;
    height: 9.8em;
    font-size: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.loader::after {
    content: "";
    position: absolute;
    width: 0.2em;
    height: 4.8em;
    background-color: deepskyblue;
    top: 1em;
    animation: flow 2s linear infinite;
}
@keyframes flow {
    10%,
    100% {
        transform: translateY(3.2em);
    }
}
.top,
.bottom {
    width: 3.5em;
    height: 3.5em;
    border-style: solid;
    border-color: transparent;
    // border-width: 0.2em 0.2em 0.6em 0.6em;
    border-width: 1px;
    border-radius: 50% 100% 50% 30%;
    position: relative;
    overflow: hidden;
}
.top {
    transform: rotate(-45deg);
}
.bottom {
    transform: rotate(135deg);
}
.top::before,
.bottom::before {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: deepskyblue;
    animation: 2s linear infinite;
}
.top::before {
    border-radius: 0 100% 0 0;
    animation-name: drop-sand;
}
@keyframes drop-sand {
    to {
        transform: translate(-2.5em, 2.5em);
    }
}
.bottom::before {
    border-radius: 0 0 0 35%;
    transform: translate(2.5em, -2.5em);
    animation-name: fill-sand;
}
@keyframes fill-sand {
    to {
        transform: translate(0, 0);
    }
}



//////////////////////////////////////////////////*jumball*////////////////////////////////////////////////////
.particlesBox{
  width: 30%;
  height: 100%;
}
.jumpBall{
    width: 100px;
    height: 100px;
    background-color: #00F;
    border-radius: 50%;
    transform: scaleX(1) scaleY(1) translateY(0px);
    animation: jump 1s infinite;
}
@keyframes jump{
    0%{
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
    25%{
        transform: scaleX(1.1) scaleY(0.9) translateY(0px);
    }
    50%{
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
    75%{
        transform: scaleX(1.1) scaleY(0.9) translateY(0px);
    }
    100%{
        transform: scaleX(1) scaleY(1) translateY(10px);
    }
}
</style>
