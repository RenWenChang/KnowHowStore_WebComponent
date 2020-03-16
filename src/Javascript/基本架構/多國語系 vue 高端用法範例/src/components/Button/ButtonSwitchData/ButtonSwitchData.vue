<template>
    <div class="ButtonSwitchData">
        <button @click="first" class="switchMax btn">
            <previous></previous>
        </button>
        <button @click="previous" class="switchOne btn">
            <span>{{language.previous}}</span>
        </button>
        <button @click="next" class="switchOne btn">
            <span>{{language.next}}</span>
        </button>
        <button @click="last" class="switchMax btn">
            <next></next>
        </button>
    </div>
</template>
<script>
import language from './language'
import previous from './svg/previous.vue'
import next from './svg/next.vue'
import { mapActions } from 'vuex'
export default {
    data: () => ({
        locale: '',
        language: {}
    }),
    components: {
        previous,
        next
    },
    root: {
        type: String,
        default: 'maintain'
    },
    methods: {
        getRaw: function () {
            let raw = JSON.parse(sessionStorage.getItem('page-singleRecord_Query_RawData'))
            if (raw) {
                return raw
            } else {
                return []
            }
        },
        getCurrentItemIndex: function () {
            let raw = this.getRaw();
            let id = this.$route.query.id;
            let currentItemIndex = '';
            raw.forEach((item, i) => {
                if (item.ClientID === id) {
                    currentItemIndex = i;
                }
            });
            return currentItemIndex
        },
        newTabIfNotOpen: function (before, after) {
            const tabDocs = JSON.parse(sessionStorage.getItem("tabDocs"));
            const Raw = JSON.parse(sessionStorage.getItem("page-singleRecord_Query_RawData"));
            const beforeTabIndex = tabDocs.findIndex((element) => element.id === before);
            const afterTabIndex = tabDocs.findIndex((element) => element.id === after);
            let afterTabIndexRaw = Raw.findIndex((element) => element.ClientID === after);
            let lastElement = Raw[afterTabIndexRaw];
            if (afterTabIndex === -1) {
                let newTab = {
                    id: lastElement.ClientID,
                    path: "maintain",
                    label: this.$t('TabMaintain') + ` ( ${lastElement.ClientID} )`
                };
                tabDocs.splice(beforeTabIndex, 1);
                tabDocs.splice(beforeTabIndex, 0, newTab);
                this.switchTab(tabDocs);
            }
        }
        ,
        first: function () {
            let raw = this.getRaw();
            let previousIndex = this.getCurrentItemIndex()
            let before = raw[previousIndex].ClientID;
            let after = raw[0].ClientID;
            this.newTabIfNotOpen(before, after);
            this.go(raw, 0);
        },
        previous: function () {
            let raw = this.getRaw();
            let previousIndex = this.getCurrentItemIndex() - 1;
            if (previousIndex < 0) {
                return
            }
            let before = raw[previousIndex + 1].ClientID;
            let after = raw[previousIndex].ClientID;
            this.newTabIfNotOpen(before, after);
            this.go(raw, previousIndex);
        },
        next: function () {
            let raw = this.getRaw();
            let previousIndex = this.getCurrentItemIndex() + 1;
            if (previousIndex > raw.length - 1) {
                return
            }
            let before = raw[previousIndex - 1].ClientID;
            let after = raw[previousIndex].ClientID;


            this.newTabIfNotOpen(before, after);
            this.go(raw, previousIndex);
        },
        last: function () {
            let raw = this.getRaw();
            let previousIndex = this.getCurrentItemIndex();
            let lastIndex = raw.length - 1;
            let before = raw[previousIndex].ClientID;
            let after = raw[lastIndex].ClientID;
            this.newTabIfNotOpen(before, after);
            this.go(raw, lastIndex);
        },
        go: function (raw, index) {

            this.$router.push({
                path: this.root,
                query: {
                    id: raw[index].ClientID
                }
            }).catch(err => {
                return err
            });
        },
        ...mapActions(["switchTab"])
    },

    created() {
        this.locale = this.$i18n.locale;
        this.language = language[this.locale];
    }
}
</script>
<style lang="scss" scoped>
.ButtonSwitchData {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
        border: 1px black solid;
        border-radius: 20px;
        background-color: white;
        outline: none;
        margin-right: 16px;
        padding: 8px;
        cursor: pointer;
    }
    .btn:hover {
        border-color: rgb(124, 124, 124);
    }
    .btn:nth-last-child(1) {
        margin-right: 0;
    }
    .switchOne {
        min-width: 112px;
        height: 100%;
    }
    .switchMax {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;
    }
}
</style>