<template>
    <Container>
        <Row>
            <kendo-grid ref="grid" :data-source="localDataSource" style="height:400px;width:100%">
                <kendo-grid-column :selectable="true" :width="'100px'"></kendo-grid-column>
                <kendo-grid-column :field="'ClientID'" :width="'100px'"></kendo-grid-column>
                <kendo-grid-column :field="'ClientCName'" :width="'100px'"></kendo-grid-column>
                <kendo-grid-column :field="'ClientEName'" :width="'100px'"></kendo-grid-column>
                <kendo-grid-column :field="'IdentityNO'" :width="'100px'"></kendo-grid-column>
                <kendo-grid-column :field="'TEL'" :width="'100px'"></kendo-grid-column>
                <kendo-grid-column
                    :command="[{text:'修改', click:openMaintain}]"
                    :width="'100px'"
                    :lockable="true"
                    :locked="true"
                ></kendo-grid-column>
            </kendo-grid>
        </Row>
    </Container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data: () => ({
        localDataSource: [],
    }),
    async mounted() {
        const response = await this.getUsers()
        // eslint-disable-next-line 
        const { Datas, ResultCode } = response
        if (ResultCode === '01') {
            this.localDataSource = Datas
        }
    },
    methods: {
        openMaintain(event) {
            event.preventDefault();
            const tr = event.target.closest("tr"); // get the current table row (tr)
            const grid = this.$refs.grid.kendoWidget();
            const row = grid.dataItem(tr);
            this.createTab({
                id: row.ClientID,
                path: 'maintain',
                label: '資料維護',
            })
            this.$nextTick(() => {
                this.$router.push({
                    name: 'userRecordMaintain',
                    query: {
                        id: row.ClientID,
                    }
                })
            })
        },
        ...mapActions(["getUsers", "createTab"])
    }
}
</script>
