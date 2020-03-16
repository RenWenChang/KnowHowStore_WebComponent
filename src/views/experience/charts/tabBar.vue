<template>
    <ul class="tabBar">
        <li
            v-for="(tab,i) in tabItem"
            :key="i"
            :class="[i===activeIndex?'tabAct':'',blockInvestmentInfo&&i===1?'tabDisable':'']"
            @click="selectTab(i)"
        >{{tab.name}}</li>
    </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            tabItem: [
                { name: "投資報酬" },
                { name: "投資比例/歷史績效" }
                // { name: "歷史績效" }
            ],
            activeIndex: 0,
            tab2specialInit: true,
            tab1specialInit: true
        };
    },
    computed: {
        ...mapGetters(["blockInvestmentInfo"])
    },
    props: {},
    methods: {
        selectTab: function(i) {
            if ((this.blockInvestmentInfo&& i !== 1)||(!this.blockInvestmentInfo)) {
                this.activeIndex = i;
                if (i === 1 && this.tab2specialInit) {
                    this.tab2specialInit = false;
                }
                if (i === 0 && this.tab1specialInit) {
                    this.tab1specialInit = false;
                }
                this.$emit("update:newActiveIndex", i);
            }
        }
    }
};
</script>