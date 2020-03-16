<template>
    <div id="app">
        <router-view></router-view>
        <loading v-if="loadingRes"></loading>
        <gotop></gotop>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import gotop from "@/components/getTopButton.vue";
import loading from "@/components/loading.vue";
export default {
    components: {
        loading,
        gotop
    },
    computed: {
        ...mapGetters(["loadingRes"])
    },
    created: async function() {
        // await this.apiGetToken();
    },
    methods: {
        disableButton: function() {
            function iEsc() {
                return false;
            }
            function iRec() {
                return true;
            }
            function DisableKeys() {
                if (event.ctrlKey || event.shiftKey || event.altKey) {
                    window.event.returnValue = false;
                    iEsc();
                }
            }
            document.ondragstart = iEsc;
            document.onkeydown = DisableKeys;
            document.oncontextmenu = iEsc;
            if (typeof document.onselectstart != "undefined") {
                document.onselectstart = iEsc;
            } else {
                document.onmousedown = iEsc;
                document.onmouseup = iRec;
            }
        },
        apiGetToken: async function() {
            await this.postSysLogin({});
            await this.postSysLogin__FINROBO({});
            await this.apiGetLimitAmtParam({});

            //以下等Login功能正式啟用再打開
            // const config = {
            //     "userCode": "Admin",
            //     "userKey": "kpKqA0in14guTmXI3ny+Yl76uiAo0SlYb9JvxqLI0M/aLpFWLNyiEjWChNoLjydk2edVQ6M0qNJ9H9DbY4kg92CA/n0JgqHueORS1TH7HMa5rhG2e+aGeKED9jeCmVEdxRKRfxeb2G5+e2byFPfmxkNXHOOLGXMy09LJkGD7HaQzJ9kUsTE2XavCES2Yn2rnikuM8kAZCCZouW9v4qABjSmKZwqmZS5H4x49H73Z93jK9ErDyZ1JNAq/eJ/3WVZs5KOPB8PppNRHVZdK53jVIuXRr0xcAHKxYg9PAiMNRmz1EYrCkvLmQCf/3Hr8BuVjIi/TD0bZj10T4Ji5fhZjoA=="
            // }
            // await this.postLogin(config);
        },
        apiGetLimitAmtParam: async function() {
            const config = {};
            const response = await this.getLimitAmtParam({
                data: config,
                id: `S001`
            });
            const { MinAllotAmt, MaxAllotAmt, RSPMinAllotAmt, RSPMaxAllotAmt, MinWdrawAmt, MaxWdrawAmt, MinTargetAmt, MaxTargetAmt } = response.Datas;
            const limitAmt = JSON.stringify({
                minSavingTarget: MinTargetAmt,
                maxSavingTarget: MaxTargetAmt,
                minWealthWdraw: MinWdrawAmt,
                maxWealthWdraw: MaxWdrawAmt,
                minProjectRSP: RSPMinAllotAmt,
                maxProjectRSP: RSPMaxAllotAmt,
                minProjectAllot: MinAllotAmt,
                maxProjectAllot: MaxAllotAmt,
            });
            sessionStorage.setItem('limitAmt', limitAmt)
        },
        ...mapActions(["postSysLogin", "postLogin", "postSysLogin__FINROBO", "getLimitAmtParam"])
    },
    mounted: function() { }
};

</script>
 <style lang="css" src="./scss/normalize.css">
</style>  
<style lang="scss">
@font-face {
    font-family: "GenSenMaruGothicTW-Heavy";
    src: url("./assets/font/GenSenMaruGothicTW-Heavy.ttf");
}
#app {
    font-family: "PingFangTC-Regular", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
    position: relative;
    overflow: hidden;
}
* {
    box-sizing: border-box;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input::-ms-clear {
  display: none;
}
</style>
