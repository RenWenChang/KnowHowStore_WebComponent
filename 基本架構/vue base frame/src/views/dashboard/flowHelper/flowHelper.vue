<template>
    <div id="flowHelper">
        <dashboardBlockTitle :name="'流程精靈'" :clickTitle="clickTitle"></dashboardBlockTitle>
        <ButtonGroupWithoutOverflow :buttons="buttons"></ButtonGroupWithoutOverflow>
    </div>
</template>
<script>

export default {

    data: () => ({
        buttons: [
            {
                name: '境外基金上架',
                hasName: true,
                icon: 1,
                hasIcon: true,
                click: function (e) {
                    console.log(e);
                    alert('境外基金上架');
                }
            },
            {
                name: '流程名稱 A',
                hasName: true,
                icon: 2,
                hasIcon: true,
                click: function (e) {
                    console.log(e);
                    alert('流程名稱 A');
                }
            },
            {
                name: '流程名稱 B',
                hasName: true,
                icon: 3,
                hasIcon: true,
                click: function (e) {
                    console.log(e);
                    alert('流程名稱 B');
                }
            },
            {
                name: '境外基金上架',
                hasName: true,
                icon: 1,
                hasIcon: true,
                click: function (e) {
                    console.log(e);
                    alert('境外基金上架');
                }
            },
            {
                name: '流程名稱 A',
                hasName: true,
                icon: 2,
                hasIcon: true,
                click: function (e) {
                    console.log(e);
                    alert('流程名稱 A');
                }
            },
            {
                name: '流程名稱 B',
                hasName: true,
                icon: 3,
                hasIcon: true,
                click: function (e) {
                    console.log(e);
                    alert('流程名稱 B');
                }
            },
        ]
    }),
    methods: {
        clickTitle: function (e) {
            alert('流程精靈', e);
        }
    }
}
</script>
<style lang="scss" scoped>
#flowHelper {
    width: 100%;
    min-width: 320px;
    height: 100%;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.15);
    background-color: #f6f6f6;
    padding: 16px;
}
@media screen and (min-width: 1440px) {
    #flowHelper {
        min-width: 400px;
        min-height: 306px;
        height: 50%;
        border-radius: 4px;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.15);
        background-color: #f6f6f6;
    }
}
</style>