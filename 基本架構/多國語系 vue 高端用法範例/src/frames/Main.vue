<template>
    <main>
        <router-view></router-view>
    </main>
</template>
<script>
// import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        // Navbar
    }
}
</script>
<style lang="scss" scoped>
main {
    display: block;
    width: 100%;
    height: calc(100% - 55px);
    background-color: #63666d;
    -webkit-box-shadow: inset 0em 5px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: inset 0em 5px 5px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0em 5px 5px rgba(0, 0, 0, 0.3);
}
</style>