<template>
    <div class="loader">
        <span class="top"></span>
        <span class="bottom"></span>
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
<style lang="scss" scoped>

.loader {
    height: 17.5em;
    font-size: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    opacity: 0.7;
    overflow: hidden;
}

.loader::after {
    content: "";
    position: absolute;
    width: 0.2em;
    height: 22.6em;
    background-color: #C1CD00;
    top: 2em;
    animation: flow 2s linear infinite;
    opacity: 1;
}
@keyframes flow {
    0%{
        height: 5.8em;
    }
    99%{
        top:2em;
        opacity: 1;
    }
    100%{
        transform: translateY(6.2em);
        top:20em;
        opacity: 0;
        height: 20.8em;
    }
    // 90% {
    //     height: 5.8em;
    //     transform: translateY(5.2em);
    // }
    100%{
    }
}
.top{
    width: 6.6em;
    height: 6.6em;
    border-style: solid;
    border-color: transparent;
    border-width: 0.2em 0.2em 0.6em 0.6em;
    border-width: 1px;
    // border-radius: 50% 80% 50% 50%;
    position: relative;
    overflow: hidden;
    // border-color: #CCC;
}
.bottom {
    width: 7em;
    height: 7em;
    border-style: solid;
    border-color: transparent;
    // border-width: 0.2em 0.2em 0.6em 0.6em;
    border-width: 1px;
    border-radius: 50% 100% 50% 30%;
    position: relative;
    overflow: hidden;
    // border-color: #CCC;
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
    background-color: #C1CD00;
    animation: 2s linear infinite;
}
.top::before {
    border-radius: 0 100% 0 0;
    animation-name: drop-sand;
}
@keyframes drop-sand {
    to {
        transform: translate(-4.5em,4.5em);
    }
}
.bottom::before {
    border-radius: 0 0 0 35%;
    transform: translate(0, 0);
    animation-name: fill-sand;
}
@keyframes fill-sand {
    0%{
        transform: translate(2.5em, -2.5em);
    }
    100%{
        transform: translate(0, 0);
    }
    // to {
    //     transform: translate(0, 0);
    // }
}
</style>
