
<template>
    <div id="todoList">
        <dashboardBlockTitle
            :name="$t('TodoList.title')"
            :hint="$t('TodoList.hint')"
            :hasHint="true"
            :clickTitle="clickTitle"
        >
            <template slot="dd">
                <blockTtileDropdown :dataSourceArray="drop" width="'3'"></blockTtileDropdown>
            </template>
        </dashboardBlockTitle>
        <LinkItemGroups :itemGroup="itemGroup"></LinkItemGroups>
    </div>
</template>
<script>
import blockTtileDropdown from '@/components/dashboardBlockTitle/blockTtileDropdown.vue'
export default {
    components: {
        blockTtileDropdown
    },
    data: () => ({
        drop: [
            {
                text: "簽核專區",
                value: 1
            }
        ],
        itemGroup: []
    }),
    methods: {
        clickTitle: function (e) {
            alert('待辦事項', e);
        }
    },
    mounted() {
        let o = {
            name: "ex:我是功能名稱我是功能名稱我是功能名稱",
            length: "00",
            click: function (e) {
                console.log(e);
                alert("link to '功能名稱'");
            }        };
        for (let i = 0; i < 20; i++) {
            this.itemGroup.push(o)
        }

    }
}
</script>
<style lang="scss" scoped>
#todoList {
    width: 100%;
    min-width: 450px;
    height: 724px;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.18);
    background-color: #f6f6f6;
    order: 3;
    padding: 16px;
}

@media screen and (min-width: 1440px) {
    #todoList {
        width: calc(450px - 16px);
        margin-right: 16px;
        min-width: 450px;
        height: 764px;
        border-radius: 4px;
        box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.18);
        background-color: #f6f6f6;
        order: 0;
    }
}
</style>