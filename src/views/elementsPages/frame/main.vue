<template>
    <div id="main">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {},
    mounted: function() {
       
    }
};
</script>
<style lang="scss" scoped>
#main{
    width: 100%;
    height: 100%;
    background-color:#ffffff;
    padding:15px
}
@media screen and (min-width: 768px) {
#main{
    padding:15px 26px
}
}
@media screen and (min-width: 1024px) {
#main{
    padding:15px 26px
}
}
@media screen and (min-width: 1920px) {
#main{
    padding:15px 26px
}
}
</style>