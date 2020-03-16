
<template>
    <div class="contentWrap">
        <div
            v-for="(item,index) in itemGroup"
            :key="index"
            class="linkItem"
            @click="item.click($event)"
        >
            <span class="name">{{item.name}}</span>
            <span class="length">{{item.length}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        itemGroup: {
            type: Array,
            default: () => {
                return [
                    {
                        name: "ex:我是功能名稱",
                        length: "00",
                        click: function (e) {
                            return e
                        }
                    },
                    {
                        name: "ex:我是功能名稱",
                        length: "00",
                        click: function (e) {
                            return e
                        }
                    }
                ]
            }
        },

    }
}
</script>
<style lang="scss" scoped>
.contentWrap {
    width: 100%;
    height: calc(100% - 60px);
    overflow-x: auto;
}
.linkItem {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 8px;
    cursor: pointer;
}
.linkItem .name {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    color: #414042;
}
.linkItem .length {
    display: block;
    width: 32px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    background-color: #ebebeb;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #414042;
}
</style>