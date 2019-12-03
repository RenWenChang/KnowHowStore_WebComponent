<template>
    <div class="tableQuery">
        <span class="tableQuery__name">{{name}}</span>
        <div class="tableQuery__body">
            <label class="tableQuery__label">
                <input class="label__input" :ref="`queryTableInput${name}`" />
            </label>
            <button class="queryButton">查詢</button>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        widths: ['80px', '184px', '392px', '600px', '1224px']
    }),
    props: {
        name: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: '1'
        },
    },
    mounted() {
        const targetWidth = this.widths[this.width]
        const inputLabel = this.$refs[`queryTableInput${this.name}`]
        inputLabel.style.minWidth = targetWidth
    },
}
</script>
<style lang="scss" scoped>
.tableQuery {
    display: flex;
    flex-direction: column;
    .tableQuery__name {
        color: #414042;
    }
    .tableQuery__body {
        margin-top: 4px;
    }
    .tableQuery__label {
        padding: 10px 12px;
        border-radius: 4px;
        border: solid 1px #d0d0d0;
        background-color: #ffffff;
        height: 40px;
        .label__input {
            border: none;
            font-size: 14px;
        }
    }
    .queryButton {
        height: 40px;
        border-radius: 20px;
        background-color: #00b85a;
        color: white;
        width: 112px;
        border: none;
        font-size: 16px;
        font-weight: bold;
        font-family: "Noto Sans TC", sans-serif;
        margin-left: 16px;
    }
}
</style>