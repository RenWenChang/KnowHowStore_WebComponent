<template>
    <footer>
        <div id="foorerTitle">
            <span>博暉科技</span>
        </div>
        <div id="foorerStatement">
            <span>2019 © Designed by Systemweb Technology All rights reserved.</span>
            <span>Web Platform</span>
        </div>
    </footer>
</template>
<script>
// import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        // Navbar
    },
    mounted() {




    }
}
</script>
<style lang="scss" scoped>
footer {
    width: 100%;
    height: 70px;
    background-color: #1f2532;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
}

#foorerStatement {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
footer #foorerTitle {
    width: 100%;
    font-family: NotoSansCJKtc;
}
footer #foorerStatement {
    opacity: 0.5;
}
footer span {
    display: inline-block;
    font-family: Muli;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
}
</style>