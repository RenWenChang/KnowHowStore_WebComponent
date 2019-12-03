<template>
    <div id="frame">
        <Nav></Nav>
        <div id="frameRight" class="spaceForMenu">
            <Header class="frame__header"></Header>
            <div class="frame__padding">
                <router-view></router-view>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
import Nav from '@/frames/Nav.vue'
import Header from '@/frames/Header.vue'
import Footer from '@/frames/Footer.vue'

export default {
    components: {
        Nav,
        Header,
        Footer
    }
}
</script>
<style lang="scss" scoped>
#frame {
    width: 100%;
    background-color: #1f2532;
    position: relative;
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: 1px;
    color: #ffffff;

    .frame__padding {
        padding-top: 55px;
    }
    .frame__header {
        position: fixed;
        z-index: 1;
    }
}
#frameRight {
    position: relative;
    width: 100%;
    // background-color: #1f2532;
    background-color: #f6f6f6;
    transition: margin-left ease 0.3s;
}

@media screen and (min-width: 1920px) {
    .spaceForMenu {
        margin-left: 320px;
        width: calc(100% - 320px);
    }
}
.d-none {
    display: none;
}
.close {
    width: 0;
}
</style>