<template>
    <div id="notification">
        <dashboardBlockTitle
            :name="'通知'"
            :hasHint="true"
            :hasDropdown="true"
            :options="drop"
            :hint="'顯示近一個月公告'"
            :clickTitle="clickTitle"
        ></dashboardBlockTitle>
        <BroadcastTemplate :itemGroup="itemGroup"></BroadcastTemplate>
    </div>
</template>
<script>

export default {

    data: () => ({
        drop: [
            {
                name: "系統公告"
            }
        ],
        itemGroup: [],


    }),
    methods: {
        clickTitle: function (e) {
            alert('通知', e);
        }
    },
    mounted() {
        for (let i = 0; i < 20; i++) {
            let o = {
                date: '2019/10/31',
                length: "2",
                content: [
                    {
                        subject: '我是公告標題DEF',
                        time: '2019/10/31 13:12:01',
                        editor: 'Mary',
                        href: '#',
                        p: '上畫命國日人來辦品辦為在中竟的的明問生想了農林公麼廠然入今示的吃細來頭到事件，小且象來經多造電象北趣好過傷言大件任我，一等生單她：我進上是有：黨計。',
                    },
                    {
                        subject: '我是公告標題DEF',
                        time: '2019/10/31 13:12:01',
                        editor: 'Mary',
                        href: '#',
                        p: '上畫命國日人來辦品辦為在中竟的的明問生想了農林公麼廠然入今示的吃細來頭到事件，小且象來經多造電象北趣好過傷言大件任我，一等生單她：我進上是有：黨計。',
                    }
                ]
            }
            this.itemGroup.push(o);

        }
    }
}
</script>
<style lang="scss" scoped>
#notification {
    width: 100%;
    min-width: 510px;
    height: 724px;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.18);
    background-color: #f6f6f6;
    order: 2;
    margin-bottom: 16px;
    padding: 16px;
}

@media screen and (min-width: 1440px) {
    #notification {
        width: calc(100% - 882px);
        margin-right: 16px;
        min-width: 510px;
        height: 764px;
        border-radius: 4px;
        box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.18);
        background-color: #f6f6f6;
        order: 0;
        margin-bottom: 0;
    }
}
</style>